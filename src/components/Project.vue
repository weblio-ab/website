<template>
  <div class="col-lg-4 col-md-6">
    <div class="portfolio-card">
      <div class="portfolio-image">
        <div class="mockup-browser">
          <div class="browser-header">
            <div class="browser-dots">
              <span></span>
              <span></span>
              <span></span>
            </div>
            <div class="browser-url">{{ displayUrl }}</div>
          </div>
          <div class="browser-content">
            <img 
              :src="imageUrl" 
              :alt="`${title} website screenshot`"
              class="project-image"
            />
          </div>
        </div>
        <div class="portfolio-overlay">
          <a 
            :href="url" 
            target="_blank" 
            rel="noopener noreferrer"
            class="btn btn-primary"
          >
            {{ $t('portfolio.viewProject') }}
          </a>
        </div>
      </div>
      <div class="portfolio-info">
        <span class="portfolio-category">{{ category }}</span>
        <h4>{{ title }}</h4>
        <p class="text-muted">{{ description }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
import { computed } from 'vue'

const { t } = useI18n()

const props = defineProps({
  category: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String,
    required: true
  }
})

// Remove protocol from URL for display
const displayUrl = computed(() => {
  return props.url.replace(/^https?:\/\//, '')
})
</script>

<style scoped>
.portfolio-card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 123, 255, 0.1);
  overflow: hidden;
  transition: all 0.3s ease;
}

.portfolio-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 30px rgba(0, 123, 255, 0.15);
}

.portfolio-image {
  position: relative;
  height: 250px;
  background: #f8f9fa;
  overflow: hidden;
}

.mockup-browser {
  width: 90%;
  height: 80%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.browser-header {
  height: 25px;
  background: #f1f3f5;
  border-bottom: 1px solid #e9ecef;
  display: flex;
  align-items: center;
  padding: 0 8px;
  gap: 8px;
}

.browser-dots {
  display: flex;
  gap: 4px;
}

.browser-dots span {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #dee2e6;
}

.browser-dots span:nth-child(1) { background: #ff5f56; }
.browser-dots span:nth-child(2) { background: #ffbd2e; }
.browser-dots span:nth-child(3) { background: #27ca3f; }

.browser-url {
  flex: 1;
  height: 15px;
  background: white;
  border-radius: 3px;
  font-size: 8px;
  display: flex;
  align-items: center;
  padding: 0 6px;
  color: #666;
}

.browser-content {
  height: calc(100% - 25px);
  padding: 0;
  overflow: hidden;
}

.project-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top;
}

.portfolio-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 123, 255, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.portfolio-card:hover .portfolio-overlay {
  opacity: 1;
}

.portfolio-info {
  padding: 1.5rem;
}

.portfolio-category {
  display: inline-block;
  padding: 0.25rem 0.75rem;
  background: rgba(0, 123, 255, 0.1);
  color: #007bff;
  border-radius: 20px;
  font-size: 0.875rem;
  font-weight: 500;
  margin-bottom: 0.5rem;
}

.portfolio-info h4 {
  margin-bottom: 0.5rem;
  color: #333;
}

@media (max-width: 767.98px) {
  .portfolio-image {
    height: 200px;
  }
  
  .portfolio-info {
    padding: 1rem;
  }
}
</style>
