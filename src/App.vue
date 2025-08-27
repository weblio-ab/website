<script setup>
import { onMounted, onUnmounted } from 'vue'
import { useAppStore } from './stores/app'
import { useViewportStore } from './stores/viewport'
import { storeToRefs } from 'pinia'
import Navbar from './sections/Navbar.vue'
import Footer from './sections/Footer.vue'

const appStore = useAppStore()
const viewportStore = useViewportStore()
const { showBackToTop } = storeToRefs(appStore)
const { scrollToTop, initScrollListener, removeScrollListener } = appStore

onMounted(() => {
  // Only init app store scroll listener for back-to-top and active section
  initScrollListener()
  viewportStore.initViewport()
})

onUnmounted(() => {
  // Only remove app store scroll listener
  removeScrollListener()
  viewportStore.destroyViewport()
})
</script>

<template>
  <div id="app">
    <Navbar />
    <router-view />
    <Footer />
    
    <!-- Back to Top Button -->
    <Transition name="fade">
      <button 
        v-if="showBackToTop"
        @click="scrollToTop"
        class="back-to-top"
        :aria-label="$t('navigation.backToTop')"
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

main {
  flex: 1;
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
  z-index: 9999 !important; /* Ensure it's always on top */
}

.back-to-top:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 25px rgba(0, 123, 255, 0.4);
}

.back-to-top:focus {
  outline: 2px solid #007bff;
  outline-offset: 2px;
}

/* Additional protection against reCAPTCHA interference */
.grecaptcha-badge,
iframe[src*="recaptcha"],
iframe[title*="reCAPTCHA"],
iframe[title*="recaptcha"] {
  display: none !important;
  visibility: hidden !important;
  opacity: 0 !important;
  position: absolute !important;
  left: -9999px !important;
  top: -9999px !important;
  z-index: -1 !important;
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
