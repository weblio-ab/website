<?php
/**
 * Contact form API endpoint
 */

// Error reporting
error_reporting(E_ALL);
ini_set('display_errors', 0);
ini_set('log_errors', 1);
ini_set('error_log', __DIR__ . '/error.log');

// Load dependencies
require_once __DIR__ . '/env.php';
require_once __DIR__ . '/HttpHelper.php';
require_once __DIR__ . '/recaptcha.php';
require_once __DIR__ . '/EmailService.php';
require_once __DIR__ . '/ContactValidator.php';

/**
 * Send contact email
 */
function sendContactEmail($data) {
    try {
        $emailService = new EmailService();
        
        $to = getenv('CONTACT_EMAIL') ?: getenv('SMTP_USERNAME');
        $businessName = getenv('BUSINESS_NAME');
        
        $properties = $data['properties'];
        $name = $properties['name'] ?? 'Unknown';
        $email = $properties['email'] ?? '';
        
        $subject = "[$businessName] Nytt meddelande från $name";
        
        $body = "Ett nytt meddelande har skickats från webbsidan.\n\n";
        
        // Dynamically add all properties to the email
        foreach ($properties as $key => $value) {
            if (!empty($value)) {
                $label = ucfirst(str_replace('_', ' ', $key));
                $body .= $label . ": " . $value . "\n";
            }
        }
        
        $body .= "\n---\n";
        $body .= "Tidpunkt: " . date('Y-m-d H:i:s') . "\n";
        
        $result = $emailService->sendEmail($to, $subject, $body, $email);
        
        return $result['success'];
        
    } catch (Exception $e) {
        error_log("Exception in sendContactEmail(): " . $e->getMessage());
        return false;
    }
}

try {
    // Set headers
    HttpHelper::setSecurityHeaders();
    HttpHelper::setCorsHeaders();
    HttpHelper::handleOptions();
    HttpHelper::validateMethod('POST');
    
    // Get input data
    $data = HttpHelper::getJsonInput();
    
    // Validate input
    $validator = new ContactValidator();
    $validationErrors = $validator->validate($data);
    if (!empty($validationErrors)) {
        http_response_code(400);
        return;
    }
    
    // Sanitize input
    $cleanData = $validator->sanitize($data);
    
    // Send email
    if (sendContactEmail($cleanData)) {
        http_response_code(200);
    } else {
        http_response_code(500);
    }
    
} catch (Exception $e) {
    error_log("Contact form error: " . $e->getMessage());
    http_response_code(500);
}
?>
