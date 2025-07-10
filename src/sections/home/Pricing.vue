<template>
  <section id="pricing" class="py-5 bg-light">
    <div class="container">
      <div class="row">
        <div class="col-lg-8 mx-auto text-center mb-5">
          <h2 class="display-5 fw-bold text-dark mb-3">{{ $t('pricing.title') }}</h2>
          <p class="lead text-muted">{{ $t('pricing.subtitle') }}</p>
          
          <!-- Price Toggle -->
          <div class="pricing-toggle d-inline-flex bg-white rounded-pill p-1 mb-4">
            <button 
              @click="isAnnual = false" 
              :class="['btn', 'btn-sm', 'px-4', 'rounded-pill', !isAnnual ? 'btn-primary' : 'btn-light']"
            >
              {{ $t('pricing.toggle.monthly') }}
            </button>
            <button 
              @click="isAnnual = true" 
              :class="['btn', 'btn-sm', 'px-4', 'rounded-pill', isAnnual ? 'btn-primary' : 'btn-light']"
            >
              {{ $t('pricing.toggle.annually') }} <span class="badge bg-success ms-1">{{ $t('pricing.toggle.save') }}</span>
            </button>
          </div>
        </div>
      </div>

      <!-- Pricing Cards -->
      <div class="row g-4 mb-5">
        <!-- Email Package -->
        <div class="col-lg-4">
          <div class="pricing-card h-100">
            <div class="pricing-header">
              <h3>{{ $t('pricing.packages.basic.title') }}</h3>
              <div class="price">
                <span class="amount">
                  {{ isAnnual ? $t('pricing.packages.basic.priceAnnual') : $t('pricing.packages.basic.price') }}
                </span>
                <span class="currency">
                  {{ isAnnual ? $t('pricing.packages.basic.currencyAnnual') : $t('pricing.packages.basic.currency') }}
                </span>
              </div>
              <p class="text-muted">{{ $t('pricing.packages.basic.description') }}</p>
            </div>
            <div class="pricing-features">
              <ul class="list-unstyled">
                <li v-for="feature in basicFeatures" :key="feature">
                  <i class="bi bi-check-circle-fill text-primary"></i>
                  <span>{{ feature }}</span>
                </li>
              </ul>
            </div>
            <div class="pricing-footer">
              <router-link class="btn btn-outline-primary w-100" to="/#contact">{{ $t('common.getStarted') }}</router-link>
            </div>
          </div>
        </div>

        <!-- Start Package -->
        <div class="col-lg-4">
          <div class="pricing-card h-100 popular">
            <div class="popular-badge">{{ $t('pricing.popular') }}</div>
            <div class="pricing-header">
              <h3>{{ $t('pricing.packages.professional.title') }}</h3>
              <div class="price">
                <span class="amount">
                  {{ isAnnual ? $t('pricing.packages.professional.priceAnnual') : $t('pricing.packages.professional.price') }}
                </span>
                <span class="currency">
                  {{ isAnnual ? $t('pricing.packages.professional.currencyAnnual') : $t('pricing.packages.professional.currency') }}
                </span>
              </div>
              <p class="text-muted">{{ $t('pricing.packages.professional.description') }}</p>
            </div>
            <div class="pricing-features">
              <ul class="list-unstyled">
                <li v-for="feature in professionalFeatures" :key="feature">
                  <i class="bi bi-check-circle-fill text-primary"></i>
                  <span>{{ feature }}</span>
                </li>
              </ul>
            </div>
            <div class="pricing-footer">
              <router-link class="btn btn-primary w-100" to="/#contact">{{ $t('common.getStarted') }}</router-link>
            </div>
          </div>
        </div>

        <!-- Start Premium Package -->
        <div class="col-lg-4">
          <div class="pricing-card h-100">
            <div class="pricing-header">
              <h3>{{ $t('pricing.packages.premium.title') }}</h3>
              <div class="price">
                <span class="amount">
                  {{ isAnnual ? $t('pricing.packages.premium.priceAnnual') : $t('pricing.packages.premium.price') }}
                </span>
                <span class="currency">
                  {{ isAnnual ? $t('pricing.packages.premium.currencyAnnual') : $t('pricing.packages.premium.currency') }}
                </span>
              </div>
              <p class="text-muted">{{ $t('pricing.packages.premium.description') }}</p>
            </div>
            <div class="pricing-features">
              <ul class="list-unstyled">
                <li v-for="feature in premiumFeatures" :key="feature">
                  <i class="bi bi-check-circle-fill text-primary"></i>
                  <span>{{ feature }}</span>
                </li>
              </ul>
            </div>
            <div class="pricing-footer">
              <router-link class="btn btn-outline-primary w-100" to="/#contact">{{ $t('common.getStarted') }}</router-link>
            </div>
          </div>
        </div>
      </div>

      <!-- Pricing Information -->
      <div class="row">
        <div class="col-lg-8 mx-auto">
          <div class="recurring-costs">
            <h4 class="text-center mb-4">{{ $t('pricing.recurring.title') }}</h4>
            
            <!-- Desktop Grid -->
            <div class="row g-3 d-none d-md-flex">
              <div class="col-md-4 text-center">
                <div class="recurring-item">
                  <i class="bi bi-info-circle fs-3 text-primary mb-2"></i>
                  <p class="mb-0">{{ $t('pricing.recurring.hosting') }}</p>
                </div>
              </div>
              <div class="col-md-4 text-center">
                <div class="recurring-item">
                  <i class="bi bi-calendar-check fs-3 text-primary mb-2"></i>
                  <p class="mb-0">{{ $t('pricing.recurring.domain') }}</p>
                </div>
              </div>
              <div class="col-md-4 text-center">
                <div class="recurring-item">
                  <i class="bi bi-credit-card fs-3 text-primary mb-2"></i>
                  <p class="mb-0">{{ $t('pricing.recurring.support') }}</p>
                </div>
              </div>
            </div>

            <!-- Mobile Swiper -->
            <div class="d-md-none">
              <Swiper
                :modules="[Pagination]"
                :slides-per-view="1"
                :space-between="20"
                :pagination="{ clickable: true }"
                class="recurring-swiper"
              >
                <SwiperSlide>
                  <div class="recurring-item text-center">
                    <i class="bi bi-info-circle fs-3 text-primary mb-2"></i>
                    <p class="mb-0">{{ $t('pricing.recurring.hosting') }}</p>
                  </div>
                </SwiperSlide>
                
                <SwiperSlide>
                  <div class="recurring-item text-center">
                    <i class="bi bi-calendar-check fs-3 text-primary mb-2"></i>
                    <p class="mb-0">{{ $t('pricing.recurring.domain') }}</p>
                  </div>
                </SwiperSlide>
                
                <SwiperSlide>
                  <div class="recurring-item text-center">
                    <i class="bi bi-credit-card fs-3 text-primary mb-2"></i>
                    <p class="mb-0">{{ $t('pricing.recurring.support') }}</p>
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
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Pagination } from 'swiper/modules'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/pagination'

const { tm } = useI18n()

// Pricing toggle state
const isAnnual = ref(false)

// Use tm() to get arrays directly from i18n
const basicFeatures = computed(() => tm('pricing.packages.basic.features'))
const professionalFeatures = computed(() => tm('pricing.packages.professional.features'))
const premiumFeatures = computed(() => tm('pricing.packages.premium.features'))
</script>

<style scoped>
.pricing-toggle {
  box-shadow: 0 2px 10px rgba(0, 123, 255, 0.1);
  border: 1px solid #e9ecef;
}

.pricing-toggle .btn {
  border: none;
  transition: all 0.3s ease;
}

.pricing-toggle .btn:focus {
  box-shadow: none;
}

.pricing-card {
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 123, 255, 0.1);
  padding: 2rem;
  position: relative;
  transition: all 0.3s ease;
  border: 2px solid transparent;
  display: flex;
  flex-direction: column;
}

.pricing-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 30px rgba(0, 123, 255, 0.15);
}

.pricing-card.popular {
  border-color: #007bff;
  transform: scale(1.05);
}

.pricing-card.popular:hover {
  transform: scale(1.05) translateY(-5px);
}

.popular-badge {
  position: absolute;
  top: -12px;
  left: 50%;
  transform: translateX(-50%);
  background: linear-gradient(135deg, #007bff, #0056b3);
  color: white;
  padding: 0.5rem 1.5rem;
  border-radius: 20px;
  font-size: 0.875rem;
  font-weight: 600;
}

.pricing-header {
  text-align: center;
  margin-bottom: 2rem;
}

.pricing-header h3 {
  margin-bottom: 1rem;
  color: #333;
}

.price {
  margin-bottom: 1rem;
}

.amount {
  font-size: 3rem;
  font-weight: bold;
  color: #007bff;
  line-height: 1;
}

.currency {
  font-size: 1.25rem;
  color: #666;
  margin-left: 0.5rem;
}

.pricing-features {
  margin-bottom: 2rem;
  flex: 1;
}

.pricing-footer {
  margin-top: auto;
}

.pricing-features ul {
  margin: 0;
}

.pricing-features li {
  padding: 0.5rem 0;
  border-bottom: 1px solid #f8f9fa;
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
}

.pricing-features li i {
  flex-shrink: 0;
  margin-top: 0.125rem;
}

.pricing-features li:last-child {
  border-bottom: none;
}

.recurring-costs {
  background: white;
  padding: 2rem;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 123, 255, 0.08);
}

.recurring-item {
  padding: 1.5rem;
  border-radius: 12px;
  background: #f8f9ff;
  transition: all 0.3s ease;
  height: 140px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.recurring-item i {
  margin-bottom: 1rem;
  flex-shrink: 0;
}

.recurring-item p {
  margin: 0;
  line-height: 1.3;
  font-size: 0.9rem;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  word-wrap: break-word;
  hyphens: auto;
}  .recurring-item:hover {
    background: #e3f2fd;
    transform: translateY(-2px);
  }

  /* Recurring Swiper customization */
  .recurring-swiper {
    padding-bottom: 50px;
  }

  .recurring-swiper :deep(.swiper-pagination) {
    bottom: 10px;
  }

  .recurring-swiper :deep(.swiper-pagination-bullet) {
    background: #dee2e6;
    width: 12px;
    height: 12px;
    opacity: 1;
  }

  .recurring-swiper :deep(.swiper-pagination-bullet-active) {
    background: #007bff;
    transform: scale(1.2);
  }

  .recurring-swiper :deep(.swiper-slide) {
    height: auto;
    padding: 0 15px;
  }

@media (max-width: 991.98px) {
  .pricing-card.popular {
    transform: none;
    margin-bottom: 2rem;
  }
  
  .pricing-card.popular:hover {
    transform: translateY(-5px);
  }
}

@media (max-width: 767.98px) {
  .pricing-card {
    padding: 1.5rem;
  }
  
  .amount {
    font-size: 2.5rem;
  }
  
  .recurring-costs {
    padding: 1.5rem;
  }
  
  .pricing-toggle {
    flex-direction: row;
    width: 80%;
    margin: 0 auto;
  }
  
  .pricing-toggle .btn {
    margin: 0;
    padding: 0.375rem 1rem;
    font-size: 0.8rem;
    flex: 1;
  }
  
  /* Mer marginal mellan Populärast och priset */
  .popular-badge {
    margin-bottom: 1rem;
  }
  
  .pricing-card.popular .pricing-header {
    margin-top: 1rem;
  }
  
  /* Textjustering för features - bätter linjering */
  .pricing-features li {
    display: flex;
    align-items: flex-start;
    gap: 0.5rem;
    padding: 0.5rem 0;
    border-bottom: 1px solid #f8f9fa;
  }

  .pricing-features li i {
    flex-shrink: 0;
    margin-top: 0.125rem;
  }
  
  .pricing-features li i {
    margin-top: 0.25rem;
    flex-shrink: 0;
  }
}
</style>
