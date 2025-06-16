<template>
  <div class="mobile-mockup">
    <div class="mobile-header">
      <div class="status-left">
        <span class="clock">{{ currentTime }}</span>
      </div>
      <div class="notch"></div>
      <div class="status-right">
        <i class="bi bi-wifi"></i>
        <i class="bi bi-battery-half"></i>
      </div>
    </div>
    <div class="mobile-content">
      <slot></slot>
    </div>
    <div class="home-indicator"></div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const currentTime = ref('')

function updateTime() {
  const now = new Date()
  currentTime.value = now.toLocaleTimeString([], { 
    hour: '2-digit', 
    minute: '2-digit',
    hour12: false 
  })
}

let timeInterval

onMounted(() => {
  updateTime() // Set initial time
  timeInterval = setInterval(updateTime, 1000) // Update every second
})

onUnmounted(() => {
  if (timeInterval) {
    clearInterval(timeInterval)
  }
})
</script>

<style scoped>
.mobile-mockup {
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  width: 100%;
  height: 100%;
}

.mobile-header {
  height: 25px;
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 8px;
  color: #000;
  font-size: 9px;
  font-weight: 600;
}

.status-left {
  flex: 1;
  display: flex;
  justify-content: flex-start;
}

.status-right {
  flex: 1;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 4px;
}

.clock {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

.status-right i {
  font-size: 10px;
}

.notch {
  width: 30%;
  height: 50%;
  background: #000;
  border-radius: 40px;
  position: absolute;
  top: 5px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 2;
}

.mobile-content {
  height: calc(100% - 25px);
  overflow: hidden;
}

.home-indicator {
  position: absolute;
  bottom: 8px;
  left: 50%;
  transform: translateX(-50%);
  width: 60%;
  height: 3px;
  background: rgba(0, 0, 0, 0.3);
  border-radius: 2px;
  z-index: 10;
}
</style>
