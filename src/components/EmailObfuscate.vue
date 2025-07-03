<template>
  <TextObfuscate 
    :text="email" 
    :url="`mailto:${email}`" 
    :link-class="linkClass" 
  />
</template>

<script setup>
import TextObfuscate from './TextObfuscate.vue'

// Props
defineProps({
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
</script>
