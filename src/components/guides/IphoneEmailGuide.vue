<template>
  <BaseGuide guide-id="iphone">
    <div class="steps-container">
      <div
        v-for="(step, index) in steps"
        :key="index"
        class="step-item"
      >
        <div class="step-number">{{ index + 1 }}</div>
        <div class="step-content">
          <h6 class="step-title">{{ step.title }}</h6>
          <p class="step-description">{{ step.description }}</p>
          
          <!-- Step-specific content -->
          <div v-if="index === 1" class="step-extra">
            <div class="account-options">
              <h6 class="mt-3 mb-2">{{ $t('guides.iphone.step2.providersTitle') }}</h6>
              <div class="provider-grid">
                <div class="provider-item">
                  <img src="/assets/icons/gmail.svg" alt="Gmail" class="provider-icon">
                  <span>{{ $t('guides.iphone.step2.gmail') }}</span>
                </div>
                <div class="provider-item">
                  <img src="/assets/icons/outlook.svg" alt="Outlook" class="provider-icon">
                  <span>{{ $t('guides.iphone.step2.outlook') }}</span>
                </div>
                <div class="provider-item">
                  <i class="bi bi-envelope text-secondary"></i>
                  <span>{{ $t('guides.iphone.step2.other') }}</span>
                </div>
              </div>
            </div>
          </div>
          
          <div v-if="index === 2" class="step-extra">
            <div class="server-settings">
              <h6 class="mt-3 mb-2">{{ $t('guides.iphone.step3.settingsTitle') }}</h6>
              <div class="settings-tabs">
                <div class="row">
                  <div class="col-md-6">
                    <div class="settings-card">
                      <h6><i class="bi bi-download me-2"></i>{{ $t('guides.iphone.step3.incoming') }}</h6>
                      <div class="guide-code-block">
                        <pre><code>{{ $t('guides.iphone.step3.incomingCode') }}</code></pre>
                      </div>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="settings-card">
                      <h6><i class="bi bi-upload me-2"></i>{{ $t('guides.iphone.step3.outgoing') }}</h6>
                      <div class="guide-code-block">
                        <pre><code>{{ $t('guides.iphone.step3.outgoingCode') }}</code></pre>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div class="guide-alert warning mt-3">
                <i class="bi bi-exclamation-triangle guide-alert-icon"></i>
                {{ $t('guides.iphone.step3.settingsWarning') }}
              </div>
            </div>
          </div>
          
          <div v-if="index === 3" class="step-extra">
            <div class="test-checklist">
              <h6 class="mt-3 mb-2">{{ $t('guides.iphone.step4.checklistTitle') }}</h6>
              <div class="checklist">
                <div class="checklist-item">
                  <i class="bi bi-check-circle text-success"></i>
                  <span>{{ $t('guides.iphone.step4.check1') }}</span>
                </div>
                <div class="checklist-item">
                  <i class="bi bi-check-circle text-success"></i>
                  <span>{{ $t('guides.iphone.step4.check2') }}</span>
                </div>
                <div class="checklist-item">
                  <i class="bi bi-check-circle text-success"></i>
                  <span>{{ $t('guides.iphone.step4.check3') }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </BaseGuide>
</template>

<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import BaseGuide from './BaseGuide.vue'

const { t } = useI18n()

const steps = computed(() => [
  {
    title: t('guides.iphone.step1.title'),
    description: t('guides.iphone.step1.description')
  },
  {
    title: t('guides.iphone.step2.title'),
    description: t('guides.iphone.step2.description')
  },
  {
    title: t('guides.iphone.step3.title'),
    description: t('guides.iphone.step3.description')
  },
  {
    title: t('guides.iphone.step4.title'),
    description: t('guides.iphone.step4.description')
  }
])
</script>

<style scoped>
.steps-container {
  margin-top: 2rem;
}

.step-item {
  display: flex;
  margin-bottom: 2rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid #e9ecef;
}

.step-item:last-child {
  border-bottom: none;
  margin-bottom: 0;
  padding-bottom: 0;
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
  margin-right: 1.5rem;
  flex-shrink: 0;
}

.step-content {
  flex: 1;
}

.step-title {
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 0.5rem;
}

.step-description {
  color: #6c757d;
  margin: 0 0 1rem 0;
  line-height: 1.6;
}

.step-extra {
  margin-top: 1rem;
}

.provider-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  margin-top: 1rem;
}

.provider-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 8px;
  border: 1px solid #e9ecef;
}

.provider-item i {
  font-size: 2rem;
  margin-bottom: 0.5rem;
}

.provider-icon {
  width: 2rem;
  height: 2rem;
  border-radius: 4px;
  margin-bottom: 0.5rem;
}

.settings-card {
  background: #f8f9fa;
  padding: 1rem;
  border-radius: 8px;
  border: 1px solid #e9ecef;
  height: 100%;
}

.settings-card h6 {
  color: #2c3e50;
  margin-bottom: 0.75rem;
}

.checklist {
  margin-top: 1rem;
}

.checklist-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.5rem 0;
}

.checklist-item i {
  font-size: 1.25rem;
}

@media (max-width: 767.98px) {
  .step-item {
    flex-direction: column;
    text-align: center;
  }
  
  .step-number {
    margin: 0 auto 1rem auto;
  }
  
  .provider-grid {
    grid-template-columns: 1fr;
  }
}
</style>
