import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useWalletStore = defineStore('wallet', () => {
  const isConnected = ref(false)
  const address = ref(null)
  const provider = ref(null)
  const error = ref(null)
  const connectionAttempts = ref(0)

  async function initWallet() {
    if (connectionAttempts.value >= 3) {
      error.value = 'Maximum connection attempts reached'
      return false
    }

    try {
      connectionAttempts.value++
      const web3Context = inject('web3')
      
      if (!web3Context) {
        throw new Error('Web3 context not available')
      }

      const initialized = await web3Context.initialize()
      if (!initialized) {
        throw new Error('Failed to initialize Web3')
      }

      provider.value = web3Context.provider
      return true
    } catch (err) {
      error.value = err.message
      return false
    }
  }

  async function connect() {
    try {
      const initialized = await initWallet()
      if (!initialized) return false

      const web3Context = inject('web3')
      const account = await web3Context.connect()
      
      if (account) {
        address.value = account
        isConnected.value = true
        return true
      }
      return false
    } catch (err) {
      error.value = err.message
      isConnected.value = false
      address.value = null
      return false
    }
  }

  function resetState() {
    isConnected.value = false
    address.value = null
    provider.value = null
    error.value = null
    connectionAttempts.value = 0
  }

  return {
    isConnected,
    address,
    provider,
    error,
    connect,
    resetState
  }
})
