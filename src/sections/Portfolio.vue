<template>
  <section id="portfolio" class="py-5">
    <div class="container">
      <div class="row">
        <div class="col-lg-8 mx-auto text-center mb-5">
          <h2 class="display-5 fw-bold text-dark mb-3">{{ $t('portfolio.title') }}</h2>
          <p class="lead text-muted">{{ $t('portfolio.subtitle') }}</p>
        </div>
      </div>

      <!-- Desktop Grid -->
      <div class="row g-4 d-none d-md-flex">
        <!-- Restaurant Project -->
        <Project
          :category="$t('portfolio.projects.restaurant.category')"
          :title="$t('portfolio.projects.restaurant.title')"
          :description="$t('portfolio.projects.restaurant.description')"
          url="https://bistrogota.se"
          image-url="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        />

        <!-- Salon Project -->
        <Project
          :category="$t('portfolio.projects.salon.category')"
          :title="$t('portfolio.projects.salon.title')"
          :description="$t('portfolio.projects.salon.description')"
          url="https://ameasalong.se"
          image-url="/assets/projects/ameasalong.png"
        />

        <!-- Construction Company Project -->
        <Project
          :category="$t('portfolio.projects.company.category')"
          :title="$t('portfolio.projects.company.title')"
          :description="$t('portfolio.projects.company.description')"
          url="https://byggfirmanord.se"
          image-url="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        />
      </div>

      <!-- Mobile Slider -->
      <div class="d-md-none">
        <div class="portfolio-slider-container">
          <div 
            ref="sliderRef" 
            class="portfolio-slider"
          >
            <div class="portfolio-slide">
              <Project
                :category="$t('portfolio.projects.restaurant.category')"
                :title="$t('portfolio.projects.restaurant.title')"
                :description="$t('portfolio.projects.restaurant.description')"
                url="https://bistrogota.se"
                image-url="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
              />
            </div>
            
            <div class="portfolio-slide">
              <Project
                :category="$t('portfolio.projects.salon.category')"
                :title="$t('portfolio.projects.salon.title')"
                :description="$t('portfolio.projects.salon.description')"
                url="https://ameasalong.se"
                image-url="/assets/projects/ameasalong.png"
              />
            </div>
            
            <div class="portfolio-slide">
              <Project
                :category="$t('portfolio.projects.company.category')"
                :title="$t('portfolio.projects.company.title')"
                :description="$t('portfolio.projects.company.description')"
                url="https://byggfirmanord.se"
                image-url="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
              />
            </div>
          </div>
        </div>
        
        <!-- Slide indicators -->
        <div class="portfolio-indicators mt-4">
          <button 
            v-for="(_, index) in 3" 
            :key="index"
            @click="goToSlide(index)"
            :class="['indicator', { active: currentSlide === index }]"
            :aria-label="`Gå till projekt ${index + 1}`"
          ></button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import Project from '../components/Project.vue'
import { useTouchSlider } from '../composables/useTouchSlider'

// Touch slider för mobil
const { 
  sliderRef, 
  currentSlide, 
  translateX, 
  goToSlide 
} = useTouchSlider(3, {
  itemsPerView: { mobile: 1, tablet: 2, desktop: 3 }
})
</script>

<style scoped>
/* Mobile slider styles */
.portfolio-slider-container {
  overflow: hidden;
  position: relative;
  width: 100%;
}

.portfolio-slider {
  display: flex;
  transition: transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  will-change: transform;
}

.portfolio-slide {
  flex: 0 0 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 0 20px;
  box-sizing: border-box;
}

/* Slide indicators */
.portfolio-indicators {
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

/* Förbättra touch-interaktion */
.portfolio-slider {
  touch-action: pan-x;
  -webkit-overflow-scrolling: touch;
}

.portfolio-slider-container {
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

/* Smooth transitions när inte dragging */
.portfolio-slider:not(.dragging) {
  transition: transform 0.4s cubic-bezier(0.23, 1, 0.32, 1);
}

@media (max-width: 767.98px) {
  .portfolio-slider-container {
    margin: 0;
    padding: 0;
  }
  
  .portfolio-slide {
    padding: 0 15px;
  }

  /* Se till att projekt-kortet centreras */
  .portfolio-slide :deep(.col-lg-4) {
    width: 100%;
    max-width: none;
  }
}
</style>
