<template>
  <a
    v-if="url"
    ref="textLink"
    :class="linkClass"
    @mouseover="activateLink"
    @click="handleClick"
    v-html="obfuscatedText"
  ></a>
  <span
    v-else
    :class="linkClass"
    v-html="obfuscatedText"
  ></span>
</template>

<script setup>
import { ref, computed } from 'vue'

// Props
const props = defineProps({
  text: {
    type: String,
    required: true
  },
  url: {
    type: String,
    default: null
  },
  linkClass: {
    type: String,
    default: ''
  }
})

// Refs
const textLink = ref(null)
const isActivated = ref(false)

// Computed
const obfuscatedText = computed(() => {
  return props.text
    .split('')
    .join('<!-- -->')
})

// Methods
function activateLink() {
  if (props.url && !isActivated.value && textLink.value) {
    textLink.value.href = props.url
    isActivated.value = true
  }
}

function handleClick(event) {
  if (props.url && !isActivated.value) {
    event.preventDefault()
    activateLink()
    
    // Trigger a new click after href is set
    setTimeout(() => {
      if (textLink.value) {
        textLink.value.click()
      }
    }, 0)
  }
  // If already activated or no URL, let the default behavior proceed
}
</script>
