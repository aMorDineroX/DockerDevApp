import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useUiStore } from './ui'

export const useTradeStore = defineStore('trade', () => {
  const uiStore = useUiStore()
  
  // State
  const balance = ref(10000)
  const selectedPair = ref('BTC/USD')
  const orderType = ref('market')
  const tradeType = ref('buy')
  const trades = ref([])
  const isLoading = ref(false)

  // Mock data for development
  const prices = {
    'BTC/USD': { current: 43000, high: 45000, low: 42000 },
    'ETH/USD': { current: 2200, high: 2300, low: 2100 },
    'XRP/USD': { current: 0.50, high: 0.55, low: 0.48 }
  }

  // Computed
  const currentPrice = computed(() => 
    prices[selectedPair.value]?.current || 0
  )

  // Actions
  const executeTrade = async (amount, price = null) => {
    isLoading.value = true
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))

      const trade = {
        id: Date.now(),
        pair: selectedPair.value,
        type: tradeType.value,
        amount: parseFloat(amount),
        price: price || currentPrice.value,
        timestamp: new Date()
      }

      trades.value.unshift(trade)

      // Update balance
      const total = trade.amount * trade.price
      if (trade.type === 'buy') {
        balance.value -= total
      } else {
        balance.value += total
      }

      uiStore.showToast(
        `Successfully ${tradeType.value} ${amount} ${selectedPair.value}`, 
        'success'
      )
      return true
    } catch (error) {
      uiStore.showToast(error.message, 'error')
      return false
    } finally {
      isLoading.value = false
    }
  }

  const reset = () => {
    selectedPair.value = 'BTC/USD'
    orderType.value = 'market'
    tradeType.value = 'buy'
    isLoading.value = false
  }

  return {
    // State
    balance,
    selectedPair,
    orderType,
    tradeType,
    trades,
    isLoading,
    // Computed
    currentPrice,
    // Actions
    executeTrade,
    reset
  }
})
