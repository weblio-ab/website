<template>
  <section id="about" class="py-5 bg-light">
    <div class="container">
      <div class="row">
        <div class="col-lg-8 mx-auto text-center mb-5">
          <h2 class="display-5 fw-bold text-dark mb-3">{{ $t('about.title') }}</h2>
          <p class="lead text-muted">{{ $t('about.subtitle') }}</p>
        </div>
      </div>

      <div class="row g-5 align-items-center">
        <div class="col-lg-6">
          <div class="about-content">
            <h3 class="mb-4">Vår historia</h3>
            <p class="mb-4">{{ $t('about.story') }}</p>
            <p class="mb-4">{{ $t('about.mission') }}</p>
            
            <div class="stats-grid">
              <div class="stat-item">
                <div class="stat-number">50+</div>
                <div class="stat-label">Nöjda kunder</div>
              </div>
              <div class="stat-item">
                <div class="stat-number">3+</div>
                <div class="stat-label">År i branschen</div>
              </div>
              <div class="stat-item">
                <div class="stat-number">100%</div>
                <div class="stat-label">Mobilanpassat</div>
              </div>
              <div class="stat-item">
                <div class="stat-number">24/7</div>
                <div class="stat-label">Support</div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="col-lg-6">
          <div class="about-visual">
            <div class="code-window">
              <div class="window-header">
                <div class="window-dots">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
                <div class="window-title">main.js</div>
              </div>
              <div class="code-content">
                <div class="code-line">
                  <span class="line-number">1</span>
                  <span class="code-text">
                    <span class="keyword">import</span> { <span class="function">createApp</span> } <span class="keyword">from</span> <span class="string">'vue'</span>
                  </span>
                </div>
                <div class="code-line">
                  <span class="line-number">2</span>
                  <span class="code-text">
                    <span class="keyword">import</span> <span class="variable">App</span> <span class="keyword">from</span> <span class="string">'./App.vue'</span>
                  </span>
                </div>
                <div class="code-line">
                  <span class="line-number">3</span>
                  <span class="code-text"></span>
                </div>
                <div class="code-line">
                  <span class="line-number">4</span>
                  <span class="code-text">
                    <span class="keyword">const</span> <span class="variable">app</span> = <span class="function">createApp</span>(<span class="variable">App</span>)
                  </span>
                </div>
                <div class="code-line">
                  <span class="line-number">5</span>
                  <span class="code-text">
                    <span class="variable">app</span>.<span class="function">mount</span>(<span class="string">'#app'</span>)
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Team Section -->
      <div class="row mt-5">
        <div class="col-12">
          <h3 class="text-center mb-5">{{ $t('about.team.title') }}</h3>
          <div class="row g-4 justify-content-center">
            <div class="col-lg-5 col-md-6">
              <div class="team-card">
                <div class="team-avatar">
                  <i class="bi bi-person-circle"></i>
                </div>
                <div class="team-info">
                  <h5>{{ $t('about.team.member1.name') }}</h5>
                  <p class="text-primary mb-2">{{ $t('about.team.member1.role') }}</p>
                  <p class="text-muted">{{ $t('about.team.member1.description') }}</p>
                </div>
              </div>
            </div>
            <div class="col-lg-5 col-md-6">
              <div class="team-card">
                <div class="team-avatar">
                  <i class="bi bi-person-circle"></i>
                </div>
                <div class="team-info">
                  <h5>{{ $t('about.team.member2.name') }}</h5>
                  <p class="text-primary mb-2">{{ $t('about.team.member2.role') }}</p>
                  <p class="text-muted">{{ $t('about.team.member2.description') }}</p>
                </div>
              </div>
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
.about-content h3 {
  color: #333;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
  margin-top: 2rem;
}

.stat-item {
  text-align: center;
  padding: 1.5rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 123, 255, 0.1);
}

.stat-number {
  font-size: 2rem;
  font-weight: bold;
  color: #007bff;
  margin-bottom: 0.5rem;
}

.stat-label {
  color: #666;
  font-size: 0.9rem;
}

.about-visual {
  display: flex;
  justify-content: center;
  align-items: center;
}

.code-window {
  width: 100%;
  max-width: 400px;
  background: #1e1e1e;
  border-radius: 12px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.3);
  overflow: hidden;
}

.window-header {
  background: #2d2d2d;
  padding: 0.75rem 1rem;
  display: flex;
  align-items: center;
  gap: 1rem;
}

.window-dots {
  display: flex;
  gap: 0.5rem;
}

.window-dots span {
  width: 12px;
  height: 12px;
  border-radius: 50%;
}

.window-dots span:nth-child(1) { background: #ff5f56; }
.window-dots span:nth-child(2) { background: #ffbd2e; }
.window-dots span:nth-child(3) { background: #27ca3f; }

.window-title {
  color: #cccccc;
  font-size: 0.875rem;
}

.code-content {
  padding: 1rem;
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  font-size: 0.875rem;
  line-height: 1.5;
}

.code-line {
  display: flex;
  align-items: center;
  margin-bottom: 0.25rem;
}

.line-number {
  width: 2rem;
  color: #666;
  user-select: none;
}

.code-text {
  color: #cccccc;
}

.keyword {
  color: #569cd6;
}

.function {
  color: #dcdcaa;
}

.string {
  color: #ce9178;
}

.variable {
  color: #9cdcfe;
}

.team-card {
  background: white;
  padding: 2rem;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 123, 255, 0.1);
  text-align: center;
  transition: all 0.3s ease;
}

.team-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 30px rgba(0, 123, 255, 0.15);
}

.team-avatar {
  font-size: 4rem;
  color: #007bff;
  margin-bottom: 1rem;
}

.team-info h5 {
  margin-bottom: 0.5rem;
  color: #333;
}

@media (max-width: 991.98px) {
  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
  }
  
  .about-visual {
    margin-top: 2rem;
  }
}

@media (max-width: 575.98px) {
  .stats-grid {
    grid-template-columns: 1fr;
  }
  
  .stat-item {
    padding: 1rem;
  }
  
  .stat-number {
    font-size: 1.5rem;
  }
  
  .team-card {
    padding: 1.5rem;
  }
}
</style>
