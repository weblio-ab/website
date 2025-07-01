import { ref, onMounted, onUnmounted } from 'vue'

export function useTouchSlider(itemsCount, options = {}) {
  const {
    autoSlide = false,
    autoSlideInterval = 5000,
    itemsPerView = { mobile: 1, tablet: 2, desktop: 3 }
  } = options

  const sliderRef = ref(null)
  const currentSlide = ref(0)
  const isDragging = ref(false)
  const startX = ref(0)
  const startY = ref(0)
  const currentX = ref(0)
  const currentY = ref(0)
  const translateX = ref(0)
  const itemWidth = ref(0)
  const visibleItems = ref(1)
  const isHorizontalSwipe = ref(false)
  const hasDetectedDirection = ref(false)

  let autoSlideTimer = null

  // Beräkna synliga items baserat på skärmstorlek
  const updateVisibleItems = () => {
    const width = window.innerWidth
    if (width < 768) {
      visibleItems.value = itemsPerView.mobile
    } else if (width < 992) {
      visibleItems.value = itemsPerView.tablet
    } else {
      visibleItems.value = itemsPerView.desktop
    }
  }

  // Beräkna slider position
  const updateSliderPosition = () => {
    if (!sliderRef.value) return
    
    const container = sliderRef.value.parentElement
    if (!container) return
    
    const containerWidth = container.clientWidth
    itemWidth.value = containerWidth
    translateX.value = -currentSlide.value * itemWidth.value
    
    // Applicera transform direkt
    sliderRef.value.style.transform = `translateX(${translateX.value}px)`
  }

  // Gå till specifik slide
  const goToSlide = (index) => {
    const maxSlide = Math.max(0, itemsCount - 1)
    currentSlide.value = Math.max(0, Math.min(index, maxSlide))
    updateSliderPosition()
  }

  // Nästa slide
  const nextSlide = () => {
    const maxSlide = Math.max(0, itemsCount - 1)
    if (currentSlide.value < maxSlide) {
      goToSlide(currentSlide.value + 1)
    } else if (autoSlide) {
      goToSlide(0) // Loop tillbaka
    }
  }

  // Föregående slide
  const prevSlide = () => {
    if (currentSlide.value > 0) {
      goToSlide(currentSlide.value - 1)
    } else if (autoSlide) {
      goToSlide(Math.max(0, itemsCount - 1)) // Loop till sista
    }
  }

  // Touch events med förbättrad scroll-hantering
  const handleTouchStart = (e) => {
    // På mobil visar vi alltid en slide åt gången
    if (window.innerWidth >= 768) return
    
    isDragging.value = false // Börja inte dragga direkt
    hasDetectedDirection.value = false
    isHorizontalSwipe.value = false
    
    startX.value = e.touches[0].clientX
    startY.value = e.touches[0].clientY
    currentX.value = startX.value
    currentY.value = startY.value
    
    // Stoppa auto-slide under touch
    if (autoSlideTimer) {
      clearInterval(autoSlideTimer)
      autoSlideTimer = null
    }
  }

  const handleTouchMove = (e) => {
    if (window.innerWidth >= 768) return
    
    currentX.value = e.touches[0].clientX
    currentY.value = e.touches[0].clientY
    
    const deltaX = Math.abs(currentX.value - startX.value)
    const deltaY = Math.abs(currentY.value - startY.value)
    
    // Endast detektera riktning om användaren har rört sig tillräckligt
    if (!hasDetectedDirection.value && (deltaX > 10 || deltaY > 10)) {
      hasDetectedDirection.value = true
      isHorizontalSwipe.value = deltaX > deltaY
      
      // Om det är en horisontell swipe, börja dragga
      if (isHorizontalSwipe.value) {
        isDragging.value = true
        e.preventDefault() // Förhindra scroll endast för horisontella swipes
      }
    }
    
    // Endast hantera touch move om det är en horisontell swipe
    if (!isDragging.value || !isHorizontalSwipe.value) return
    
    const deltaXMovement = currentX.value - startX.value
    const newTranslateX = translateX.value + deltaXMovement
    
    // Begränsa sliding
    const maxTranslate = 0
    const minTranslate = -(itemsCount - 1) * itemWidth.value
    
    if (sliderRef.value) {
      const clampedTranslate = Math.max(minTranslate, Math.min(maxTranslate, newTranslateX))
      sliderRef.value.style.transform = `translateX(${clampedTranslate}px)`
    }
  }

  const handleTouchEnd = (e) => {
    if (window.innerWidth >= 768) return
    
    // Endast hantera touch end om vi hade en horisontell swipe
    if (!isDragging.value || !isHorizontalSwipe.value) {
      startAutoSlide()
      return
    }
    
    isDragging.value = false
    const deltaX = currentX.value - startX.value
    const threshold = itemWidth.value * 0.3 // 30% av item width
    
    if (Math.abs(deltaX) > threshold) {
      if (deltaX > 0) {
        prevSlide()
      } else {
        nextSlide()
      }
    } else {
      updateSliderPosition() // Återgå till nuvarande position
    }
    
    startAutoSlide()
  }

  // Mouse events för desktop (behålls för test)
  const handleMouseDown = (e) => {
    e.preventDefault()
    isDragging.value = true
    startX.value = e.clientX
    currentX.value = startX.value
    
    if (autoSlideTimer) {
      clearInterval(autoSlideTimer)
      autoSlideTimer = null
    }
  }

  const handleMouseMove = (e) => {
    if (!isDragging.value) return
    
    currentX.value = e.clientX
    const deltaX = currentX.value - startX.value
    const newTranslateX = translateX.value + deltaX
    
    const maxTranslate = 0
    const minTranslate = -(itemsCount - 1) * itemWidth.value
    
    if (sliderRef.value) {
      const clampedTranslate = Math.max(minTranslate, Math.min(maxTranslate, newTranslateX))
      sliderRef.value.style.transform = `translateX(${clampedTranslate}px)`
    }
  }

  const handleMouseUp = () => {
    if (!isDragging.value) return
    
    isDragging.value = false
    const deltaX = currentX.value - startX.value
    const threshold = itemWidth.value * 0.3
    
    if (Math.abs(deltaX) > threshold) {
      if (deltaX > 0) {
        prevSlide()
      } else {
        nextSlide()
      }
    } else {
      updateSliderPosition()
    }
    
    startAutoSlide()
  }

  // Auto-slide funktionalitet
  const startAutoSlide = () => {
    if (autoSlide && !autoSlideTimer) {
      autoSlideTimer = setInterval(nextSlide, autoSlideInterval)
    }
  }

  const stopAutoSlide = () => {
    if (autoSlideTimer) {
      clearInterval(autoSlideTimer)
      autoSlideTimer = null
    }
  }

  // Event listeners
  const addEventListeners = () => {
    if (!sliderRef.value) return
    
    // Touch events med passive: false för att kunna preventDefault
    sliderRef.value.addEventListener('touchstart', handleTouchStart, { passive: true })
    sliderRef.value.addEventListener('touchmove', handleTouchMove, { passive: false })
    sliderRef.value.addEventListener('touchend', handleTouchEnd, { passive: true })
    
    // Mouse events (för desktop testing)
    sliderRef.value.addEventListener('mousedown', handleMouseDown)
    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)
    
    // Window resize
    window.addEventListener('resize', handleResize)
  }

  const removeEventListeners = () => {
    if (sliderRef.value) {
      sliderRef.value.removeEventListener('touchstart', handleTouchStart)
      sliderRef.value.removeEventListener('touchmove', handleTouchMove)
      sliderRef.value.removeEventListener('touchend', handleTouchEnd)
      sliderRef.value.removeEventListener('mousedown', handleMouseDown)
    }
    
    document.removeEventListener('mousemove', handleMouseMove)
    document.removeEventListener('mouseup', handleMouseUp)
    window.removeEventListener('resize', handleResize)
  }

  const handleResize = () => {
    updateVisibleItems()
    updateSliderPosition()
  }

  onMounted(() => {
    updateVisibleItems()
    updateSliderPosition()
    addEventListeners()
    startAutoSlide()
  })

  onUnmounted(() => {
    removeEventListeners()
    stopAutoSlide()
  })

  return {
    sliderRef,
    currentSlide,
    visibleItems,
    translateX,
    goToSlide,
    nextSlide,
    prevSlide,
    isDragging
  }
}
