<template>
  <section id="services" class="py-5 bg-light" ref="sectionRef">
    <div class="container">
      <div class="row">
        <div class="col-lg-8 mx-auto text-center mb-5" :class="{ 'fade-in-up': isVisible }">
          <h2 class="display-5 fw-bold text-dark mb-3">{{ $t('services.title') }}</h2>
          <p class="lead text-muted">{{ $t('services.subtitle') }}</p>
        </div>
      </div>

      <!-- Service Cards - Desktop Grid -->
      <div class="row g-4 mb-5 d-none d-md-flex">
        <div class="col-md-6 col-lg-3" :class="{ 'fade-in-up': isVisible }" style="animation-delay: 0.1s">
          <div class="service-card h-100">
            <div class="service-icon">
              <i class="bi bi-palette"></i>
            </div>
            <h4>{{ $t('services.items.design.title') }}</h4>
            <p class="text-muted">{{ $t('services.items.design.description') }}</p>
          </div>
        </div>
        <div class="col-md-6 col-lg-3" :class="{ 'fade-in-up': isVisible }" style="animation-delay: 0.2s">
          <div class="service-card h-100">
            <div class="service-icon">
              <i class="bi bi-code-slash"></i>
            </div>
            <h4>{{ $t('services.items.development.title') }}</h4>
            <p class="text-muted">{{ $t('services.items.development.description') }}</p>
          </div>
        </div>
        <div class="col-md-6 col-lg-3" :class="{ 'fade-in-up': isVisible }" style="animation-delay: 0.3s">
          <div class="service-card h-100">
            <div class="service-icon">
              <i class="bi bi-cloud"></i>
            </div>
            <h4>{{ $t('services.items.hosting.title') }}</h4>
            <p class="text-muted">{{ $t('services.items.hosting.description') }}</p>
          </div>
        </div>
        <div class="col-md-6 col-lg-3" :class="{ 'fade-in-up': isVisible }" style="animation-delay: 0.4s">
          <div class="service-card h-100">
            <div class="service-icon">
              <i class="bi bi-headset"></i>
            </div>
            <h4>{{ $t('services.items.support.title') }}</h4>
            <p class="text-muted">{{ $t('services.items.support.description') }}</p>
          </div>
        </div>
      </div>

      <!-- Service Cards - Mobile Slider -->
      <div class="d-md-none mb-5">
        <div class="services-slider-container">
          <div 
            ref="sliderRef" 
            class="services-slider"
            :style="{ transform: `translateX(-${currentSlide * 100}%)` }"
          >
            <div class="service-slide">
              <div class="service-card h-100">
                <div class="service-icon">
                  <i class="bi bi-palette"></i>
                </div>
                <h4>{{ $t('services.items.design.title') }}</h4>
                <p class="text-muted">{{ $t('services.items.design.description') }}</p>
              </div>
            </div>
            
            <div class="service-slide">
              <div class="service-card h-100">
                <div class="service-icon">
                  <i class="bi bi-code-slash"></i>
                </div>
                <h4>{{ $t('services.items.development.title') }}</h4>
                <p class="text-muted">{{ $t('services.items.development.description') }}</p>
              </div>
            </div>
            
            <div class="service-slide">
              <div class="service-card h-100">
                <div class="service-icon">
                  <i class="bi bi-cloud"></i>
                </div>
                <h4>{{ $t('services.items.hosting.title') }}</h4>
                <p class="text-muted">{{ $t('services.items.hosting.description') }}</p>
              </div>
            </div>
            
            <div class="service-slide">
              <div class="service-card h-100">
                <div class="service-icon">
                  <i class="bi bi-headset"></i>
                </div>
                <h4>{{ $t('services.items.support.title') }}</h4>
                <p class="text-muted">{{ $t('services.items.support.description') }}</p>
              </div>
            </div>
          </div>
        </div>
        <!-- Slide indicators -->
        <div class="services-indicators mt-4">
          <button 
            v-for="(_, index) in 4" 
            :key="index"
            @click="goToSlide(index)"
            :class="['indicator', { active: currentSlide === index }]"
            :aria-label="`Gå till tjänst ${index + 1}`"
          ></button>
        </div>
      </div>

      <!-- Process Section -->
      <div class="row">
        <div class="col-12">
          <div class="process-section" :class="{ 'fade-in-up': isVisible }" style="animation-delay: 0.5s">
            <h3 class="text-center mb-5">{{ $t('services.process.title') }}</h3>
            <div class="row g-4">
              <div class="col-md-6 col-lg-3" v-for="(step, idx) in 4" :key="idx">
                <div class="process-step text-center">
                  <div class="step-number">{{ idx + 1 }}</div>
                  <h5>{{ $t(`services.process.step${idx+1}.title`) }}</h5>
                  <p class="text-muted">{{ $t(`services.process.step${idx+1}.description`) }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useIntersectionObserver } from '../composables/useIntersectionObserver'
import { useTouchSlider } from '../composables/useTouchSlider'

const { isVisible, target: sectionRef } = useIntersectionObserver(0.1)

// Touch slider för mobil
const { 
  sliderRef, 
  currentSlide, 
  translateX, 
  goToSlide 
} = useTouchSlider(4, {
  itemsPerView: { mobile: 1, tablet: 2, desktop: 4 }
})
</script>

<style scoped>
.service-card {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 123, 255, 0.1);
  text-align: center;
  transition: all 0.3s ease;
  border: 1px solid rgba(0, 123, 255, 0.1);
}

.service-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 30px rgba(0, 123, 255, 0.15);
}

.service-icon {
  width: 60px;
  height: 60px;
  margin: 0 auto 1rem;
  background: linear-gradient(135deg, #007bff, #0056b3);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  color: white;
}

.service-card h4 {
  margin-bottom: 1rem;
  color: #333;
}

.process-section {
  background: white;
  padding: 3rem 2rem;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 123, 255, 0.08);
}

.process-step {
  position: relative;
}

.step-number {
  width: 50px;
  height: 50px;
  margin: 0 auto 1rem;
  background: linear-gradient(135deg, #007bff, #0056b3);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
  font-weight: bold;
  color: white;
}

.process-step h5 {
  margin-bottom: 1rem;
  color: #333;
}

/* Connection lines between steps */
@media (min-width: 992px) {
  .process-step:not(:last-child)::after {
    content: '';
    position: absolute;
    top: 25px;
    right: -50%;
    width: 100%;
    height: 2px;
    background: linear-gradient(90deg, #007bff, transparent);
    z-index: -1;
  }
}

/* Mobile slider styles för services */
.services-slider-container {
  overflow: hidden;
  position: relative;
  width: 100%;
  touch-action: pan-y;
}

.services-slider {
  display: flex;
  transition: transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  will-change: transform;
  touch-action: pan-y;
  -webkit-overflow-scrolling: touch;
}

.service-slide {
  flex: 0 0 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 0 20px;
  box-sizing: border-box;
}

/* Slide indicators för services */
.services-indicators {
  display: flex;
  justify-content: center;
  gap: 10px;
}

.indicator {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: none;
  background: #dee2e6;
  cursor: pointer;
  transition: all 0.3s ease;
}

.indicator.active {
  background: #007bff;
  transform: scale(1.2);
}

.indicator:hover {
  background: #6c757d;
}

/* Förbättra touch-interaktion för services */
.services-slider-container {
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

.services-slider:not(.dragging) {
  transition: transform 0.4s cubic-bezier(0.23, 1, 0.32, 1);
}

@media (max-width: 767.98px) {
  .service-card {
    padding: 1.5rem;
  }
  
  .process-section {
    padding: 2rem 1rem;
  }
  
  .services-slider-container {
    margin: 0;
    padding: 0;
  }
  
  .service-slide {
    padding: 0 15px;
  }

  /* Se till att service-kortet centreras */
  .service-slide .service-card {
    width: 100%;
    max-width: 320px;
    margin: 0 auto;
  }
}
</style>
