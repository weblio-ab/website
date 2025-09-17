<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-light bg-white shadow-sm" :class="{ 'navbar-hidden': !isNavbarVisible }">
      <div class="container">
        <router-link class="navbar-brand fw-bold text-primary" to="/">
          <img src="/assets/icon.svg" alt="Weblio" class="navbar-logo me-2">
          Weblio
        </router-link>

        <button 
          class="navbar-toggler" 
          type="button" 
          @click="toggleMenu"
          :aria-expanded="isMenuOpen"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" :class="{ show: isMenuOpen }">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <router-link class="nav-link" :class="{ active: activeSection === 'home' }" to="/#home" @click="closeMenu">{{ $t('navigation.home') }}</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" :class="{ active: activeSection === 'services' }" to="/#services" @click="closeMenu">{{ $t('navigation.services') }}</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" :class="{ active: activeSection === 'portfolio' }" to="/#portfolio" @click="closeMenu">{{ $t('navigation.portfolio') }}</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" :class="{ active: activeSection === 'pricing' }" to="/#pricing" @click="closeMenu">{{ $t('navigation.pricing') }}</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" :class="{ active: activeSection === 'about' }" to="/#about" @click="closeMenu">{{ $t('navigation.about') }}</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" :class="{ active: activeSection === 'contact' }" to="/#contact" @click="closeMenu">{{ $t('navigation.contact') }}</router-link>
            </li>
          </ul>

          <div class="d-flex align-items-center">
            <!-- Language Switcher -->
            <div class="dropdown me-3">
              <button class="btn btn-outline-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                <i class="bi bi-globe2"></i>
                <span class="d-none d-md-inline ms-1">{{ locale === 'sv' ? 'SV' : 'EN' }}</span>
              </button>
              <ul class="dropdown-menu dropdown-menu-end">
                <li>
                  <a class="dropdown-item" :class="{ active: locale === 'sv' }" href="#" @click="changeLocale('sv')">
                    <span class="me-2">🇸🇪</span>
                    <span class="me-auto">Svenska</span>
                    <span class="text-muted">SV</span>
                  </a>
                </li>
                <li>
                  <a class="dropdown-item" :class="{ active: locale === 'en' }" href="#" @click="changeLocale('en')">
                    <span class="me-2">🇬🇧</span>
                    <span class="me-auto">English</span>
                    <span class="text-muted">EN</span>
                  </a>
                </li>
              </ul>
            </div>

            <router-link to="/#contact" class="btn btn-primary">{{ $t('hero.cta') }}</router-link>
            <div class="d-flex flex-column mx-3">
              <span
                role="button"
                :class="[isBusiness ? 'text-secondary' : 'text-decoration-underline']"
                @click="setIsBusiness(false)"
              >{{ $t('navigation.customerType.private') }}</span>
              <span
                role="button"
                :class="[isBusiness ? 'text-decoration-underline' : 'text-secondary']"
                @click="setIsBusiness(true)"
              >{{ $t('navigation.customerType.business') }}</span>
            </div>
          </div>
        </div>
      </div>
    </nav>
    <!-- Spacer for fixed navbar -->
    <div class="navbar-spacer"></div>
  </div>
</template>

<script setup>
import { useAppStore } from '../stores/app'
import { useI18n } from 'vue-i18n'
import { storeToRefs } from 'pinia'
import { onMounted, onUnmounted, ref } from 'vue'

const appStore = useAppStore()
const { locale, isBusiness, isMenuOpen, activeSection } = storeToRefs(appStore)
const { setLocale, setIsBusiness, toggleMenu, closeMenu } = appStore
const { locale: i18nLocale } = useI18n()

// Auto-hiding navbar logic
const isNavbarVisible = ref(true)
const lastScrollY = ref(0)
const scrollThreshold = 50 // Start hiding after scrolling this much (reduced for better response)

const handleScroll = () => {
  const currentScrollY = window.scrollY
  
  // Always show navbar at the top
  if (currentScrollY <= scrollThreshold) {
    isNavbarVisible.value = true
    lastScrollY.value = currentScrollY
    return
  }
  
  // Hide when scrolling down, show when scrolling up
  if (currentScrollY > lastScrollY.value && currentScrollY > scrollThreshold) {
    // Scrolling down - hide navbar
    isNavbarVisible.value = false
  } else if (currentScrollY < lastScrollY.value) {
    // Scrolling up - show navbar
    isNavbarVisible.value = true
  }
  
  lastScrollY.value = currentScrollY
}

// Throttled scroll handler for better performance
let ticking = false
const throttledScroll = () => {
  if (!ticking) {
    requestAnimationFrame(() => {
      handleScroll()
      ticking = false
    })
    ticking = true
  }
}

function changeLocale(newLocale) {
  setLocale(newLocale)
  i18nLocale.value = newLocale
  closeMenu() // Close mobile menu when changing language
}

onMounted(() => {
  // Only use our custom scroll listener, not the app store one
  window.addEventListener('scroll', throttledScroll, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', throttledScroll)
})
</script>

<style scoped>
/* Auto-hiding navbar styling */
.navbar {
  position: fixed !important;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
  transform: translateY(0);
  z-index: 1050 !important;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
}

.navbar-hidden {
  transform: translateY(-100%) !important;
}

/* Spacer to prevent content from being hidden under fixed navbar */
.navbar-spacer {
  height: 76px; /* Approximate navbar height */
}

@media (max-width: 991.98px) {
  .navbar-spacer {
    height: 65px; /* Smaller height for mobile */
  }
}

.navbar-brand {
  font-size: 1.5rem;
}

.nav-link {
  font-weight: 500;
  transition: color 0.3s ease;
}

.nav-link:hover {
  color: var(--bs-primary) !important;
}

.nav-link.active {
  color: var(--bs-primary) !important;
  font-weight: 600;
  position: relative;
}

.nav-link.active::after {
  content: '';
  position: absolute;
  bottom: -5px;
  left: 50%;
  transform: translateX(-50%);
  width: 20px;
  height: 2px;
  background: var(--bs-primary);
  border-radius: 1px;
}

.navbar-logo {
  height: 60px;
  width: auto;
  transition: all 0.3s ease;
  cursor: pointer;
}

.navbar-logo:hover {
  transform: scale(1.05);
}

/* Simple Bootstrap dropdown styling */
.dropdown-item.active {
  background-color: var(--bs-primary);
  color: white;
}

.dropdown-item {
  display: flex;
  align-items: center;
}

/* Force remove any dropdown scrolling */
.navbar .dropdown-menu {
  max-height: none !important;
  overflow: visible !important;
  height: auto !important;
}

/* Specifically target our dropdown */
.navbar .dropdown-menu.dropdown-menu-end {
  max-height: none !important;
  overflow: visible !important;
  -webkit-overflow-scrolling: auto !important;
}

/* Ensure navbar has proper z-index */
.navbar.sticky-top {
  z-index: 1030 !important;
}

/* Ensure dropdown is above everything */
.navbar .dropdown-menu {
  z-index: 1031 !important;
}

/* Nuclear option: Remove all constraints on dropdown */
.dropdown-menu {
  max-height: unset !important;
  height: unset !important;
  overflow: unset !important;
  overflow-x: unset !important;
  overflow-y: unset !important;
  contain: none !important;
}

/* Disable any smooth scrolling on dropdown */
.dropdown-menu * {
  scroll-behavior: auto !important;
}

/* Ensure dropdown can escape container constraints */
.navbar .container {
  overflow: visible !important;
  overflow-x: visible !important;
  overflow-y: visible !important;
  position: relative;
}

/* Make sure dropdown menu can overflow parent containers */
.navbar .dropdown {
  position: relative !important;
}

.navbar .dropdown-menu {
  position: absolute !important;
  top: 100% !important;
  left: auto !important;
  right: 0 !important;
  transform: none !important;
  margin-top: 0.125rem !important;
}

/* Language switcher button styling */
.navbar .dropdown .btn {
  font-size: 0.8rem;
}

@media (max-width: 991.98px) {
  .navbar-collapse {
    margin-top: 1rem;
  }
  
  .nav-link.active::after {
    display: none;
  }
  
  .navbar-logo {
    height: 45px;
  }
}
</style>
