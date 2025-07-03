<template>
  <a
    ref="emailLink"
    :class="linkClass"
    @mouseover="activateEmail"
    @click="handleClick"
    v-html="obfuscatedEmail"
  ></a>
</template>

<script setup>
import { ref, computed } from 'vue'

// Props
const props = defineProps({
  email: {
    type: String,
    required: true,
    validator: (value) => {
      // Basic email validation
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
    }
  },
  linkClass: {
    type: String,
    default: ''
  }
})

// Refs
const emailLink = ref(null)
const isActivated = ref(false)

// Computed
const obfuscatedEmail = computed(() => {
  return props.email
    .split('')
    .join('<!-- -->')
})

// Methods
function activateEmail() {
  if (!isActivated.value && emailLink.value) {
    emailLink.value.href = `mailto:${props.email}`
    isActivated.value = true
  }
}

function handleClick(event) {
  if (!isActivated.value) {
    event.preventDefault()
    activateEmail()
    
    // Trigger a new click after href is set
    setTimeout(() => {
      if (emailLink.value) {
        emailLink.value.click()
      }
    }, 0)
  }
  // If already activated, let the default mailto behavior proceed
}
</script>
