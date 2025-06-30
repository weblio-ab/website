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
        error_log("=== Email Function Start ===");
        error_log("Email function received data: " . print_r($data, true));
        
        $emailService = new EmailService();
        
        $to = getenv('CONTACT_EMAIL');
        $businessName = getenv('BUSINESS_NAME');
        
        error_log("CONTACT_EMAIL: " . ($to ?: 'NOT SET'));
        error_log("BUSINESS_NAME: " . ($businessName ?: 'NOT SET'));
        
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
        
        error_log("Email details - To: $to, Subject: $subject");
        error_log("Email body: " . $body);
        
        $result = $emailService->sendEmail($to, $subject, $body, $email);
        
        error_log("EmailService result: " . print_r($result, true));
        error_log("=== Email Function End ===");
        
        return $result['success'];
        
    } catch (Exception $e) {
        error_log("Exception in sendContactEmail(): " . $e->getMessage());
        return false;
    }
}

try {
    // Debug: Log request details
    error_log("=== Contact Form Debug Start ===");
    error_log("Request method: " . ($_SERVER['REQUEST_METHOD'] ?? 'unknown'));
    error_log("Content type: " . ($_SERVER['CONTENT_TYPE'] ?? 'unknown'));
    error_log("HTTP Origin: " . ($_SERVER['HTTP_ORIGIN'] ?? 'unknown'));
    error_log("POST data: " . print_r($_POST, true));
    error_log("FILES data: " . print_r($_FILES, true));
    
    // Set headers
    HttpHelper::setSecurityHeaders();
    HttpHelper::setCorsHeaders();
    HttpHelper::handleOptions();
    HttpHelper::validateMethod('POST');
    
    // Get input data - Handle both JSON and FormData
    $data = null;
    if (!empty($_POST)) {
        // FormData submission
        error_log("Processing FormData submission");
        $data = $_POST;
    } else {
        // JSON submission (fallback)
        error_log("Processing JSON submission");
        $data = HttpHelper::getJsonInput();
    }
    
    error_log("Received data: " . print_r($data, true));
    
    // Validate input
    $validator = new ContactValidator();
    $validationErrors = $validator->validate($data);
    if (!empty($validationErrors)) {
        error_log("Validation errors: " . print_r($validationErrors, true));
        http_response_code(400);
        return;
    }
    
    // Sanitize input
    $cleanData = $validator->sanitize($data);
    error_log("Sanitized data: " . print_r($cleanData, true));
    
    // Send email
    $emailResult = sendContactEmail($cleanData);
    error_log("Email send result: " . ($emailResult ? 'success' : 'failed'));
    
    if ($emailResult) {
        error_log("=== Contact Form Success ===");
        http_response_code(200);
    } else {
        error_log("=== Contact Form Email Failed ===");
        http_response_code(500);
    }
    
} catch (Exception $e) {
    error_log("Contact form error: " . $e->getMessage());
    error_log("Stack trace: " . $e->getTraceAsString());
    error_log("=== Contact Form Error End ===");
    http_response_code(500);
}
?>
