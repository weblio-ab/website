<script setup>
import { onMounted, onUnmounted } from 'vue'
import { useAppStore } from './stores/app'
import { useViewportStore } from './stores/viewport'
import { storeToRefs } from 'pinia'
import Navbar from './sections/Navbar.vue'
import Hero from './sections/Hero.vue'
import Services from './sections/Services.vue'
import Portfolio from './sections/Portfolio.vue'
import Testimonials from './sections/Testimonials.vue'
import Pricing from './sections/Pricing.vue'
import About from './sections/About.vue'
import Contact from './sections/Contact.vue'
import Footer from './sections/Footer.vue'

const appStore = useAppStore()
const viewportStore = useViewportStore()
const { showBackToTop, isLoading } = storeToRefs(appStore)
const { scrollToTop, initScrollListener, removeScrollListener } = appStore

onMounted(() => {
  initScrollListener()
  viewportStore.initViewport()
})

onUnmounted(() => {
  removeScrollListener()
  viewportStore.destroyViewport()
})
</script>

<template>
  <!-- Loading Screen -->
  <Transition name="fade-loader">
    <div v-if="isLoading" class="loader-overlay">
      <div class="loader-content">
        <div class="loader-logo">
          <img src="/assets/icon.svg" alt="Weblio" class="loader-logo-image">
        </div>
        <h2>Weblio</h2>
        <div class="loader-spinner"></div>
      </div>
    </div>
  </Transition>

  <div id="app" :class="{ 'app-loading': isLoading }">
    <Navbar />
    <main>
      <Hero />
      <Services />
      <Portfolio />
      <Testimonials />
      <Pricing />
      <About />
      <Contact />
    </main>
    <Footer />
    
    <!-- Back to Top Button -->
    <Transition name="fade">
      <button 
        v-if="showBackToTop && !isLoading"
        @click="scrollToTop"
        class="back-to-top"
        aria-label="Tillbaka till toppen"
      >
        <i class="bi bi-chevron-up"></i>
      </button>
    </Transition>
  </div>
</template>

<style>
/* Global styles */
html {
  scroll-behavior: smooth;
}

body {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  line-height: 1.6;
}

#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.app-loading {
  overflow: hidden;
}

main {
  flex: 1;
}

/* Loader Styles */
.loader-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, #f8f9ff 0%, #e3f2fd 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}

.loader-content {
  text-align: center;
}

.loader-logo {
  margin-bottom: 1rem;
}

.loader-logo-image {
  height: 80px;
  width: auto;
}

.loader-content h2 {
  color: #333;
  margin-bottom: 2rem;
  font-weight: 600;
}

.loader-spinner {
  width: 40px;
  height: 40px;
  margin: 0 auto;
  border: 3px solid #f3f3f3;
  border-top: 3px solid #007bff;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.fade-loader-enter-active,
.fade-loader-leave-active {
  transition: opacity 0.5s ease;
}

.fade-loader-enter-from,
.fade-loader-leave-to {
  opacity: 0;
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
}

::-webkit-scrollbar-thumb {
  background: #007bff;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #0056b3;
}

/* Smooth transitions for all elements */
* {
  transition: color 0.3s ease, background-color 0.3s ease, border-color 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease;
}

/* Focus styles for accessibility */
.btn:focus,
.form-control:focus,
a:focus {
  outline: 2px solid #007bff;
  outline-offset: 2px;
}

/* Custom Bootstrap overrides */
:root {
  --bs-primary: #007bff;
  --bs-primary-rgb: 0, 123, 255;
}

/* Back to Top Button */
.back-to-top {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  width: 50px;
  height: 50px;
  background: linear-gradient(135deg, #007bff, #0056b3);
  color: white;
  border: none;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
  cursor: pointer;
  box-shadow: 0 4px 20px rgba(0, 123, 255, 0.3);
  transition: all 0.3s ease;
  z-index: 1000;
}

.back-to-top:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 25px rgba(0, 123, 255, 0.4);
}

.back-to-top:focus {
  outline: 2px solid #007bff;
  outline-offset: 2px;
}

/* Fade transition for back to top button */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@media (max-width: 767.98px) {
  .back-to-top {
    bottom: 1rem;
    right: 1rem;
    width: 45px;
    height: 45px;
    font-size: 1.1rem;
  }
}
</style>
