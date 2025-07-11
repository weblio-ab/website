import fs from 'fs'
import path from 'path'

/**
 * Custom Vite plugin to generate sitemap from Vue Router routes
 */
export function vueSitemapPlugin(options = {}) {
  const {
    hostname = 'https://example.com',
    routerFile = 'src/router/index.js',
    outputFile = 'sitemap.xml',
    generateRobotsTxt = true,
    exclude = [],
    priority = {},
    additionalRoutes = [],
    environment = 'production'
  } = options

  return {
    name: 'vue-sitemap',
    generateBundle() {
      try {
        const routerPath = path.resolve(routerFile)
        const routerContent = fs.readFileSync(routerPath, 'utf-8')
        
        const routeMatches = routerContent.match(/path:\s*['"`]([^'"`]+)['"`]/g)
        
        if (!routeMatches) {
          console.warn('No routes found in router file')
          return
        }
        
        const extractedRoutes = routeMatches
          .map(match => {
            const pathMatch = match.match(/path:\s*['"`]([^'"`]+)['"`]/)
            return pathMatch ? pathMatch[1] : null
          })
          .filter(path => {
            if (!path) return false
            if (path.includes(':')) return false
            if (exclude.includes(path)) return false
            return true
          })
          .filter((path, index, self) => self.indexOf(path) === index) // Ta bort dubletter
        
        const allRoutes = [...extractedRoutes, ...additionalRoutes]
          .filter((path, index, self) => self.indexOf(path) === index) // Ta bort dubletter igen
        
        console.log('Found routes:', allRoutes)
        
        // Generate sitemap XML only for production
        if (environment === 'production') {
          const urlEntries = allRoutes.map(route => {
            const url = route === '/' ? route : route
            const routePriority = priority[route] || 0.5
            
            return `  <url>
    <loc>${hostname}${url}</loc>
    <priority>${routePriority}</priority>
  </url>`
          }).join('\n')
          
          const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
    xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
    xmlns:xhtml="http://www.w3.org/1999/xhtml"
    xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
    xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
${urlEntries}
</urlset>`
          
          this.emitFile({
            type: 'asset',
            fileName: outputFile,
            source: sitemapXml
          })
        }
        
        if (generateRobotsTxt) {
          let robotsTxt
          
          if (environment !== 'production') {
            // non-production: Block all crawlers and hide from search engines
            robotsTxt = `User-agent: *
Disallow: /

# This is a non-production environment - not for public indexing
# No sitemap provided to prevent search engine discovery`
          } else {
            // Production: Allow crawlers and provide sitemap
            robotsTxt = `User-agent: *
Allow: /

# Explicitly allow important assets for SEO and page rendering
Allow: /assets/
Allow: /*.css$
Allow: /*.js$
Allow: /*.svg$
Allow: /*.png$
Allow: /*.jpg$
Allow: /*.jpeg$
Allow: /*.webp$
Allow: /*.ico$
Allow: /*.woff$
Allow: /*.woff2$

# Disallow admin and private areas
Disallow: /admin/
Disallow: /api/
Disallow: /.env
Disallow: /node_modules/
Disallow: /src/
Disallow: /*.json$ 

# Disallow URL parameters (except guides with device/client params)
Disallow: /*?*
Allow: /guides/*?*

# Sitemap location
Sitemap: ${hostname}/${outputFile}

# Crawl delay to be respectful
Crawl-delay: 1`
          }
          
          this.emitFile({
            type: 'asset',
            fileName: 'robots.txt',
            source: robotsTxt
          })
        }
        
        if (environment !== 'production') {
          console.log('✓ Sitemap generation skipped for non-production environment')
        } else {
          console.log(`✓ Generated ${outputFile} with ${allRoutes.length} routes`)
        }
        
        if (generateRobotsTxt) {
          if (environment !== 'production') {
            console.log('✓ Generated robots.txt (non-production - blocks crawlers)')
          } else {
            console.log('✓ Generated robots.txt (production - allows crawlers)')
          }
        }
        
      } catch (error) {
        console.error('Error generating sitemap:', error)
      }
    }
  }
}
