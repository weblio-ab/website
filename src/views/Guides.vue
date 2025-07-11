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
            <component 
              :is="guideComponents[selectedGuide.component]" 
              :url-params="selectedGuide.urlParams"
              ref="currentGuideComponent"
            />
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
import { ref, computed, onMounted, onBeforeUnmount, watch, nextTick } from "vue";
import { useI18n } from "vue-i18n";
import { useRoute, useRouter } from "vue-router";
import { useGuidesStore } from "../stores/guides";

// Import all guide components
import EmailSetupGuide from "../components/guides/EmailSetupGuide.vue";
import WebmailGuide from "../components/guides/WebmailGuide.vue";
import BackupGuide from "../components/guides/BackupGuide.vue";
import FtpGuide from "../components/guides/FtpGuide.vue";

const { t } = useI18n();
const route = useRoute();
const router = useRouter();
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
const currentGuideComponent = ref(null); // Reference to current guide component

// Computed
const filteredGuides = computed(() => {
  return guidesStore.getGuidesByCategory(selectedCategory.value);
});

// Methods
function openGuide(guideId, device = null, client = null) {
  const guide = guidesStore.getGuideById(guideId);
  if (guide) {
    selectedGuide.value = guide;
    document.body.style.overflow = "hidden";
    
    // Reset guide state when opening (unless from URL with specific parameters)
    if (!device && !client) {
      // Give Vue a tick to render the component before calling reset
      nextTick(() => {
        if (currentGuideComponent.value && typeof currentGuideComponent.value.resetGuide === 'function') {
          currentGuideComponent.value.resetGuide();
        }
      });
    }
    
    // Build the URL based on available parameters
    let url = `/guides/${guideId}`;
    if (device) {
      url += `/${device}`;
      if (client) {
        url += `/${client}`;
      }
    }
    
    // Update URL if we're not already on the correct route
    if (route.fullPath !== url) {
      router.push(url);
    }
  }
}

function closeGuide() {
  selectedGuide.value = null;
  document.body.style.overflow = "auto";
  
  // Navigate back to guides list only if we're currently on a specific guide
  if (route.params.guideId) {
    router.push('/guides');
  }
}

// Handle keyboard events
function handleKeydown(event) {
  if (event.key === 'Escape' && selectedGuide.value) {
    closeGuide();
  }
}

// Watch for route parameter changes
watch(() => [route.params.guideId, route.params.device, route.params.client], ([newGuideId, newDevice, newClient]) => {
  if (newGuideId) {
    const guide = guidesStore.getGuideById(newGuideId);
    if (guide) {
      const isNewGuide = !selectedGuide.value || selectedGuide.value.id !== newGuideId;
      
      selectedGuide.value = guide;
      document.body.style.overflow = "hidden";
      
      // Update page title for SEO and browser tab
      const guideTitle = t(`guides.${guide.id}.title`);
      document.title = `${guideTitle} - ${t('guides.title')} - Weblio`;
      
      // If we have device/client parameters, we need to pass them to the guide component
      if (newDevice || newClient) {
        // Store the URL parameters for the guide component to use
        selectedGuide.value.urlParams = {
          device: newDevice,
          client: newClient
        };
      } else if (isNewGuide) {
        // Reset guide if it's a new guide and no URL parameters
        nextTick(() => {
          if (currentGuideComponent.value && typeof currentGuideComponent.value.resetGuide === 'function') {
            currentGuideComponent.value.resetGuide();
          }
        });
      }
    } else {
      // Invalid guide ID, redirect to guides list
      router.push('/guides');
    }
  } else {
    // No guide ID in route, close any open guide
    selectedGuide.value = null;
    document.body.style.overflow = "auto";
    
    // Reset page title
    document.title = `${t('guides.title')} - Weblio`;
  }
}, { immediate: true });

// Handle initial mount
onMounted(() => {
  // The watch handler with immediate: true will handle the initial route
  // Add keyboard listener
  document.addEventListener('keydown', handleKeydown);
});

// Cleanup on unmount
onBeforeUnmount(() => {
  // Restore scroll behavior when leaving the page
  document.body.style.overflow = "auto";
  // Remove keyboard listener
  document.removeEventListener('keydown', handleKeydown);
});
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
