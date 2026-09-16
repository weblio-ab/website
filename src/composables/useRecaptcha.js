/**
 * Vue composable for Google reCAPTCHA v3
 */
import { ref, onMounted } from 'vue'

export function useRecaptcha() {
  const isLoaded = ref(false)
  const isLoading = ref(false)
  const actionName = 'form_submission'
  const siteKey = (import.meta.env.VITE_RECAPTCHA_SITE_KEY || '').trim()
  const isEnabled = Boolean(siteKey) && String(import.meta.env.VITE_FORM_PROXY_RECAPTCHA_REQUIRED ?? 'false').toLowerCase() === 'true'

  const waitForRecaptcha = () => {
    return new Promise((resolve) => {
      if (!isEnabled || !window.grecaptcha || !window.grecaptcha.ready) {
        resolve(false)
        return
      }

      window.grecaptcha.ready(() => {
        isLoaded.value = true
        resolve(true)
      })
    })
  }

  const executeRecaptcha = async (action = actionName) => {
    if (!isEnabled || !siteKey) {
      return null
    }

    if (!isLoaded.value) {
      await waitForRecaptcha()
    }

    try {
      isLoading.value = true

      if (!window.grecaptcha || !window.grecaptcha.execute) {
        return null
      }

      const token = await window.grecaptcha.execute(siteKey, { action })
      return token
    } catch (error) {
      console.error('reCAPTCHA execution failed:', error)
      throw error
    } finally {
      isLoading.value = false
    }
  }

  const getToken = async () => {
    try {
      return await executeRecaptcha()
    } catch (error) {
      console.error('Failed to get reCAPTCHA token:', error)
      return null
    }
  }

  onMounted(() => {
    if (isEnabled) {
      waitForRecaptcha()
    }
  })

  return {
    isLoaded,
    isLoading,
    getToken,
    executeRecaptcha,
    isEnabled,
  }
}
