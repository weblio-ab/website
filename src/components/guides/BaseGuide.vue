<template>
  <div class="guide-content">
    <p class="lead mb-4">{{ $t(`guides.${guideId}.intro`) }}</p>
    
    <!-- Custom content slot -->
    <slot />
    
    <!-- Default steps if no custom content -->
    <div v-if="!$slots.default && steps" class="steps-container">
      <div
        v-for="(step, index) in steps"
        :key="index"
        class="step-item"
      >
        <div class="step-number">{{ index + 1 }}</div>
        <div class="step-content">
          <h6 class="step-title">{{ step.title }}</h6>
          <p class="step-description">{{ step.description }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  guideId: {
    type: String,
    required: true
  },
  steps: {
    type: Array,
    default: () => []
  }
})
</script>

<style scoped>
.guide-content {
  padding: 0;
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

/* Image styles */
.guide-image {
  max-width: 100%;
  height: auto;
  border-radius: 8px;
  margin: 1rem 0;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.image-caption {
  font-size: 0.9rem;
  color: #6c757d;
  text-align: center;
  margin-top: 0.5rem;
  font-style: italic;
}

/* Alert styles */
.guide-alert {
  padding: 1rem;
  margin: 1.5rem 0;
  border-radius: 8px;
  border-left: 4px solid;
}

.guide-alert.info {
  background: #e7f3ff;
  border-color: #007bff;
  color: #004085;
}

.guide-alert.warning {
  background: #fff3cd;
  border-color: #ffc107;
  color: #856404;
}

.guide-alert.success {
  background: #d4edda;
  border-color: #28a745;
  color: #155724;
}

.guide-alert.danger {
  background: #f8d7da;
  border-color: #dc3545;
  color: #721c24;
}

.guide-alert-icon {
  margin-right: 0.5rem;
}

/* Code block styles */
.guide-code-block {
  background: #f8f9fa;
  border: 1px solid #e9ecef;
  border-radius: 8px;
  padding: 1rem;
  margin: 1rem 0;
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  font-size: 0.9rem;
  overflow-x: auto;
}

.guide-code-block pre {
  margin: 0;
  white-space: pre-wrap;
  word-wrap: break-word;
}

.guide-code-block code {
  color: #e83e8c;
  background: none;
  padding: 0;
}

@media (max-width: 767.98px) {
  .step-item {
    flex-direction: column;
    text-align: center;
  }
  
  .step-number {
    margin: 0 auto 1rem auto;
  }
  
  .guide-code-block {
    font-size: 0.8rem;
  }
}
</style>
