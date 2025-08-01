import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRecaptcha } from '../composables/useRecaptcha'

export const useContactStore = defineStore('contact', () => {
  // Composables
  const { t } = useI18n()
  const { getToken: getRecaptchaToken } = useRecaptcha()
  
  // State
  const isSubmittingForm = ref(false)
  const formSubmissionStatus = ref(null) // 'success', 'error', or null
  const formSubmissionMessage = ref('')
  const contactForm = ref({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: '',
  })

  // Actions
  function resetContactForm() {
    contactForm.value = {
      name: '',
      email: '',
      phone: '',
      company: '',
      message: '',
    }
    formSubmissionStatus.value = null
    formSubmissionMessage.value = ''
  }

  function clearFormStatus() {
    formSubmissionStatus.value = null
    formSubmissionMessage.value = ''
  }

  async function submitContactForm() {
    if (isSubmittingForm.value) return
    
    isSubmittingForm.value = true
    clearFormStatus()
    
    try {
      // Get reCAPTCHA token
      const recaptchaToken = await getRecaptchaToken()
      
      if (!recaptchaToken) {
        throw new Error('Failed to get reCAPTCHA token')
      }
      
      // Prepare form data in the format expected by the backend
      const formData = new FormData()
      formData.append('properties[name]', contactForm.value.name)
      formData.append('properties[email]', contactForm.value.email)
      formData.append('properties[phone]', contactForm.value.phone)
      formData.append('properties[company]', contactForm.value.company)
      formData.append('properties[message]', contactForm.value.message)
      formData.append('recaptcha_token', recaptchaToken)
      
      // Get API base URL from environment variable
      const apiEndpoint = `${import.meta.env.VITE_FORM_SERVICE_URL}/submit/${import.meta.env.VITE_FORM_SERVICE_CUSTOMER_ID}/${import.meta.env.VITE_FORM_SERVICE_FORM_IDENTIFIER}`
      
      const response = await fetch(apiEndpoint, {
        method: 'POST',
        body: formData
      })
      
      if (response.ok) {
        // Success (200)
        formSubmissionStatus.value = 'success'
        formSubmissionMessage.value = t('contact.form.success')
        resetContactForm()
      } else if (response.status === 400) {
        // Validation error
        formSubmissionStatus.value = 'error'
        formSubmissionMessage.value = t('contact.form.validationError')
      } else {
        // Server error (500) or other errors
        formSubmissionStatus.value = 'error'
        formSubmissionMessage.value = t('contact.form.serverError')
      }
    } catch (error) {
      console.error('Network Error:', error)
      formSubmissionStatus.value = 'error'
      formSubmissionMessage.value = t('contact.form.networkError')
    } finally {
      isSubmittingForm.value = false
    }
  }

  return {
    // State
    isSubmittingForm,
    contactForm,
    formSubmissionStatus,
    formSubmissionMessage,
    
    // Actions
    resetContactForm,
    clearFormStatus,
    submitContactForm
  }
})
