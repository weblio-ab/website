<template>
  <main>
    <Hero />
    <Services />
    <!-- <Portfolio /> -->
    <!-- <Testimonials /> -->
    <Pricing />
    <About />
    <Contact />
  </main>
</template>

<script setup>
import { useSEO } from '../composables/useSEO'
import { useI18n } from 'vue-i18n'
import Hero from '../sections/home/Hero.vue'
import Services from '../sections/home/Services.vue'
// import Portfolio from '../sections/home/Portfolio.vue'
// import Testimonials from '../sections/home/Testimonials.vue'
import Pricing from '../sections/home/Pricing.vue'
import About from '../sections/home/About.vue'
import Contact from '../sections/home/Contact.vue'

const { t } = useI18n()

// SEO configuration för startsidan - nu lokaliserad
useSEO({
  title: t('seo.pages.home.title'),
  description: t('seo.pages.home.description'),
  keywords: t('seo.pages.home.keywords'),
  type: 'website'
})
</script>
