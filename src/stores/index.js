import { defineStore } from 'pinia'

export const useMainStore = defineStore('main', {
  state: () => ({
    isAuthenticated: false,
    user: null
  }),
  actions: {
    setAuth(status) {
      this.isAuthenticated = status
    }
  }
})

export * from './ui'
export * from './theme'
export * from './auth'
export * from './trading'
export * from './wallet'

// Types centralisés pour les stores
export const StoreIds = {
  UI: 'ui',
  THEME: 'theme',
  AUTH: 'auth',
  TRADING: 'trading',
  WALLET: 'wallet'
} as const
