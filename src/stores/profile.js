import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useUiStore } from './ui'

export const useProfileStore = defineStore('profile', () => {
  const uiStore = useUiStore()
  
  // State
  const profile = ref({
    name: 'John Doe',
    email: 'john@example.com',
    avatar: null,
    joinDate: new Date('2024-01-01'),
    timezone: 'UTC'
  })

  const security = ref({
    twoFactorEnabled: false,
    lastLogin: new Date(),
    loginHistory: [
      { date: '2024-01-20T10:30:00', location: 'Paris, France', device: 'Chrome/Windows' },
      { date: '2024-01-19T15:45:00', location: 'Paris, France', device: 'Mobile/iOS' },
      { date: '2024-01-18T08:20:00', location: 'London, UK', device: 'Chrome/MacOS' }
    ]
  })

  const preferences = ref({
    notifications: {
      email: true,
      push: true,
      trades: true,
      news: false
    },
    tradingPreferences: {
      defaultPair: 'BTC/USD',
      riskLevel: 'medium',
      autoTrade: false
    },
    theme: 'dark'
  })

  // Actions
  const updateProfile = async (data) => {
    try {
      // Simuler une requête API
      await new Promise(resolve => setTimeout(resolve, 800))
      profile.value = { ...profile.value, ...data }
      uiStore.showToast('Profile updated successfully', 'success')
      return true
    } catch (error) {
      uiStore.showToast(error.message, 'error')
      return false
    }
  }

  const uploadAvatar = async (file) => {
    try {
      // Simuler un upload
      await new Promise(resolve => setTimeout(resolve, 1000))
      const reader = new FileReader()
      
      reader.onload = (e) => {
        profile.value.avatar = e.target.result
        uiStore.showToast('Avatar updated successfully', 'success')
      }
      
      reader.readAsDataURL(file)
      return true
    } catch (error) {
      uiStore.showToast('Failed to upload avatar', 'error')
      return false
    }
  }

  const toggle2FA = async (enabled) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 500))
      security.value.twoFactorEnabled = enabled
      uiStore.showToast(
        `2FA ${enabled ? 'enabled' : 'disabled'} successfully`,
        'success'
      )
      return true
    } catch (error) {
      uiStore.showToast(error.message, 'error')
      return false
    }
  }

  const updatePreferences = async (newPreferences) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 500))
      preferences.value = { ...preferences.value, ...newPreferences }
      uiStore.showToast('Preferences updated successfully', 'success')
      return true
    } catch (error) {
      uiStore.showToast(error.message, 'error')
      return false
    }
  }

  return {
    // State
    profile,
    security,
    preferences,
    // Actions
    updateProfile,
    uploadAvatar,
    toggle2FA,
    updatePreferences
  }
})
