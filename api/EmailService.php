<?php
/**
 * Simple Email service using PHPMailer with SMTP
 */

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
use PHPMailer\PHPMailer\SMTP;

require_once '/vendor/phpmailer/phpmailer/src/Exception.php';
require_once '/vendor/phpmailer/phpmailer/src/PHPMailer.php';
require_once '/vendor/phpmailer/phpmailer/src/SMTP.php';

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
        $mail = new PHPMailer(true);
        
        try {
            // SMTP Configuration from environment variables
            $mail->isSMTP();
            $mail->Host = getenv('SMTP_HOST') ?: 'smtp.gmail.com';
            $mail->SMTPAuth = true;
            $mail->Username = getenv('SMTP_USERNAME');
            $mail->Password = getenv('SMTP_PASSWORD');
            $mail->SMTPSecure = getenv('SMTP_ENCRYPTION') ?: PHPMailer::ENCRYPTION_STARTTLS;
            $mail->Port = getenv('SMTP_PORT') ?: 587;
            $mail->CharSet = 'UTF-8';
            
            // Sender configuration from environment variables
            $fromEmail = getenv('SMTP_FROM_EMAIL') ?: getenv('SMTP_USERNAME');
            $fromName = getenv('SMTP_FROM_NAME') ?: 'Weblio';
            
            $mail->setFrom($fromEmail, $fromName);
            $mail->addAddress($to);
            
            // Add reply-to if provided
            if ($replyTo) {
                $mail->addReplyTo($replyTo);
            }
            
            // Email content
            $mail->Subject = $subject;
            $mail->Body = $body;
            $mail->isHTML(false); // Plain text
            
            // Send the email
            $result = $mail->send();
            
            if ($result) {
                return [
                    'success' => true,
                    'message' => 'Email sent successfully'
                ];
            } else {
                return [
                    'success' => false,
                    'error' => 'Failed to send email'
                ];
            }
            
        } catch (Exception $e) {
            error_log("PHPMailer Exception: " . $e->getMessage());
            
            return [
                'success' => false,
                'error' => 'Email could not be sent. Error: ' . $e->getMessage()
            ];
        }
    }
}
?>
