# GitHub Copilot Instructions för Weblio

Detta är en Vue.js 3 webbyrå-hemsida med modern teknik stack. Följ dessa riktlinjer när du assisterar med kod.

## Teknisk Stack

- **Frontend**: Vue.js 3 med Composition API
- **State Management**: Pinia
- **Styling**: Bootstrap 5 + custom CSS
- **Internationalisering**: Vue i18n (svenska/engelska)
- **Icons**: Bootstrap Icons
- **Build Tool**: Vite
- **Package Manager**: pnpm

## Kodstil & Konventioner

### Vue.js Komponenter
- Använd alltid `<script setup>` syntax
- Föredra Composition API över Options API
- Använd TypeScript-liknande JSDoc kommentarer när det behövs
- Komponentnamn ska vara PascalCase

```vue
<script setup>
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const isVisible = ref(false)
</script>
```

### Pinia Stores
- Använd Composition API syntax med `defineStore`
- Strukturera med tydliga state, getters och actions sektioner
- Använd `storeToRefs` för reaktivitet i komponenter

```javascript
export const useAppStore = defineStore('app', () => {
  // State
  const isLoading = ref(false)
  
  // Getters
  const loadingStatus = computed(() => isLoading.value ? 'loading' : 'idle')
  
  // Actions
  function setLoading(status) {
    isLoading.value = status
  }
  
  return { isLoading, loadingStatus, setLoading }
})
```

### CSS & Styling
- Använd Bootstrap 5 klasser först
- Custom CSS ska vara scoped i komponenter
- Följ BEM-metodologi för custom klasser
- Använd CSS custom properties för färger
- Responsive design är obligatoriskt

```css
.portfolio-card {
  background: white;
  border-radius: 12px;
  transition: all 0.3s ease;
}

.portfolio-card:hover {
  transform: translateY(-5px);
}
```

### Internationalisering
- Alla texter ska vara i språkfiler (`sv.json`, `en.json`)
- Använd strukturerade nycklar: `section.component.text`
- Svenska är standardspråk

```vue
<template>
  <h1>{{ $t('hero.title') }}</h1>
  <p>{{ $t('hero.subtitle') }}</p>
</template>
```

## Projektstruktur

```
src/
├── components/          # Vue komponenter
├── composables/         # Vue composables
├── locales/            # i18n språkfiler
├── stores/             # Pinia stores
├── App.vue             # Huvudkomponent
├── main.js             # Entry point
└── style.css           # Global styles
```

## Specifika Riktlinjer

### Responsiv Design
- Mobile-first approach
- Breakpoints: 576px, 768px, 992px, 1200px
- Testa alltid på mobil, tablet och desktop

### Tillgänglighet
- Använd semantisk HTML
- Lägg till `aria-label` för ikoner och knappar
- Inkludera `alt` för bilder
- Säkerställ god färgkontrast
- Stöd för `prefers-reduced-motion`

### Prestanda
- Lazy loading för bilder
- Code splitting för stora komponenter
- Minimal bundle size
- Optimerade animationer (använd `transform` och `opacity`)

### Animationer
- Använd CSS transitions för enkla hover-effekter
- Vue transitions för component in/out
- Intersection Observer för scroll-baserade animationer
- Respektera `prefers-reduced-motion`

```vue
<Transition name="fade">
  <div v-if="isVisible" class="content">
    Content här
  </div>
</Transition>
```

## Webbyrå-specifika Funktioner

### Portfolio Sektion
- Mockup-baserade projektvisningar
- Hover overlays för interaktion
- Kategori-baserad filtrering

### Kontaktformulär
- Validering på frontend
- Loading states
- Success/error meddelanden
- Integration med Pinia store

### Navigation
- Scrollspy funktionalitet
- Smooth scrolling mellan sektioner
- Responsive hamburger meny
- Aktiv sektion highlighting

### Prissättning
- Tydliga paket med features
- Populärt paket highlighting
- Transparenta löpande kostnader

## Vanliga Patterns

### Komponent med Intersection Observer
```vue
<script setup>
import { useIntersectionObserver } from '../composables/useIntersectionObserver'

const { isVisible, target } = useIntersectionObserver(0.1)
</script>

<template>
  <section ref="target" :class="{ 'fade-in-up': isVisible }">
    <!-- innehåll -->
  </section>
</template>
```

### Store Integration
```vue
<script setup>
import { useAppStore } from '../stores/app'
import { storeToRefs } from 'pinia'

const appStore = useAppStore()
const { contactForm, isSubmitting } = storeToRefs(appStore)
const { submitForm } = appStore
</script>
```

## Debugging & Testing

### Dev Tools
- Vue DevTools för component debugging
- Pinia DevTools för state management
- Browser DevTools för responsiv testing

### Vanliga Problem
- Kontrollera att språknycklar finns i båda språkfilerna
- Säkerställ att Bootstrap klasser är korrekt använda
- Verifiera att animationer inte blockar UX

## Säkerhet & Best Practices

- Validera all användarinput
- Använd HTTPS för produktion
- Optimera bilder och assets
- Implementera error boundaries
- Logga fel för monitoring

## Deployment

- Bygg med `pnpm build`
- Testa produktionsbygget med `pnpm preview`
- Säkerställ att alla environment variabler är satta
- Kontrollera att routing fungerar på servern

## Exempel på Fullständig Komponent

```vue
<template>
  <section ref="sectionRef" id="example" class="py-5" :class="{ 'fade-in-up': isVisible }">
    <div class="container">
      <div class="row">
        <div class="col-lg-8 mx-auto text-center">
          <h2 class="display-5 fw-bold mb-3">{{ $t('example.title') }}</h2>
          <p class="lead text-muted">{{ $t('example.subtitle') }}</p>
          
          <button 
            @click="handleClick" 
            :disabled="isLoading"
            class="btn btn-primary"
            :aria-label="$t('example.buttonLabel')"
          >
            <span v-if="isLoading" class="spinner-border spinner-border-sm me-2"></span>
            {{ $t('example.buttonText') }}
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useAppStore } from '../stores/app'
import { useIntersectionObserver } from '../composables/useIntersectionObserver'
import { storeToRefs } from 'pinia'

// Store
const appStore = useAppStore()
const { isLoading } = storeToRefs(appStore)
const { performAction } = appStore

// Intersection Observer
const { isVisible, target: sectionRef } = useIntersectionObserver(0.1)

// Methods
function handleClick() {
  performAction()
}
</script>

<style scoped>
.example-section {
  background: linear-gradient(135deg, #f8f9ff, #e3f2fd);
}

@media (max-width: 767.98px) {
  .example-section {
    padding: 2rem 0;
  }
}
</style>
```

När du assisterar med denna kodbas, följ alltid dessa riktlinjer och håll kvaliteten konsekvent med befintlig kod.
