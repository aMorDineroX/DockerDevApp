import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import { initializeWeb3Environment } from './config/web3Config'
import '@/assets/main.css'

// Initialize Web3 environment safely
const initWeb3 = async () => {
  try {
    const web3 = initializeWeb3Environment()
    if (web3) {
      app.provide('web3', web3)
    }
  } catch (error) {
    console.warn('Web3 initialization failed:', error)
  }
}

// Initialize app
const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)

// Initialize Web3 after app creation
initWeb3()

// Global error handling
window.addEventListener('error', (event) => {
  console.error('Global error:', event.error)
  event.preventDefault()
  return false
})

// Add global error handlers
window.addEventListener('unhandledrejection', (event) => {
  console.warn('Unhandled promise rejection:', event.reason)
  event.preventDefault()
})

// Clean up event listeners
window.addEventListener('beforeunload', () => {
  // Clean up any resources
  if (app) {
    app.unmount()
  }
  if (web3?.provider) {
    web3.provider.removeAllListeners?.()
  }
})

// Configuration de l'app
app.config.errorHandler = (err, instance, info) => {
  console.error('Vue error:', err)
  return false
}

app.config.warnHandler = (msg, instance, trace) => {
  console.warn('Vue warning:', msg)
  return false
}

app.mount('#app')