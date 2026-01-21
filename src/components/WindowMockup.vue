<template>
  <div class="mockup-window" :class="[`theme-${theme}`, { 'code-window': isCode }]">
    <div class="window-header">
      <div class="window-dots">
        <span></span>
        <span></span>
        <span></span>
      </div>
      <div v-if="url || title" class="window-title-area">
        <div v-if="isCode" class="window-title">{{ title || 'main.js' }}</div>
        <div v-else class="browser-url">{{ displayUrl }}</div>
      </div>
    </div>
    <div class="window-content">
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
  },
  title: {
    type: String,
    default: ''
  },
  theme: {
    type: String,
    default: 'light',
    validator: (value) => ['light', 'dark'].includes(value)
  },
  type: {
    type: String,
    default: 'browser',
    validator: (value) => ['browser', 'code'].includes(value)
  }
})

const isCode = computed(() => props.type === 'code')

// Remove protocol from URL for display
const displayUrl = computed(() => {
  if (!props.url) return 'weblio.se'
  return props.url.replace(/^https?:\/\//, '')
})
</script>

<style scoped>
.mockup-window {
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  width: 100%;
  height: 100%;
}

.code-window {
  border-radius: 12px;
  max-width: 400px;
}

.window-header {
  height: 25px;
  display: flex;
  align-items: center;
  padding: 0 8px;
  gap: 8px;
}

.window-dots span {
  width: 6px;
  height: 6px;
  border-radius: 50%;
}

.browser-url {
  flex: 1;
  height: 15px;
  border-radius: 3px;
  font-size: 8px;
  display: flex;
  align-items: center;
  padding: 0 6px;
  background: white;
  color: #666;
}

.window-title {
  color: #cccccc;
  font-size: 0.875rem;
}

/* Window Dots */
.window-dots {
  display: flex;
  gap: 0.3rem;
}

.window-dots span {
  width: 8px;
  height: 8px;
  border-radius: 50%;
}

.window-dots span:nth-child(1) { background: #ff5f56; }
.window-dots span:nth-child(2) { background: #ffbd2e; }
.window-dots span:nth-child(3) { background: #27ca3f; }

/* Window content */

.window-content {
  height: calc(100% - 25px);
  overflow: hidden;
}

.window-content {
  height: calc(100% - 60px);
}

.window-title-area {
  flex: 1;
}

/* Light theme (browser default) */
.theme-light.mockup-window {
  background: white;
}

.theme-light .window-header {
  background: #f1f3f5;
}

/* Dark theme (code editor) */
.theme-dark.mockup-window {
  background: #1e1e1e;
}

.theme-dark .window-header {
  background: #2d2d2d;
}
</style>
