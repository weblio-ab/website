<template>
  <section id="portfolio" class="py-5">
    <div class="container">
      <div class="row">
        <div class="col-lg-8 mx-auto text-center mb-5">
          <h2 class="display-5 fw-bold text-dark mb-3">{{ $t('portfolio.title') }}</h2>
          <p class="lead text-muted">{{ $t('portfolio.subtitle') }}</p>
        </div>
      </div>

      <!-- Desktop Grid -->
      <div class="row g-4 d-none d-md-flex">
        <Project
          :category="$t('portfolio.projects.mulo.category')"
          :title="$t('portfolio.projects.mulo.title')"
          :description="$t('portfolio.projects.mulo.description')"
          url="https://mulo.se"
          image-url="/assets/projects/mulo.webp"
        />
        <Project
          :category="$t('portfolio.projects.amea-salong.category')"
          :title="$t('portfolio.projects.amea-salong.title')"
          :description="$t('portfolio.projects.amea-salong.description')"
          url="https://ameasalong.se"
          image-url="/assets/projects/ameasalong.webp"
        />
        <Project
          :category="$t('portfolio.projects.alpakas.category')"
          :title="$t('portfolio.projects.alpakas.title')"
          :description="$t('portfolio.projects.alpakas.description')"
          url="https://alpakascoffee.se"
          :disable-link="true"
          image-url="/assets/projects/alpakas.webp"
        />
      </div>

      <!-- Mobile Slider -->
      <div class="d-md-none">
        <Swiper
          :modules="[Pagination]"
          :slides-per-view="1"
          :space-between="20"
          :pagination="{ clickable: true }"
          class="portfolio-swiper"
        >
          <SwiperSlide>
            <Project
              :category="$t('portfolio.projects.mulo.category')"
              :title="$t('portfolio.projects.mulo.title')"
              :description="$t('portfolio.projects.mulo.description')"
              url="https://mulo.se"
              image-url="/assets/projects/mulo.webp"
            />
          </SwiperSlide>
          
          <SwiperSlide>
            <Project
              :category="$t('portfolio.projects.amea-salong.category')"
              :title="$t('portfolio.projects.amea-salong.title')"
              :description="$t('portfolio.projects.amea-salong.description')"
              url="https://ameasalong.se"
              image-url="/assets/projects/ameasalong.webp"
            />
          </SwiperSlide>
          
          <SwiperSlide>
            <Project
              :category="$t('portfolio.projects.alpakas.category')"
              :title="$t('portfolio.projects.alpakas.title')"
              :description="$t('portfolio.projects.alpakas.description')"
              url="https://alpakascoffee.se"
              :disable-link="true"
              image-url="/assets/projects/alpakas.webp"
            />
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  </section>
</template>

<script setup>
import Project from '../../components/Project.vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Pagination } from 'swiper/modules'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/pagination'
</script>

<style scoped>
/* Swiper customization for portfolio */
.portfolio-swiper {
  padding-bottom: 50px;
}

.portfolio-swiper :deep(.swiper-pagination) {
  bottom: 10px;
}

.portfolio-swiper :deep(.swiper-pagination-bullet) {
  background: #dee2e6;
  width: 12px;
  height: 12px;
  opacity: 1;
}

.portfolio-swiper :deep(.swiper-pagination-bullet-active) {
  background: #007bff;
  transform: scale(1.2);
}

.portfolio-swiper :deep(.swiper-slide) {
  height: auto;
  display: flex;
  align-items: stretch;
  padding: 0 15px;
  box-sizing: border-box;
}
</style>
