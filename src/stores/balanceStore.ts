import { defineStore } from 'pinia'

interface BalanceState {
  currentBalance: number
  changePercentage: number
  balanceHistory: number[]
  isLoading: boolean
  lastUpdate: Date | null
}

export const useBalanceStore = defineStore('balance', {
  state: (): BalanceState => ({
    currentBalance: 100000,
    changePercentage: 2.5,
    balanceHistory: [],
    isLoading: false,
    lastUpdate: null
  }),
  
  getters: {
    formattedBalance(): string {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
      }).format(this.currentBalance)
    },
    
    isPositive(): boolean {
      return this.changePercentage >= 0
    }
  },
  
  actions: {
    async fetchBalance() {
      this.isLoading = true
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000))
        this.balanceHistory = Array(24).fill(0).map(() => 
          Math.random() * 100000 + 50000
        )
        this.lastUpdate = new Date()
      } catch (error) {
        console.error('Failed to fetch balance:', error)
      } finally {
        this.isLoading = false
      }
    },

    async refreshBalance() {
      await this.fetchBalance()
    },

    calculateStats() {
      if (!this.balanceHistory.length) return null
      
      return {
        highest: Math.max(...this.balanceHistory),
        lowest: Math.min(...this.balanceHistory),
        average: this.balanceHistory.reduce((a, b) => a + b) / this.balanceHistory.length
      }
    }
  }
})