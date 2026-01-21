<template>
  <div class="code-content" :class="[`theme-${theme}`]">
    <div 
      v-for="(line, index) in codeLines" 
      :key="index" 
      class="code-line"
      :class="{ 'empty-line': !line.trim() }"
    >
      <span class="line-number">{{ index + 1 }}</span>
      <span class="code-text" v-html="highlightedLines[index]"></span>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useSyntaxHighlighter } from '../composables/useSyntaxHighlighter'

const props = defineProps({
  code: {
    type: String,
    default: `import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App)
app.mount('#app')`
  },
  language: {
    type: String,
    default: 'javascript'
  },
  theme: {
    type: String,
    default: 'light',
    validator: (value) => ['light', 'dark'].includes(value)
  },
})

// Split code into lines
const codeLines = computed(() => {
  return props.code.split('\n')
})

// Use syntax highlighter composable
const { highlightCode } = useSyntaxHighlighter(props.language)

// Highlight all lines
const highlightedLines = computed(() => {
  return codeLines.value.map(line => highlightCode(line))
})
</script>

<style scoped>
.code-content {
  padding: 1rem;
  font-family: 'Fira Code', 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  font-size: 0.875rem;
  line-height: 1.6;
  background: #1e1e1e;
  border-radius: 6px;
  overflow-x: auto;
}

.code-line {
  display: flex;
  align-items: flex-start;
  min-height: 1.6em;
}

.code-line:hover {
  background: rgba(255, 255, 255, 0.05);
}

.empty-line {
  min-height: 1.6em;
}

.line-number {
  width: 3rem;
  color: #858585;
  user-select: none;
  text-align: right;
  padding-right: 1rem;
  flex-shrink: 0;
  font-variant-numeric: tabular-nums;
}

.code-text {
  color: #d4d4d4;
  white-space: pre;
  flex: 1;
}

/* Syntax highlighting styles - all scoped */
.code-text :deep(.keyword) {
  color: #569cd6;
  font-weight: 500;
}

.code-text :deep(.function) {
  color: #dcdcaa;
}

.code-text :deep(.string) {
  color: #ce9178;
}

.code-text :deep(.template-string) {
  color: #ce9178;
}

.code-text :deep(.number) {
  color: #b5cea8;
}

.code-text :deep(.comment) {
  color: #6a9955;
  font-style: italic;
}

.code-text :deep(.property) {
  color: #9cdcfe;
}

.code-text :deep(.constant) {
  color: #4fc1ff;
}

.code-text :deep(.tag) {
  color: #569cd6;
}

.code-text :deep(.attribute) {
  color: #92c5f8;
}

.code-text :deep(.selector) {
  color: #d7ba7d;
}

.code-text :deep(.value) {
  color: #ce9178;
}

.code-text :deep(.unit) {
  color: #b5cea8;
}

.code-text :deep(.color) {
  color: #4ec9b0;
}

/* Light theme */
.theme-light {
  background: #f5f5f5;
}

.theme-light .code-line:hover {
  background: rgba(0, 0, 0, 0.03);
}

.theme-light .line-number {
  color: #999999;
}

.theme-light .code-text {
  color: #383a42;
}
</style>