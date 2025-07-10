<template>
  <div class="policy-page">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-lg-8">
          <!-- Header -->
          <div class="policy-header text-center mb-5">
            <h1 class="display-4 fw-bold mb-3">{{ $t('pages.terms.title') }}</h1>
            <p class="lead text-muted">{{ $t('pages.terms.subtitle') }}</p>
            <p class="text-muted small">
              {{ $t('common.lastUpdated') }}: {{ $t('pages.terms.lastUpdated') }}
            </p>
          </div>

          <!-- Introduction -->
          <section class="policy-section mb-5">
            <h2 class="h3 fw-bold mb-3">{{ $t('pages.terms.sections.introduction.title') }}</h2>
            <p class="policy-text">{{ $t('pages.terms.sections.introduction.content') }}</p>
          </section>

          <!-- Services -->
          <section class="policy-section mb-5">
            <h2 class="h3 fw-bold mb-3">{{ $t('pages.terms.sections.services.title') }}</h2>
            <p class="policy-text">{{ $t('pages.terms.sections.services.content') }}</p>
          </section>

          <!-- Obligations -->
          <section class="policy-section mb-5">
            <h2 class="h3 fw-bold mb-3">{{ $t('pages.terms.sections.obligations.title') }}</h2>
            <p class="policy-text">{{ $t('pages.terms.sections.obligations.content') }}</p>
            <ul class="policy-list">
              <li v-for="item in obligationsList" :key="item">
                {{ item }}
              </li>
            </ul>
          </section>

          <!-- Payment -->
          <section class="policy-section mb-5">
            <h2 class="h3 fw-bold mb-3">{{ $t('pages.terms.sections.payment.title') }}</h2>
            <p class="policy-text">{{ $t('pages.terms.sections.payment.content') }}</p>
          </section>

          <!-- Intellectual Property -->
          <section class="policy-section mb-5">
            <h2 class="h3 fw-bold mb-3">{{ $t('pages.terms.sections.intellectualProperty.title') }}</h2>
            <p class="policy-text">{{ $t('pages.terms.sections.intellectualProperty.content') }}</p>
          </section>

          <!-- Liability -->
          <section class="policy-section mb-5">
            <h2 class="h3 fw-bold mb-3">{{ $t('pages.terms.sections.liability.title') }}</h2>
            <p class="policy-text">{{ $t('pages.terms.sections.liability.content') }}</p>
          </section>

          <!-- Termination -->
          <section class="policy-section mb-5">
            <h2 class="h3 fw-bold mb-3">{{ $t('pages.terms.sections.termination.title') }}</h2>
            <p class="policy-text">{{ $t('pages.terms.sections.termination.content') }}</p>
          </section>

          <!-- Changes -->
          <section class="policy-section mb-5">
            <h2 class="h3 fw-bold mb-3">{{ $t('pages.terms.sections.changes.title') }}</h2>
            <p class="policy-text">{{ $t('pages.terms.sections.changes.content') }}</p>
          </section>

          <!-- Governing Law -->
          <section class="policy-section mb-5">
            <h2 class="h3 fw-bold mb-3">{{ $t('pages.terms.sections.governing.title') }}</h2>
            <p class="policy-text">{{ $t('pages.terms.sections.governing.content') }}</p>
          </section>

          <!-- Contact -->
          <section class="policy-section mb-5">
            <h2 class="h3 fw-bold mb-3">{{ $t('footer.contact') }}</h2>
            <p class="policy-text">Om du har frågor om dessa villkor, kontakta oss:</p>
            <div class="contact-box">
              <p class="mb-2"><strong>{{ $t('company.name') }}</strong></p>
              <p class="mb-1">{{ $t('company.address') }}</p>
              <p class="mb-1">E-post: <EmailObfuscate :email="$t('company.email')" /></p>
              <p class="mb-0">Telefon: <PhoneObfuscate :phone="$t('company.phone')" /></p>
            </div>
          </section>

          <!-- Back to home -->
          <div class="text-center">
            <router-link to="/" class="btn btn-primary">
              <i class="bi bi-arrow-left me-2"></i>
              {{ $t('navigation.home') }}
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import EmailObfuscate from '../components/EmailObfuscate.vue'
import PhoneObfuscate from '../components/PhoneObfuscate.vue'

const { tm } = useI18n()

// Get arrays from i18n using tm()
const obligationsList = computed(() => tm('pages.terms.sections.obligations.list'))

onMounted(() => {
  document.title = `Allmänna villkor - Weblio`
})
</script>

<style scoped>
.policy-page {
  min-height: 100vh;
  padding: 4rem 0;
  background: linear-gradient(135deg, #f8f9ff 0%, #e3f2fd 100%);
}

.policy-header {
  padding: 2rem 0;
}

.policy-section {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.policy-text {
  font-size: 1.1rem;
  line-height: 1.7;
  color: #4a5568;
  margin-bottom: 1.5rem;
}

.policy-list {
  font-size: 1.1rem;
  line-height: 1.7;
  color: #4a5568;
  margin-bottom: 1.5rem;
  padding-left: 1.5rem;
}

.policy-list li {
  margin-bottom: 0.75rem;
}

.contact-box {
  background: #f8f9ff;
  padding: 1.5rem;
  border-radius: 8px;
  border-left: 4px solid #007bff;
  margin-top: 1rem;
}

.contact-box p {
  color: #4a5568;
  font-size: 0.95rem;
}

@media (max-width: 767.98px) {
  .policy-page {
    padding: 2rem 0;
  }
  
  .policy-section {
    padding: 1.5rem;
  }
  
  .policy-text,
  .policy-list {
    font-size: 1rem;
  }
}
</style>
