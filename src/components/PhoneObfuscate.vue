<template>
  <TextObfuscate 
    :text="formattedPhone" 
    :url="`tel:${cleanPhoneNumber}`" 
    :link-class="linkClass" 
  />
</template>

<script setup>
import { computed } from 'vue'
import TextObfuscate from './TextObfuscate.vue'

// Props
const props = defineProps({
  phone: {
    type: String,
    required: true
  },
  linkClass: {
    type: String,
    default: ''
  }
})

// Computed
const cleanPhoneNumber = computed(() => {
  // Remove all non-digit characters except + for international numbers
  return props.phone.replace(/[^\d+]/g, '')
})

const formattedPhone = computed(() => {
  // Get clean digits from cleanPhoneNumber (remove + if present for formatting)
  const digits = cleanPhoneNumber.value.replace(/^\+\d+/, '').replace(/\D/g, '')
  
  // Format as XXX-XXX XX XX (assuming 10 digits for Swedish numbers)
  if (digits.length === 10) {
    return `${digits.slice(0, 3)}-${digits.slice(3, 6)} ${digits.slice(6, 8)} ${digits.slice(8, 10)}`
  }
  
  // If not 10 digits, return the clean phone number
  return cleanPhoneNumber.value
})
</script>
