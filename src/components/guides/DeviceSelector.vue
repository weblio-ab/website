<template>
  <div class="setup-step">
    <div class="step-header">
      <div class="step-number">1</div>
      <h4>{{ $t('guides.emailSetup.device.title') }}</h4>
    </div>
    <p class="step-description">{{ $t('guides.emailSetup.device.description') }}</p>
    
    <div class="choice-grid">
      <div 
        class="choice-card" 
        :class="{ 'selected': selectedDevice === 'iphone' }"
        @click="selectDevice('iphone')"
      >
        <i class="bi bi-phone choice-icon"></i>
        <h6>{{ $t('guides.emailSetup.device.iphone') }}</h6>
        <p class="choice-description">{{ $t('guides.emailSetup.device.iphoneDesc') }}</p>
      </div>
      
      <div 
        class="choice-card" 
        :class="{ 'selected': selectedDevice === 'android' }"
        @click="selectDevice('android')"
      >
        <i class="bi bi-phone choice-icon"></i>
        <h6>{{ $t('guides.emailSetup.device.android') }}</h6>
        <p class="choice-description">{{ $t('guides.emailSetup.device.androidDesc') }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

// Props
const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  }
})

// Emits
const emit = defineEmits(['update:modelValue', 'deviceSelected'])

// Local state
const selectedDevice = ref(props.modelValue)

// Methods
function selectDevice(device) {
  selectedDevice.value = device
  emit('update:modelValue', device)
  emit('deviceSelected', device)
}
</script>

<style scoped>
.setup-step {
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
}

.step-header {
  display: flex;
  align-items: center;
  margin-bottom: 1.5rem;
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
  margin-right: 1rem;
  flex-shrink: 0;
}

.step-header h4 {
  margin: 0;
  color: #2c3e50;
}

.step-description {
  color: #6c757d;
  margin-bottom: 2rem;
  line-height: 1.6;
}

.choice-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.choice-card {
  background: #f8f9fa;
  border: 2px solid #e9ecef;
  border-radius: 12px;
  padding: 1.5rem;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
}

.choice-card:hover {
  border-color: #007bff;
  background: #f8f9ff;
  transform: translateY(-2px);
}

.choice-card.selected {
  border-color: #007bff;
  background: #e7f3ff;
}

.choice-card.selected .choice-icon {
  color: #007bff;
}

.choice-icon {
  font-size: 2.5rem;
  margin-bottom: 1rem;
  color: #6c757d;
  transition: color 0.3s ease;
}

.choice-card h6 {
  margin-bottom: 0.5rem;
  color: #2c3e50;
  font-weight: 600;
}

.choice-description {
  color: #6c757d;
  font-size: 0.9rem;
  margin: 0;
  line-height: 1.4;
}

@media (max-width: 767.98px) {
  .choice-grid {
    grid-template-columns: 1fr;
  }
}
</style>
