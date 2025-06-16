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
          <div class="testimonial-card h-100">
            <div class="testimonial-content">
              <div class="quote-icon">
                <i class="bi bi-quote"></i>
              </div>
              <blockquote>
                "{{ $t('testimonials.items.testimonial1.text') }}"
              </blockquote>
            </div>
            <div class="testimonial-author">
              <div class="author-avatar">
                <i class="bi bi-person-circle"></i>
              </div>
              <div class="author-info">
                <h6>{{ $t('testimonials.items.testimonial1.author') }}</h6>
                <small class="text-muted">{{ $t('testimonials.items.testimonial1.company') }}</small>
              </div>
            </div>
          </div>
        </div>

        <div class="col-lg-4 col-md-6">
          <div class="testimonial-card h-100">
            <div class="testimonial-content">
              <div class="quote-icon">
                <i class="bi bi-quote"></i>
              </div>
              <blockquote>
                "{{ $t('testimonials.items.testimonial2.text') }}"
              </blockquote>
            </div>
            <div class="testimonial-author">
              <div class="author-avatar">
                <i class="bi bi-person-circle"></i>
              </div>
              <div class="author-info">
                <h6>{{ $t('testimonials.items.testimonial2.author') }}</h6>
                <small class="text-muted">{{ $t('testimonials.items.testimonial2.company') }}</small>
              </div>
            </div>
          </div>
        </div>

        <div class="col-lg-4 col-md-6">
          <div class="testimonial-card h-100">
            <div class="testimonial-content">
              <div class="quote-icon">
                <i class="bi bi-quote"></i>
              </div>
              <blockquote>
                "{{ $t('testimonials.items.testimonial3.text') }}"
              </blockquote>
            </div>
            <div class="testimonial-author">
              <div class="author-avatar">
                <i class="bi bi-person-circle"></i>
              </div>
              <div class="author-info">
                <h6>{{ $t('testimonials.items.testimonial3.author') }}</h6>
                <small class="text-muted">{{ $t('testimonials.items.testimonial3.company') }}</small>
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
.testimonial-card {
  background: white;
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 4px 20px rgba(0, 123, 255, 0.1);
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
}

.testimonial-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 30px rgba(0, 123, 255, 0.15);
}

.testimonial-content {
  flex: 1;
  margin-bottom: 1.5rem;
}

.quote-icon {
  font-size: 2rem;
  color: #007bff;
  margin-bottom: 1rem;
}

blockquote {
  font-size: 1.1rem;
  line-height: 1.6;
  color: #555;
  font-style: italic;
  margin: 0;
}

.testimonial-author {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding-top: 1.5rem;
  border-top: 1px solid #f8f9fa;
}

.author-avatar {
  font-size: 2.5rem;
  color: #007bff;
}

.author-info h6 {
  margin-bottom: 0.25rem;
  color: #333;
}

@media (max-width: 767.98px) {
  .testimonial-card {
    padding: 1.5rem;
  }
  
  blockquote {
    font-size: 1rem;
  }
}
</style>
