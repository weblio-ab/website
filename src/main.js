import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createI18n } from 'vue-i18n'
import { createHead } from '@vueuse/head'
import router from './router'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import 'swiper/css'
import 'swiper/css/pagination'
import './style.css'
import App from './App.vue'

// i18n konfiguration
import sv from './locales/sv.json'
import en from './locales/en.json'

const i18n = createI18n({
  locale: 'sv',
  fallbackLocale: 'en',
  messages: {
    sv,
    en
  }
})

const head = createHead()
const pinia = createPinia()
const app = createApp(App)

app.use(pinia)
app.use(i18n)
app.use(router)
app.use(head)
app.mount('#app')
