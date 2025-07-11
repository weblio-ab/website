<template>
  <div class="setup-step">
    <div class="step-header">
      <div class="step-number">2</div>
      <h4>{{ $t('guides.emailSetup.app.title') }}</h4>
    </div>
    <p class="step-description">{{ $t('guides.emailSetup.app.description') }}</p>
    
    <div class="choice-grid">
      <div 
        class="choice-card" 
        :class="{ 'selected': selectedApp === 'gmail' }"
        @click="selectApp('gmail')"
      >
        <img src="/assets/icons/gmail.svg" alt="Gmail" class="choice-icon app-icon">
        <h6>{{ $t('guides.emailSetup.app.gmail') }}</h6>
        <p class="choice-description">{{ $t('guides.emailSetup.app.gmailDesc') }}</p>
      </div>
      
      <div 
        class="choice-card" 
        :class="{ 'selected': selectedApp === 'outlook' }"
        @click="selectApp('outlook')"
      >
        <img src="/assets/icons/outlook.svg" alt="Outlook" class="choice-icon app-icon">
        <h6>{{ $t('guides.emailSetup.app.outlook') }}</h6>
        <p class="choice-description">{{ $t('guides.emailSetup.app.outlookDesc') }}</p>
      </div>
      
      <div 
        class="choice-card recommended" 
        :class="{ 'selected': selectedApp === 'native' }"
        @click="selectApp('native')"
      >
        <div class="recommended-badge">
          <i class="bi bi-star-fill me-1"></i>
          {{ $t('guides.common.recommended') }}
        </div>
        <i class="bi bi-envelope choice-icon"></i>
        <h6>{{ $t('guides.emailSetup.app.native') }}</h6>
        <p class="choice-description">{{ $t('guides.emailSetup.app.nativeDesc') }}</p>
      </div>
    </div>
    
    <div class="step-actions">
      <button 
        class="btn btn-outline-secondary"
        @click="$emit('previous')"
      >
        {{ $t('guides.common.back') }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

// Props
defineProps({
  selectedApp: {
    type: String,
    default: ''
  }
})

// Events
const emit = defineEmits(['app-selected', 'previous'])

// Methods
function selectApp(app) {
  emit('app-selected', app)
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

.choice-card.recommended {
  border-color: #28a745;
  background: #f8fff9;
}

.recommended-badge {
  position: absolute;
  top: -10px;
  right: -10px;
  background: #28a745;
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  box-shadow: 0 2px 4px rgba(40, 167, 69, 0.3);
}

.choice-card:hover {
  border-color: #007bff;
  background: #f8f9ff;
  transform: translateY(-2px);
}

.choice-card.recommended:hover {
  border-color: #28a745;
  background: #f0fff4;
  transform: translateY(-2px);
}

.choice-card.selected {
  border-color: #007bff;
  background: #e7f3ff;
}

.choice-card.recommended.selected {
  border-color: #28a745;
  background: #e6f7e6;
}

.choice-card.selected .choice-icon {
  color: #007bff;
}

.choice-card.recommended .choice-icon {
  color: #28a745;
}

.choice-card.recommended.selected .choice-icon {
  color: #28a745;
}

.choice-icon {
  font-size: 2.5rem;
  margin-bottom: 1rem;
  color: #6c757d;
  transition: color 0.3s ease;
}

.choice-icon.app-icon {
  width: 2.5rem;
  height: 2.5rem;
  margin-bottom: 1rem;
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

.step-actions {
  display: flex;
  justify-content: flex-end;
  padding-top: 1.5rem;
  border-top: 1px solid #e9ecef;
}

@media (max-width: 767.98px) {
  .choice-grid {
    grid-template-columns: 1fr;
  }
  
  .step-actions {
    flex-direction: column;
    gap: 0.5rem;
  }
}
</style>
