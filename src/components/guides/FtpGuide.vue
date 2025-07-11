<template>
  <BaseGuide guide-id="ftp">
    <div class="custom-steps">
      <!-- Step 1: Get FTP credentials -->
      <div class="step-item">
        <div class="step-number">1</div>
        <div class="step-content">
          <h6 class="step-title">{{ $t('guides.ftp.step1.title') }}</h6>
          <p class="step-description">{{ $t('guides.ftp.step1.description') }}</p>
        </div>
      </div>

      <!-- Step 2: Choose FTP client -->
      <div class="step-item">
        <div class="step-number">2</div>
        <div class="step-content">
          <h6 class="step-title">{{ $t('guides.ftp.step2.title') }}</h6>
          
          <div class="recommended-clients">
            <div class="row g-3">
              <div class="col-md-6">
                <div class="client-card">
                  <h6><i class="bi bi-download me-2"></i>FileZilla</h6>
                  <p class="text-muted small">{{ $t('guides.ftp.step2.filezilla') }}</p>
                  <span class="badge bg-success">{{ $t('guides.ftp.step2.recommended') }}</span>
                  <a href="https://filezilla-project.org/download.php" target="_blank" class="btn btn-sm btn-outline-primary mt-2">
                    <i class="bi bi-download me-1"></i>{{ $t('guides.common.download') }}
                  </a>
                </div>
              </div>
              <div class="col-md-6">
                <div class="client-card">
                  <h6><i class="bi bi-windows me-2"></i>WinSCP</h6>
                  <p class="text-muted small">{{ $t('guides.ftp.step2.winscp') }}</p>
                  <span class="badge bg-primary">{{ $t('guides.ftp.step2.windows') }}</span>
                  <a href="https://winscp.net/eng/download.php" target="_blank" class="btn btn-sm btn-outline-primary mt-2">
                    <i class="bi bi-download me-1"></i>{{ $t('guides.common.download') }}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Step 3: Connection settings -->
      <div class="step-item">
        <div class="step-number">3</div>
        <div class="step-content">
          <h6 class="step-title">{{ $t('guides.ftp.step3.title') }}</h6>
          
          <div class="connection-example">
            <div class="guide-code-block">
              <pre><code>{{ $t('guides.ftp.step3.exampleCode') }}</code></pre>
            </div>
          </div>

          <div class="guide-alert warning">
            <i class="bi bi-exclamation-triangle guide-alert-icon"></i>
            {{ $t('guides.ftp.step3.securityWarning') }}
          </div>
        </div>
      </div>

      <!-- Step 4: Important folder location -->
      <div class="step-item">
        <div class="step-number">4</div>
        <div class="step-content">
          <h6 class="step-title">{{ $t('guides.ftp.step5.title') }}</h6>
          
          <div class="folder-examples">
            <div class="guide-code-block">
              <pre><code>/domains/example.com/public_html
/domains/[subdomain].example.com/public_html</code></pre>
            </div>
          </div>
          
          <div class="guide-alert info">
            <i class="bi bi-info-circle guide-alert-icon"></i>
            {{ $t('guides.ftp.step5.folderInfo') }}
          </div>
        </div>
      </div>
    </div>
  </BaseGuide>
</template>

<script setup>
import BaseGuide from './BaseGuide.vue'
</script>

<style scoped>
.custom-steps {
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

.recommended-clients .client-card {
  background: #f8f9fa;
  padding: 1rem;
  border-radius: 8px;
  border: 1px solid #e9ecef;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.client-card h6 {
  color: #2c3e50;
  margin-bottom: 0.5rem;
}

.client-card .btn {
  margin-top: auto;
  width: 100%;
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
