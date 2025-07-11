import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { vueSitemapPlugin } from './plugins/vue-sitemap.js'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueSitemapPlugin({
      hostname: 'https://weblio.se',
      routerFile: 'src/router/index.js',
      environment: process.env.VITE_ENVIRONMENT || 'production',
      additionalRoutes: [
        '/guides/email-setup',
        '/guides/webmail',
        '/guides/iphone',
        '/guides/android', 
        '/guides/backup',
        '/guides/ftp'
      ],
      priority: {
        '/': 1.0,
        '/guides': 0.8,
        '/guides/email-setup': 0.7,
        '/guides/webmail': 0.7,
        '/guides/iphone': 0.7,
        '/guides/android': 0.7,
        '/guides/backup': 0.6,
        '/guides/ftp': 0.6,
        '/privacy': 0.3,
        '/terms': 0.3,
        '/cookies': 0.3
      },
      changefreq: 'monthly',
      generateRobotsTxt: true,
      exclude: []
    })
  ],
})
