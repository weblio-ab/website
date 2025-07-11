<template>
  <div class="policy-page">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-lg-8">
          <!-- Header -->
          <div class="policy-header text-center mb-5">
            <h1 class="display-4 fw-bold mb-3">{{ $t('pages.cookies.title') }}</h1>
            <p class="lead text-muted">{{ $t('pages.cookies.subtitle') }}</p>
            <p class="text-muted small">
              {{ $t('common.lastUpdated') }}: {{ $t('pages.cookies.lastUpdated') }}
            </p>
          </div>

          <!-- What are cookies -->
          <section class="policy-section mb-5">
            <h2 class="h3 fw-bold mb-3">{{ $t('pages.cookies.sections.what.title') }}</h2>
            <p class="policy-text">{{ $t('pages.cookies.sections.what.content') }}</p>
          </section>

          <!-- Types of cookies -->
          <section class="policy-section mb-5">
            <h2 class="h3 fw-bold mb-3">{{ $t('pages.cookies.sections.types.title') }}</h2>
            <p class="policy-text">{{ $t('pages.cookies.sections.types.content') }}</p>
            <ul class="policy-list">
              <li v-for="item in typesList" :key="item">
                {{ item }}
              </li>
            </ul>
          </section>

          <!-- Purpose -->
          <section class="policy-section mb-5">
            <h2 class="h3 fw-bold mb-3">{{ $t('pages.cookies.sections.purpose.title') }}</h2>
            <p class="policy-text">{{ $t('pages.cookies.sections.purpose.content') }}</p>
            <ul class="policy-list">
              <li v-for="item in purposeList" :key="item">
                {{ item }}
              </li>
            </ul>
          </section>

          <!-- Third Party -->
          <section class="policy-section mb-5">
            <h2 class="h3 fw-bold mb-3">{{ $t('pages.cookies.sections.thirdParty.title') }}</h2>
            <p class="policy-text">{{ $t('pages.cookies.sections.thirdParty.content') }}</p>
          </section>

          <!-- Control -->
          <section class="policy-section mb-5">
            <h2 class="h3 fw-bold mb-3">{{ $t('pages.cookies.sections.control.title') }}</h2>
            <p class="policy-text">{{ $t('pages.cookies.sections.control.content') }}</p>
            
            <div class="browser-instructions mt-4">
              <h4 class="h6 fw-bold mb-3">Så här hanterar du cookies i olika webbläsare:</h4>
              <div class="row g-3">
                <div class="col-md-6">
                  <div class="browser-card">
                    <h5 class="h6 fw-bold mb-2">
                      <i class="bi bi-browser-chrome me-2"></i>
                      Chrome
                    </h5>
                    <p class="small">Inställningar → Sekretess och säkerhet → Cookies och andra webbplatsdata</p>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="browser-card">
                    <h5 class="h6 fw-bold mb-2">
                      <i class="bi bi-browser-firefox me-2"></i>
                      Firefox
                    </h5>
                    <p class="small">Inställningar → Sekretess och säkerhet → Cookies och webbplatsdata</p>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="browser-card">
                    <h5 class="h6 fw-bold mb-2">
                      <i class="bi bi-browser-safari me-2"></i>
                      Safari
                    </h5>
                    <p class="small">Inställningar → Sekretess → Hantera webbplatsdata</p>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="browser-card">
                    <h5 class="h6 fw-bold mb-2">
                      <i class="bi bi-browser-edge me-2"></i>
                      Edge
                    </h5>
                    <p class="small">Inställningar → Cookies och webbplatsbehörigheter → Cookies och lagrade data</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <!-- Changes -->
          <section class="policy-section mb-5">
            <h2 class="h3 fw-bold mb-3">{{ $t('pages.cookies.sections.changes.title') }}</h2>
            <p class="policy-text">{{ $t('pages.cookies.sections.changes.content') }}</p>
          </section>

          <!-- Contact -->
          <section class="policy-section mb-5">
            <h2 class="h3 fw-bold mb-3">{{ $t('footer.contact') }}</h2>
            <p class="policy-text">Om du har frågor om vår användning av cookies, kontakta oss:</p>
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
import { useSEO } from '../composables/useSEO'

const { tm, t } = useI18n()

// SEO configuration för cookie-policy
useSEO({
  title: 'Cookie-policy - Weblio',
  description: 'Information om hur Weblio använder cookies för att förbättra användarupplevelsen. Läs om olika typer av cookies och hur du kan hantera dem.',
  keywords: 'cookies, cookie-policy, kakor, webbkakor, analytics, GDPR, weblio',
  type: 'article'
})

// Get arrays from i18n using tm()
const typesList = computed(() => tm('pages.cookies.sections.types.list'))
const purposeList = computed(() => tm('pages.cookies.sections.purpose.list'))

onMounted(() => {
  document.title = `Cookie-policy - Weblio`
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

.browser-instructions {
  background: #f8f9ff;
  padding: 1.5rem;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
}

.browser-card {
  background: white;
  padding: 1rem;
  border-radius: 6px;
  border: 1px solid #e2e8f0;
  height: 100%;
}

.browser-card i {
  color: #007bff;
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
  
  .browser-instructions {
    padding: 1rem;
  }
  
  .browser-card {
    padding: 0.75rem;
  }
}
</style>
