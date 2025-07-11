<template>
  <div class="email-config-generator">
    <div class="config-header text-center mb-4">
      <i class="bi bi-phone text-primary" style="font-size: 3rem;"></i>
      <h3 class="mt-3">{{ $t('guides.emailConfig.title') }}</h3>
      <p class="text-muted">{{ $t('guides.emailConfig.subtitle') }}</p>
    </div>

    <div class="config-form">
      <div class="mb-3">
        <label for="email" class="form-label">{{ $t('guides.emailConfig.emailLabel') }}</label>
        <input
          id="email"
          v-model="email"
          type="email"
          class="form-control"
          :class="{ 'is-invalid': emailError }"
          :placeholder="$t('guides.emailConfig.emailPlaceholder')"
          @input="validateEmail"
        >
        <div v-if="emailError" class="invalid-feedback">
          {{ emailError }}
        </div>
        <div v-if="domain && !emailError" class="form-text text-success">
          <i class="bi bi-check-circle me-1"></i>
          {{ $t('guides.emailConfig.domainDetected', { domain }) }}
        </div>
      </div>

      <div class="config-actions">
        <button
          type="button"
          class="btn btn-primary"
          :disabled="!canGenerate || isGenerating"
          @click="generateAndDownload"
        >
          <span v-if="isGenerating" class="spinner-border spinner-border-sm me-2"></span>
          <i v-else class="bi bi-download me-2"></i>
          {{ $t('guides.emailConfig.downloadButton') }}
        </button>
      </div>
    </div>

    <!-- Instruktioner -->
    <div class="installation-instructions mt-4 p-3 bg-light rounded">
      <h6 class="mb-3">
        <i class="bi bi-info-circle text-primary me-2"></i>
        {{ $t('guides.emailConfig.instructions.title') }}
      </h6>
      <ol class="mb-0">
        <li>{{ $t('guides.emailConfig.instructions.step1') }}</li>
        <li>{{ $t('guides.emailConfig.instructions.step2') }}</li>
        <li>{{ $t('guides.emailConfig.instructions.step3') }}</li>
        <li>{{ $t('guides.emailConfig.instructions.step4') }}</li>
      </ol>
    </div>

    <!-- Varning -->
    <div class="guide-alert warning mt-3">
      <i class="bi bi-exclamation-triangle guide-alert-icon"></i>
      {{ $t('guides.emailConfig.passwordWarning') }}
    </div>

    <!-- Tips -->
    <div class="guide-alert info mt-3">
      <i class="bi bi-lightbulb guide-alert-icon"></i>
      {{ $t('guides.emailConfig.tip') }}
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useEmailConfig } from '../../composables/useEmailConfig'

// Props
const props = defineProps({
  userEmail: {
    type: String,
    default: ''
  },
  emailInfo: {
    type: Object,
    default: () => ({
      domain: '',
      username: '',
      incomingServer: '',
      outgoingServer: ''
    })
  }
})

const { t } = useI18n()
const { isGenerating, downloadConfig, validateEmailAndDomain } = useEmailConfig()

// State
const email = ref(props.userEmail || '')
const emailError = ref('')
const domain = ref(props.emailInfo.domain || '')

// Server settings med standardvärden
const serverSettings = ref({
  incomingMailServer: '',
  outgoingMailServer: '',
  incomingPort: 993,
  outgoingPort: 587,
  incomingUseSSL: true,
  outgoingUseSSL: true
})

// Computed
const canGenerate = computed(() => {
  return email.value && domain.value && !emailError.value
})

// Watchers
watch(domain, (newDomain) => {
  if (newDomain) {
    serverSettings.value.incomingMailServer = `mail.${newDomain}`
    serverSettings.value.outgoingMailServer = `mail.${newDomain}`
  }
})

// Watchers for props
watch(() => props.userEmail, (newEmail) => {
  if (newEmail) {
    email.value = newEmail
    validateEmail()
  }
}, { immediate: true })

watch(() => props.emailInfo, (newEmailInfo) => {
  if (newEmailInfo.domain) {
    domain.value = newEmailInfo.domain
    serverSettings.value.incomingMailServer = newEmailInfo.incomingServer || `mail.${newEmailInfo.domain}`
    serverSettings.value.outgoingMailServer = newEmailInfo.outgoingServer || `mail.${newEmailInfo.domain}`
  }
}, { deep: true, immediate: true })

// Methods
function validateEmail() {
  emailError.value = ''
  domain.value = ''

  if (!email.value) {
    return
  }

  const { isValid, domain: extractedDomain } = validateEmailAndDomain(email.value)
  
  if (!isValid) {
    emailError.value = t('guides.emailConfig.invalidEmail')
    return
  }

  domain.value = extractedDomain
}

async function generateAndDownload() {
  if (!canGenerate.value) return

  try {
    await downloadConfig(email.value, domain.value, serverSettings.value)
    
    // Visa success meddelande eller notification
    console.log('Konfigurationsfil nedladdad framgångsrikt')
  } catch (error) {
    console.error('Fel vid nedladdning:', error)
    // Här kan du visa ett felmeddelande till användaren
  }
}
</script>

<style scoped>
.email-config-generator {
  max-width: 600px;
  margin: 0 auto;
  padding: 2rem;
}

.config-header i {
  color: #007bff !important;
}

.config-form {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  border: 1px solid #e9ecef;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.advanced-settings {
  background: #f8f9fa;
  border-color: #dee2e6 !important;
}

.config-actions {
  margin-top: 1.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid #e9ecef;
}

.installation-instructions {
  background: #f8f9fa !important;
}

.installation-instructions ol {
  margin-bottom: 0;
  padding-left: 1.5rem;
}

.installation-instructions li {
  margin-bottom: 0.5rem;
  line-height: 1.5;
}

.guide-alert {
  padding: 1rem;
  border-radius: 0.5rem;
  border-left: 4px solid;
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
}

.guide-alert.info {
  background-color: #e7f3ff;
  border-left-color: #0ea5e9;
  color: #0369a1;
}

.guide-alert.warning {
  background-color: #fffbeb;
  border-left-color: #f59e0b;
  color: #92400e;
}

.guide-alert-icon {
  font-size: 1.25rem;
  margin-top: 0.125rem;
  flex-shrink: 0;
}

@media (max-width: 767.98px) {
  .email-config-generator {
    padding: 1rem;
  }
  
  .config-form {
    padding: 1.5rem;
  }
  
  .config-actions {
    flex-direction: column;
    gap: 1rem;
  }
  
  .config-actions button {
    width: 100%;
  }
}
</style>
