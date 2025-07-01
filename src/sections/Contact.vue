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
          <ContactForm />
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
import ContactForm from '../components/ContactForm.vue'
</script>

<style scoped>
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
  .contact-info {
    padding: 1.5rem;
  }
  
  .consultation-card {
    padding: 1.5rem;
  }
  
  /* Centrera Kontaktinformation rubriken i mobilvy */
  .contact-info h4 {
    text-align: center;
  }
}
</style>
