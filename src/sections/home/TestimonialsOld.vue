<template>
  <section id="testimonials" class="py-5">
    <div class="container">
      <div class="row">
        <div class="col-lg-8 mx-auto text-center mb-5">
          <h2 class="display-5 fw-bold text-dark mb-3">{{ $t('testimonials.title') }}</h2>
        </div>
      </div>      <!-- Desktop Grid -->
      <div class="row g-4 d-none d-md-flex">
        <div class="col-lg-4 col-md-6">
          <Testimonial 
            :text="$t('testimonials.items.testimonial1.text')"
            :author="$t('testimonials.items.testimonial1.author')"
            :company="$t('testimonials.items.testimonial1.company')"
          />
        </div>

        <div class="col-lg-4 col-md-6">
          <Testimonial 
            :text="$t('testimonials.items.testimonial2.text')"
            :author="$t('testimonials.items.testimonial2.author')"
            :company="$t('testimonials.items.testimonial2.company')"
          />
        </div>

        <div class="col-lg-4 col-md-6">
          <Testimonial 
            :text="$t('testimonials.items.testimonial3.text')"
            :author="$t('testimonials.items.testimonial3.author')"
            :company="$t('testimonials.items.testimonial3.company')"
          />
        </div>
      </div>

      <!-- Mobile Slider -->
      <div class="d-md-none">
        <Swiper
          :modules="[Pagination]"
          :slides-per-view="1"
          :space-between="20"
          :pagination="{ clickable: true }"
          class="testimonials-swiper"
        >
          <SwiperSlide>
            <Testimonial 
              :text="$t('testimonials.items.testimonial1.text')"
              :author="$t('testimonials.items.testimonial1.author')"
              :company="$t('testimonials.items.testimonial1.company')"
            />
          </SwiperSlide>
          
          <SwiperSlide>
            <Testimonial 
              :text="$t('testimonials.items.testimonial2.text')"
              :author="$t('testimonials.items.testimonial2.author')"
              :company="$t('testimonials.items.testimonial2.company')"
            />
          </SwiperSlide>
          
          <SwiperSlide>
            <Testimonial 
              :text="$t('testimonials.items.testimonial3.text')"
              :author="$t('testimonials.items.testimonial3.author')"
              :company="$t('testimonials.items.testimonial3.company')"
            />
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  </section>
</template>

<script setup>
import Testimonial from '../../components/Testimonial.vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Pagination } from 'swiper/modules'
</script>

<style scoped>
/* Mobile slider styles */
.testimonials-slider-container {
  overflow: hidden;
  position: relative;
  width: 100%;
  touch-action: pan-y;
}

.testimonials-slider {
  display: flex;
  transition: transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  will-change: transform;
  touch-action: pan-y;
  -webkit-overflow-scrolling: touch;
}

.testimonial-slide {
  flex: 0 0 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 0 20px;
  box-sizing: border-box;
}

/* Slide indicators */
.testimonials-indicators {
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
.testimonials-slider-container {
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

/* Smooth transitions */
.testimonials-slider:not(.dragging) {
  transition: transform 0.4s cubic-bezier(0.23, 1, 0.32, 1);
}

@media (max-width: 767.98px) {
  .testimonials-slider-container {
    margin: 0;
    padding: 0;
  }
  
  .testimonial-slide {
    padding: 0 15px;
  }

  /* Se till att testimonial kortet tar full bredd */
  .testimonial-slide :deep(.testimonial-card) {
    width: 100%;
    max-width: none;
  }
}
</style>
