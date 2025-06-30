<?php
/**
 * Contact form validation class
 */

class ContactValidator {
    
    private $recaptchaSecret;
    private $recaptchaMinScore;
    
    public function __construct() {
        $this->recaptchaSecret = getenv('RECAPTCHA_SECRET');
        $this->recaptchaMinScore = (float) getenv('RECAPTCHA_MIN_SCORE');
    }
    
    /**
     * Validate contact form data
     */
    public function validate($data) {
        $errors = [];
        
        // Check if properties exist
        if (!isset($data['properties']) || !is_array($data['properties'])) {
            $errors[] = 'Properties data is required';
            return $errors;
        }
        
        // reCAPTCHA v3 validation
        if (empty($data['recaptcha_token'])) {
            $errors[] = 'reCAPTCHA verification failed';
        } else {
            if (!$this->recaptchaSecret) {
                $errors[] = 'reCAPTCHA not properly configured';
            } else {
                $recaptcha = new RecaptchaV3($this->recaptchaSecret, $this->recaptchaMinScore);
                
                $result = $recaptcha->verify(
                    $data['recaptcha_token'],
                    'form_submission'
                );
                
                if (!$result['success']) {
                    $errors[] = $result['error'];
                }
            }
        }
        
        // Properties validation
        $properties = $data['properties'];
        $propertyErrors = $this->validateProperties($properties);
        $errors = array_merge($errors, $propertyErrors);
        
        return $errors;
    }
    
    /**
     * Validate properties for safety
     */
    private function validateProperties($properties) {
        $errors = [];
        
        foreach ($properties as $key => $value) {
            if (is_string($value)) {
                // Length limits for all text fields
                if (strlen($value) > 2000) {
                    $errors[] = ucfirst($key) . ' is too long (max 2000 characters)';
                }
                
                // Check for suspicious content
                if (preg_match('/<script|javascript:|on\w+\s*=|<iframe|<object|<embed/i', $value)) {
                    $errors[] = 'Invalid content detected in ' . $key;
                }
            }
        }
        
        return $errors;
    }
    
    /**
     * Sanitize input data
     */
    public function sanitize($data) {
        $sanitized = [];
        
        // Sanitize properties
        if (isset($data['properties']) && is_array($data['properties'])) {
            $sanitized['properties'] = [];
            foreach ($data['properties'] as $key => $value) {
                if (is_string($value)) {
                    $sanitized['properties'][$key] = htmlspecialchars(trim($value), ENT_QUOTES, 'UTF-8');
                } else {
                    $sanitized['properties'][$key] = $value;
                }
            }
        }
        
        // Sanitize other fields
        $sanitized['recaptcha_token'] = trim($data['recaptcha_token'] ?? '');
        
        return $sanitized;
    }
}
?>
