<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-white shadow-sm sticky-top">
    <div class="container">
      <router-link class="navbar-brand fw-bold text-primary" to="/">
        <img src="/icon.svg" alt="WebbEnkelt" class="navbar-logo me-2">
        WebbEnkelt
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
            <a class="nav-link" :class="{ active: activeSection === 'home' }" href="#home" @click="closeMenu">{{ $t('navigation.home') }}</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" :class="{ active: activeSection === 'services' }" href="#services" @click="closeMenu">{{ $t('navigation.services') }}</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" :class="{ active: activeSection === 'portfolio' }" href="#portfolio" @click="closeMenu">{{ $t('navigation.portfolio') }}</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" :class="{ active: activeSection === 'pricing' }" href="#pricing" @click="closeMenu">{{ $t('navigation.pricing') }}</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" :class="{ active: activeSection === 'about' }" href="#about" @click="closeMenu">{{ $t('navigation.about') }}</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" :class="{ active: activeSection === 'contact' }" href="#contact" @click="closeMenu">{{ $t('navigation.contact') }}</a>
          </li>
        </ul>

        <div class="d-flex align-items-center">
          <!-- Language Switcher -->
          <div class="dropdown me-3">
            <button class="btn btn-outline-secondary btn-sm dropdown-toggle" type="button" data-bs-toggle="dropdown">
              {{ locale.toUpperCase() }}
            </button>
            <ul class="dropdown-menu">
              <li><a class="dropdown-item" href="#" @click="changeLocale('sv')">Svenska</a></li>
              <li><a class="dropdown-item" href="#" @click="changeLocale('en')">English</a></li>
            </ul>
          </div>

          <a href="#contact" class="btn btn-primary">{{ $t('hero.cta') }}</a>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { useAppStore } from '../stores/app'
import { useI18n } from 'vue-i18n'
import { storeToRefs } from 'pinia'
import { onMounted, onUnmounted } from 'vue'

const appStore = useAppStore()
const { locale, isMenuOpen, activeSection } = storeToRefs(appStore)
const { toggleMenu, closeMenu, setLocale, initScrollListener, removeScrollListener } = appStore
const { locale: i18nLocale } = useI18n()

function changeLocale(newLocale) {
  setLocale(newLocale)
  i18nLocale.value = newLocale
}

onMounted(() => {
  initScrollListener()
})

onUnmounted(() => {
  removeScrollListener()
})
</script>

<style scoped>
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
  height: 40px;
  width: auto;
  transition: all 0.3s ease;
  cursor: pointer;
}

.navbar-logo:hover {
  transform: scale(1.05);
}

@media (max-width: 991.98px) {
  .navbar-collapse {
    margin-top: 1rem;
  }
  
  .nav-link.active::after {
    display: none;
  }
  
  .navbar-logo {
    height: 35px;
  }
}
</style>
