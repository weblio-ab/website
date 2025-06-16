<template>
  <section id="contact" class="py-5">
    <div class="container">
      <div class="row">
        <div class="col-lg-8 mx-auto text-center mb-5">
          <h2 class="display-5 fw-bold text-dark mb-3">{{ $t('contact.title') }}</h2>
          <p class="lead text-muted">{{ $t('contact.subtitle') }}</p>
        </div>
      </div>

      <div class="row g-5">
        <!-- Contact Form -->
        <div class="col-lg-8">
          <div class="contact-form-wrapper">
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
                    {{ isSubmittingForm ? 'Skickar...' : $t('contact.form.submit') }}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>

        <!-- Contact Info -->
        <div class="col-lg-4">
          <div class="contact-info">
            <h4 class="mb-4">{{ $t('contact.info.title') }}</h4>
            
            <div class="contact-item">
              <div class="contact-icon">
                <i class="bi bi-telephone"></i>
              </div>
              <div class="contact-details">
                <p class="mb-0">{{ $t('contact.info.phone') }}</p>
              </div>
            </div>
            
            <div class="contact-item">
              <div class="contact-icon">
                <i class="bi bi-envelope"></i>
              </div>
              <div class="contact-details">
                <p class="mb-0">{{ $t('contact.info.email') }}</p>
              </div>
            </div>
            
            <div class="consultation-card">
              <div class="consultation-icon">
                <i class="bi bi-chat-dots"></i>
              </div>
              <h5>{{ $t('contact.info.consultation') }}</h5>
              <p class="text-muted">{{ $t('contact.info.consultationText') }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useAppStore } from '../stores/app'
import { storeToRefs } from 'pinia'

const appStore = useAppStore()
const { contactForm, isSubmittingForm } = storeToRefs(appStore)
const { submitContactForm } = appStore

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

.contact-info {
  background: white;
  padding: 2.5rem;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 123, 255, 0.1);
  height: fit-content;
}

.contact-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
  padding: 1rem;
  background: #f8f9ff;
  border-radius: 12px;
}

.contact-icon {
  width: 50px;
  height: 50px;
  background: linear-gradient(135deg, #007bff, #0056b3);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.25rem;
  flex-shrink: 0;
}

.contact-details p {
  color: #333;
  font-weight: 500;
}

.consultation-card {
  background: linear-gradient(135deg, #f8f9ff, #e3f2fd);
  padding: 2rem;
  border-radius: 12px;
  text-align: center;
  margin-top: 2rem;
}

.consultation-icon {
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, #007bff, #0056b3);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.5rem;
  margin: 0 auto 1rem;
}

.consultation-card h5 {
  color: #333;
  margin-bottom: 1rem;
}

@media (max-width: 991.98px) {
  .contact-info {
    margin-top: 2rem;
  }
}

@media (max-width: 767.98px) {
  .contact-form-wrapper,
  .contact-info {
    padding: 1.5rem;
  }
  
  .consultation-card {
    padding: 1.5rem;
  }
}
</style>
