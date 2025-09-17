<template>
  <div>
    <div class="portfolio-card">
      <div class="portfolio-image">
        <div class="portfolio-browser-wrapper">
          <WindowMockup :url="url">
            <img 
              :src="imageUrl" 
              :alt="`${title} website screenshot`"
              class="project-image"
            />
          </WindowMockup>
        </div>
        <div v-if="!disableLink" class="portfolio-overlay">
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
import WindowMockup from './WindowMockup.vue'

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
  },
  disableLink: {
    type: Boolean,
    default: false
  }
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

.portfolio-browser-wrapper {
  width: 90%;
  height: 80%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
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
  pointer-events: none; /* Låt touch events gå igenom när overlay inte syns */
}

.portfolio-card:hover .portfolio-overlay {
  opacity: 1;
  pointer-events: auto; /* Aktivera endast när synlig */
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
