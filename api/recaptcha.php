<?php
/**
 * Google reCAPTCHA v3 handler for contact form
 */

class RecaptchaV3 {
    
    private $secretKey;
    private $minScore;
    
    public function __construct($secretKey, $minScore = 0.5) {
        $this->secretKey = $secretKey;
        $this->minScore = $minScore;
    }
    
    /**
     * Verify reCAPTCHA v3 token
     */
    public function verify($token, $action = null, $remoteIp = null) {
        if (empty($token)) {
            return [
                'success' => false,
                'error' => 'No reCAPTCHA token provided'
            ];
        }
        
        // Prepare verification data
        $data = [
            'secret' => $this->secretKey,
            'response' => $token
        ];
        
        if ($remoteIp) {
            $data['remoteip'] = $remoteIp;
        }
        
        // Make request to Google's verification endpoint
        $options = [
            'http' => [
                'header' => "Content-type: application/x-www-form-urlencoded\r\n",
                'method' => 'POST',
                'content' => http_build_query($data)
            ]
        ];
        
        $context = stream_context_create($options);
        $response = file_get_contents('https://www.google.com/recaptcha/api/siteverify', false, $context);
        
        if ($response === false) {
            return [
                'success' => false,
                'error' => 'Failed to connect to reCAPTCHA service'
            ];
        }
        
        $result = json_decode($response, true);
        
        if (!$result) {
            return [
                'success' => false,
                'error' => 'Invalid response from reCAPTCHA service'
            ];
        }
        
        // Check if verification was successful
        if (!$result['success']) {
            $errorCodes = $result['error-codes'] ?? [];
            return [
                'success' => false,
                'error' => 'reCAPTCHA verification failed',
                'error_codes' => $errorCodes
            ];
        }
        
        // Check score (v3 specific)
        $score = $result['score'] ?? 0;
        if ($score < $this->minScore) {
            return [
                'success' => false,
                'error' => 'reCAPTCHA score too low (possible bot)',
                'score' => $score
            ];
        }
        
        // Check action if provided (v3 specific)
        if ($action && isset($result['action']) && $result['action'] !== $action) {
            return [
                'success' => false,
                'error' => 'reCAPTCHA action mismatch'
            ];
        }
        
        return [
            'success' => true,
            'score' => $score,
            'action' => $result['action'] ?? null,
            'challenge_ts' => $result['challenge_ts'] ?? null,
            'hostname' => $result['hostname'] ?? null
        ];
    }
}
?>
