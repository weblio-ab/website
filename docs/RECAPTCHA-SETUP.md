# Google reCAPTCHA v3 Setup Guide

## 🎯 Overview

Your contact form now uses Google reCAPTCHA v3, which provides invisible bot protection without user interaction. It analyzes user behavior and gives a score from 0.0 (bot-like) to 1.0 (human-like).

## 🔧 Setup Steps

### Step 1: Get reCAPTCHA Keys

1. **Go to Google reCAPTCHA Console**: https://www.google.com/recaptcha/admin/create
2. **Create new site**:
   - Label: "Weblio Contact Form"
   - reCAPTCHA type: **reCAPTCHA v3**
   - Domains: Add your domains:
     - `weblio.se`
     - `localhost` (for development)
3. **Accept terms** and click "Submit"
4. **Copy your keys**:
   - Site Key (public)
   - Secret Key (private)

### Step 2: Configure the Frontend

Update your site key in two places:

**1. In `index.html`:**
```html
<!-- Replace YOUR_SITE_KEY_HERE with your actual site key -->
<script src="https://www.google.com/recaptcha/api.js?render=YOUR_SITE_KEY_HERE" async defer></script>
```

**2. In `src/composables/useRecaptcha.js`:**
```javascript
// Replace YOUR_SITE_KEY_HERE with your actual site key
const siteKey = 'YOUR_SITE_KEY_HERE'
```

## 📊 Monitoring

### Google reCAPTCHA Admin Console

Monitor your reCAPTCHA usage at:
https://www.google.com/recaptcha/admin

You can see:
- Request volume
- Score distribution
- Action breakdown
- Potential attacks

### Common Log Messages

- `"reCAPTCHA score too low"` - Legitimate but requires manual review
- `"Failed to connect to reCAPTCHA service"` - Network issue
- `"reCAPTCHA verification failed"` - Invalid token or configuration

## 🚨 Troubleshooting

### reCAPTCHA Not Loading

**Check browser console** for errors:
```javascript
// Test if reCAPTCHA is loaded
console.log(typeof window.grecaptcha); // Should be 'object'
```

**Common causes:**
- Incorrect site key
- Domain not registered in Google Console
- Ad blockers blocking reCAPTCHA
- Network connectivity issues

### Low Scores for Legitimate Users

**Solutions:**
- Lower the minimum score threshold
- Check for browser extensions affecting scores
- Ensure proper domain configuration
- Review Google's documentation on score interpretation

### API Errors

**Check configuration:**
```bash
# Test reCAPTCHA endpoint directly
curl -X POST https://www.google.com/recaptcha/api/siteverify \
  -d "secret=YOUR_SECRET_KEY" \
  -d "response=test-token"
```
