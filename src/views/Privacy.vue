<template>
  <div class="policy-page">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-lg-8">
          <!-- Header -->
          <div class="policy-header text-center mb-5">
            <h1 class="display-4 fw-bold mb-3">{{ $t('pages.privacy.title') }}</h1>
            <p class="lead text-muted">{{ $t('pages.privacy.subtitle') }}</p>
            <p class="text-muted small">
              {{ $t('common.lastUpdated') }}: {{ $t('pages.privacy.lastUpdated') }}
            </p>
          </div>

          <!-- Introduction -->
          <section class="policy-section mb-5">
            <h2 class="h3 fw-bold mb-3">{{ $t('pages.privacy.sections.introduction.title') }}</h2>
            <p class="policy-text">{{ $t('pages.privacy.sections.introduction.content') }}</p>
          </section>

          <!-- Data Controller -->
          <section class="policy-section mb-5">
            <h2 class="h3 fw-bold mb-3">{{ $t('pages.privacy.sections.dataController.title') }}</h2>
            <p class="policy-text">{{ $t('pages.privacy.sections.dataController.content') }}</p>
            <div class="contact-box">
              <p class="mb-2"><strong>{{ $t('company.name') }}</strong></p>
              <p class="mb-1">{{ $t('company.address') }}</p>
              <p class="mb-1">E-post: <EmailObfuscate :email="$t('company.email')" /></p>
              <p class="mb-0">Telefon: <PhoneObfuscate :phone="$t('company.phone')" /></p>
            </div>
          </section>

          <!-- Data Collection -->
          <section class="policy-section mb-5">
            <h2 class="h3 fw-bold mb-3">{{ $t('pages.privacy.sections.dataCollection.title') }}</h2>
            <p class="policy-text">{{ $t('pages.privacy.sections.dataCollection.content') }}</p>
            <ul class="policy-list">
              <li v-for="item in dataCollectionList" :key="item">
                {{ item }}
              </li>
            </ul>
          </section>

          <!-- Data Use -->
          <section class="policy-section mb-5">
            <h2 class="h3 fw-bold mb-3">{{ $t('pages.privacy.sections.dataUse.title') }}</h2>
            <p class="policy-text">{{ $t('pages.privacy.sections.dataUse.content') }}</p>
            <ul class="policy-list">
              <li v-for="item in dataUseList" :key="item">
                {{ item }}
              </li>
            </ul>
          </section>

          <!-- Legal Basis -->
          <section class="policy-section mb-5">
            <h2 class="h3 fw-bold mb-3">{{ $t('pages.privacy.sections.legalBasis.title') }}</h2>
            <p class="policy-text">{{ $t('pages.privacy.sections.legalBasis.content') }}</p>
            <ul class="policy-list">
              <li v-for="item in legalBasisList" :key="item">
                {{ item }}
              </li>
            </ul>
          </section>

          <!-- Data Sharing -->
          <section class="policy-section mb-5">
            <h2 class="h3 fw-bold mb-3">{{ $t('pages.privacy.sections.dataSharing.title') }}</h2>
            <p class="policy-text">{{ $t('pages.privacy.sections.dataSharing.content') }}</p>
          </section>

          <!-- Data Retention -->
          <section class="policy-section mb-5">
            <h2 class="h3 fw-bold mb-3">{{ $t('pages.privacy.sections.dataRetention.title') }}</h2>
            <p class="policy-text">{{ $t('pages.privacy.sections.dataRetention.content') }}</p>
          </section>

          <!-- Your Rights -->
          <section class="policy-section mb-5">
            <h2 class="h3 fw-bold mb-3">{{ $t('pages.privacy.sections.yourRights.title') }}</h2>
            <p class="policy-text">{{ $t('pages.privacy.sections.yourRights.content') }}</p>
            <ul class="policy-list">
              <li v-for="item in yourRightsList" :key="item">
                {{ item }}
              </li>
            </ul>
          </section>

          <!-- Security -->
          <section class="policy-section mb-5">
            <h2 class="h3 fw-bold mb-3">{{ $t('pages.privacy.sections.security.title') }}</h2>
            <p class="policy-text">{{ $t('pages.privacy.sections.security.content') }}</p>
          </section>

          <!-- Cookies -->
          <section class="policy-section mb-5">
            <h2 class="h3 fw-bold mb-3">{{ $t('pages.privacy.sections.cookies.title') }}</h2>
            <p class="policy-text">{{ $t('pages.privacy.sections.cookies.content') }}</p>
          </section>

          <!-- Changes -->
          <section class="policy-section mb-5">
            <h2 class="h3 fw-bold mb-3">{{ $t('pages.privacy.sections.changes.title') }}</h2>
            <p class="policy-text">{{ $t('pages.privacy.sections.changes.content') }}</p>
          </section>

          <!-- Contact -->
          <section class="policy-section mb-5">
            <h2 class="h3 fw-bold mb-3">{{ $t('pages.privacy.sections.contact.title') }}</h2>
            <p class="policy-text">{{ $t('pages.privacy.sections.contact.content') }}</p>
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
const dataCollectionList = computed(() => tm('pages.privacy.sections.dataCollection.list'))
const dataUseList = computed(() => tm('pages.privacy.sections.dataUse.list'))
const legalBasisList = computed(() => tm('pages.privacy.sections.legalBasis.list'))
const yourRightsList = computed(() => tm('pages.privacy.sections.yourRights.list'))

onMounted(() => {
  document.title = `Integritetspolicy - Weblio`
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
