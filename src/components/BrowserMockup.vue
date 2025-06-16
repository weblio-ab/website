<template>
  <div class="mockup-browser">
    <div class="browser-header">
      <div class="browser-dots">
        <span></span>
        <span></span>
        <span></span>
      </div>
      <div v-if="url" class="browser-url">{{ displayUrl }}</div>
    </div>
    <div class="browser-content">
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  url: {
    type: String,
    default: ''
  }
})

// Remove protocol from URL for display
const displayUrl = computed(() => {
  if (!props.url) return 'webbenkelt.se'
  return props.url.replace(/^https?:\/\//, '')
})
</script>

<style scoped>
.mockup-browser {
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  width: 100%;
  height: 100%;
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
  overflow: hidden;
}
</style>
