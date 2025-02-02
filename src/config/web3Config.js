export const initializeWeb3Environment = () => {
  const context = {
    provider: null,
    isInitialized: false,
    connectionAttempts: 0,
    maxAttempts: 3,

    async waitForProvider() {
      return new Promise((resolve) => {
        // Check if ethereum is already available
        if (typeof window !== 'undefined' && window.ethereum) {
          resolve(window.ethereum)
          return
        }

        let attempts = 0
        const checkForProvider = () => {
          if (typeof window !== 'undefined' && window.ethereum) {
            resolve(window.ethereum)
          } else if (attempts < this.maxAttempts) {
            attempts++
            setTimeout(checkForProvider, 500)
          } else {
            resolve(null)
          }
        }
        checkForProvider()
      })
    },

    async initialize() {
      try {
        const provider = await this.waitForProvider()
        if (provider) {
          // Use proxy to avoid property redefinition
          this.provider = new Proxy(provider, {
            set: (target, prop, value) => {
              if (prop === 'selectedAddress' || !target[prop]) {
                target[prop] = value
              }
              return true
            }
          })
          this.isInitialized = true
          return true
        }
        return false
      } catch (error) {
        console.warn('Web3 initialization failed:', error)
        return false
      }
    },

    async connect() {
      if (!this.isInitialized) {
        await this.initialize()
      }
      
      if (!this.provider) {
        throw new Error('No Web3 Provider found')
      }
      
      try {
        const accounts = await this.provider.request({
          method: 'eth_requestAccounts'
        })
        return accounts?.[0] || null
      } catch (error) {
        console.error('Connection error:', error)
        throw error
      }
    }
  }

  return context
}
