import { defineStore } from 'pinia'
import api from '@/services/api'

export const useMainStore = defineStore('main', {
  state: () => ({
    user: null,
    isAuthenticated: false,
    theme: 'light',
    notifications: []
  }),

  actions: {
    async initialize() {
      const token = localStorage.getItem('token')
      if (token) {
        try {
          const response = await api.get('/user/profile')
          this.user = response.data
          this.isAuthenticated = true
        } catch (error) {
          this.logout()
        }
      }
    },

    async login(email, password) {
      this.loading = true
      try {
        const response = await api.post('/auth/login', { email, password })
        this.user = response.data.user
        this.isAuthenticated = true
        localStorage.setItem('token', response.data.token)
      } catch (error) {
        this.error = error.message
        throw error
      } finally {
        this.loading = false
      }
    },

    async logout() {
      this.user = null
      this.isAuthenticated = false
      localStorage.removeItem('token')
    },

    async fetchData() {
      try {
        const response = await fetch('/api/data')
        this.data = await response.json()
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    },
    
    setUser(user) {
      this.user = user
      this.isAuthenticated = !!user
    },

    toggleTheme() {
      this.theme = this.theme === 'light' ? 'dark' : 'light'
    }
  }
})