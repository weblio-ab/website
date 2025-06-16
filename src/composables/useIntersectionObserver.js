import { ref, onMounted, onUnmounted } from 'vue'

export function useIntersectionObserver(threshold = 0.1) {
  const isVisible = ref(false)
  const target = ref(null)
  let observer = null

  onMounted(() => {
    if (target.value) {
      observer = new IntersectionObserver(
        ([entry]) => {
          isVisible.value = entry.isIntersecting
        },
        { threshold }
      )
      observer.observe(target.value)
    }
  })

  onUnmounted(() => {
    if (observer && target.value) {
      observer.unobserve(target.value)
    }
  })

  return { isVisible, target }
}
