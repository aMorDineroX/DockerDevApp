<template>
  <div class="space-y-6">
    <!-- Header -->
    <header class="bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg p-6">
      <h1 class="text-2xl font-bold bg-gradient-to-r from-primary to-primary-hover bg-clip-text text-transparent">
        Trading Panel
      </h1>
      <p class="text-muted-foreground">Execute and manage your trades efficiently</p>
    </header>

    <!-- Trading Form and Chart Section -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Trading Form -->
      <Card hover className="lg:col-span-2 p-6 space-y-6">
        <div class="flex items-center justify-between">
          <h2 class="text-lg font-semibold">New Trade</h2>
          <Badge variant="outline" className="bg-surface-soft">
            Balance: ${{ formatNumber(balance) }}
          </Badge>
        </div>

        <form @submit.prevent="handleTrade" class="space-y-4">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="space-y-2">
              <Label htmlFor="tradingPair">Trading Pair</Label>
              <Select v-model="selectedPair" id="tradingPair">
                <option v-for="pair in tradingPairs" :key="pair" :value="pair">
                  {{ pair }}
                </option>
              </Select>
            </div>
            <div class="space-y-2">
              <Label htmlFor="orderType">Order Type</Label>
              <Select v-model="orderType" id="orderType">
                <option value="market">Market</option>
                <option value="limit">Limit</option>
                <option value="stop">Stop</option>
              </Select>
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="space-y-2">
              <Label htmlFor="tradeType">Type</Label>
              <div class="grid grid-cols-2 gap-2">
                <Button 
                  type="button"
                  :variant="tradeType === 'buy' ? 'default' : 'outline'"
                  class="w-full"
                  @click="tradeType = 'buy'"
                >
                  Buy
                </Button>
                <Button 
                  type="button"
                  :variant="tradeType === 'sell' ? 'destructive' : 'outline'"
                  class="w-full"
                  @click="tradeType = 'sell'"
                >
                  Sell
                </Button>
              </div>
            </div>
            <div class="space-y-2">
              <Label htmlFor="amount">Amount (USD)</Label>
              <div class="relative">
                <Input 
                  id="amount"
                  v-model="amount"
                  type="number"
                  min="0"
                  step="0.01"
                  required
                />
                <span class="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                  USD
                </span>
              </div>
            </div>
          </div>

          <div v-if="orderType !== 'market'" class="space-y-2">
            <Label htmlFor="price">Price</Label>
            <div class="relative">
              <Input 
                id="price"
                v-model="price"
                type="number"
                min="0"
                step="0.01"
                required
              />
              <span class="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                USD
              </span>
            </div>
          </div>

          <Button type="submit" :loading="isLoading" class="w-full">
            {{ tradeType === 'buy' ? 'Place Buy Order' : 'Place Sell Order' }}
          </Button>
        </form>
      </Card>

      <!-- Chart Card -->
      <Card hover className="p-6 space-y-4">
        <div class="flex items-center justify-between mb-4">
          <div class="space-y-1">
            <h2 class="text-lg font-semibold">Price Chart</h2>
            <p class="text-sm text-muted-foreground">
              {{ selectedPair }} • {{ timeframe }}
            </p>
          </div>
          <div class="flex items-center gap-2">
            <Select v-model="timeframe" className="w-24">
              <option v-for="tf in timeframes" :key="tf.value" :value="tf.value">
                {{ tf.label }}
              </option>
            </Select>
          </div>
        </div>
        
        <div class="h-[300px]">
          <LineChart :data="chartData" />
        </div>

        <Separator />
        
        <div class="grid grid-cols-3 gap-4">
          <div>
            <p class="text-sm text-muted-foreground">24h High</p>
            <p class="text-lg font-medium">${{ formatNumber(dayStats.high) }}</p>
          </div>
          <div>
            <p class="text-sm text-muted-foreground">24h Low</p>
            <p class="text-lg font-medium">${{ formatNumber(dayStats.low) }}</p>
          </div>
          <div>
            <p class="text-sm text-muted-foreground">24h Volume</p>
            <p class="text-lg font-medium">${{ formatNumber(dayStats.volume) }}</p>
          </div>
        </div>
      </Card>
    </div>

    <!-- Order Book -->
    <Card hover className="p-6">
      <div class="flex items-center justify-between mb-6">
        <h2 class="text-lg font-semibold">Order Book</h2>
        <Select v-model="orderBookDepth" className="w-32">
          <option value="10">10 Levels</option>
          <option value="20">20 Levels</option>
          <option value="50">50 Levels</option>
        </Select>
      </div>

      <div class="grid grid-cols-2 gap-6">
        <!-- Bids -->
        <div class="space-y-2">
          <h3 class="text-sm font-medium text-success">Bids</h3>
          <div class="space-y-1">
            <div v-for="bid in bids" :key="bid.price" 
              class="flex justify-between text-sm p-2 rounded hover:bg-success/5"
            >
              <span class="text-success">${{ formatNumber(bid.price) }}</span>
              <span>{{ formatNumber(bid.amount) }}</span>
            </div>
          </div>
        </div>

        <!-- Asks -->
        <div class="space-y-2">
          <h3 class="text-sm font-medium text-destructive">Asks</h3>
          <div class="space-y-1">
            <div v-for="ask in asks" :key="ask.price"
              class="flex justify-between text-sm p-2 rounded hover:bg-destructive/5"
            >
              <span class="text-destructive">${{ formatNumber(ask.price) }}</span>
              <span>{{ formatNumber(ask.amount) }}</span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { 
  Card, CardHeader, CardTitle, CardDescription, CardContent,
  Button, Input, Select, Label, Badge, Separator 
} from '@/components/ui'
import LineChart from '@/components/charts/LineChart.vue'
import { useTradeStore } from '@/stores/trade'
import { useUiStore } from '@/stores/ui'

const tradeStore = useTradeStore()
const uiStore = useUiStore()

// Use store values
const balance = computed(() => tradeStore.balance)
const selectedPair = computed({
  get: () => tradeStore.selectedPair,
  set: (value) => tradeStore.selectedPair = value
})
const orderType = computed({
  get: () => tradeStore.orderType,
  set: (value) => tradeStore.orderType = value
})
const tradeType = computed({
  get: () => tradeStore.tradeType,
  set: (value) => tradeStore.tradeType = value
})
const isLoading = computed(() => tradeStore.isLoading)

// Local state
const amount = ref(100)
const price = ref(null)
const timeframe = ref('1H')
const orderBookDepth = ref(10)

// Constants
const tradingPairs = ['BTC/USD', 'ETH/USD', 'XRP/USD']
const timeframes = [
  { value: '1H', label: '1H' },
  { value: '4H', label: '4H' },
  { value: '1D', label: '1D' },
  { value: '1W', label: '1W' }
]

// Mock data
const dayStats = ref({
  high: 45000,
  low: 42000,
  volume: 1250000
})

const chartData = {
  labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  datasets: [{
    label: 'Price',
    data: [42500, 43200, 42800, 44100, 43900, 45200, 44800],
    borderColor: '#0bda5b',
    tension: 0.4
  }]
}

const generateOrderBook = (basePrice, depth) => {
  const book = { bids: [], asks: [] }
  for (let i = 0; i < depth; i++) {
    book.bids.push({
      price: basePrice - (i * 10 + Math.random() * 5),
      amount: 0.5 + Math.random() * 2
    })
    book.asks.push({
      price: basePrice + (i * 10 + Math.random() * 5),
      amount: 0.5 + Math.random() * 2
    })
  }
  return book
}

const orderBook = ref(generateOrderBook(43000, 10))
const bids = computed(() => orderBook.value.bids)
const asks = computed(() => orderBook.value.asks)

// Methods
const handleTrade = async () => {
  if (!amount.value || amount.value <= 0) {
    uiStore.showToast('Please enter a valid amount', 'error')
    return
  }

  try {
    const success = await tradeStore.executeTrade(amount.value, price.value)
    if (success) {
      amount.value = 100
      if (orderType.value !== 'market') {
        price.value = null
      }
    }
  } catch (error) {
    uiStore.showToast(error.message, 'error')
  }
}

const formatNumber = (num) => {
  return num.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  })
}

watch(orderBookDepth, (newDepth) => {
  orderBook.value = generateOrderBook(43000, newDepth)
})
</script>
