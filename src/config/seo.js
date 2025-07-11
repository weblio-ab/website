/**
 * SEO konfiguration för Weblio
 * Centraliserad hantering av SEO-inställningar för hela applikationen
 */

export const seoConfig = {
  // Grundläggande webbplats information
  site: {
    name: 'Weblio',
    url: 'https://weblio.se',
    logo: 'https://weblio.se/assets/icon.svg',
    image: 'https://weblio.se/og-image.jpg'
  },

  // Företagsinformation för structured data
  business: {
    name: 'Weblio',
    type: 'LocalBusiness',
    address: {
      country: 'SE',
      region: 'Skåne',
      city: 'Malmö'
    },
    contact: {
      phone: '+46-40-648-50-43',
      email: 'info@weblio.se'
    },
    serviceArea: 'Sverige'
  },

  // OpenGraph och Twitter Card inställningar
  social: {
    twitter: {
      card: 'summary_large_image',
      site: '@weblio_se'
    },
    facebook: {
      appId: '', // Lägg till Facebook App ID om du har en
    }
  },

  // Structured data mallar
  structuredData: {
    organization: {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'Weblio',
      url: 'https://weblio.se',
      logo: 'https://weblio.se/assets/icon.svg',
      address: {
        '@type': 'PostalAddress',
        addressCountry: 'SE',
        addressRegion: 'Skåne'
      },
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: '+46-40-648-50-43',
        contactType: 'customer service',
        email: 'info@weblio.se'
      }
    },

    localBusiness: {
      '@context': 'https://schema.org',
      '@type': 'LocalBusiness',
      name: 'Weblio',
      url: 'https://weblio.se',
      logo: 'https://weblio.se/assets/icon.svg',
      address: {
        '@type': 'PostalAddress',
        addressCountry: 'SE',
        addressRegion: 'Skåne'
      },
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: '+46-40-648-50-43',
        contactType: 'customer service',
        email: 'info@weblio.se'
      },
      serviceArea: {
        '@type': 'Country',
        name: 'Sverige'
      }
    },

    website: {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: 'Weblio',
      url: 'https://weblio.se'
    }
  },

  // Robots meta inställningar
  robots: {
    default: 'index, follow',
    noindex: 'noindex, nofollow',
    indexNoFollow: 'index, nofollow'
  },

  // Språk och lokalisering
  locales: {
    default: 'sv',
    supported: ['sv', 'en'],
    mapping: {
      sv: 'sv_SE',
      en: 'en_US'
    }
  }
}

/**
 * Generera structured data för specifik sidtyp
 */
export function generateStructuredData(type, customData = {}) {
  const baseData = seoConfig.structuredData[type]
  if (!baseData) {
    console.warn(`Unknown structured data type: ${type}`)
    return seoConfig.structuredData.organization
  }
  
  return {
    ...baseData,
    ...customData
  }
}

/**
 * Generera canonical URL
 */
export function generateCanonicalUrl(path = '') {
  const baseUrl = seoConfig.site.url
  return baseUrl + (path.startsWith('/') ? path : '/' + path)
}

/**
 * Generera alternate URLs för språk
 */
export function generateAlternateUrls(path = '') {
  const baseUrl = seoConfig.site.url
  const urls = {}
  
  seoConfig.locales.supported.forEach(locale => {
    if (locale === seoConfig.locales.default) {
      urls[locale] = baseUrl + path
    } else {
      urls[locale] = baseUrl + '/' + locale + path
    }
  })
  
  return urls
}

/**
 * Validera och formatera meta description
 */
export function formatMetaDescription(description) {
  if (!description) return ''
  
  // Begränsa till 160 tecken för optimal SEO
  if (description.length > 160) {
    return description.substring(0, 157) + '...'
  }
  
  return description
}

/**
 * Generera keywords array från sträng
 */
export function formatKeywords(keywords) {
  if (typeof keywords === 'string') {
    return keywords.split(',').map(keyword => keyword.trim())
  }
  
  if (Array.isArray(keywords)) {
    return keywords
  }
  
  return []
}
