<template>
  <section id="portfolio" class="py-5">
    <div class="container">
      <div class="row">
        <div class="col-lg-8 mx-auto text-center mb-5">
          <h2 class="display-5 fw-bold mb-3">{{ $t('portfolio.title') }}</h2>
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
          <SwiperSlide v-for="(project) in projects" :key="project.title">
            <Project
              :category="project.category"
              :title="project.title"
              :description="project.description"
              :url="project.url"
              :image-url="project.imageUrl"
            />
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed } from "vue";
import { storeToRefs } from 'pinia'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Pagination } from 'swiper/modules'
import { useI18n } from "vue-i18n";
import Project from '../../components/Project.vue'
import { useViewportStore } from '../../stores/viewport'

const { tm } = useI18n();

const viewportStore = useViewportStore()
const { isMobile } = storeToRefs(viewportStore)

const projects = computed(() => tm("portfolio.projects"));

</script>

<style scoped>
.portfolio-swiper {
  padding-bottom: 50px;
}
</style>
