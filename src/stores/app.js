import { defineStore } from 'pinia'
import { ref, onMounted, onUnmounted } from 'vue'
import { useRecaptcha } from '../composables/useRecaptcha'

export const useAppStore = defineStore('app', () => {
  // Composables
  const { getToken: getRecaptchaToken } = useRecaptcha()
  
  // State
  const locale = ref('sv')
  const isMenuOpen = ref(false)
  const activeSection = ref('home')
  const showBackToTop = ref(false)
  const isSubmittingForm = ref(false)
  const isLoading = ref(true)
  const formSubmissionStatus = ref(null) // 'success', 'error', or null
  const formSubmissionMessage = ref('')
  const contactForm = ref({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: '',
    website: '', // Honeypot field
    form_timestamp: Math.floor(Date.now() / 1000) // Timing check
  })

  // Actions
  function setLocale(newLocale) {
    locale.value = newLocale
  }

  function toggleMenu() {
    isMenuOpen.value = !isMenuOpen.value
  }

  function closeMenu() {
    isMenuOpen.value = false
  }

  function resetContactForm() {
    contactForm.value = {
      name: '',
      email: '',
      phone: '',
      company: '',
      message: '',
      website: '', // Honeypot field
      form_timestamp: Math.floor(Date.now() / 1000) // Reset timestamp for new form
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
      
      // Prepare form data with reCAPTCHA token
      const formData = {
        ...contactForm.value,
        recaptcha_token: recaptchaToken
      }
      
      // Remove old CAPTCHA fields if present
      delete formData.captcha_answer
      delete formData.captcha_session
      
      const response = await fetch('/api/contact.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      })
      
      const result = await response.json()
      
      if (response.ok && result.success) {
        // Success
        formSubmissionStatus.value = 'success'
        formSubmissionMessage.value = result.message || 'Tack för ditt meddelande! Vi återkommer inom 24 timmar.'
        resetContactForm()
      } else {
        // Handle API errors
        console.error('API Error:', result)
        formSubmissionStatus.value = 'error'
        
        if (result.details && Array.isArray(result.details)) {
          formSubmissionMessage.value = result.details.join(', ')
        } else if (result.error) {
          formSubmissionMessage.value = result.error
        } else {
          formSubmissionMessage.value = 'Ett fel uppstod. Försök igen senare.'
        }
      }
    } catch (error) {
      console.error('Network Error:', error)
      formSubmissionStatus.value = 'error'
      formSubmissionMessage.value = 'Det gick inte att skicka meddelandet. Kontrollera din internetanslutning och försök igen.'
    } finally {
      isSubmittingForm.value = false
    }
  }

  function handleScroll() {
    // Show/hide back to top button
    showBackToTop.value = window.scrollY > 500

    // Update active section for navigation
    const sections = ['home', 'services', 'portfolio', 'pricing', 'about', 'contact']
    const scrollPosition = window.scrollY + 100

    for (const section of sections) {
      const element = document.getElementById(section)
      if (element) {
        const offsetTop = element.offsetTop
        const offsetBottom = offsetTop + element.offsetHeight

        if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
          activeSection.value = section
          break
        }
      }
    }
  }

  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  function initScrollListener() {
    window.addEventListener('scroll', handleScroll)
    handleScroll() // Initial call
    
    // Hide loading after a short delay
    setTimeout(() => {
      isLoading.value = false
    }, 1000)
  }

  function removeScrollListener() {
    window.removeEventListener('scroll', handleScroll)
  }

  onMounted(() => {
    initScrollListener()
  })

  onUnmounted(() => {
    removeScrollListener()
  })

  return {
    // State
    locale,
    isMenuOpen,
    activeSection,
    showBackToTop,
    isSubmittingForm,
    isLoading,
    contactForm,
    formSubmissionStatus,
    formSubmissionMessage,
    
    // Actions
    setLocale,
    toggleMenu,
    closeMenu,
    resetContactForm,
    clearFormStatus,
    submitContactForm,
    scrollToTop,
    initScrollListener,
    removeScrollListener
  }
})
