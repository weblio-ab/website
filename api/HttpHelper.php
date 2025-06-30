<?php
/**
 * HTTP request/response helper
 */

class HttpHelper {
    
    /**
     * Set security headers
     */
    public static function setSecurityHeaders() {
        header('Content-Type: application/json; charset=utf-8');
        header('X-Content-Type-Options: nosniff');
        header('X-Frame-Options: DENY');
        header('X-XSS-Protection: 1; mode=block');
    }
    
    /**
     * Set CORS headers
     */
    public static function setCorsHeaders() {
        // Always include current host as allowed origin
        $protocol = isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? 'https' : 'http';
        $host = $_SERVER['HTTP_HOST'] ?? 'localhost';
        $allowedOrigins = ["$protocol://$host"];
        
        // Append additional origins from environment variables
        $allowedOriginsEnv = getenv('ALLOWED_ORIGINS');
        if ($allowedOriginsEnv) {
            $envOrigins = array_map('trim', explode(',', $allowedOriginsEnv));
            $allowedOrigins = array_merge($allowedOrigins, $envOrigins);
        }
        
        $origin = $_SERVER['HTTP_ORIGIN'] ?? '';
        if (in_array($origin, $allowedOrigins)) {
            header("Access-Control-Allow-Origin: $origin");
        }
        
        header('Access-Control-Allow-Methods: POST, OPTIONS');
        header('Access-Control-Allow-Headers: Content-Type, X-Requested-With');
        header('Access-Control-Max-Age: 86400'); // 24 hours
    }
    
    /**
     * Handle preflight OPTIONS request
     */
    public static function handleOptions() {
        if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
            http_response_code(200);
            exit();
        }
    }
    
    /**
     * Validate request method
     */
    public static function validateMethod($allowedMethod = 'POST') {
        if ($_SERVER['REQUEST_METHOD'] !== $allowedMethod) {
            self::sendError(405, 'Method not allowed');
        }
    }
    
    /**
     * Get and validate JSON input
     */
    public static function getJsonInput() {
        $jsonInput = file_get_contents('php://input');
        if (empty($jsonInput)) {
            self::sendError(400, 'No data received');
        }
        
        $data = json_decode($jsonInput, true);
        if (json_last_error() !== JSON_ERROR_NONE) {
            self::sendError(400, 'Invalid JSON');
        }
        
        return $data;
    }
    
    /**
     * Get client IP address
     */
    public static function getClientIP() {
        return $_SERVER['HTTP_CF_CONNECTING_IP'] ?? 
               $_SERVER['HTTP_X_FORWARDED_FOR'] ?? 
               $_SERVER['REMOTE_ADDR'];
    }
    
    /**
     * Send JSON response
     */
    public static function sendResponse($data, $statusCode = 200) {
        http_response_code($statusCode);
        echo json_encode($data);
        exit();
    }
    
    /**
     * Send error response
     */
    public static function sendError($statusCode, $message, $details = null) {
        $response = ['error' => $message];
        if ($details) {
            $response['details'] = $details;
        }
        
        self::sendResponse($response, $statusCode);
    }
}
?>
