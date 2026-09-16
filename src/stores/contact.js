import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRecaptcha } from '../composables/useRecaptcha'

const EMPTY_FORM = Object.freeze({
  name: '',
  email: '',
  phone: '',
  company: '',
  message: '',
})

function normalizeFieldErrors(inputErrors) {
  const normalized = {}

  if (!inputErrors || typeof inputErrors !== 'object') {
    return normalized
  }

  Object.entries(inputErrors).forEach(([key, value]) => {
    if (Array.isArray(value) && value.length > 0) {
      normalized[key] = String(value[0])
      return
    }

    if (typeof value === 'string') {
      normalized[key] = value
      return
    }

    if (value && typeof value === 'object') {
      if (typeof value.message === 'string') {
        normalized[key] = value.message
        return
      }

      if (Array.isArray(value.errors) && value.errors.length > 0) {
        normalized[key] = String(value.errors[0])
      }
    }
  })

  return normalized
}

export const useContactStore = defineStore('contact', () => {
  const { t } = useI18n()
  const { getToken: getRecaptchaToken } = useRecaptcha()

  const isSubmittingForm = ref(false)
  const formSubmissionStatus = ref(null)
  const formSubmissionMessage = ref('')
  const fieldErrors = ref({})
  const lastSubmissionAttempt = ref(0)
  const pendingIdempotencyKey = ref(null)
  const contactForm = ref({ ...EMPTY_FORM })

  function resetContactFields() {
    contactForm.value = { ...EMPTY_FORM }
    fieldErrors.value = {}
  }

  function resetContactForm() {
    resetContactFields()
    formSubmissionStatus.value = null
    formSubmissionMessage.value = ''
  }

  function clearFormStatus() {
    formSubmissionStatus.value = null
    formSubmissionMessage.value = ''
  }

  function createIdempotencyKey() {
    if (typeof crypto !== 'undefined' && crypto.randomUUID) {
      return crypto.randomUUID()
    }

    return `contact-form-${Date.now()}-${Math.random().toString(16).slice(2)}`
  }

  function getRequiresRecaptcha() {
    return String(import.meta.env.VITE_FORM_PROXY_RECAPTCHA_REQUIRED ?? 'false').toLowerCase() === 'true'
  }

  function getFormProxyUrl() {
    const baseUrl = (import.meta.env.VITE_FORM_PROXY_URL || 'https://forms.weblio.se').replace(/\/$/, '')
    const formId = (import.meta.env.VITE_FORM_PROXY_ID || '').trim()

    if (!formId) {
      throw new Error('Form proxy configuration is missing')
    }

    return `${baseUrl}/api/v1/forms/${formId}/submissions`
  }

  async function submitContactForm() {
    if (isSubmittingForm.value) return

    const now = Date.now()
    if (now - lastSubmissionAttempt.value < 1000) {
      formSubmissionStatus.value = 'error'
      formSubmissionMessage.value = t('contact.form.rateLimitError') || 'Please wait a moment before trying again.'
      return
    }

    isSubmittingForm.value = true
    clearFormStatus()
    fieldErrors.value = {}
    lastSubmissionAttempt.value = now

    const idempotencyKey = pendingIdempotencyKey.value || createIdempotencyKey()
    pendingIdempotencyKey.value = idempotencyKey

    try {

      const formData = new FormData()

      Object.entries(contactForm.value).forEach(([key, value]) => {
        if (value === null || value === undefined || value === '') {
          return
        }

        formData.append(`fields[${key}]`, String(value))
      })

      if (getRequiresRecaptcha()) {
        const recaptchaToken = await getRecaptchaToken()

        if (!recaptchaToken) {
          throw new Error('Failed to get reCAPTCHA token')
        }

        formData.append('recaptchaToken', recaptchaToken)
      }

      const response = await fetch(getFormProxyUrl(), {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json',
          'Idempotency-Key': idempotencyKey,
        },
      })

      const payload = await response.json().catch(() => null)

      if (response.ok) {
        formSubmissionStatus.value = 'success'
        formSubmissionMessage.value = payload?.message || t('contact.form.success')
        resetContactFields()
        pendingIdempotencyKey.value = null
        return
      }

      if (response.status === 400 || response.status === 403 || response.status === 413 || response.status === 415 || response.status === 422) {
        fieldErrors.value = normalizeFieldErrors(payload?.errors)
        pendingIdempotencyKey.value = null
        formSubmissionStatus.value = 'error'
        formSubmissionMessage.value = t('contact.form.validationError')
        return
      }

      if (response.status === 409) {
        if (payload?.error === 'idempotency_in_progress') {
          formSubmissionStatus.value = 'error'
          formSubmissionMessage.value = payload?.message || 'Your message is already being processed. Please wait a moment and try again.'
          return
        }

        pendingIdempotencyKey.value = null
        formSubmissionStatus.value = 'error'
        formSubmissionMessage.value = payload?.message || t('contact.form.serverError')
        return
      }

      if (response.status === 429) {
        formSubmissionStatus.value = 'error'
        formSubmissionMessage.value = t('contact.form.rateLimitError') || 'Too many attempts. Please wait a moment and try again.'
        return
      }

      formSubmissionStatus.value = 'error'
      formSubmissionMessage.value = payload?.message || t('contact.form.serverError')
    } catch (error) {
      console.error('Form submission failed:', error)
      formSubmissionStatus.value = 'error'
      formSubmissionMessage.value = t('contact.form.networkError')
    } finally {
      isSubmittingForm.value = false
    }
  }

  return {
    isSubmittingForm,
    contactForm,
    formSubmissionStatus,
    formSubmissionMessage,
    fieldErrors,
    resetContactForm,
    clearFormStatus,
    submitContactForm,
  }
})
