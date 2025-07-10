<template>
  <section id="about" class="py-5 bg-light">
    <div class="container">
      <div class="row">
        <div class="col-lg-8 mx-auto text-center mb-5">
          <h2 class="display-5 fw-bold text-dark mb-3">
            {{ $t("about.title") }}
          </h2>
          <p class="lead text-muted">{{ $t("about.subtitle") }}</p>
        </div>
      </div>

      <!-- Team Section -->
      <div class="row mb-5">
        <div class="col-12">
          <h3 class="text-center mb-5">{{ $t("about.team.title") }}</h3>
          <div class="row g-4 justify-content-center">
            <div class="col-lg-5 col-md-6">
              <div class="team-card">
                <div class="team-avatar">
                  <img src="/assets/persons/francisco.png" alt="Francisco Mouat" class="team-photo">
                </div>
                <div class="team-info">
                  <h5>{{ $t("about.team.member1.name") }}</h5>
                  <p class="text-primary mb-2">
                    {{ $t("about.team.member1.role") }}
                  </p>
                  <p class="text-muted">
                    {{ $t("about.team.member1.description") }}
                  </p>
                </div>
              </div>
            </div>
            <div class="col-lg-5 col-md-6">
              <div class="team-card">
                <div class="team-avatar">
                  <img src="/assets/persons/albin.png" alt="Albin Médoc" class="team-photo">
                </div>
                <div class="team-info">
                  <h5>{{ $t("about.team.member2.name") }}</h5>
                  <p class="text-primary mb-2">
                    {{ $t("about.team.member2.role") }}
                  </p>
                  <p class="text-muted">
                    {{ $t("about.team.member2.description") }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="row g-5 align-items-center">
        <div class="col-lg-6">
          <div class="about-content">
            <h3 class="mb-4">{{ $t("about.ourStory") }}</h3>
            <p class="mb-4">{{ $t("about.story") }}</p>
            <p class="mb-4 d-none d-md-block">{{ $t("about.mission") }}</p>

            <!-- Desktop Stats Grid -->
            <div class="stats-grid d-none d-md-block">
              <div class="stat-item">
                <div class="stat-number">4.5<span class="rating-divider">/</span><span class="rating-max">5</span></div>
                <div class="stat-label">{{ $t("about.stats.rating") }}</div>
              </div>
              <div class="stat-item">
                <div class="stat-number">3+</div>
                <div class="stat-label">{{ $t("about.stats.experience") }}</div>
              </div>
              <div class="stat-item">
                <div class="stat-number">100%</div>
                <div class="stat-label">{{ $t("about.stats.mobile") }}</div>
              </div>
              <div class="stat-item">
                <div class="stat-number">24/7</div>
                <div class="stat-label">{{ $t("about.stats.support") }}</div>
              </div>
            </div>

            <!-- Mobile Stats Slider -->
            <div class="d-md-none mt-4">
              <div class="stats-slider-container">
                <div 
                  ref="sliderRef" 
                  class="stats-slider"
                  :style="{ transform: `translateX(-${currentSlide * 100}%)` }"
                >
                  <div class="stat-slide">
                    <div class="stat-item">
                      <div class="stat-number">4.5<span class="rating-divider">/</span><span class="rating-max">5</span></div>
                      <div class="stat-label">{{ $t("about.stats.rating") }}</div>
                    </div>
                  </div>
                  
                  <div class="stat-slide">
                    <div class="stat-item">
                      <div class="stat-number">3+</div>
                      <div class="stat-label">{{ $t("about.stats.experience") }}</div>
                    </div>
                  </div>
                  
                  <div class="stat-slide">
                    <div class="stat-item">
                      <div class="stat-number">100%</div>
                      <div class="stat-label">{{ $t("about.stats.mobile") }}</div>
                    </div>
                  </div>
                  
                  <div class="stat-slide">
                    <div class="stat-item">
                      <div class="stat-number">24/7</div>
                      <div class="stat-label">{{ $t("about.stats.support") }}</div>
                    </div>
                  </div>
                </div>
              </div>
              <!-- Slide indicators -->
              <div class="stats-indicators mt-3">
                <button 
                  v-for="(_, index) in 4" 
                  :key="index"
                  @click="goToSlide(index)"
                  :class="['indicator', { active: currentSlide === index }]"
                  :aria-label="`Gå till statistik ${index + 1}`"
                ></button>
              </div>
            </div>
          </div>
        </div>

        <div class="col-lg-6 d-none d-md-block">
          <div class="about-visual">
            <WindowMockup theme="dark" type="code" title="main.js">
              <CodeBlock />
            </WindowMockup>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import WindowMockup from "../../components/WindowMockup.vue";
import CodeBlock from "../../components/CodeBlock.vue";
import { useTouchSlider } from '../../composables/useTouchSlider'

// Touch slider för statistik på mobil
const { 
  sliderRef, 
  currentSlide, 
  goToSlide 
} = useTouchSlider(4, {
  itemsPerView: { mobile: 1, tablet: 2, desktop: 4 }
})
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

/* Ensure 2x2 layout on desktop */
@media (min-width: 768px) {
  .stats-grid {
    display: grid !important;
    grid-template-columns: repeat(2, 1fr) !important;
    gap: 1.5rem;
  }
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

.rating-divider {
  color: #6c757d;
  font-weight: normal;
  margin: 0 0.1em;
}

.rating-max {
  color: #6c757d;
  font-weight: normal;
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
  display: flex;
  justify-content: center;
  align-items: center;
}

.team-photo {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  border: 4px solid #007bff;
  box-shadow: 0 4px 20px rgba(0, 123, 255, 0.2);
}

.team-info h5 {
  margin-bottom: 0.5rem;
  color: #333;
}

/* Mobile stats slider styles */
.stats-slider-container {
  overflow: hidden;
  position: relative;
  width: 100%;
  touch-action: pan-y;
}

.stats-slider {
  display: flex;
  transition: transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  will-change: transform;
  touch-action: pan-y;
  -webkit-overflow-scrolling: touch;
}

.stat-slide {
  flex: 0 0 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 0 15px;
  box-sizing: border-box;
}

/* Slide indicators för stats */
.stats-indicators {
  display: flex;
  justify-content: center;
  gap: 8px;
}

.indicator {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  border: none;
  background: #dee2e6;
  cursor: pointer;
  transition: all 0.3s ease;
}

.indicator.active {
  background: #007bff;
  transform: scale(1.2);
}

.indicator:hover {
  background: #6c757d;
}

/* Förbättra touch-interaktion för stats */
.stats-slider-container {
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

.stats-slider:not(.dragging) {
  transition: transform 0.4s cubic-bezier(0.23, 1, 0.32, 1);
}

/* Mobile responsive för stat items */
@media (max-width: 767.98px) {
  .stat-slide .stat-item {
    width: 100%;
    max-width: 280px;
    margin: 0 auto;
  }
  
  .stats-slider-container {
    margin: 0;
    padding: 0;
  }
  
  .stat-slide {
    padding: 0 10px;
  }
}

@media (max-width: 991.98px) and (min-width: 768px) {
  .stats-grid {
    grid-template-columns: repeat(2, 1fr) !important;
    gap: 1rem;
  }

  .about-visual {
    margin-top: 2rem;
  }
}

@media (max-width: 767.98px) {
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
