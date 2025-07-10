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
        <!-- Restaurant Project -->
        <Project
          :category="$t('portfolio.projects.restaurant.category')"
          :title="$t('portfolio.projects.restaurant.title')"
          :description="$t('portfolio.projects.restaurant.description')"
          url="https://bistrogota.se"
          image-url="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        />

        <!-- Salon Project -->
        <Project
          :category="$t('portfolio.projects.salon.category')"
          :title="$t('portfolio.projects.salon.title')"
          :description="$t('portfolio.projects.salon.description')"
          url="https://ameasalong.se"
          image-url="/assets/projects/ameasalong.png"
        />

        <!-- Construction Company Project -->
        <Project
          :category="$t('portfolio.projects.company.category')"
          :title="$t('portfolio.projects.company.title')"
          :description="$t('portfolio.projects.company.description')"
          url="https://byggfirmanord.se"
          image-url="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
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
              :category="$t('portfolio.projects.restaurant.category')"
              :title="$t('portfolio.projects.restaurant.title')"
              :description="$t('portfolio.projects.restaurant.description')"
              url="https://bistrogota.se"
              image-url="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
            />
          </SwiperSlide>
          
          <SwiperSlide>
            <Project
              :category="$t('portfolio.projects.salon.category')"
              :title="$t('portfolio.projects.salon.title')"
              :description="$t('portfolio.projects.salon.description')"
              url="https://ameasalong.se"
              image-url="/assets/projects/ameasalong.png"
            />
          </SwiperSlide>
          
          <SwiperSlide>
            <Project
              :category="$t('portfolio.projects.company.category')"
              :title="$t('portfolio.projects.company.title')"
              :description="$t('portfolio.projects.company.description')"
              url="https://byggfirmanord.se"
              image-url="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
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
