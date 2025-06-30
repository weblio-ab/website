<?php
/**
 * Simple Email service using PHPMailer with SMTP
 */

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
use PHPMailer\PHPMailer\SMTP;

// Try different possible PHPMailer paths
$phpmailerPaths = [
    __DIR__ . '/phpmailer/phpmailer/src/',     // Actual Composer installation
    __DIR__ . '/PHPMailer/src/',               // Legacy structure
    __DIR__ . '/vendor/phpmailer/phpmailer/src/',  // Standard Composer
];

$phpmailerPath = null;
foreach ($phpmailerPaths as $path) {
    if (file_exists($path . 'Exception.php')) {
        $phpmailerPath = $path;
        break;
    }
}

if (!$phpmailerPath) {
    error_log("PHPMailer not found in any expected location");
    throw new Exception("PHPMailer library not found");
}

error_log("Using PHPMailer from: " . $phpmailerPath);

require_once $phpmailerPath . 'Exception.php';
require_once $phpmailerPath . 'PHPMailer.php';
require_once $phpmailerPath . 'SMTP.php';

class EmailService {
    
    /**
     * Send an email using PHPMailer with SMTP
     * 
     * @param string $to Recipient email address
     * @param string $subject Email subject
     * @param string $body Email body (plain text)
     * @param string|null $replyTo Optional reply-to email address
     * @return array Result array with success status and message
     */
    public function sendEmail($to, $subject, $body, $replyTo = null) {
        error_log("=== EmailService::sendEmail() called ===");
        error_log("To: " . $to);
        error_log("Subject: " . $subject);
        error_log("Reply-to: " . ($replyTo ?: 'none'));
        error_log("Body length: " . strlen($body));
        
        $mail = new PHPMailer(true);
        
        try {
            // SMTP Configuration from environment variables
            error_log("Configuring SMTP settings...");
            $mail->isSMTP();
            $mail->Host = getenv('SMTP_HOST') ?: 'smtp.gmail.com';
            $mail->SMTPAuth = true;
            $mail->Username = getenv('SMTP_USERNAME');
            $mail->Password = getenv('SMTP_PASSWORD');
            $mail->SMTPSecure = getenv('SMTP_ENCRYPTION') ?: PHPMailer::ENCRYPTION_STARTTLS;
            $mail->Port = getenv('SMTP_PORT') ?: 587;
            $mail->CharSet = 'UTF-8';
            
            error_log("SMTP Host: " . $mail->Host);
            error_log("SMTP Port: " . $mail->Port);
            error_log("SMTP Username: " . $mail->Username);
            error_log("SMTP Password set: " . (!empty($mail->Password) ? 'yes' : 'no'));
            
            // Sender configuration from environment variables
            $fromEmail = getenv('SMTP_FROM_EMAIL') ?: getenv('SMTP_USERNAME');
            $fromName = getenv('SMTP_FROM_NAME') ?: 'Weblio';
            
            error_log("From email: " . $fromEmail);
            error_log("From name: " . $fromName);
            
            $mail->setFrom($fromEmail, $fromName);
            $mail->addAddress($to);
            
            // Add reply-to if provided
            if ($replyTo) {
                $mail->addReplyTo($replyTo);
                error_log("Reply-to added: " . $replyTo);
            }
            
            // Email content
            $mail->Subject = $subject;
            $mail->Body = $body;
            $mail->isHTML(false); // Plain text
            
            error_log("Attempting to send email...");
            // Send the email
            $result = $mail->send();
            
            if ($result) {
                error_log("PHPMailer send() returned true - Email sent successfully to: " . $to);
                return [
                    'success' => true,
                    'message' => 'Email sent successfully'
                ];
            } else {
                error_log("PHPMailer send() returned false - Email sending failed: Unknown error");
                error_log("PHPMailer ErrorInfo: " . $mail->ErrorInfo);
                return [
                    'success' => false,
                    'error' => 'Failed to send email'
                ];
            }
            
        } catch (Exception $e) {
            error_log("=== PHPMailer Exception ===");
            error_log("PHPMailer Exception: " . $e->getMessage());
            error_log("PHPMailer Error Info: " . $mail->ErrorInfo);
            error_log("Exception file: " . $e->getFile());
            error_log("Exception line: " . $e->getLine());
            
            return [
                'success' => false,
                'error' => 'Email could not be sent. Error: ' . $e->getMessage()
            ];
        }
    }
}
?>
