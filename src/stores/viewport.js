import { defineStore } from 'pinia'
import { ref, computed, onMounted, onUnmounted } from 'vue'

export const useViewportStore = defineStore('viewport', () => {
  // State
  const windowWidth = ref(0)
  const windowHeight = ref(0)
  
  // Getters - dynamiska breakpoints baserat på faktisk viewport
  const isMobile = computed(() => windowWidth.value < 768)
  const isTablet = computed(() => windowWidth.value >= 768 && windowWidth.value < 1024)
  const isDesktop = computed(() => windowWidth.value >= 1024)
  
  // Mer granulära breakpoints
  const isSmallMobile = computed(() => windowWidth.value < 480)
  const isLargeMobile = computed(() => windowWidth.value >= 480 && windowWidth.value < 768)
  const isSmallTablet = computed(() => windowWidth.value >= 768 && windowWidth.value < 992)
  const isLargeTablet = computed(() => windowWidth.value >= 992 && windowWidth.value < 1024)
  
  // Viewport kategorier för komponenter
  const viewportCategory = computed(() => {
    if (windowWidth.value < 768) return 'mobile'
    if (windowWidth.value < 1024) return 'tablet'
    return 'desktop'
  })
  
  // Slider-specifika inställningar
  const sliderConfig = computed(() => {
    if (windowWidth.value < 768) {
      return {
        slidesToShow: 1,
        useSlider: true,
        containerPadding: '0 15px',
        slideGap: '15px'
      }
    }
    if (windowWidth.value < 1024) {
      return {
        slidesToShow: 2,
        useSlider: true,
        containerPadding: '0 20px',
        slideGap: '20px'
      }
    }
    return {
      slidesToShow: 3,
      useSlider: false,
      containerPadding: '0',
      slideGap: '0'
    }
  })
  
  // Actions
  function updateViewport() {
    windowWidth.value = window.innerWidth
    windowHeight.value = window.innerHeight
  }
  
  // Lägg till resize listener
  function initViewport() {
    updateViewport()
    window.addEventListener('resize', updateViewport)
    window.addEventListener('orientationchange', () => {
      setTimeout(updateViewport, 100) // Delay för orientation change
    })
  }
  
  function destroyViewport() {
    window.removeEventListener('resize', updateViewport)
    window.removeEventListener('orientationchange', updateViewport)
  }
  
  return {
    // State
    windowWidth,
    windowHeight,
    
    // Getters
    isMobile,
    isTablet,
    isDesktop,
    isSmallMobile,
    isLargeMobile,
    isSmallTablet,
    isLargeTablet,
    viewportCategory,
    sliderConfig,
    
    // Actions
    updateViewport,
    initViewport,
    destroyViewport
  }
})
