<template>
  <div class="contact-form-wrapper">
    <!-- Success/Error Messages -->
    <div v-if="formSubmissionStatus" class="alert mb-4" :class="formSubmissionStatus === 'success' ? 'alert-success' : 'alert-danger'">
      <div class="d-flex align-items-center">
        <i class="bi me-2" :class="formSubmissionStatus === 'success' ? 'bi-check-circle' : 'bi-exclamation-triangle'"></i>
        <span>{{ formSubmissionMessage }}</span>
        <button type="button" class="btn-close ms-auto" @click="clearFormStatus" aria-label="Stäng"></button>
      </div>
    </div>
    
    <form @submit.prevent="handleSubmit" class="contact-form">
      <div class="row g-3">
        <div class="col-md-6">
          <label for="name" class="form-label">{{ $t('contact.form.name') }}</label>
          <input 
            type="text" 
            class="form-control" 
            id="name"
            v-model="contactForm.name"
            :placeholder="$t('contact.form.namePlaceholder')"
            required
          >
        </div>
        <div class="col-md-6">
          <label for="email" class="form-label">{{ $t('contact.form.email') }}</label>
          <input 
            type="email" 
            class="form-control" 
            id="email"
            v-model="contactForm.email"
            :placeholder="$t('contact.form.emailPlaceholder')"
            required
          >
        </div>
        <div class="col-md-6">
          <label for="phone" class="form-label">{{ $t('contact.form.phone') }}</label>
          <input 
            type="tel" 
            class="form-control" 
            id="phone"
            v-model="contactForm.phone"
            :placeholder="$t('contact.form.phonePlaceholder')"
          >
        </div>
        <div class="col-md-6">
          <label for="company" class="form-label">{{ $t('contact.form.company') }}</label>
          <input 
            type="text" 
            class="form-control" 
            id="company"
            v-model="contactForm.company"
            :placeholder="$t('contact.form.companyPlaceholder')"
          >
        </div>
        <div class="col-12">
          <label for="message" class="form-label">{{ $t('contact.form.message') }}</label>
          <textarea 
            class="form-control" 
            id="message" 
            rows="5"
            v-model="contactForm.message"
            :placeholder="$t('contact.form.messagePlaceholder')"
            required
          ></textarea>
        </div>
        <div class="col-12">
          <button type="submit" class="btn btn-primary btn-lg" :disabled="isSubmittingForm">
            <span v-if="isSubmittingForm" class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
            <i v-else class="bi bi-send me-2"></i>
            {{ isSubmittingForm ? $t('contact.form.submitting') : $t('contact.form.submit') }}
          </button>
          
          <!-- reCAPTCHA v3 notice -->
          <div class="recaptcha-notice mt-3">
            <small class="text-muted">
              <i class="bi bi-shield-check me-1"></i>
              {{ $t('contact.form.recaptchaNotice') }}
            </small>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script setup>
import { useContactStore } from '../stores/contact'
import { storeToRefs } from 'pinia'

const contactStore = useContactStore()
const { contactForm, isSubmittingForm, formSubmissionStatus, formSubmissionMessage } = storeToRefs(contactStore)
const { submitContactForm, clearFormStatus } = contactStore

function handleSubmit() {
  submitContactForm()
}
</script>

<style scoped>
.contact-form-wrapper {
  background: white;
  padding: 2.5rem;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 123, 255, 0.1);
}

.alert {
  border: none;
  border-radius: 12px;
  padding: 1rem 1.25rem;
}

.alert-success {
  background: linear-gradient(135deg, #d4edda, #c3e6cb);
  color: #155724;
}

.alert-danger {
  background: linear-gradient(135deg, #f8d7da, #f5c6cb);
  color: #721c24;
}

.btn-close {
  background: none;
  border: none;
  font-size: 1.25rem;
  opacity: 0.7;
  transition: opacity 0.3s ease;
}

.btn-close:hover {
  opacity: 1;
}

.form-label {
  font-weight: 600;
  color: #333;
  margin-bottom: 0.5rem;
}

.form-control {
  border: 2px solid #f1f3f5;
  border-radius: 8px;
  padding: 0.75rem 1rem;
  transition: all 0.3s ease;
}

.form-control:focus {
  border-color: #007bff;
  box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.1);
}

.recaptcha-notice {
  text-align: center;
}

@media (max-width: 767.98px) {
  .contact-form-wrapper {
    padding: 1.5rem;
  }
  
  /* Centrera labels i mobilvy */
  .form-label {
    text-align: start;
    display: block;
    width: 100%;
    margin-bottom: 0.5rem;
    margin-left: 3px;
  }
  
  /* Centrera skicka meddelande knappen i mobilvy */
  .col-12 {
    text-align: center;
  }
  
  .btn.btn-primary.btn-lg {
    display: inline-block;
    margin: 0 auto;
  }
}
</style>
