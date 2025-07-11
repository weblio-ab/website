<template>
  <BaseGuide guide-id="emailSetup">
    <div class="email-setup-guide">
      <!-- Optional Email Input -->
      <EmailHelper 
        :user-email="userEmail"
        :email-info="emailInfo"
        @email-updated="handleEmailUpdate"
      />

      <!-- Step 1: Device Selection -->
      <DeviceSelector 
        v-if="currentStep === 'device'"
        :selected-device="selectedDevice"
        @device-selected="handleDeviceSelected"
      />

      <!-- Step 2: App Selection -->
      <AppSelector 
        v-if="currentStep === 'app'"
        :selected-app="selectedApp"
        @app-selected="handleAppSelected"
        @previous="handlePreviousStep"
      />

      <!-- Step 3: Setup Instructions -->
      <SetupInstructions 
        v-if="currentStep === 'setup'"
        :selected-device="selectedDevice"
        :selected-app="selectedApp"
        :user-email="userEmail"
        :email-info="emailInfo"
        @previous="handlePreviousStep"
      />
    </div>
  </BaseGuide>
</template>

<script setup>
import { ref } from 'vue'
import BaseGuide from './BaseGuide.vue'
import EmailHelper from './EmailHelper.vue'
import DeviceSelector from './DeviceSelector.vue'
import AppSelector from './AppSelector.vue'
import SetupInstructions from './SetupInstructions.vue'

// State management
const currentStep = ref('device')
const selectedDevice = ref('')
const selectedApp = ref('')

// Email helper state
const userEmail = ref('')
const emailInfo = ref({
  domain: '',
  username: '',
  incomingServer: '',
  outgoingServer: ''
})

// Event handlers
function handleEmailUpdate(data) {
  userEmail.value = data.email
  emailInfo.value = data.emailInfo
}

function handleDeviceSelected(device) {
  selectedDevice.value = device
  currentStep.value = 'app'
}

function handleAppSelected(app) {
  selectedApp.value = app
  currentStep.value = 'setup'
}

function handlePreviousStep() {
  if (currentStep.value === 'app') {
    currentStep.value = 'device'
    selectedDevice.value = ''
  } else if (currentStep.value === 'setup') {
    currentStep.value = 'app'
    selectedApp.value = ''
  }
}
</script>

<style scoped>
.email-setup-guide {
  max-width: 800px;
  margin: 0 auto;
}
</style>
