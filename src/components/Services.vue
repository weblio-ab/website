<template>
  <section id="services" class="py-5 bg-light" ref="sectionRef">
    <div class="container">
      <div class="row">
        <div class="col-lg-8 mx-auto text-center mb-5" :class="{ 'fade-in-up': isVisible }">
          <h2 class="display-5 fw-bold text-dark mb-3">{{ $t('services.title') }}</h2>
          <p class="lead text-muted">{{ $t('services.subtitle') }}</p>
        </div>
      </div>

      <!-- Service Cards -->
      <div class="row g-4 mb-5">
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

      <!-- Process Section -->
      <div class="row">
        <div class="col-12">
          <div class="process-section" :class="{ 'fade-in-up': isVisible }" style="animation-delay: 0.5s">
            <h3 class="text-center mb-5">{{ $t('services.process.title') }}</h3>
            <div class="row g-4">
              <div class="col-md-6 col-lg-3">
                <div class="process-step text-center">
                  <div class="step-number">1</div>
                  <h5>{{ $t('services.process.step1.title') }}</h5>
                  <p class="text-muted">{{ $t('services.process.step1.description') }}</p>
                </div>
              </div>
              <div class="col-md-6 col-lg-3">
                <div class="process-step text-center">
                  <div class="step-number">2</div>
                  <h5>{{ $t('services.process.step2.title') }}</h5>
                  <p class="text-muted">{{ $t('services.process.step2.description') }}</p>
                </div>
              </div>
              <div class="col-md-6 col-lg-3">
                <div class="process-step text-center">
                  <div class="step-number">3</div>
                  <h5>{{ $t('services.process.step3.title') }}</h5>
                  <p class="text-muted">{{ $t('services.process.step3.description') }}</p>
                </div>
              </div>
              <div class="col-md-6 col-lg-3">
                <div class="process-step text-center">
                  <div class="step-number">4</div>
                  <h5>{{ $t('services.process.step4.title') }}</h5>
                  <p class="text-muted">{{ $t('services.process.step4.description') }}</p>
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

@media (max-width: 767.98px) {
  .service-card {
    padding: 1.5rem;
  }
  
  .process-section {
    padding: 2rem 1rem;
  }
}
</style>
