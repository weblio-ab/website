export function useEmailConfig() {

  /**
   * Validerar e-postadress och extraherar domän
   */
  function validateEmailAndDomain(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return { isValid: false, domain: null }
    }
    
    const domain = email.split('@')[1]
    return { isValid: true, domain }
  }

  return {
    validateEmailAndDomain
  }
}
