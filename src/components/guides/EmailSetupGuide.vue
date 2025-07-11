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
import { ref, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import BaseGuide from './BaseGuide.vue'
import EmailHelper from './EmailHelper.vue'
import DeviceSelector from './DeviceSelector.vue'
import AppSelector from './AppSelector.vue'
import SetupInstructions from './SetupInstructions.vue'

const router = useRouter()

// Props
const props = defineProps({
  urlParams: {
    type: Object,
    default: () => ({})
  }
})

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

// Reset function to start fresh
function resetGuide() {
  currentStep.value = 'device'
  selectedDevice.value = ''
  selectedApp.value = ''
  userEmail.value = ''
  emailInfo.value = {
    domain: '',
    username: '',
    incomingServer: '',
    outgoingServer: ''
  }
}

// Expose reset function to parent
defineExpose({
  resetGuide
})

// Event handlers
function handleEmailUpdate(data) {
  userEmail.value = data.email
  emailInfo.value = data.emailInfo
}

function handleDeviceSelected(device) {
  selectedDevice.value = device
  currentStep.value = 'app'
  
  // Update URL to include device
  const newUrl = `/guides/emailSetup/${device}`
  if (router.currentRoute.value.fullPath !== newUrl) {
    router.push(newUrl)
  }
}

function handleAppSelected(app) {
  selectedApp.value = app
  currentStep.value = 'setup'
  
  // Update URL to include device and client
  const newUrl = `/guides/emailSetup/${selectedDevice.value}/${app}`
  if (router.currentRoute.value.fullPath !== newUrl) {
    router.push(newUrl)
  }
}

function handlePreviousStep() {
  if (currentStep.value === 'app') {
    currentStep.value = 'device'
    selectedDevice.value = ''
    
    // Update URL back to basic guide
    router.push('/guides/emailSetup')
  } else if (currentStep.value === 'setup') {
    currentStep.value = 'app'
    selectedApp.value = ''
    
    // Update URL back to device level
    router.push(`/guides/emailSetup/${selectedDevice.value}`)
  }
}

// Watch for URL parameter changes and initialize state accordingly
watch(() => props.urlParams, (newParams) => {
  if (newParams && newParams.device) {
    const validDevices = ['iphone', 'android']
    const validClients = ['gmail', 'outlook', 'native']
    
    if (validDevices.includes(newParams.device.toLowerCase())) {
      selectedDevice.value = newParams.device.toLowerCase()
      currentStep.value = 'app'
      
      if (newParams.client && validClients.includes(newParams.client.toLowerCase())) {
        selectedApp.value = newParams.client.toLowerCase()
        currentStep.value = 'setup'
      }
    }
  }
}, { immediate: true })

// Initialize from URL parameters on mount
onMounted(() => {
  if (props.urlParams) {
    const { device, client } = props.urlParams
    
    // Validate device parameter
    const validDevices = ['iphone', 'android']
    const validClients = ['gmail', 'outlook', 'native']
    
    if (device && validDevices.includes(device.toLowerCase())) {
      selectedDevice.value = device.toLowerCase()
      currentStep.value = 'app'
      
      if (client && validClients.includes(client.toLowerCase())) {
        selectedApp.value = client.toLowerCase()
        currentStep.value = 'setup'
      }
    }
  }
})
</script>

<style scoped>
.email-setup-guide {
  max-width: 800px;
  margin: 0 auto;
}
</style>
