import { defineStore } from 'pinia'

export const useBalanceStore = defineStore('balance', {
    state: () => ({
      currentBalance: 10000,
      changePercentage: 5.2,
      tradeHistory: [],
      roi: 12.5,
      totalTrades: 156,
      timeframe: '1D'
    }),
    getters: {
      getRoi: (state) => state.roi,
      getTradeCount: (state) => state.totalTrades,
      getPerformanceByTimeframe: (state) => (timeframe) => {
        // Logique de filtrage par période
        return state.tradeHistory.filter(/* ... */)
      }
    }
})
