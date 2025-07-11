<template>
  <BaseGuide guide-id="backup">
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
            <div class="contact-info">
              <div class="guide-alert info">
                <i class="bi bi-info-circle guide-alert-icon"></i>
                {{ $t('guides.backup.step1.contactInfo') }}
              </div>
            </div>
          </div>
          
          <div v-if="index === 1" class="step-extra">
            <div class="restoration-process">
              <h6 class="mt-3 mb-2">{{ $t('guides.backup.step2.process') }}</h6>
              <div class="process-steps">
                <div class="process-step">
                  <div class="step-icon">1</div>
                  <div class="step-text">{{ $t('guides.backup.step2.step1') }}</div>
                </div>
                <div class="process-step">
                  <div class="step-icon">2</div>
                  <div class="step-text">{{ $t('guides.backup.step2.step2') }}</div>
                </div>
                <div class="process-step">
                  <div class="step-icon">3</div>
                  <div class="step-text">{{ $t('guides.backup.step2.step3') }}</div>
                </div>
                <div class="process-step">
                  <div class="step-icon">4</div>
                  <div class="step-text">{{ $t('guides.backup.step2.step4') }}</div>
                </div>
              </div>
              
              <div class="guide-alert warning mt-3">
                <i class="bi bi-clock guide-alert-icon"></i>
                <strong>{{ $t('guides.common.info') }}</strong> {{ $t('guides.backup.step2.timeframe') }}
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
    title: t('guides.backup.step1.title'),
    description: t('guides.backup.step1.description')
  },
  {
    title: t('guides.backup.step2.title'),
    description: t('guides.backup.step2.description')
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

.process-steps {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 1rem;
}

.process-step {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.75rem;
  background: #f8f9fa;
  border-radius: 0.5rem;
}

.step-icon {
  width: 2rem;
  height: 2rem;
  background: #007bff;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 0.875rem;
  flex-shrink: 0;
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
