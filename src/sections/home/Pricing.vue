<template>
  <section id="pricing" class="py-5 bg-light">
    <div class="container">
      <div class="row">
        <div class="col-lg-8 mx-auto text-center mb-5">
          <h2 class="display-5 fw-bold text-dark mb-3">
            {{ $t("pricing.title") }}
          </h2>
          <p class="lead text-muted">{{ $t("pricing.subtitle") }}</p>

          <!-- Price Toggle -->
          <ToggleSwitch v-model="isAnnual">
            <template #falseText>{{ $t("pricing.toggle.monthly") }}</template>
            <template #trueText
              >{{ $t("pricing.toggle.annually") }}
              <span class="badge bg-success ms-1">{{
                $t("pricing.toggle.save")
              }}</span></template
            >
          </ToggleSwitch>
        </div>
      </div>

      <!-- Pricing Cards -->
      <div class="row g-4 mb-5">
        <PricingPackage
          :title="$t('pricing.packages.basic.title')"
          :price="getCurrentPrice('basic')['price']"
          :currency="getCurrentPrice('basic')['currency']"
          :description="$t('pricing.packages.basic.description')"
          :features="basicFeatures"
        />
        <PricingPackage
          :title="$t('pricing.packages.professional.title')"
          :price="getCurrentPrice('professional')['price']"
          :currency="getCurrentPrice('professional')['currency']"
          :description="$t('pricing.packages.professional.description')"
          :features="professionalFeatures"
          :mostPopular="true"
        />
        <PricingPackage
          :title="$t('pricing.packages.premium.title')"
          :price="getCurrentPrice('premium')['price']"
          :currency="getCurrentPrice('premium')['currency']"
          :description="$t('pricing.packages.premium.description')"
          :features="premiumFeatures"
        />
      </div>

      <!-- Pricing Information -->
      <div class="row">
        <div class="col-lg-8 mx-auto">
          <div class="recurring-costs">
            <h4 class="text-center mb-4">
              {{ $t("pricing.recurring.title") }}
            </h4>

            <!-- Desktop Grid -->
            <div class="row g-3 d-none d-md-flex">
              <div class="col-md-4 text-center">
                <div class="recurring-item">
                  <i class="bi bi-info-circle fs-3 text-primary mb-2"></i>
                  <p class="mb-0">{{ $t("pricing.recurring.hosting") }}</p>
                </div>
              </div>
              <div class="col-md-4 text-center">
                <div class="recurring-item">
                  <i class="bi bi-calendar-check fs-3 text-primary mb-2"></i>
                  <p class="mb-0">{{ $t("pricing.recurring.domain") }}</p>
                </div>
              </div>
              <div class="col-md-4 text-center">
                <div class="recurring-item">
                  <i class="bi bi-credit-card fs-3 text-primary mb-2"></i>
                  <p class="mb-0">{{ $t("pricing.recurring.support") }}</p>
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
                    <p class="mb-0">{{ $t("pricing.recurring.hosting") }}</p>
                  </div>
                </SwiperSlide>

                <SwiperSlide>
                  <div class="recurring-item text-center">
                    <i class="bi bi-calendar-check fs-3 text-primary mb-2"></i>
                    <p class="mb-0">{{ $t("pricing.recurring.domain") }}</p>
                  </div>
                </SwiperSlide>

                <SwiperSlide>
                  <div class="recurring-item text-center">
                    <i class="bi bi-credit-card fs-3 text-primary mb-2"></i>
                    <p class="mb-0">{{ $t("pricing.recurring.support") }}</p>
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
import ToggleSwitch from "../../components/ToggleSwitch.vue";
import PricingPackage from "../../components/PricingPackage.vue";
import { ref, computed } from "vue";
import { useI18n } from "vue-i18n";
import { useAppStore } from "../../stores/app";
import { storeToRefs } from "pinia";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Pagination } from "swiper/modules";

const { tm } = useI18n();

const appStore = useAppStore();
const { isBusiness } = storeToRefs(appStore);

// Pricing toggle states
const isAnnual = ref(false);

// Use tm() to get arrays directly from i18n
const basicFeatures = computed(() => tm("pricing.packages.basic.features"));
const professionalFeatures = computed(() =>
  tm("pricing.packages.professional.features")
);
const premiumFeatures = computed(() => tm("pricing.packages.premium.features"));

// Get current pricing based on customer type and billing cycle
const getCurrentPrice = (packageType) => {
  const customerType = isBusiness.value ? "business" : "private";
  const billingType = isAnnual.value ? "annual" : "monthly";
  return tm(`pricing.packages.${packageType}.${customerType}.${billingType}`);
};
</script>

<style scoped>
/* Customer Type Selector */
.customer-selector {
  background: white;
  padding: 2rem;
  border-radius: 20px;
  box-shadow: 0 4px 20px rgba(0, 123, 255, 0.1);
}

.customer-card {
  background: white;
  border: 2px solid #e9ecef;
  border-radius: 16px;
  padding: 2rem;
  text-align: center;
  transition: all 0.3s ease;
  cursor: pointer;
}

.customer-card:hover {
  border-color: #007bff;
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 123, 255, 0.15);
}

.customer-card.active {
  border-color: #007bff;
  background: linear-gradient(135deg, #f8f9ff, #e3f2fd);
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 123, 255, 0.2);
}

.customer-icon {
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, #007bff, #0056b3);
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.5rem;
  color: white;
  font-size: 2rem;
  transition: all 0.3s ease;
}

.customer-card.active .customer-icon {
  transform: scale(1.1);
  box-shadow: 0 4px 15px rgba(0, 123, 255, 0.3);
}

.customer-card h5 {
  margin-bottom: 1rem;
  color: #333;
  font-weight: 600;
}

.customer-card p {
  margin-bottom: 0;
  line-height: 1.6;
  font-size: 0.95rem;
}

.cursor-pointer {
  cursor: pointer;
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
}
.recurring-item:hover {
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

@media (max-width: 767.98px) {
  .customer-selector {
    padding: 1.5rem;
  }

  .customer-card {
    padding: 1.5rem;
    margin-bottom: 1rem;
  }

  .customer-icon {
    width: 60px;
    height: 60px;
    font-size: 1.5rem;
    border-radius: 15px;
  }

  .customer-card h5 {
    font-size: 1.1rem;
  }

  .customer-card p {
    font-size: 0.9rem;
  }

  .amount {
    font-size: 2.5rem;
  }

  .recurring-costs {
    padding: 1.5rem;
  }
}
</style>
