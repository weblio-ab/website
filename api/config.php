<?php
/**
 * Configuration file for the contact form API
 * 
 * IMPORTANT: This file contains sensitive information.
 * Make sure it's not accessible via web (place outside web root or use .htaccess)
 */

return [
    'email' => [
        // The email address where contact form submissions will be sent
        'to' => 'info@weblio.se',
        
        // The "From" address for emails (should be from your domain)
        'from' => 'noreply@weblio.se',
        
        // Subject prefix for contact form emails
        'subject_prefix' => '[Weblio Contact]',
    ],
    
    'security' => [
        // Allowed origins for CORS
        'allowed_origins' => [
            'https://webbenkelt.vercel.app',
            'https://weblio.se',
            'https://www.weblio.se',
            'http://localhost:5173', // Development
            'http://localhost:4173'  // Preview
        ]
    ],
    
    'validation' => [
        'name_min_length' => 2,
        'name_max_length' => 100,
        'email_max_length' => 100,
        'phone_max_length' => 20,
        'company_max_length' => 100,
        'message_min_length' => 10,
        'message_max_length' => 2000
    ],
    
    'recaptcha' => [
        // reCAPTCHA v3 settings
        'site_key' => '6LfQvXArAAAAAEc6eycVp2Bkq6FfCVW0RUg2lOQf', // Get from Google reCAPTCHA console
        'secret_key' => 'YOUR_SECRET_KEY_HERE', // Get from Google reCAPTCHA console
        'min_score' => 0.5, // Minimum score (0.0 to 1.0, higher = more human-like)
        'action' => 'contact_form' // Action name for this form
    ]
];
?>
