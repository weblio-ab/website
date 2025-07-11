import { useHead } from '@vueuse/head'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'

/**
 * Composable för SEO-hantering med dynamiska meta-taggar
 */
export function useSEO(options = {}) {
  const { t, tm, locale } = useI18n()
  const route = useRoute()
  
  // Få lokaliserade standard meta tags
  const defaultMeta = computed(() => ({
    title: t('seo.defaultTitle'),
    description: t('seo.defaultDescription'),
    keywords: t('seo.defaultKeywords'),
    image: 'https://weblio.se/og-image.jpg',
    type: 'website'
  }))

  const meta = computed(() => ({
    ...defaultMeta.value,
    ...options
  }))

  const canonicalUrl = computed(() => {
    const baseUrl = 'https://weblio.se'
    // Since the app doesn't use language-based routing, canonical URL is just base + path
    return baseUrl + route.path
  })

  const alternateUrls = computed(() => {
    const baseUrl = 'https://weblio.se'
    const currentPath = route.path
    
    // Since language switching is handled via i18n without route changes,
    // both languages point to the same URL
    return {
      sv: baseUrl + currentPath,
      en: baseUrl + currentPath
    }
  })

  const structuredData = computed(() => {
    const baseStructuredData = {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "Weblio",
      "url": "https://weblio.se",
      "logo": "https://weblio.se/assets/icon.svg",
      "description": meta.value.description,
      "address": {
        "@type": "PostalAddress",
        "addressCountry": "SE",
        "addressRegion": "Skåne"
      },
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+46-40-648-50-43",
        "contactType": "customer service",
        "email": "info@weblio.se"
      },
      "sameAs": [
        "https://www.linkedin.com/company/weblio"
      ]
    }

    // Lägg till specifik structured data beroende på sida
    if (route.name === 'Home') {
      return {
        ...baseStructuredData,
        "@type": "LocalBusiness",
        "name": t('seo.business.name'),
        "image": meta.value.image,
        "description": t('seo.business.description'),
        "priceRange": "5000-25000 SEK",
        "serviceArea": {
          "@type": "Country",
          "name": locale.value === 'sv' ? 'Sverige' : 'Sweden'
        },
        "services": tm('seo.business.services').map(service => ({
          "@type": "Service",
          "name": service.name,
          "description": service.description
        }))
      }
    }

    if (route.name === 'Guides') {
      return {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": locale.value === 'sv' ? 'Weblio Guider' : 'Weblio Guides',
        "url": canonicalUrl.value,
        "description": meta.value.description,
        "publisher": baseStructuredData
      }
    }

    return baseStructuredData
  })

  useHead({
    title: meta.value.title,
    meta: [
      // Basic meta tags
      { name: 'description', content: meta.value.description },
      { name: 'keywords', content: meta.value.keywords },
      { name: 'author', content: 'Weblio' },
      
      // Open Graph / Facebook
      { property: 'og:type', content: meta.value.type },
      { property: 'og:url', content: canonicalUrl.value },
      { property: 'og:title', content: meta.value.title },
      { property: 'og:description', content: meta.value.description },
      { property: 'og:image', content: meta.value.image },
      { property: 'og:locale', content: locale.value === 'sv' ? 'sv_SE' : 'en_US' },
      { property: 'og:site_name', content: 'Weblio' },
      
      // Twitter Card
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:url', content: canonicalUrl.value },
      { name: 'twitter:title', content: meta.value.title },
      { name: 'twitter:description', content: meta.value.description },
      { name: 'twitter:image', content: meta.value.image },
      
      // Additional SEO meta tags
      { name: 'robots', content: 'index, follow' },
      { name: 'googlebot', content: 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1' },
      { name: 'format-detection', content: 'telephone=no' },
      { name: 'theme-color', content: '#007bff' },
      
      // Geographic meta tags
      { name: 'geo.region', content: 'SE-M' },
      { name: 'geo.placename', content: 'Malmö, Sverige' },
      { name: 'ICBM', content: '55.6059,13.0007' },
      
      // Business meta tags
      { name: 'classification', content: 'business' },
      { name: 'category', content: 'Web Development, Web Design' },
      { name: 'coverage', content: 'Worldwide' },
      { name: 'target', content: 'all' },
      { name: 'HandheldFriendly', content: 'true' },
      { name: 'MobileOptimized', content: '320' },
      
      // Language meta tags
      { 'http-equiv': 'content-language', content: locale.value }
    ],
    link: [
      // Canonical URL
      { rel: 'canonical', href: canonicalUrl.value },
      
      // Alternate language versions
      // Since content language is handled via i18n, we use the same URL for both languages
      // but indicate the current content language
      { rel: 'alternate', hreflang: locale.value, href: canonicalUrl.value },
      { rel: 'alternate', hreflang: 'x-default', href: canonicalUrl.value },
      
      // DNS prefetch for external resources
      { rel: 'dns-prefetch', href: '//fonts.googleapis.com' },
      { rel: 'dns-prefetch', href: '//fonts.gstatic.com' },
      { rel: 'dns-prefetch', href: '//www.google.com' },
      
      // Preconnect for critical resources
      { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
      { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' }
    ],
    script: [
      // Structured data
      {
        type: 'application/ld+json',
        innerHTML: JSON.stringify(structuredData.value)
      }
    ]
  })

  return {
    meta,
    canonicalUrl,
    alternateUrls,
    structuredData
  }
}
