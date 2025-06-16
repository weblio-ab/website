import { defineStore } from 'pinia'
import { ref, onMounted, onUnmounted } from 'vue'

export const useAppStore = defineStore('app', () => {
  // State
  const locale = ref('sv')
  const isMenuOpen = ref(false)
  const activeSection = ref('home')
  const showBackToTop = ref(false)
  const isSubmittingForm = ref(false)
  const isLoading = ref(true)
  const contactForm = ref({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: ''
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
      message: ''
    }
  }

  function submitContactForm() {
    // Här kan ni integrera med er backend eller e-posttjänst
    isSubmittingForm.value = true
    
    // Simulera API-anrop
    setTimeout(() => {
      console.log('Contact form submitted:', contactForm.value)
      
      // Simulera framgångsrik skickande
      alert('Tack för ditt meddelande! Vi återkommer inom 24 timmar.')
      resetContactForm()
      isSubmittingForm.value = false
    }, 2000)
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
    
    // Actions
    setLocale,
    toggleMenu,
    closeMenu,
    resetContactForm,
    submitContactForm,
    scrollToTop,
    initScrollListener,
    removeScrollListener
  }
})
