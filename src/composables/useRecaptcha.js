/**
 * Vue composable for Google reCAPTCHA v3
 */
import { ref, onMounted } from 'vue'

export function useRecaptcha() {
  const isLoaded = ref(false)
  const isLoading = ref(false)
  
  // This should match your reCAPTCHA site key
  const siteKey = '6LfQvXArAAAAAEc6eycVp2Bkq6FfCVW0RUg2lOQf'
  const actionName = 'contact' // Must match backend expectation
  
  /**
   * Wait for reCAPTCHA to be loaded
   */
  const waitForRecaptcha = () => {
    return new Promise((resolve) => {
      if (window.grecaptcha && window.grecaptcha.ready) {
        window.grecaptcha.ready(() => {
          isLoaded.value = true
          resolve(true)
        })
      } else {
        // Poll for reCAPTCHA to be available
        const checkRecaptcha = () => {
          if (window.grecaptcha && window.grecaptcha.ready) {
            window.grecaptcha.ready(() => {
              isLoaded.value = true
              resolve(true)
            })
          } else {
            setTimeout(checkRecaptcha, 100)
          }
        }
        checkRecaptcha()
      }
    })
  }
  
  /**
   * Execute reCAPTCHA and get token
   */
  const executeRecaptcha = async (action = actionName) => {
    if (!isLoaded.value) {
      await waitForRecaptcha()
    }
    
    try {
      isLoading.value = true
      const token = await window.grecaptcha.execute(siteKey, { action })
      return token
    } catch (error) {
      console.error('reCAPTCHA execution failed:', error)
      throw error
    } finally {
      isLoading.value = false
    }
  }
  
  /**
   * Get reCAPTCHA token for form submission
   */
  const getToken = async () => {
    try {
      return await executeRecaptcha()
    } catch (error) {
      console.error('Failed to get reCAPTCHA token:', error)
      return null
    }
  }
  
  // Initialize on mount
  onMounted(() => {
    waitForRecaptcha()
  })
  
  return {
    isLoaded,
    isLoading,
    getToken,
    executeRecaptcha
  }
}
