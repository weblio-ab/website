<template>
  <section id="portfolio" class="py-5">
    <div class="container">
      <div class="row">
        <div class="col-lg-8 mx-auto text-center mb-5">
          <h2 class="display-5 fw-bold text-dark mb-3">{{ $t('portfolio.title') }}</h2>
          <p class="lead text-muted">{{ $t('portfolio.subtitle') }}</p>
        </div>
      </div>
      <div>
        <Swiper
          :modules="[Pagination]"
          :slides-per-view="isMobile ? 1 : 3"
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
              url="https://alpakascoffee.com/"
              image-url="/assets/projects/alpakas.webp"
            />
          </SwiperSlide>
          
          <SwiperSlide>
            <Project
              :category="$t('portfolio.projects.skanespolarna.category')"
              :title="$t('portfolio.projects.skanespolarna.title')"
              :description="$t('portfolio.projects.skanespolarna.description')"
              url="https://skanespolarna.se/"
              image-url="/assets/projects/skånespolarna.png"
            />
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  </section>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Pagination } from 'swiper/modules'
import Project from '../../components/Project.vue'
import { useViewportStore } from '../../stores/viewport'

const viewportStore = useViewportStore()
const { isMobile } = storeToRefs(viewportStore)
</script>

<style scoped>
.portfolio-swiper {
  padding-bottom: 50px;
}
</style>
