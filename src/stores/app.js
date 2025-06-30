import { defineStore } from 'pinia'
import { ref, onMounted, onUnmounted } from 'vue'

export const useAppStore = defineStore('app', () => {
  // State
  const locale = ref('sv')
  const isMenuOpen = ref(false)
  const activeSection = ref('home')
  const showBackToTop = ref(false)
  const isLoading = ref(true)

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
    isLoading,
    
    // Actions
    setLocale,
    toggleMenu,
    closeMenu,
    scrollToTop,
    initScrollListener,
    removeScrollListener
  }
})
