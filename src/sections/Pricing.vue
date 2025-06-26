<template>
  <section id="pricing" class="py-5 bg-light">
    <div class="container">
      <div class="row">
        <div class="col-lg-8 mx-auto text-center mb-5">
          <h2 class="display-5 fw-bold text-dark mb-3">{{ $t('pricing.title') }}</h2>
          <p class="lead text-muted">{{ $t('pricing.subtitle') }}</p>
        </div>
      </div>

      <!-- Pricing Cards -->
      <div class="row g-4 mb-5">
        <!-- Basic Package -->
        <div class="col-lg-4">
          <div class="pricing-card h-100">
            <div class="pricing-header">
              <h3>{{ $t('pricing.packages.basic.title') }}</h3>
              <div class="price">
                <span class="amount">{{ $t('pricing.packages.basic.price') }}</span>
                <span class="currency">{{ $t('pricing.packages.basic.currency') }}</span>
              </div>
              <p class="text-muted">{{ $t('pricing.packages.basic.description') }}</p>
            </div>
            <div class="pricing-features">
              <ul class="list-unstyled">
                <li v-for="feature in basicFeatures" :key="feature">
                  <i class="bi bi-check-circle-fill text-success me-2"></i>
                  {{ feature }}
                </li>
              </ul>
            </div>
            <div class="pricing-footer">
              <a href="#contact" class="btn btn-outline-primary w-100">{{ $t('common.getStarted') }}</a>
            </div>
          </div>
        </div>

        <!-- Professional Package -->
        <div class="col-lg-4">
          <div class="pricing-card h-100 popular">
            <div class="popular-badge">Populärast</div>
            <div class="pricing-header">
              <h3>{{ $t('pricing.packages.professional.title') }}</h3>
              <div class="price">
                <span class="amount">{{ $t('pricing.packages.professional.price') }}</span>
                <span class="currency">{{ $t('pricing.packages.professional.currency') }}</span>
              </div>
              <p class="text-muted">{{ $t('pricing.packages.professional.description') }}</p>
            </div>
            <div class="pricing-features">
              <ul class="list-unstyled">
                <li v-for="feature in professionalFeatures" :key="feature">
                  <i class="bi bi-check-circle-fill text-success me-2"></i>
                  {{ feature }}
                </li>
              </ul>
            </div>
            <div class="pricing-footer">
              <a href="#contact" class="btn btn-primary w-100">{{ $t('common.getStarted') }}</a>
            </div>
          </div>
        </div>

        <!-- Premium Package -->
        <div class="col-lg-4">
          <div class="pricing-card h-100">
            <div class="pricing-header">
              <h3>{{ $t('pricing.packages.premium.title') }}</h3>
              <div class="price">
                <span class="amount">{{ $t('pricing.packages.premium.price') }}</span>
                <span class="currency">{{ $t('pricing.packages.premium.currency') }}</span>
              </div>
              <p class="text-muted">{{ $t('pricing.packages.premium.description') }}</p>
            </div>
            <div class="pricing-features">
              <ul class="list-unstyled">
                <li v-for="feature in premiumFeatures" :key="feature">
                  <i class="bi bi-check-circle-fill text-success me-2"></i>
                  {{ feature }}
                </li>
              </ul>
            </div>
            <div class="pricing-footer">
              <a href="#contact" class="btn btn-outline-primary w-100">{{ $t('common.getStarted') }}</a>
            </div>
          </div>
        </div>
      </div>

      <!-- Recurring Costs -->
      <div class="row">
        <div class="col-lg-8 mx-auto">
          <div class="recurring-costs">
            <h4 class="text-center mb-4">{{ $t('pricing.recurring.title') }}</h4>
            <div class="row g-3">
              <div class="col-md-4 text-center">
                <div class="recurring-item">
                  <i class="bi bi-cloud-arrow-up fs-3 text-primary mb-2"></i>
                  <p class="mb-0">{{ $t('pricing.recurring.hosting') }}</p>
                </div>
              </div>
              <div class="col-md-4 text-center">
                <div class="recurring-item">
                  <i class="bi bi-globe fs-3 text-primary mb-2"></i>
                  <p class="mb-0">{{ $t('pricing.recurring.domain') }}</p>
                </div>
              </div>
              <div class="col-md-4 text-center">
                <div class="recurring-item">
                  <i class="bi bi-headset fs-3 text-primary mb-2"></i>
                  <p class="mb-0">{{ $t('pricing.recurring.support') }}</p>
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
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { tm } = useI18n()

// Use tm() to get arrays directly from i18n
const basicFeatures = computed(() => tm('pricing.packages.basic.features'))
const professionalFeatures = computed(() => tm('pricing.packages.professional.features'))
const premiumFeatures = computed(() => tm('pricing.packages.premium.features'))
</script>

<style scoped>
.pricing-card {
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 123, 255, 0.1);
  padding: 2rem;
  position: relative;
  transition: all 0.3s ease;
  border: 2px solid transparent;
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
}

.pricing-features ul {
  margin: 0;
}

.pricing-features li {
  padding: 0.5rem 0;
  border-bottom: 1px solid #f8f9fa;
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
  padding: 1rem;
  border-radius: 12px;
  background: #f8f9ff;
  transition: all 0.3s ease;
}

.recurring-item:hover {
  background: #e3f2fd;
  transform: translateY(-2px);
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
}
</style>
