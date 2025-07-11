<template>
  <BaseGuide guide-id="android">
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
          <div v-if="index === 0" class="step-extra">
            <div class="app-recommendations">
              <h6 class="mt-3 mb-2">{{ $t('guides.android.step1.appsTitle') }}</h6>
              <div class="app-grid">
                <div class="app-item">
                  <img src="/assets/icons/gmail.svg" alt="Gmail" class="app-icon">
                  <span>{{ $t('guides.android.step1.gmail') }}</span>
                </div>
                <div class="app-item">
                  <img src="/assets/icons/outlook.svg" alt="Outlook" class="app-icon">
                  <span>{{ $t('guides.android.step1.outlook') }}</span>
                </div>
                <div class="app-item">
                  <i class="bi bi-envelope text-secondary"></i>
                  <span>{{ $t('guides.android.step1.default') }}</span>
                </div>
              </div>
              <div class="guide-alert info mt-3">
                <i class="bi bi-info-circle guide-alert-icon"></i>
                {{ $t('guides.android.step1.appNote') }}
              </div>
            </div>
          </div>
          
          <div v-if="index === 1" class="step-extra">
            <div class="guide-alert info">
              <i class="bi bi-info-circle guide-alert-icon"></i>
              {{ $t('guides.android.step2.location') }}
            </div>
          </div>
          
          <div v-if="index === 2" class="step-extra">
            <div class="account-types">
              <h6 class="mt-3 mb-2">{{ $t('guides.android.step3.types') }}</h6>
              <div class="type-list">
                <div class="type-item">
                  <div class="app-icon gmail-icon">
                    <span class="gmail-g">G</span>
                  </div>
                  <span>{{ $t('guides.android.step3.gmail') }}</span>
                </div>
                <div class="type-item">
                  <div class="app-icon outlook-icon">
                    <i class="outlook-o">O</i>
                  </div>
                  <span>{{ $t('guides.android.step3.exchange') }}</span>
                </div>
                <div class="type-item">
                  <i class="bi bi-envelope text-info"></i>
                  <span>{{ $t('guides.android.step3.imap') }}</span>
                </div>
                <div class="type-item">
                  <i class="bi bi-envelope text-warning"></i>
                  <span>{{ $t('guides.android.step3.pop3') }}</span>
                </div>
                <div class="type-item">
                  <i class="bi bi-envelope text-secondary"></i>
                  <span>{{ $t('guides.android.step3.other') }}</span>
                </div>
              </div>
              <div class="guide-alert success mt-3">
                <i class="bi bi-check-circle guide-alert-icon"></i>
                <strong>{{ $t('guides.common.tips') }}</strong> {{ $t('guides.android.step3.recommend') }}
              </div>
            </div>
          </div>
          
          <div v-if="index === 3" class="step-extra">
            <div class="required-info">
              <h6 class="mt-3 mb-2">{{ $t('guides.android.step4.requiredTitle') }}</h6>
              <ul class="info-list">
                <li>{{ $t('guides.android.step4.email') }}</li>
                <li>{{ $t('guides.android.step4.password') }}</li>
                <li>{{ $t('guides.android.step4.incomingServer') }}</li>
                <li>{{ $t('guides.android.step4.outgoingServer') }}</li>
              </ul>
              
              <div class="guide-alert warning mt-3">
                <i class="bi bi-exclamation-triangle guide-alert-icon"></i>
                <strong>{{ $t('guides.common.tips') }}</strong> {{ $t('guides.android.step4.finalTest') }}
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
    title: t('guides.android.step1.title'),
    description: t('guides.android.step1.description')
  },
  {
    title: t('guides.android.step2.title'),
    description: t('guides.android.step2.description')
  },
  {
    title: t('guides.android.step3.title'),
    description: t('guides.android.step3.description')
  },
  {
    title: t('guides.android.step4.title'),
    description: t('guides.android.step4.description')
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
  flex-shrink: 0;
  width: 2.5rem;
  height: 2.5rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  margin-right: 1.5rem;
  margin-top: 0.25rem;
}

.step-content {
  flex: 1;
}

.step-title {
  color: #2c3e50;
  margin-bottom: 0.5rem;
  font-weight: 600;
}

.step-description {
  color: #6c757d;
  margin-bottom: 0;
}

.app-grid, .type-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;
  margin-top: 1rem;
}

.app-item, .type-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem;
  background: #f8f9fa;
  border-radius: 0.5rem;
  border: 1px solid #e9ecef;
}

.app-item i, .type-item i {
  font-size: 1.25rem;
}

.app-icon {
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 3px;
  flex-shrink: 0;
}

.info-list {
  margin: 0;
  padding-left: 1.5rem;
}

.info-list li {
  margin-bottom: 0.5rem;
  color: #495057;
}

.guide-alert {
  padding: 1rem;
  border-radius: 0.5rem;
  border-left: 4px solid;
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
}

.guide-alert.info {
  background-color: #e7f3ff;
  border-left-color: #0ea5e9;
  color: #0369a1;
}

.guide-alert.success {
  background-color: #f0fdf4;
  border-left-color: #22c55e;
  color: #166534;
}

.guide-alert.warning {
  background-color: #fffbeb;
  border-left-color: #f59e0b;
  color: #92400e;
}

.guide-alert-icon {
  font-size: 1.25rem;
  margin-top: 0.125rem;
  flex-shrink: 0;
}
</style>
