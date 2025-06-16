<template>
  <section id="testimonials" class="py-5">
    <div class="container">
      <div class="row">
        <div class="col-lg-8 mx-auto text-center mb-5">
          <h2 class="display-5 fw-bold text-dark mb-3">{{ $t('testimonials.title') }}</h2>
        </div>
      </div>

      <div class="row g-4">
        <div class="col-lg-4 col-md-6">
          <Testimonial 
            :text="$t('testimonials.items.testimonial1.text')"
            :author="$t('testimonials.items.testimonial1.author')"
            :company="$t('testimonials.items.testimonial1.company')"
          />
        </div>

        <div class="col-lg-4 col-md-6">
          <Testimonial 
            :text="$t('testimonials.items.testimonial2.text')"
            :author="$t('testimonials.items.testimonial2.author')"
            :company="$t('testimonials.items.testimonial2.company')"
          />
        </div>

        <div class="col-lg-4 col-md-6">
          <Testimonial 
            :text="$t('testimonials.items.testimonial3.text')"
            :author="$t('testimonials.items.testimonial3.author')"
            :company="$t('testimonials.items.testimonial3.company')"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import Testimonial from '../components/Testimonial.vue'
</script>

<style scoped>
/* No styles needed - all styling is in Testimonial.vue component */
</style>
