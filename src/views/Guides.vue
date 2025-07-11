<template>
  <div class="guides-page">
    <!-- Main Content -->
    <div class="container py-5">
      <!-- Header -->
      <div class="row mb-5">
        <div class="col-lg-8 mx-auto text-center">
          <h1 class="display-5 fw-bold mb-3">{{ $t("guides.title") }}</h1>
          <p class="lead text-muted">{{ $t("guides.subtitle") }}</p>
        </div>
      </div>

      <!-- Category Filter -->
      <div class="row mb-4">
        <div class="col-12">
          <div
            class="category-filter d-flex flex-wrap justify-content-center gap-2"
          >
            <button
              @click="selectedCategory = 'all'"
              :class="[
                'btn',
                selectedCategory === 'all'
                  ? 'btn-primary'
                  : 'btn-outline-primary',
              ]"
            >
              {{ $t("common.viewAll") }}
            </button>
            <button
              v-for="category in guidesStore.categories"
              :key="category.key"
              @click="selectedCategory = category.key"
              :class="[
                'btn',
                selectedCategory === category.key
                  ? 'btn-primary'
                  : 'btn-outline-primary',
              ]"
            >
              {{ $t(`guides.categories.${category.key}`) }}
            </button>
          </div>
        </div>
      </div>

      <!-- Guides Grid -->
      <div class="row g-4">
        <div
          v-for="guide in filteredGuides"
          :key="guide.id"
          class="col-lg-6 col-xl-4"
        >
          <div class="guide-card h-100" @click="openGuide(guide.id)">
            <div class="guide-card-body">
              <div class="d-flex align-items-center mb-3">
                <div class="guide-icon me-3">
                  <i :class="guidesStore.getCategoryIcon(guide.category) + ' fs-4 text-primary'"></i>
                </div>
                <span class="badge bg-primary">{{
                  $t(`guides.categories.${guide.category}`)
                }}</span>
              </div>
              <h5 class="guide-title">{{ $t(`guides.${guide.id}.title`) }}</h5>
              <p class="guide-description text-muted">
                {{ $t(`guides.${guide.id}.description`) }}
              </p>
              <div class="guide-arrow">
                <i class="bi bi-arrow-right"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Guide Modal -->
    <div
      v-if="selectedGuide"
      class="modal fade show"
      style="display: block; background: rgba(0, 0, 0, 0.5)"
      @click.self="closeGuide"
    >
      <div class="modal-dialog modal-lg modal-dialog-scrollable">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">{{ $t(`guides.${selectedGuide.id}.title`) }}</h5>
            <button
              type="button"
              class="btn-close"
              @click="closeGuide"
            ></button>
          </div>
          <div class="modal-body">
            <!-- Dynamic component based on guide -->
            <component :is="guideComponents[selectedGuide.component]" />
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="closeGuide">
              {{ $t("common.close") }}
            </button>
            <router-link
              to="/#contact"
              class="btn btn-primary"
              @click="closeGuide"
            >
              <i class="bi bi-chat-dots me-2"></i>
              {{ $t("guides.needMoreHelp") }}
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useI18n } from "vue-i18n";
import { useGuidesStore } from "../stores/guides";

// Import all guide components
import EmailSetupGuide from "../components/guides/EmailSetupGuide.vue";
import WebmailGuide from "../components/guides/WebmailGuide.vue";
import BackupGuide from "../components/guides/BackupGuide.vue";
import FtpGuide from "../components/guides/FtpGuide.vue";

const { t } = useI18n();
const guidesStore = useGuidesStore();

// Register components for dynamic rendering
const guideComponents = {
  EmailSetupGuide,
  WebmailGuide,
  BackupGuide,
  FtpGuide
};

// State
const selectedCategory = ref("all");
const selectedGuide = ref(null);

// Computed
const filteredGuides = computed(() => {
  return guidesStore.getGuidesByCategory(selectedCategory.value);
});

// Methods
function openGuide(guideId) {
  selectedGuide.value = guidesStore.getGuideById(guideId);
  document.body.style.overflow = "hidden";
}

function closeGuide() {
  selectedGuide.value = null;
  document.body.style.overflow = "auto";
}
</script>

<style scoped>
.guides-page {
  min-height: 100vh;
  background: #f8f9fa;
}

.main-content {
  background: #f8f9fa;
  padding-top: 80px;
}

.category-filter .btn {
  border-radius: 25px;
  padding: 0.5rem 1.5rem;
  font-weight: 500;
  transition: all 0.3s ease;
}

.guide-card {
  background: white;
  border: none;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  cursor: pointer;
  overflow: hidden;
}

.guide-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 25px rgba(0, 123, 255, 0.15);
}

.guide-card-body {
  padding: 2rem;
  position: relative;
}

.guide-icon {
  width: 50px;
  height: 50px;
  background: rgba(0, 123, 255, 0.1);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.guide-title {
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 0.75rem;
}

.guide-description {
  font-size: 0.95rem;
  line-height: 1.6;
  margin-bottom: 1rem;
}

.guide-arrow {
  position: absolute;
  bottom: 1.5rem;
  right: 1.5rem;
  color: #007bff;
  font-size: 1.25rem;
  transition: transform 0.3s ease;
}

.guide-card:hover .guide-arrow {
  transform: translateX(5px);
}

.modal-content {
  border: none;
  border-radius: 12px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);
}

.modal-header {
  border-bottom: 1px solid #e9ecef;
  padding: 1.5rem 2rem;
}

.modal-body {
  padding: 2rem;
}

.steps-container {
  margin-top: 2rem;
}

.step-item {
  display: flex;
  margin-bottom: 2rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid #e9ecef;
}

.step-item:last-child {
  border-bottom: none;
  margin-bottom: 0;
  padding-bottom: 0;
}

.step-number {
  width: 40px;
  height: 40px;
  background: #007bff;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  margin-right: 1.5rem;
  flex-shrink: 0;
}

.step-content {
  flex: 1;
}

.step-title {
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 0.5rem;
}

.step-description {
  color: #6c757d;
  margin: 0;
  line-height: 1.6;
}

.modal-footer {
  border-top: 1px solid #e9ecef;
  padding: 1.5rem 2rem;
}

@media (max-width: 767.98px) {
  .main-content {
    padding-top: 60px;
  }

  .guide-card-body {
    padding: 1.5rem;
  }

  .modal-body {
    padding: 1.5rem;
  }

  .step-item {
    flex-direction: column;
    text-align: center;
  }

  .step-number {
    margin: 0 auto 1rem auto;
  }
}
</style>
