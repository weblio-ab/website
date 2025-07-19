<template>
  <div class="setup-step">
    <div class="step-header">
      <div class="step-number">3</div>
      <h4>{{ $t('guides.emailSetup.setup.title') }}</h4>
    </div>
    
    <div class="selected-combination">
      <div class="combination-display">
        <div class="combination-item">
          <i v-if="selectedDevice === 'iphone'" class="bi bi-phone"></i>
          <i v-else class="bi bi-phone"></i>
          <span>{{ $t(`guides.emailSetup.device.${selectedDevice}`) }}</span>
        </div>
        <i class="bi bi-plus"></i>
        <div class="combination-item">
          <img v-if="selectedApp === 'gmail'" src="/assets/icons/gmail.svg" alt="Gmail" class="combination-icon">
          <img v-else-if="selectedApp === 'outlook'" src="/assets/icons/outlook.svg" alt="Outlook" class="combination-icon">
          <i v-else class="bi bi-envelope"></i>
          <span>{{ $t(`guides.emailSetup.app.${selectedApp}`) }}</span>
        </div>
      </div>
    </div>

    <!-- Manual setup instructions -->
    <div class="manual-instructions">
      <EmailSetupInstructions 
        :device="selectedDevice" 
        :app="selectedApp"
        :user-email="userEmail"
        :email-info="emailInfo"
      />
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
import EmailSetupInstructions from './EmailSetupInstructions.vue'
import EmailConfigGenerator from './EmailConfigGenerator.vue'

const { t } = useI18n()

// Props
defineProps({
  selectedDevice: {
    type: String,
    required: true
  },
  selectedApp: {
    type: String,
    required: true
  },
  userEmail: {
    type: String,
    default: ''
  },
  emailInfo: {
    type: Object,
    default: () => ({
      domain: '',
      username: '',
      incomingServer: '',
      outgoingServer: ''
    })
  }
})

// Events
defineEmits(['previous'])
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

.selected-combination {
  background: #f8f9fa;
  border-radius: 8px;
  padding: 1.5rem;
  margin-bottom: 2rem;
}

.combination-display {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
}

.combination-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}

.combination-item i {
  font-size: 1.5rem;
  color: #007bff;
}

.combination-icon {
  width: 1.5rem;
  height: 1.5rem;
}

.combination-item span {
  font-weight: 600;
  color: #2c3e50;
}

.combination-display > i {
  font-size: 1rem;
  color: #6c757d;
}

.setup-options {
  margin-bottom: 2rem;
}

.option-card {
  background: white;
  border: 1px solid #e9ecef;
  border-radius: 8px;
  padding: 1.5rem;
  height: 100%;
  transition: all 0.3s ease;
}

.option-card:hover {
  border-color: #007bff;
  box-shadow: 0 2px 8px rgba(0, 123, 255, 0.1);
}

.option-header {
  display: flex;
  align-items: center;
  margin-bottom: 0.75rem;
}

.option-header i {
  font-size: 1.25rem;
}

.manual-instructions {
  background: white;
  border: 1px solid #e9ecef;
  border-radius: 8px;
  padding: 1.5rem;
}

.step-actions {
  display: flex;
  justify-content: flex-end;
  padding-top: 1.5rem;
  border-top: 1px solid #e9ecef;
}

@media (max-width: 767.98px) {
  .step-actions {
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .combination-display {
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .combination-display > i {
    transform: rotate(90deg);
  }
  
  .setup-options .row {
    flex-direction: column;
  }
  
  .setup-options .col-md-6 + .col-md-6 {
    margin-top: 1rem;
  }
}
</style>
