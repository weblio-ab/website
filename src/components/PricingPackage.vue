<template>
    <div class="col-lg-4">
        <div class="pricing-card h-100" :class="{ popular: mostPopular }">
        <div v-if="mostPopular" class="popular-badge">{{ $t('pricing.popular') }}</div>
        <div class="pricing-header">
            <h3>{{ title }}</h3>
            <div class="price">
            <span class="amount">
                {{ price }}
            </span>
            <span class="currency">
                {{ currency }}
            </span>
            </div>
            <p class="text-muted">{{ description }}</p>
        </div>
        <div class="pricing-features">
            <ul class="list-unstyled">
            <li v-for="feature in features" :key="feature">
                <i class="bi bi-check-circle-fill text-primary"></i>
                <span>{{ feature }}</span>
            </li>
            </ul>
        </div>
        <div class="pricing-footer">
            <router-link class="btn btn-primary w-100" to="/#contact">{{ $t('common.getStarted') }}</router-link>
        </div>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
  title: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  currency: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  features: {
    type: Array,
    required: true
  },
  mostPopular: {
    type: Boolean,
    default: false
  }
})
</script>

<style scoped>
.pricing-card {
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 123, 255, 0.1);
  padding: 2rem;
  position: relative;
  transition: all 0.3s ease;
  border: 2px solid transparent;
  display: flex;
  flex-direction: column;
}

.pricing-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 30px rgba(0, 123, 255, 0.15);
}

.pricing-card.popular {
  border-color: #007bff;
  transform: scale(1.05);
}

.pricing-card.popular:hover {
  transform: scale(1.05) translateY(-5px);
}

.popular-badge {
  position: absolute;
  top: -12px;
  left: 50%;
  transform: translateX(-50%);
  background: linear-gradient(135deg, #007bff, #0056b3);
  color: white;
  padding: 0.5rem 1.5rem;
  border-radius: 20px;
  font-size: 0.875rem;
  font-weight: 600;
}

.pricing-header {
  text-align: center;
  margin-bottom: 2rem;
}

.pricing-header h3 {
  margin-bottom: 1rem;
  color: #333;
}

.price {
  margin-bottom: 1rem;
}

.amount {
  font-size: 3rem;
  font-weight: bold;
  color: #007bff;
  line-height: 1;
}

.currency {
  font-size: 1.25rem;
  color: #666;
  margin-left: 0.5rem;
}

.pricing-features {
  margin-bottom: 2rem;
  flex: 1;
}

.pricing-footer {
  margin-top: auto;
}

.pricing-features ul {
  margin: 0;
}

.pricing-features li {
  padding: 0.5rem 0;
  border-bottom: 1px solid #f8f9fa;
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
}

.pricing-features li i {
  flex-shrink: 0;
  margin-top: 0.125rem;
}

.pricing-features li:last-child {
  border-bottom: none;
}
</style>