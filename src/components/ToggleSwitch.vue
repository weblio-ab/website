<template>
    <div class="toggle d-inline-flex bg-white rounded-pill p-1 mb-4">
    <button 
        @click="model = false" 
        :class="['btn', 'btn-sm', 'px-4', 'rounded-pill', !model ? 'btn-primary' : 'btn-white']"
    >
        <slot name="falseText">{{ falseText }}</slot>
    </button>
    <button 
        @click="model = true" 
        :class="['btn', 'btn-sm', 'px-4', 'rounded-pill', model ? 'btn-primary' : 'btn-white']"
    >
        <slot name="trueText">{{ trueText }}</slot>
    </button>
    </div>
</template>

<script setup>
import { computed } from 'vue'
const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  },
  falseText: {
    type: String,
    default: ""
  },
  trueText: {
    type: String,
    default: "null"
  }
})
const emit = defineEmits(['update:modelValue'])

const model = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val)
})
</script>
