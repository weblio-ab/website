<?php
// Error reporting
error_reporting(E_ALL);
ini_set('display_errors', 0);
ini_set('log_errors', 1);
ini_set('error_log', __DIR__ . '/error.log');

// Security headers
header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');
header('X-Frame-Options: DENY');
header('X-XSS-Protection: 1; mode=block');

// CORS headers for your domain
$allowedOrigins = [
    'https://weblio.se',
    'https://www.weblio.se',
    'https://staging.weblio.se',
    'https://www.staging.weblio.se',
    'http://localhost:5173', // For development
    'http://localhost:4173'  // For preview
];

$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
if (in_array($origin, $allowedOrigins)) {
    header("Access-Control-Allow-Origin: $origin");
}

header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, X-Requested-With');
header('Access-Control-Max-Age: 86400'); // 24 hours

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Only allow POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit();
}

// Get and validate JSON input
$jsonInput = file_get_contents('php://input');
if (empty($jsonInput)) {
    http_response_code(400);
    echo json_encode(['error' => 'No data received']);
    exit();
}

$data = json_decode($jsonInput, true);
if (json_last_error() !== JSON_ERROR_NONE) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid JSON']);
    exit();
}

// Get client IP for logging and reCAPTCHA
$clientIP = $_SERVER['HTTP_CF_CONNECTING_IP'] ?? $_SERVER['HTTP_X_FORWARDED_FOR'] ?? $_SERVER['REMOTE_ADDR'];

// Load environment variables
require_once __DIR__ . '/env.php';

// Load reCAPTCHA class
require_once __DIR__ . '/recaptcha.php';

// Load Email service
require_once __DIR__ . '/EmailService.php';

// Validation function
function validateInput($data, $clientIP) {
    $errors = [];
    
    // Required fields
    if (empty($data['name']) || strlen(trim($data['name'])) < 2) {
        $errors[] = 'Name is required and must be at least 2 characters';
    }
    
    if (empty($data['email']) || !filter_var($data['email'], FILTER_VALIDATE_EMAIL)) {
        $errors[] = 'Valid email is required';
    }
    
    if (empty($data['message']) || strlen(trim($data['message'])) < 10) {
        $errors[] = 'Message is required and must be at least 10 characters';
    }
    
    // reCAPTCHA v3 validation
    if (empty($data['recaptcha_token'])) {
        $errors[] = 'reCAPTCHA verification failed';
    } else {
        $recaptchaSecret = getenv('RECAPTCHA_SECRET');
        if (!$recaptchaSecret) {
            $errors[] = 'reCAPTCHA not properly configured';
        } else {
            $recaptcha = new RecaptchaV3($recaptchaSecret, 0.5);
            
            $result = $recaptcha->verify(
                $data['recaptcha_token'],
                'form_submission', // Action name should match frontend
                $clientIP
            );
            
            if (!$result['success']) {
                $errors[] = $result['error'];
            }
        }
    }
    
    // Honeypot check (hidden field that should be empty)
    if (!empty($data['website'])) {
        $errors[] = 'Bot detected';
    }
    
    // Timing check (form should take at least 5 seconds to fill)
    if (!empty($data['form_timestamp'])) {
        $formTime = time() - intval($data['form_timestamp']);
        if ($formTime < 5) {
            $errors[] = 'Form submitted too quickly';
        }
        if ($formTime > 1800) { // 30 minutes
            $errors[] = 'Form expired, please refresh the page';
        }
    } else {
        $errors[] = 'Form timestamp missing';
    }
    
    // Optional phone validation
    if (!empty($data['phone'])) {
        $phone = preg_replace('/[^0-9+\-\s()]/', '', $data['phone']);
        if (strlen($phone) < 8) {
            $errors[] = 'Phone number format is invalid';
        }
    }
    
    // Length limits
    if (strlen($data['name']) > 100) $errors[] = 'Name is too long';
    if (strlen($data['email']) > 100) $errors[] = 'Email is too long';
    if (strlen($data['phone']) > 20) $errors[] = 'Phone is too long';
    if (strlen($data['company']) > 100) $errors[] = 'Company name is too long';
    if (strlen($data['message']) > 2000) $errors[] = 'Message is too long';
    
    return $errors;
}

// Sanitize input
function sanitizeInput($data) {
    return [
        'name' => htmlspecialchars(trim($data['name']), ENT_QUOTES, 'UTF-8'),
        'email' => filter_var(trim($data['email']), FILTER_SANITIZE_EMAIL),
        'phone' => htmlspecialchars(trim($data['phone'] ?? ''), ENT_QUOTES, 'UTF-8'),
        'company' => htmlspecialchars(trim($data['company'] ?? ''), ENT_QUOTES, 'UTF-8'),
        'message' => htmlspecialchars(trim($data['message']), ENT_QUOTES, 'UTF-8'),
        'recaptcha_token' => trim($data['recaptcha_token'] ?? ''),
        'website' => trim($data['website'] ?? ''), // Honeypot field
        'form_timestamp' => trim($data['form_timestamp'] ?? '') // Timing check
    ];
}

// Validate input
$validationErrors = validateInput($data, $clientIP);
if (!empty($validationErrors)) {
    http_response_code(400);
    echo json_encode(['error' => 'Validation failed', 'details' => $validationErrors]);
    exit();
}

// Sanitize input
$cleanData = sanitizeInput($data);

// Send email using EmailService
function sendContactEmail($data) {
    try {
        $emailService = new EmailService();
        
        // Create email content
        $to = getenv('CONTACT_EMAIL');
        if (!$to) {
            return false;
        }
        
        $subject = '[Weblio] Ny kontaktförfrågan från ' . $data['name'];
        
        $body = "En ny kontaktförfrågan har skickats från webbsidan.\n\n";
        $body .= "Namn: " . $data['name'] . "\n";
        $body .= "E-post: " . $data['email'] . "\n";
        $body .= "Telefon: " . ($data['phone'] ?: 'Ej angivet') . "\n";
        $body .= "Företag: " . ($data['company'] ?: 'Ej angivet') . "\n";
        $body .= "Meddelande:\n" . $data['message'] . "\n\n";
        $body .= "---\n";
        $body .= "Skickat från: " . ($_SERVER['HTTP_REFERER'] ?? 'Okänd källa') . "\n";
        $body .= "Tidpunkt: " . date('Y-m-d H:i:s') . "\n";
        
        $result = $emailService->sendEmail($to, $subject, $body, $data['email']);
        
        return $result['success'];
        
    } catch (Exception $e) {
        error_log("Exception in sendContactEmail(): " . $e->getMessage());
        return false;
    }
}

// Log the contact attempt (for analytics/security)
function logContact($data, $clientIP) {
    $logData = [
        'timestamp' => date('Y-m-d H:i:s'),
        'ip' => $clientIP,
        'name' => $data['name'],
        'email' => $data['email'],
        'company' => $data['company'],
        'message_length' => strlen($data['message'])
    ];
    
    $logFile = __DIR__ . '/contacts.log';
    file_put_contents($logFile, json_encode($logData) . "\n", FILE_APPEND | LOCK_EX);
}

try {
    // Send the email
    if (sendContactEmail($cleanData)) {
        // Log successful contact
        logContact($cleanData, $clientIP);
        
        http_response_code(200);
        echo json_encode([
            'success' => true,
            'message' => 'Tack för ditt meddelande! Vi återkommer inom 24 timmar.'
        ]);
    } else {
        throw new Exception('Failed to send email - check server mail configuration');
    }
    
} catch (Exception $e) {
    error_log("Contact form error: " . $e->getMessage());
    
    http_response_code(500);
    echo json_encode([
        'error' => 'Ett fel uppstod när meddelandet skulle skickas. Kontakta oss direkt på info@weblio.se',
        'details' => 'Mail server configuration error'
    ]);
}
?>
