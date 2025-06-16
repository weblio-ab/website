<template>
  <section id="home" class="hero-section">
    <div class="container">
      <div class="row align-items-center min-vh-100 py-5">
        <div class="col-lg-6">
          <div class="hero-content">
            <h1 class="display-4 fw-bold text-dark mb-4">
              {{ $t('hero.title') }}
            </h1>
            <p class="lead text-muted mb-4">
              {{ $t('hero.subtitle') }}
            </p>
            <p class="fs-5 mb-4">
              {{ $t('hero.description') }}
            </p>
            <div class="d-flex flex-column flex-sm-row gap-3">
              <a href="#contact" class="btn btn-primary btn-lg">
                <i class="bi bi-chat-dots me-2"></i>
                {{ $t('hero.cta') }}
              </a>
              <a href="#portfolio" class="btn btn-outline-primary btn-lg">
                <i class="bi bi-eye me-2"></i>
                {{ $t('hero.ctaSecondary') }}
              </a>
            </div>
          </div>
        </div>
        <div class="col-lg-6">
          <div class="hero-image">
            <div class="mockup-container">
              <!-- Desktop Mockup -->
              <div class="device-mockup desktop">
                <div class="screen">
                  <div class="mockup-content">
                    <div class="mockup-header">
                      <div class="dots">
                        <span></span>
                        <span></span>
                        <span></span>
                      </div>
                    </div>
                    <div class="mockup-body">
                      <div class="mockup-nav"></div>
                      <div class="mockup-hero"></div>
                      <div class="mockup-sections">
                        <div class="section"></div>
                        <div class="section"></div>
                        <div class="section"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <!-- Mobile Mockup -->
              <div class="device-mockup mobile">
                <div class="screen">
                  <div class="mockup-content">
                    <div class="mockup-header mobile-header">
                      <div class="notch"></div>
                    </div>
                    <div class="mockup-body">
                      <div class="mockup-nav mobile-nav"></div>
                      <div class="mockup-hero mobile-hero"></div>
                      <div class="mockup-sections">
                        <div class="section small"></div>
                        <div class="section small"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Scroll indicator -->
    <div class="scroll-indicator">
      <a href="#services" class="text-primary">
        <i class="bi bi-chevron-down fs-3"></i>
      </a>
    </div>
  </section>
</template>

<script setup>
// No script needed for this component
</script>

<style scoped>
.hero-section {
  background: linear-gradient(135deg, #f8f9ff 0%, #e3f2fd 100%);
  position: relative;
  overflow: hidden;
}

.hero-section::before {
  content: '';
  position: absolute;
  top: 0;
  right: 0;
  width: 50%;
  height: 100%;
  background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="25" cy="25" r="1" fill="%23007bff" opacity="0.1"/><circle cx="75" cy="75" r="1" fill="%23007bff" opacity="0.1"/><circle cx="50" cy="10" r="0.5" fill="%23007bff" opacity="0.1"/><circle cx="10" cy="60" r="0.5" fill="%23007bff" opacity="0.1"/><circle cx="90" cy="30" r="0.5" fill="%23007bff" opacity="0.1"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>') repeat;
  z-index: 1;
}

.hero-content {
  position: relative;
  z-index: 2;
}

.mockup-container {
  position: relative;
  height: 500px;
  z-index: 2;
}

.device-mockup {
  position: absolute;
  border-radius: 12px;
  box-shadow: 0 20px 60px rgba(0, 123, 255, 0.15);
  background: #fff;
  overflow: hidden;
}

.device-mockup.desktop {
  width: 400px;
  height: 300px;
  top: 50px;
  right: 0;
  transform: perspective(1000px) rotateY(-15deg) rotateX(5deg);
}

.device-mockup.mobile {
  width: 180px;
  height: 320px;
  top: 120px;
  right: 120px;
  transform: perspective(1000px) rotateY(15deg) rotateX(-5deg);
  z-index: 3;
}

.screen {
  width: 100%;
  height: 100%;
  background: #fff;
  border-radius: 8px;
  overflow: hidden;
}

.mockup-content {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.mockup-header {
  height: 30px;
  background: #f8f9fa;
  border-bottom: 1px solid #e9ecef;
  display: flex;
  align-items: center;
  padding: 0 12px;
}

.dots {
  display: flex;
  gap: 6px;
}

.dots span {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #dee2e6;
}

.dots span:nth-child(1) { background: #ff5f56; }
.dots span:nth-child(2) { background: #ffbd2e; }
.dots span:nth-child(3) { background: #27ca3f; }

.mobile-header {
  height: 25px;
  background: #000;
  position: relative;
}

.notch {
  width: 100px;
  height: 20px;
  background: #000;
  border-radius: 0 0 12px 12px;
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
}

.mockup-body {
  flex: 1;
  padding: 8px;
  background: #fff;
}

.mockup-nav {
  height: 25px;
  background: linear-gradient(90deg, #007bff, #0056b3);
  border-radius: 4px;
  margin-bottom: 8px;
}

.mobile-nav {
  height: 20px;
}

.mockup-hero {
  height: 80px;
  background: linear-gradient(135deg, #f8f9ff, #e3f2fd);
  border-radius: 6px;
  margin-bottom: 8px;
  position: relative;
}

.mobile-hero {
  height: 60px;
}

.mockup-hero::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 60%;
  height: 8px;
  background: #007bff;
  border-radius: 4px;
}

.mockup-sections {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.section {
  height: 30px;
  background: #f8f9fa;
  border-radius: 4px;
  border-left: 3px solid #007bff;
}

.section.small {
  height: 25px;
}

.scroll-indicator {
  position: absolute;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  animation: bounce 2s infinite;
}

@keyframes bounce {
  0%, 20%, 50%, 80%, 100% {
    transform: translateX(-50%) translateY(0);
  }
  40% {
    transform: translateX(-50%) translateY(-10px);
  }
  60% {
    transform: translateX(-50%) translateY(-5px);
  }
}

@media (max-width: 991.98px) {
  .hero-section {
    text-align: center;
  }
  
  .mockup-container {
    height: 300px;
    margin-top: 3rem;
  }
  
  .device-mockup.desktop {
    width: 280px;
    height: 200px;
    top: 0;
    left: 50%;
    transform: translateX(-50%) perspective(1000px) rotateY(0deg) rotateX(0deg);
  }
  
  .device-mockup.mobile {
    width: 120px;
    height: 220px;
    top: 80px;
    right: 20px;
  }
}

@media (max-width: 575.98px) {
  .device-mockup.mobile {
    display: none;
  }
  
  .device-mockup.desktop {
    width: 250px;
    height: 180px;
  }
}
</style>
