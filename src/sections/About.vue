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

      <div class="row g-5 align-items-center">
        <div class="col-lg-6">
          <div class="about-content">
            <h3 class="mb-4">{{ $t("about.ourStory") }}</h3>
            <p class="mb-4">{{ $t("about.story") }}</p>
            <p class="mb-4">{{ $t("about.mission") }}</p>

            <div class="stats-grid">
              <div class="stat-item">
                <div class="stat-number">50+</div>
                <div class="stat-label">{{ $t("about.stats.customers") }}</div>
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
          </div>
        </div>

        <div class="col-lg-6">
          <div class="about-visual">
            <WindowMockup theme="dark" type="code" title="main.js">
              <CodeBlock />
            </WindowMockup>
          </div>
        </div>
      </div>

      <!-- Team Section -->
      <div class="row mt-5">
        <div class="col-12">
          <h3 class="text-center mb-5">{{ $t("about.team.title") }}</h3>
          <div class="row g-4 justify-content-center">
            <div class="col-lg-5 col-md-6">
              <div class="team-card">
                <div class="team-avatar">
                  <img src="/assets/1725475557070.jpg" alt="Francisco Mouat" class="team-photo">
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
                  <img src="/assets/20250614_101238_9856F75C.jpg" alt="Albin Médoc" class="team-photo">
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
    </div>
  </section>
</template>

<script setup>
import WindowMockup from "../components/WindowMockup.vue";
import CodeBlock from "../components/CodeBlock.vue";
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
