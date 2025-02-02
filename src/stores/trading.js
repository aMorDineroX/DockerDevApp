import { defineStore } from 'pinia'

export const useTradingStore = defineStore('trading', {
  state: () => ({
    positions: [],
    orders: [],
    balance: {
      total: 0,
      available: 0,
      locked: 0
    }
  }),

  actions: {
    updateBalance(balance) {
      this.balance = { ...this.balance, ...balance }
    }
  }
})
