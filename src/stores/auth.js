import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useWalletStore } from './wallet'
import { useUiStore } from './ui'

export const useAuthStore = defineStore('auth', () => {
  const router = useRouter()
  const token = ref(localStorage.getItem('token'))
  const user = ref(JSON.parse(localStorage.getItem('user') || 'null'))
  const walletStore = useWalletStore()
  const uiStore = useUiStore()
  
  const isAuthenticated = computed(() => !!token.value || walletStore.isConnected)
  
  async function login({ email, password, redirect }) {
    try {
      // Simulation d'appel API - À remplacer par votre vrai endpoint
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Simule une réponse serveur
      const response = {
        token: 'fake-jwt-token',
        user: {
          id: 1,
          email,
          name: 'John Doe'
        }
      }

      setAuthData(response)

      // Handle redirect after successful login
      const redirectPath = redirect || '/dashboard'
      router.push(redirectPath)
      
      return response
    } catch (error) {
      console.error('Login error:', error)
      throw new Error('Invalid credentials')
    }
  }

  function setAuthData({ token: newToken, user: userData }) {
    token.value = newToken
    user.value = userData
    localStorage.setItem('token', newToken)
    localStorage.setItem('user', JSON.stringify(userData))
  }

  async function logout() {
    token.value = null
    user.value = null
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    walletStore.resetState()
    
    // Redirect to landing page after logout
    router.push('/')
  }

  return {
    token,
    user,
    isAuthenticated,
    login,
    logout,
    setAuthData
  }
})
