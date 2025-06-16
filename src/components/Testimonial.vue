<template>
  <div class="testimonial-card h-100">
    <div class="testimonial-content">
      <div class="quote-icon">
        <i class="bi bi-quote"></i>
      </div>
      <blockquote>
        "{{ text }}"
      </blockquote>
    </div>
    <div class="testimonial-author">
      <div class="author-avatar">
        <i class="bi bi-person-circle"></i>
      </div>
      <div class="author-info">
        <h6>{{ author }}</h6>
        <small class="text-muted">{{ company }}</small>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  text: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  company: {
    type: String,
    required: true
  }
})
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
