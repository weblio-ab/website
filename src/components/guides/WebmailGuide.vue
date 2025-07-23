<template>
  <BaseGuide guide-id="webmail">
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
          
          <!-- Custom content for specific steps -->
          <div v-if="index === 0" class="step-extra">
            <div class="guide-alert info">
              <i class="bi bi-info-circle guide-alert-icon"></i>
              {{ $t('guides.webmail.step1.urlInfo') }} <strong>{{ $t('guides.webmail.step1.url') }}</strong>
            </div>
          </div>
          
          <div v-if="index === 2" class="step-extra">
            <div class="composition-tips">
              <h6 class="mt-3 mb-2">{{ $t('guides.webmail.step3.tipsTitle') }}</h6>
              <ul class="tip-list">
                <li>{{ $t('guides.webmail.step3.tip1') }}</li>
                <li>{{ $t('guides.webmail.step3.tip2') }}</li>
                <li>{{ $t('guides.webmail.step3.tip3') }}</li>
              </ul>
            </div>
          </div>
          
          <div v-if="index === 3" class="step-extra">
            <div class="attachment-info">
              <div class="guide-alert warning">
                <i class="bi bi-exclamation-triangle guide-alert-icon"></i>
                <strong>{{ $t('guides.common.note') }}</strong> {{ $t('guides.webmail.step4.sizeWarning') }}
              </div>
              
              <div class="supported-formats mt-2">
                <h6>{{ $t('guides.webmail.step4.formatsTitle') }}</h6>
                <div class="format-badges">
                  <span class="badge bg-secondary me-1">PDF</span>
                  <span class="badge bg-secondary me-1">DOC</span>
                  <span class="badge bg-secondary me-1">JPG</span>
                  <span class="badge bg-secondary me-1">PNG</span>
                  <span class="badge bg-secondary me-1">ZIP</span>
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
    title: t('guides.webmail.step1.title'),
    description: t('guides.webmail.step1.description')
  },
  {
    title: t('guides.webmail.step2.title'),
    description: t('guides.webmail.step2.description')
  },
  {
    title: t('guides.webmail.step3.title'),
    description: t('guides.webmail.step3.description')
  },
  {
    title: t('guides.webmail.step4.title'),
    description: t('guides.webmail.step4.description')
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

.tip-list {
  margin: 0;
  padding-left: 1.5rem;
}

.tip-list li {
  margin-bottom: 0.5rem;
  color: #6c757d;
}

.format-badges {
  margin-top: 0.5rem;
}

.attachment-info h6 {
  color: #2c3e50;
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
}

@media (max-width: 767.98px) {
  .step-item {
    flex-direction: column;
    text-align: center;
  }
  
  .step-number {
    margin: 0 auto 1rem auto;
  }
}
</style>
