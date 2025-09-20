<template>
  <section id="pricing" class="py-5 bg-light">
    <div class="container">
      <div class="row">
        <div class="col-lg-8 mx-auto text-center mb-5">
          <h2 class="display-5 fw-bold text-dark mb-3">
            {{ $t("pricing.title") }}
          </h2>
          <p class="lead text-muted">{{ 
            isBusiness 
              ? $t("pricing.subtitle.business") 
              : $t("pricing.subtitle.personal") 
          }}</p>

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
      <div class="row g-4 mb-5 m-1">
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
            <div>
              <Swiper
                :modules="[Pagination]"
                :slides-per-view="isMobile ? 1 : 3"
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
import { useViewportStore } from "../../stores/viewport";
import { storeToRefs } from "pinia";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Pagination } from "swiper/modules";

const { tm } = useI18n();

const appStore = useAppStore();
const { isBusiness } = storeToRefs(appStore);

const viewportStore = useViewportStore();
const { isMobile } = storeToRefs(viewportStore);

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
</style>
