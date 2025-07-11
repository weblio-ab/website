<template>
  <div class="email-helper">
    <div class="email-helper-card">
      <div class="email-helper-header">
        <i class="bi bi-lightbulb text-warning me-2"></i>
        <h6 class="mb-0">{{ $t('guides.emailSetup.helper.title') }}</h6>
      </div>
      <p class="email-helper-description">{{ $t('guides.emailSetup.helper.description') }}</p>
      <div class="email-input-group">
        <div class="input-group">
          <span class="input-group-text">
            <i class="bi bi-envelope"></i>
          </span>
          <input 
            v-model="localEmail"
            type="email" 
            class="form-control"
            :placeholder="$t('guides.emailSetup.helper.placeholder')"
            @input="handleEmailInput"
          >
          <button 
            v-if="localEmail" 
            class="btn btn-outline-secondary" 
            type="button"
            @click="clearEmail"
          >
            <i class="bi bi-x"></i>
          </button>
        </div>
        <div v-if="emailInfo.domain" class="email-info">
          <small class="text-success">
            <i class="bi bi-check-circle me-1"></i>
            {{ $t('guides.emailSetup.helper.detected', { domain: emailInfo.domain }) }}
          </small>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useEmailConfig } from '../../composables/useEmailConfig'

const { t } = useI18n()
const { validateEmailAndDomain } = useEmailConfig()

// Props
const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  }
})

// Emits
const emit = defineEmits(['update:modelValue', 'emailInfo'])

// Local state
const localEmail = ref(props.modelValue)
const emailInfo = ref({
  domain: '',
  username: '',
  incomingServer: '',
  outgoingServer: ''
})

// Watch for prop changes
watch(() => props.modelValue, (newValue) => {
  localEmail.value = newValue
})

// Methods
function handleEmailInput() {
  emit('update:modelValue', localEmail.value)
  extractEmailInfo()
}

function extractEmailInfo() {
  if (!localEmail.value) {
    emailInfo.value = {
      domain: '',
      username: '',
      incomingServer: '',
      outgoingServer: ''
    }
    emit('emailInfo', emailInfo.value)
    return
  }

  // Use the same validation logic as EmailConfigGenerator
  const { isValid, domain } = validateEmailAndDomain(localEmail.value)
  
  if (isValid && domain) {
    const [username] = localEmail.value.split('@')
    emailInfo.value = {
      domain,
      username,
      incomingServer: `mail.${domain}`,
      outgoingServer: `mail.${domain}`
    }
  } else {
    emailInfo.value = {
      domain: '',
      username: '',
      incomingServer: '',
      outgoingServer: ''
    }
  }
  
  emit('emailInfo', emailInfo.value)
}

function clearEmail() {
  localEmail.value = ''
  handleEmailInput()
}

// Initialize email info on mount
extractEmailInfo()
</script>

<style scoped>
.email-helper {
  margin-bottom: 2rem;
}

.email-helper-card {
  background: #fff3cd;
  border: 1px solid #ffeaa7;
  border-radius: 8px;
  padding: 1.25rem;
}

.email-helper-header {
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;
}

.email-helper-header h6 {
  color: #856404;
  font-weight: 600;
}

.email-helper-description {
  color: #856404;
  margin-bottom: 1rem;
  font-size: 0.9rem;
  line-height: 1.4;
}

.email-input-group {
  max-width: 400px;
}

.email-info {
  margin-top: 0.5rem;
}
</style>
