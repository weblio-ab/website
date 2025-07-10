<template>
  <section id="services" class="py-5 bg-light" ref="sectionRef">
    <div class="container">
      <div class="row">
        <div class="col-lg-8 mx-auto text-center mb-5">
          <h2 class="display-5 fw-bold text-dark mb-3">{{ $t('services.title') }}</h2>
          <p class="lead text-muted">{{ $t('services.subtitle') }}</p>
        </div>
      </div>

      <!-- Service Cards - All devices (stacked on mobile, grid on desktop) -->
      <div class="row g-4 mb-5">
        <div class="col-md-6 col-lg-3">
          <div class="service-card h-100">
            <div class="service-icon">
              <i class="bi bi-palette"></i>
            </div>
            <h4>{{ $t('services.items.design.title') }}</h4>
            <p class="text-muted">{{ $t('services.items.design.description') }}</p>
          </div>
        </div>
        <div class="col-md-6 col-lg-3">
          <div class="service-card h-100">
            <div class="service-icon">
              <i class="bi bi-code-slash"></i>
            </div>
            <h4>{{ $t('services.items.development.title') }}</h4>
            <p class="text-muted">{{ $t('services.items.development.description') }}</p>
          </div>
        </div>
        <div class="col-md-6 col-lg-3">
          <div class="service-card h-100">
            <div class="service-icon">
              <i class="bi bi-cloud"></i>
            </div>
            <h4>{{ $t('services.items.hosting.title') }}</h4>
            <p class="text-muted">{{ $t('services.items.hosting.description') }}</p>
          </div>
        </div>
        <div class="col-md-6 col-lg-3">
          <div class="service-card h-100">
            <div class="service-icon">
              <i class="bi bi-headset"></i>
            </div>
            <h4>{{ $t('services.items.support.title') }}</h4>
            <p class="text-muted">{{ $t('services.items.support.description') }}</p>
          </div>
        </div>
      </div>

      <!-- Process Section -->
      <div class="row">
        <div class="col-12">
          <div class="process-section">
            <h3 class="text-center mb-5">{{ $t('services.process.title') }}</h3>
            
            <!-- Desktop Grid -->
            <div class="row g-4 d-none d-md-flex">
              <div class="col-md-6 col-lg-3" v-for="(step, idx) in 4" :key="idx">
                <div class="process-step text-center">
                  <div class="step-number">{{ idx + 1 }}</div>
                  <h5>{{ $t(`services.process.step${idx+1}.title`) }}</h5>
                  <p class="text-muted">{{ $t(`services.process.step${idx+1}.description`) }}</p>
                </div>
              </div>
            </div>

            <!-- Mobile Swiper -->
            <div class="d-md-none">
              <Swiper
                :modules="[Pagination]"
                :slides-per-view="1"
                :space-between="30"
                :pagination="{ clickable: true }"
                class="process-swiper"
              >
                <SwiperSlide v-for="(step, idx) in 4" :key="idx">
                  <div class="process-step text-center">
                    <div class="step-number">{{ idx + 1 }}</div>
                    <h5>{{ $t(`services.process.step${idx+1}.title`) }}</h5>
                    <p class="text-muted">{{ $t(`services.process.step${idx+1}.description`) }}</p>
                  </div>
                </SwiperSlide>
              </Swiper>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useIntersectionObserver } from '../../composables/useIntersectionObserver'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Pagination } from 'swiper/modules'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/pagination'

const { isVisible, target: sectionRef } = useIntersectionObserver(0.1)
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
  height: 100%;
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

/* Process Swiper customization */
.process-swiper {
  padding-bottom: 50px;
}

.process-swiper :deep(.swiper-pagination) {
  bottom: 10px;
}

.process-swiper :deep(.swiper-pagination-bullet) {
  background: #dee2e6;
  width: 12px;
  height: 12px;
  opacity: 1;
}

.process-swiper :deep(.swiper-pagination-bullet-active) {
  background: #007bff;
  transform: scale(1.2);
}

.process-swiper :deep(.swiper-slide) {
  height: auto;
  padding: 0 20px;
}

@media (max-width: 767.98px) {
  .service-card {
    padding: 1.5rem;
    margin-bottom: 1rem;
  }
  
  .process-section {
    padding: 2rem 1rem;
  }
}
</style>
