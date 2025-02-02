<script setup>
import { useMainStore } from '@/stores/main'
import { useRouter } from 'vue-router'
import BalanceCard from '../components/trading/BalanceCard.vue'
import BalanceChart from '../components/trading/BalanceChart.vue'
import BotSettings from '../components/trading/BotSettings.vue'
import InfoRow from '../components/InfoRow.vue'
import ActivityList from '@/components/ActivityList.vue'
import { ref } from 'vue'
import { useBalanceStore } from '@/stores/balanceStore'
import Card from '@/components/ui/Card.vue'
import Button from '@/components/ui/Button.vue'
import LineChart from '@/components/charts/LineChart.vue'

const store = useMainStore()
const router = useRouter()
const balanceStore = useBalanceStore()

const activityItems = ref([
  { id: 1, pair: 'ETH-USD', type: 'Buy', amount: '100', date: new Date() },
  { id: 2, pair: 'BTC-USD', type: 'Sell', amount: '100', date: new Date() },
  { id: 3, pair: 'XRP-USD', type: 'Buy', amount: '100', date: new Date() },
  { id: 4, pair: 'ETH-USD', type: 'Sell', amount: '100', date: new Date() }
])

const tradingInfo = [
  { label: "Algorithm", value: "MACD" },
  { label: "Status", value: "Running" },
  { label: "Frequency", value: "High" },
  { label: "Trade Size", value: "$100" }
]

const timeframe = ref('7d')

const stats = [
  { label: 'Total Balance', value: '$15,234.23', trend: 12.5 },
  { label: 'Daily Volume', value: '$2,845.65', trend: 8.2 },
  { label: 'Active Trades', value: '5', trend: -2.1 },
  { label: 'Win Rate', value: '68%', trend: 5.4 }
]

const activePositions = [
  { id: 1, symbol: 'BTC/USD', type: 'Long', pnl: 12.5, value: '5,234.12' },
  { id: 2, symbol: 'ETH/USD', type: 'Short', pnl: -3.2, value: '2,845.65' },
  { id: 3, symbol: 'XRP/USD', type: 'Long', pnl: 5.7, value: '1,234.56' }
]

const recentActivity = ref([
  { id: 1, type: 'trade', title: 'BTC/USD Long Position Opened', timestamp: new Date() },
  { id: 2, type: 'alert', title: 'Price Alert: ETH reached $2000', timestamp: new Date() },
  { id: 3, type: 'bot', title: 'Trading Bot Started Session', timestamp: new Date() }
])

const currentBalance = ref(15234.23)
const performanceData = {
  labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  datasets: [{
    label: 'Portfolio Value',
    data: [12500, 13200, 12800, 14100, 13900, 15200, 15234]
  }]
}

const formatNumber = (num) => {
  return num.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  })
}

const getActivityIcon = (type) => {
  const icons = {
    trade: { icon: 'ChartLineIcon', color: 'bg-[#0bda5b]/10 text-[#0bda5b]' },
    alert: { icon: 'BellIcon', color: 'bg-yellow-500/10 text-yellow-500' },
    bot: { icon: 'CpuIcon', color: 'bg-blue-500/10 text-blue-500' }
  }
  return icons[type]
}

const formatDate = (date) => {
  return new Intl.DateTimeFormat('fr-FR', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  }).format(date)
}

const clearActivity = () => {
  recentActivity.value = []
}

const dismissActivity = (id) => {
  recentActivity.value = recentActivity.value.filter(activity => activity.id !== id)
}
</script>

<template>
  <div class="min-h-screen bg-[#111418] p-4 md:p-6">
    <!-- Header Section -->
    <header class="bg-gradient-to-r from-[#1a1f25] to-[#111418] p-6 shadow-lg mb-6">
      <div class="max-w-7xl mx-auto">
        <h1 class="text-3xl font-bold text-white mb-2">Welcome to Your Trading Dashboard</h1>
        <p class="text-gray-400">Monitor your portfolio, track performance, and manage your trades</p>
      </div>
    </header>

    <!-- Stats Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <Card v-for="stat in stats" :key="stat.label" class="bg-[#1e2329] p-4">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-gray-400 text-sm">{{ stat.label }}</p>
            <p class="text-2xl font-bold text-white mt-1">{{ stat.value }}</p>
          </div>
          <div :class="stat.trend > 0 ? 'text-[#0bda5b]' : 'text-red-500'" class="text-sm">
            {{ stat.trend > 0 ? '+' : '' }}{{ stat.trend }}%
          </div>
        </div>
      </Card>
    </div>

    <!-- Main Content Grid -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Trading Chart -->
      <Card class="lg:col-span-2 bg-[#1e2329] p-6">
        <div class="flex justify-between items-center mb-6">
          <div class="space-y-1">
            <h2 class="text-xl font-bold text-white">Portfolio Performance</h2>
            <p class="text-sm text-muted-foreground">Total Balance: ${{ formatNumber(currentBalance) }}</p>
          </div>
          <select v-model="timeframe" class="bg-[#161a1f] text-white border border-[#293038] rounded-lg px-3 py-1">
            <option value="24h">24h</option>
            <option value="7d">7d</option>
            <option value="30d">30d</option>
            <option value="1y">1y</option>
          </select>
        </div>
        <div class="h-[300px] w-full">
          <BalanceChart :data="performanceData.datasets[0].data" />
        </div>
      </Card>

      <!-- Active Positions -->
      <Card class="bg-[#1e2329] p-6">
        <h2 class="text-xl font-bold text-white mb-4">Active Positions</h2>
        <div class="space-y-4">
          <div v-for="position in activePositions" :key="position.id"
            class="p-3 bg-[#161a1f] rounded-lg border border-[#293038] hover:border-[#3d4654] transition-all">
            <div class="flex justify-between items-center">
              <div>
                <p class="text-white font-medium">{{ position.symbol }}</p>
                <p class="text-sm text-gray-400">{{ position.type }}</p>
              </div>
              <div class="text-right">
                <p :class="position.pnl >= 0 ? 'text-[#0bda5b]' : 'text-red-500'" class="font-medium">
                  {{ position.pnl >= 0 ? '+' : '' }}{{ position.pnl }}%
                </p>
                <p class="text-sm text-gray-400">${{ position.value }}</p>
              </div>
            </div>
          </div>
        </div>
      </Card>

      <!-- Recent Activity and Alerts -->
      <Card class="lg:col-span-2 bg-[#1e2329] p-6">
        <div class="flex justify-between items-center mb-6">
          <h2 class="text-xl font-bold text-white">Recent Activity</h2>
          <Button variant="outline" size="sm" @click="clearActivity">Clear All</Button>
        </div>
        <div class="space-y-4">
          <div v-for="activity in recentActivity" :key="activity.id"
            class="p-4 bg-[#161a1f] rounded-lg border border-[#293038] flex items-center justify-between">
            <div class="flex items-center gap-4">
              <div :class="getActivityIcon(activity.type).color" class="p-2 rounded-lg">
                <component :is="getActivityIcon(activity.type).icon" class="w-5 h-5" />
              </div>
              <div>
                <p class="text-white font-medium">{{ activity.title }}</p>
                <p class="text-sm text-gray-400">{{ formatDate(activity.timestamp) }}</p>
              </div>
            </div>
            <Button variant="ghost" size="sm" @click="dismissActivity(activity.id)">
              Dismiss
            </Button>
          </div>
        </div>
      </Card>
    </div>
  </div>
</template>

<style scoped>
.bg-gradient-custom {
  background: linear-gradient(145deg, #1e2329 0%, #161a1f 100%);
}
</style>
