import { ref } from 'vue'

export function useEmailConfig() {
  const isGenerating = ref(false)

  /**
   * Genererar en .mobileconfig fil för iPhone e-postinställningar
   * @param {string} email - Användarens e-postadress
   * @param {string} domain - Domänen (hämtas från e-postadressen)
   * @param {Object} serverSettings - Serverinställningar från Weblio
   */
  function generateMobileConfig(email, domain, serverSettings = {}) {
    // Standard serverinställningar för Weblio-kunder
    const defaultSettings = {
      incomingMailServer: `mail.${domain}`,
      outgoingMailServer: `mail.${domain}`,
      incomingPort: 993, // IMAP SSL
      outgoingPort: 587, // SMTP TLS
      incomingServerType: 'IMAP',
      incomingUseSSL: true,
      outgoingUseSSL: true,
      outgoingAuthRequired: true,
      ...serverSettings
    }

    // Generera ett unikt UUID för konfigurationen
    const uuid = generateUUID()
    const payloadUUID = generateUUID()

    // XML-mall för .mobileconfig fil
    const configXML = `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
	<key>PayloadContent</key>
	<array>
		<dict>
			<key>EmailAccountDescription</key>
			<string>${email}</string>
			<key>EmailAccountName</key>
			<string>${email}</string>
			<key>EmailAccountType</key>
			<string>EmailTypeIMAP</string>
			<key>EmailAddress</key>
			<string>${email}</string>
			<key>IncomingMailServerAuthentication</key>
			<string>EmailAuthPassword</string>
			<key>IncomingMailServerHostName</key>
			<string>${defaultSettings.incomingMailServer}</string>
			<key>IncomingMailServerPortNumber</key>
			<integer>${defaultSettings.incomingPort}</integer>
			<key>IncomingMailServerUseSSL</key>
			<${defaultSettings.incomingUseSSL ? 'true' : 'false'}/>
			<key>IncomingMailServerUsername</key>
			<string>${email}</string>
			<key>OutgoingMailServerAuthentication</key>
			<string>EmailAuthPassword</string>
			<key>OutgoingMailServerHostName</key>
			<string>${defaultSettings.outgoingMailServer}</string>
			<key>OutgoingMailServerPortNumber</key>
			<integer>${defaultSettings.outgoingPort}</integer>
			<key>OutgoingMailServerUseSSL</key>
			<${defaultSettings.outgoingUseSSL ? 'true' : 'false'}/>
			<key>OutgoingMailServerUsername</key>
			<string>${email}</string>
			<key>OutgoingPasswordSameAsIncomingPassword</key>
			<true/>
			<key>PayloadDescription</key>
			<string>E-postinställningar för ${email}</string>
			<key>PayloadDisplayName</key>
			<string>${email}</string>
			<key>PayloadIdentifier</key>
			<string>com.weblio.email.${domain}</string>
			<key>PayloadType</key>
			<string>com.apple.mail.managed</string>
			<key>PayloadUUID</key>
			<string>${payloadUUID}</string>
			<key>PayloadVersion</key>
			<integer>1</integer>
			<key>PreventAppSheet</key>
			<false/>
			<key>PreventMove</key>
			<false/>
			<key>SMIMEEnabled</key>
			<false/>
		</dict>
	</array>
	<key>PayloadDescription</key>
	<string>E-postinställningar från Weblio för ${domain}</string>
	<key>PayloadDisplayName</key>
	<string>E-post - ${domain}</string>
	<key>PayloadIdentifier</key>
	<string>com.weblio.emailconfig.${domain}</string>
	<key>PayloadRemovalDisallowed</key>
	<false/>
	<key>PayloadType</key>
	<string>Configuration</string>
	<key>PayloadUUID</key>
	<string>${uuid}</string>
	<key>PayloadVersion</key>
	<integer>1</integer>
</dict>
</plist>`

    return configXML
  }

  /**
   * Laddar ner konfigurationsfilen
   */
  function downloadConfig(email, domain, serverSettings) {
    isGenerating.value = true
    
    try {
      const configXML = generateMobileConfig(email, domain, serverSettings)
      const blob = new Blob([configXML], { type: 'application/x-apple-aspen-config' })
      const url = URL.createObjectURL(blob)
      
      const link = document.createElement('a')
      link.href = url
      link.download = `${domain}-email.mobileconfig`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      
      URL.revokeObjectURL(url)
    } catch (error) {
      console.error('Fel vid generering av konfigurationsfil:', error)
      throw error
    } finally {
      isGenerating.value = false
    }
  }

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

  /**
   * Genererar ett UUID v4
   */
  function generateUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = Math.random() * 16 | 0
      const v = c === 'x' ? r : (r & 0x3 | 0x8)
      return v.toString(16)
    })
  }

  return {
    isGenerating,
    generateMobileConfig,
    downloadConfig,
    validateEmailAndDomain
  }
}
