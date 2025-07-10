<template>
  <section id="testimonials" class="py-5">
    <div class="container">
      <div class="row">
        <div class="col-lg-8 mx-auto text-center mb-5">
          <h2 class="display-5 fw-bold text-dark mb-3">{{ $t('testimonials.title') }}</h2>
          <p class="lead text-muted">{{ $t('testimonials.subtitle') }}</p>
        </div>
      </div>

      <!-- Desktop Grid -->
      <div class="row g-4 d-none d-md-flex">
        <div class="col-md-4">
          <Testimonial 
            :text="$t('testimonials.items.testimonial1.text')"
            :author="$t('testimonials.items.testimonial1.author')"
            :company="$t('testimonials.items.testimonial1.company')"
          />
        </div>
        <div class="col-md-4">
          <Testimonial 
            :text="$t('testimonials.items.testimonial2.text')"
            :author="$t('testimonials.items.testimonial2.author')"
            :company="$t('testimonials.items.testimonial2.company')"
          />
        </div>
        <div class="col-md-4">
          <Testimonial 
            :text="$t('testimonials.items.testimonial3.text')"
            :author="$t('testimonials.items.testimonial3.author')"
            :company="$t('testimonials.items.testimonial3.company')"
          />
        </div>
      </div>

      <!-- Mobile Swiper -->
      <div class="d-md-none">
        <Swiper
          :modules="[Pagination]"
          :slides-per-view="1"
          :space-between="20"
          :pagination="{ clickable: true }"
          class="testimonials-swiper"
        >
          <SwiperSlide>
            <Testimonial 
              :text="$t('testimonials.items.testimonial1.text')"
              :author="$t('testimonials.items.testimonial1.author')"
              :company="$t('testimonials.items.testimonial1.company')"
            />
          </SwiperSlide>
          
          <SwiperSlide>
            <Testimonial 
              :text="$t('testimonials.items.testimonial2.text')"
              :author="$t('testimonials.items.testimonial2.author')"
              :company="$t('testimonials.items.testimonial2.company')"
            />
          </SwiperSlide>
          
          <SwiperSlide>
            <Testimonial 
              :text="$t('testimonials.items.testimonial3.text')"
              :author="$t('testimonials.items.testimonial3.author')"
              :company="$t('testimonials.items.testimonial3.company')"
            />
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  </section>
</template>

<script setup>
import Testimonial from '../../components/Testimonial.vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Pagination } from 'swiper/modules'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/pagination'
</script>

<style scoped>
/* Swiper customization for testimonials */
.testimonials-swiper {
  padding-bottom: 50px;
}

.testimonials-swiper :deep(.swiper-pagination) {
  bottom: 10px;
}

.testimonials-swiper :deep(.swiper-pagination-bullet) {
  background: #dee2e6;
  width: 12px;
  height: 12px;
  opacity: 1;
}

.testimonials-swiper :deep(.swiper-pagination-bullet-active) {
  background: #007bff;
  transform: scale(1.2);
}

.testimonials-swiper :deep(.swiper-slide) {
  height: auto;
  display: flex;
  align-items: stretch;
  padding: 0 15px;
  box-sizing: border-box;
}
</style>
