<template>
  <div class="mobile-mockup">
    <div class="mobile-header">
      <div class="notch"></div>
    </div>
    <div class="mobile-content">
      <slot></slot>
    </div>
  </div>
</template>

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
  background: #000;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
}

.notch {
  width: 100px;
  height: 20px;
  background: #000;
  border-radius: 0 0 12px 12px;
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
}

.mobile-content {
  height: calc(100% - 25px);
  overflow: hidden;
}
</style>
