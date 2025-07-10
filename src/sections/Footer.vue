<template>
  <footer class="footer bg-dark text-light py-5">
    <div class="container">
      <div class="row g-4 justify-content-center">
        <div class="col-xl-3 col-lg-6 col-md-6 col-sm-10">
          <div class="text-center text-xl-start">
            <h6 class="text-white mb-3">{{ $t('footer.quickLinks') }}</h6>
            <ul class="footer-links">
              <li><a href="#home">{{ $t('navigation.home') }}</a></li>
              <li><a href="#services">{{ $t('navigation.services') }}</a></li>
              <li><a href="#portfolio">{{ $t('navigation.portfolio') }}</a></li>
              <li><a href="#pricing">{{ $t('navigation.pricing') }}</a></li>
              <li><a href="#about">{{ $t('navigation.about') }}</a></li>
              <li><a href="#contact">{{ $t('navigation.contact') }}</a></li>
            </ul>
          </div>
        </div>
        
        <div class="col-xl-6 col-lg-6 col-md-6 col-sm-10">
          <div class="text-center text-xl-start">
            <div class="row g-4">
              <div class="col-xl-6">
                <h6 class="text-white mb-3">{{ $t('footer.contact') }}</h6>
                <div class="contact-info">
                  <div class="contact-item">
                    <i class="bi bi-telephone me-2"></i>
                    <PhoneObfuscate :phone="$t('company.phone')" link-class="text-light" />
                  </div>
                  <div class="contact-item">
                    <i class="bi bi-envelope me-2"></i>
                    <EmailObfuscate :email="$t('company.email')" link-class="text-light" />
                  </div>
                  <div class="contact-item">
                    <i class="bi bi-geo-alt me-2"></i>
                    <span class="text-light">{{ $t('company.address') }}</span>
                  </div>
                </div>
              </div>
              
              <div class="col-xl-6">
                <h6 class="text-white mb-3">{{ $t('footer.technology') }}</h6>
                <div class="tech-badges">
                  <span class="tech-badge">{{ $t('footer.techBadges.vue') }}</span>
                  <span class="tech-badge">{{ $t('footer.techBadges.bootstrap') }}</span>
                  <span class="tech-badge">{{ $t('footer.techBadges.responsive') }}</span>
                  <span class="tech-badge">{{ $t('footer.techBadges.seo') }}</span>
                  <span class="tech-badge">{{ $t('footer.techBadges.pwa') }}</span>
                  <span class="tech-badge">{{ $t('footer.techBadges.modern') }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <hr class="my-4 border-secondary">
      
      <div class="row align-items-center">
        <div class="col-md-6">
          <p class="mb-0 text-light-emphasis">{{ $t('footer.copyright') }}</p>
        </div>
        <div class="col-md-6 text-md-end">
          <div class="footer-links-inline">
            <router-link to="/privacy" class="text-light-emphasis" target="_blank">{{ $t('footer.privacy') }}</router-link>
            <router-link to="/terms" class="text-light-emphasis" target="_blank">{{ $t('footer.terms') }}</router-link>
            <router-link to="/cookies" class="text-light-emphasis" target="_blank">{{ $t('footer.cookies') }}</router-link>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import EmailObfuscate from '../components/EmailObfuscate.vue'
import PhoneObfuscate from '../components/PhoneObfuscate.vue'
</script>

<style scoped>
.footer {
  background: linear-gradient(135deg, #1a1a2e, #16213e) !important;
}

.footer-logo {
  height: 32px;
  width: auto;
  filter: brightness(0) invert(1);
}

.footer-brand h4 {
  font-weight: bold;
}

.social-links {
  display: flex;
  gap: 0.75rem;
  margin-top: 1rem;
}

.social-link {
  width: 40px;
  height: 40px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  text-decoration: none;
  transition: all 0.3s ease;
}

.social-link:hover {
  background: #007bff;
  color: #fff;
  transform: translateY(-2px);
}

.footer-links {
  list-style: none;
  padding: 0;
  margin: 0;
}

.footer-links li {
  margin-bottom: 0.5rem;
}

.footer-links a {
  color: #adb5bd;
  text-decoration: none;
  transition: color 0.3s ease;
}

.footer-links a:hover {
  color: #007bff;
}

.contact-info {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.contact-item {
  display: flex;
  align-items: center;
  color: #adb5bd;
  font-size: 0.9rem;
}

.contact-item i {
  color: #007bff;
  flex-shrink: 0;
}

.tech-badges {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

@media (max-width: 1199.98px) {
  .contact-info {
    align-items: center;
  }
  
  .contact-item {
    justify-content: center;
  }
  
  .tech-badges {
    justify-content: center;
  }
}

@media (max-width: 575.98px) {
  .footer-links-inline {
    justify-content: flex-start;
    margin-top: 1rem;
  }
  
  .tech-badges {
    margin-top: 0.5rem;
  }
  
  .social-links {
    justify-content: flex-start;
  }
}

.tech-badge {
  display: inline-block;
  padding: 0.25rem 0.75rem;
  background: rgba(0, 123, 255, 0.2);
  color: #007bff;
  border-radius: 15px;
  font-size: 0.8rem;
  font-weight: 500;
  border: 1px solid rgba(0, 123, 255, 0.3);
}

.footer-links-inline {
  display: flex;
  gap: 1.5rem;
  justify-content: flex-end;
}

.footer-links-inline a {
  color: #adb5bd;
  text-decoration: none;
  font-size: 0.9rem;
  transition: color 0.3s ease;
}

.footer-links-inline a:hover {
  color: #007bff;
}

@media (max-width: 767.98px) {
  .footer-links-inline {
    justify-content: flex-start;
    margin-top: 1rem;
  }
  
  .tech-badges {
    margin-top: 0.5rem;
  }
  
  .social-links {
    justify-content: flex-start;
  }
}
</style>
