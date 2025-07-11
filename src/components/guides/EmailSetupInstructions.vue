<template>
  <div class="setup-instructions">
    <!-- Gmail App Instructions -->
    <div v-if="app === 'gmail'" class="instruction-section">
      <div class="app-download-section">
        <div class="app-info">
          <img src="/assets/icons/gmail.svg" alt="Gmail" class="app-logo">
          <div>
            <h5>{{ $t('guides.emailSetup.instructions.downloadGmail') }}</h5>
            <p class="text-muted">{{ $t('guides.emailSetup.instructions.gmailNote') }}</p>
          </div>
        </div>
        
        <div class="download-buttons">
          <a 
            v-if="device === 'iphone'"
            href="https://apps.apple.com/app/gmail-email-by-google/id422689480"
            target="_blank"
            class="btn btn-outline-primary"
          >
            <i class="bi bi-apple me-2"></i>{{ $t('guides.emailSetup.instructions.downloadAppStore') }}
          </a>
          <a 
            v-else
            href="https://play.google.com/store/apps/details?id=com.google.android.gm"
            target="_blank"
            class="btn btn-outline-primary"
          >
            <i class="bi bi-google-play me-2"></i>{{ $t('guides.emailSetup.instructions.downloadPlayStore') }}
          </a>
        </div>
      </div>

      <div class="steps-container">
        <div class="step-item">
          <div class="step-number">1</div>
          <div class="step-content">
            <h6>{{ $t('guides.emailSetup.instructions.gmail.step1.title') }}</h6>
            <p>{{ $t('guides.emailSetup.instructions.gmail.step1.description') }}</p>
          </div>
        </div>

        <div class="step-item">
          <div class="step-number">2</div>
          <div class="step-content">
            <h6>{{ $t('guides.emailSetup.instructions.gmail.step2.title') }}</h6>
            <p>{{ $t('guides.emailSetup.instructions.gmail.step2.description') }}</p>
            <div class="guide-alert info">
              <i class="bi bi-info-circle"></i>
              {{ $t('guides.emailSetup.instructions.gmail.step2.note') }}
            </div>
          </div>
        </div>

        <div class="step-item">
          <div class="step-number">3</div>
          <div class="step-content">
            <h6>{{ $t('guides.emailSetup.instructions.gmail.step3.title') }}</h6>
            <p>{{ $t('guides.emailSetup.instructions.gmail.step3.description') }}</p>
            <div class="server-settings">
              <div class="settings-grid">
                <div class="settings-card">
                  <h6><i class="bi bi-download me-2"></i>{{ $t('guides.emailSetup.instructions.incoming') }}</h6>
                  <div class="guide-code-block">
                    <pre><code>{{ incomingSettings }}</code></pre>
                  </div>
                </div>
                <div class="settings-card">
                  <h6><i class="bi bi-upload me-2"></i>{{ $t('guides.emailSetup.instructions.outgoing') }}</h6>
                  <div class="guide-code-block">
                    <pre><code>{{ outgoingSettings }}</code></pre>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="step-item">
          <div class="step-number">4</div>
          <div class="step-content">
            <h6>{{ $t('guides.emailSetup.instructions.gmail.step4.title') }}</h6>
            <p>{{ $t('guides.emailSetup.instructions.gmail.step4.description') }}</p>
            <div class="guide-alert success">
              <i class="bi bi-check-circle"></i>
              {{ $t('guides.emailSetup.instructions.gmail.step4.success') }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Outlook App Instructions -->
    <div v-else-if="app === 'outlook'" class="instruction-section">
      <div class="app-download-section">
        <div class="app-info">
          <img src="/assets/icons/outlook.svg" alt="Outlook" class="app-logo">
          <div>
            <h5>{{ $t('guides.emailSetup.instructions.downloadOutlook') }}</h5>
            <p class="text-muted">{{ $t('guides.emailSetup.instructions.outlookNote') }}</p>
          </div>
        </div>
        
        <div class="download-buttons">
          <a 
            v-if="device === 'iphone'"
            href="https://apps.apple.com/app/microsoft-outlook/id951937596"
            target="_blank"
            class="btn btn-outline-primary"
          >
            <i class="bi bi-apple me-2"></i>{{ $t('guides.emailSetup.instructions.downloadAppStore') }}
          </a>
          <a 
            v-else
            href="https://play.google.com/store/apps/details?id=com.microsoft.office.outlook"
            target="_blank"
            class="btn btn-outline-primary"
          >
            <i class="bi bi-google-play me-2"></i>{{ $t('guides.emailSetup.instructions.downloadPlayStore') }}
          </a>
        </div>
      </div>

      <div class="steps-container">
        <div class="step-item">
          <div class="step-number">1</div>
          <div class="step-content">
            <h6>{{ $t('guides.emailSetup.instructions.outlook.step1.title') }}</h6>
            <p>{{ $t('guides.emailSetup.instructions.outlook.step1.description') }}</p>
          </div>
        </div>

        <div class="step-item">
          <div class="step-number">2</div>
          <div class="step-content">
            <h6>{{ $t('guides.emailSetup.instructions.outlook.step2.title') }}</h6>
            <p>{{ $t('guides.emailSetup.instructions.outlook.step2.description') }}</p>
            <div class="guide-alert info">
              <i class="bi bi-info-circle"></i>
              {{ $t('guides.emailSetup.instructions.outlook.step2.note') }}
            </div>
          </div>
        </div>

        <div class="step-item">
          <div class="step-number">3</div>
          <div class="step-content">
            <h6>{{ $t('guides.emailSetup.instructions.outlook.step3.title') }}</h6>
            <p>{{ $t('guides.emailSetup.instructions.outlook.step3.description') }}</p>
            <div class="server-settings">
              <div class="settings-grid">
                <div class="settings-card">
                  <h6><i class="bi bi-download me-2"></i>{{ $t('guides.emailSetup.instructions.incoming') }}</h6>
                  <div class="guide-code-block">
                    <pre><code>{{ incomingSettings }}</code></pre>
                  </div>
                </div>
                <div class="settings-card">
                  <h6><i class="bi bi-upload me-2"></i>{{ $t('guides.emailSetup.instructions.outgoing') }}</h6>
                  <div class="guide-code-block">
                    <pre><code>{{ outgoingSettings }}</code></pre>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="step-item">
          <div class="step-number">4</div>
          <div class="step-content">
            <h6>{{ $t('guides.emailSetup.instructions.outlook.step4.title') }}</h6>
            <p>{{ $t('guides.emailSetup.instructions.outlook.step4.description') }}</p>
            <div class="guide-alert success">
              <i class="bi bi-check-circle"></i>
              {{ $t('guides.emailSetup.instructions.outlook.step4.success') }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Native Mail App Instructions -->
    <div v-else-if="app === 'native'" class="instruction-section">
      <div class="app-info-section">
        <div class="app-info">
          <i class="bi bi-envelope app-logo-icon"></i>
          <div>
            <h5>{{ $t(`guides.emailSetup.instructions.native${device === 'iphone' ? 'Iphone' : 'Android'}.title`) }}</h5>
            <p class="text-muted">{{ $t(`guides.emailSetup.instructions.native${device === 'iphone' ? 'Iphone' : 'Android'}.note`) }}</p>
          </div>
        </div>
      </div>

      <div class="steps-container">
        <div class="step-item">
          <div class="step-number">1</div>
          <div class="step-content">
            <h6>{{ $t(`guides.emailSetup.instructions.native${device === 'iphone' ? 'Iphone' : 'Android'}.step1.title`) }}</h6>
            <p>{{ $t(`guides.emailSetup.instructions.native${device === 'iphone' ? 'Iphone' : 'Android'}.step1.description`) }}</p>
          </div>
        </div>

        <div class="step-item">
          <div class="step-number">2</div>
          <div class="step-content">
            <h6>{{ $t(`guides.emailSetup.instructions.native${device === 'iphone' ? 'Iphone' : 'Android'}.step2.title`) }}</h6>
            <p>{{ $t(`guides.emailSetup.instructions.native${device === 'iphone' ? 'Iphone' : 'Android'}.step2.description`) }}</p>
            <div class="guide-alert info">
              <i class="bi bi-info-circle"></i>
              {{ $t(`guides.emailSetup.instructions.native${device === 'iphone' ? 'Iphone' : 'Android'}.step2.note`) }}
            </div>
          </div>
        </div>

        <div class="step-item">
          <div class="step-number">3</div>
          <div class="step-content">
            <h6>{{ $t(`guides.emailSetup.instructions.native${device === 'iphone' ? 'Iphone' : 'Android'}.step3.title`) }}</h6>
            <p>{{ $t(`guides.emailSetup.instructions.native${device === 'iphone' ? 'Iphone' : 'Android'}.step3.description`) }}</p>
            <div class="server-settings">
              <div class="settings-grid">
                <div class="settings-card">
                  <h6><i class="bi bi-download me-2"></i>{{ $t('guides.emailSetup.instructions.incoming') }}</h6>
                  <div class="guide-code-block">
                    <pre><code>{{ incomingSettings }}</code></pre>
                  </div>
                </div>
                <div class="settings-card">
                  <h6><i class="bi bi-upload me-2"></i>{{ $t('guides.emailSetup.instructions.outgoing') }}</h6>
                  <div class="guide-code-block">
                    <pre><code>{{ outgoingSettings }}</code></pre>
                  </div>
                </div>
              </div>
            </div>
            <div class="guide-alert warning">
              <i class="bi bi-exclamation-triangle"></i>
              {{ $t(`guides.emailSetup.instructions.native${device === 'iphone' ? 'Iphone' : 'Android'}.step3.warning`) }}
            </div>
          </div>
        </div>

        <div class="step-item">
          <div class="step-number">4</div>
          <div class="step-content">
            <h6>{{ $t(`guides.emailSetup.instructions.native${device === 'iphone' ? 'Iphone' : 'Android'}.step4.title`) }}</h6>
            <p>{{ $t(`guides.emailSetup.instructions.native${device === 'iphone' ? 'Iphone' : 'Android'}.step4.description`) }}</p>
            <div class="guide-alert success">
              <i class="bi bi-check-circle"></i>
              {{ $t(`guides.emailSetup.instructions.native${device === 'iphone' ? 'Iphone' : 'Android'}.step4.success`) }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const props = defineProps({
  device: {
    type: String,
    required: true
  },
  app: {
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

const { t } = useI18n()

const incomingSettings = computed(() => {
  const server = props.emailInfo.incomingServer || 'mail.dindoman.se'
  const username = props.userEmail || 'din@epostadress.se'
  return `Server: ${server}
Port: 993
Säkerhet: SSL/TLS
Användarnamn: ${username}`
})

const outgoingSettings = computed(() => {
  const server = props.emailInfo.outgoingServer || 'mail.dindoman.se'
  return `Server: ${server}
Port: 587
Säkerhet: STARTTLS
Autentisering: Ja`
})
</script>

<style scoped>
.instruction-section {
  margin-top: 2rem;
}

.app-download-section,
.app-info-section {
  background: #f8f9fa;
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 2rem;
  border: 1px solid #e9ecef;
}

.app-info {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.app-logo {
  width: 48px;
  height: 48px;
  flex-shrink: 0;
}

.app-logo-icon {
  font-size: 3rem;
  color: #007bff;
  flex-shrink: 0;
}

.app-info h5 {
  margin: 0 0 0.5rem 0;
  color: #2c3e50;
}

.app-info p {
  margin: 0;
  font-size: 0.9rem;
}

.download-buttons {
  display: flex;
  gap: 1rem;
}

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
  width: 32px;
  height: 32px;
  background: #007bff;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  margin-right: 1rem;
  flex-shrink: 0;
  font-size: 0.9rem;
}

.step-content {
  flex: 1;
}

.step-content h6 {
  margin: 0 0 0.5rem 0;
  color: #2c3e50;
  font-weight: 600;
}

.step-content p {
  color: #6c757d;
  margin: 0 0 1rem 0;
  line-height: 1.6;
}

.server-settings {
  margin-top: 1rem;
}

.settings-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1rem;
}

.settings-card {
  background: white;
  padding: 1rem;
  border-radius: 8px;
  border: 1px solid #e9ecef;
}

.settings-card h6 {
  color: #2c3e50;
  margin-bottom: 0.75rem;
  font-size: 0.9rem;
}

.guide-alert {
  padding: 1rem;
  border-radius: 8px;
  border-left: 4px solid;
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  margin-top: 1rem;
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

.guide-alert i {
  font-size: 1.25rem;
  margin-top: 0.125rem;
  flex-shrink: 0;
}

@media (max-width: 767.98px) {
  .app-info {
    flex-direction: column;
    text-align: center;
  }
  
  .download-buttons {
    flex-direction: column;
  }
  
  .step-item {
    flex-direction: column;
    text-align: center;
  }
  
  .step-number {
    margin: 0 auto 1rem auto;
  }
  
  .settings-grid {
    grid-template-columns: 1fr;
  }
}
</style>
