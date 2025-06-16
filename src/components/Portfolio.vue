<template>
  <section id="portfolio" class="py-5">
    <div class="container">
      <div class="row">
        <div class="col-lg-8 mx-auto text-center mb-5">
          <h2 class="display-5 fw-bold text-dark mb-3">{{ $t('portfolio.title') }}</h2>
          <p class="lead text-muted">{{ $t('portfolio.subtitle') }}</p>
        </div>
      </div>

      <div class="row g-4">
        <!-- Restaurant Project -->
        <div class="col-lg-4 col-md-6">
          <div class="portfolio-card">
            <div class="portfolio-image">
              <div class="mockup-browser">
                <div class="browser-header">
                  <div class="browser-dots">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                  <div class="browser-url">bistrogota.se</div>
                </div>
                <div class="browser-content restaurant-theme">
                  <div class="mock-header"></div>
                  <div class="mock-hero"></div>
                  <div class="mock-content">
                    <div class="mock-section"></div>
                    <div class="mock-section"></div>
                  </div>
                </div>
              </div>
              <div class="portfolio-overlay">
                <button class="btn btn-primary">{{ $t('portfolio.viewProject') }}</button>
              </div>
            </div>
            <div class="portfolio-info">
              <span class="portfolio-category">{{ $t('portfolio.projects.restaurant.category') }}</span>
              <h4>{{ $t('portfolio.projects.restaurant.title') }}</h4>
              <p class="text-muted">{{ $t('portfolio.projects.restaurant.description') }}</p>
            </div>
          </div>
        </div>

        <!-- Salon Project -->
        <div class="col-lg-4 col-md-6">
          <div class="portfolio-card">
            <div class="portfolio-image">
              <div class="mockup-browser">
                <div class="browser-header">
                  <div class="browser-dots">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                  <div class="browser-url">beautystudio.se</div>
                </div>
                <div class="browser-content salon-theme">
                  <div class="mock-header"></div>
                  <div class="mock-hero"></div>
                  <div class="mock-content">
                    <div class="mock-section"></div>
                    <div class="mock-section"></div>
                  </div>
                </div>
              </div>
              <div class="portfolio-overlay">
                <button class="btn btn-primary">{{ $t('portfolio.viewProject') }}</button>
              </div>
            </div>
            <div class="portfolio-info">
              <span class="portfolio-category">{{ $t('portfolio.projects.salon.category') }}</span>
              <h4>{{ $t('portfolio.projects.salon.title') }}</h4>
              <p class="text-muted">{{ $t('portfolio.projects.salon.description') }}</p>
            </div>
          </div>
        </div>

        <!-- Construction Company Project -->
        <div class="col-lg-4 col-md-6">
          <div class="portfolio-card">
            <div class="portfolio-image">
              <div class="mockup-browser">
                <div class="browser-header">
                  <div class="browser-dots">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                  <div class="browser-url">byggfirmanord.se</div>
                </div>
                <div class="browser-content construction-theme">
                  <div class="mock-header"></div>
                  <div class="mock-hero"></div>
                  <div class="mock-content">
                    <div class="mock-section"></div>
                    <div class="mock-section"></div>
                  </div>
                </div>
              </div>
              <div class="portfolio-overlay">
                <button class="btn btn-primary">{{ $t('portfolio.viewProject') }}</button>
              </div>
            </div>
            <div class="portfolio-info">
              <span class="portfolio-category">{{ $t('portfolio.projects.company.category') }}</span>
              <h4>{{ $t('portfolio.projects.company.title') }}</h4>
              <p class="text-muted">{{ $t('portfolio.projects.company.description') }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
// No script needed for this component
</script>

<style scoped>
.portfolio-card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 123, 255, 0.1);
  overflow: hidden;
  transition: all 0.3s ease;
}

.portfolio-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 30px rgba(0, 123, 255, 0.15);
}

.portfolio-image {
  position: relative;
  height: 250px;
  background: #f8f9fa;
  overflow: hidden;
}

.mockup-browser {
  width: 90%;
  height: 80%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.browser-header {
  height: 25px;
  background: #f1f3f5;
  border-bottom: 1px solid #e9ecef;
  display: flex;
  align-items: center;
  padding: 0 8px;
  gap: 8px;
}

.browser-dots {
  display: flex;
  gap: 4px;
}

.browser-dots span {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #dee2e6;
}

.browser-dots span:nth-child(1) { background: #ff5f56; }
.browser-dots span:nth-child(2) { background: #ffbd2e; }
.browser-dots span:nth-child(3) { background: #27ca3f; }

.browser-url {
  flex: 1;
  height: 15px;
  background: white;
  border-radius: 3px;
  font-size: 8px;
  display: flex;
  align-items: center;
  padding: 0 6px;
  color: #666;
}

.browser-content {
  height: calc(100% - 25px);
  padding: 6px;
}

.mock-header {
  height: 20px;
  background: #007bff;
  border-radius: 3px;
  margin-bottom: 6px;
}

.mock-hero {
  height: 50px;
  background: linear-gradient(135deg, #f8f9ff, #e3f2fd);
  border-radius: 4px;
  margin-bottom: 6px;
}

.mock-content {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.mock-section {
  height: 20px;
  background: #f8f9fa;
  border-radius: 3px;
  border-left: 2px solid #007bff;
}

/* Theme variations */
.restaurant-theme .mock-header {
  background: #dc3545;
}

.restaurant-theme .mock-hero {
  background: linear-gradient(135deg, #fff5f5, #ffeaea);
}

.restaurant-theme .mock-section {
  border-left-color: #dc3545;
}

.salon-theme .mock-header {
  background: #e83e8c;
}

.salon-theme .mock-hero {
  background: linear-gradient(135deg, #fdf2f8, #fce7f3);
}

.salon-theme .mock-section {
  border-left-color: #e83e8c;
}

.construction-theme .mock-header {
  background: #fd7e14;
}

.construction-theme .mock-hero {
  background: linear-gradient(135deg, #fff8f0, #fef3e2);
}

.construction-theme .mock-section {
  border-left-color: #fd7e14;
}

.portfolio-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 123, 255, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.portfolio-card:hover .portfolio-overlay {
  opacity: 1;
}

.portfolio-info {
  padding: 1.5rem;
}

.portfolio-category {
  display: inline-block;
  padding: 0.25rem 0.75rem;
  background: rgba(0, 123, 255, 0.1);
  color: #007bff;
  border-radius: 20px;
  font-size: 0.875rem;
  font-weight: 500;
  margin-bottom: 0.5rem;
}

.portfolio-info h4 {
  margin-bottom: 0.5rem;
  color: #333;
}

@media (max-width: 767.98px) {
  .portfolio-image {
    height: 200px;
  }
  
  .portfolio-info {
    padding: 1rem;
  }
}
</style>
