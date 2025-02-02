
<script setup>
import { ref } from 'vue'
import { useBalanceStore } from '@/stores/balanceStore'

const balanceStore = useBalanceStore()

const transactions = ref([
  { id: 1, pair: 'ETH-USD', type: 'Buy', amount: '1.5', price: '2800', total: '4200', date: '2024-01-15 14:30:00', status: 'Completed' },
  { id: 2, pair: 'BTC-USD', type: 'Sell', amount: '0.25', price: '42000', total: '10500', date: '2024-01-15 13:15:00', status: 'Completed' },
  // ... plus de transactions
])

const filters = ref({
  search: '',
  type: 'all',
  dateRange: 'all'
})

const dateRanges = [
  { label: 'All Time', value: 'all' },
  { label: 'Last 24h', value: '24h' },
  { label: 'Last Week', value: 'week' },
  { label: 'Last Month', value: 'month' }
]

const types = [
  { label: 'All Types', value: 'all' },
  { label: 'Buy', value: 'buy' },
  { label: 'Sell', value: 'sell' }
]
</script>

<template>
  <div class="min-h-screen bg-[#111418]">
    <header class="bg-gradient-to-r from-[#1a1f25] to-[#111418] p-6 shadow-lg">
      <div class="max-w-7xl mx-auto">
        <h1 class="text-3xl font-bold text-white mb-2">Transaction History</h1>
        <p class="text-gray-400">View and analyze your trading history</p>
      </div>
    </header>

    <div class="max-w-7xl mx-auto px-4 py-8">
      <!-- Filters -->
      <div class="bg-[#1e2329] rounded-xl shadow-xl p-6 border border-[#293038] mb-6">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div class="relative">
            <input 
              v-model="filters.search"
              type="text"
              placeholder="Search transactions..."
              class="w-full bg-[#161a1f] border border-[#293038] rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#3d4654]"
            >
          </div>
          <select 
            v-model="filters.type"
            class="bg-[#161a1f] border border-[#293038] rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#3d4654]"
          >
            <option v-for="type in types" :key="type.value" :value="type.value">
              {{ type.label }}
            </option>
          </select>
          <select 
            v-model="filters.dateRange"
            class="bg-[#161a1f] border border-[#293038] rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#3d4654]"
          >
            <option v-for="range in dateRanges" :key="range.value" :value="range.value">
              {{ range.label }}
            </option>
          </select>
        </div>
      </div>

      <!-- Transactions Table -->
      <div class="bg-[#1e2329] rounded-xl shadow-xl border border-[#293038] overflow-hidden">
        <div class="overflow-x-auto">
          <table class="w-full">
            <thead class="bg-[#161a1f]">
              <tr>
                <th class="px-6 py-4 text-left text-sm font-semibold text-gray-400">Date</th>
                <th class="px-6 py-4 text-left text-sm font-semibold text-gray-400">Pair</th>
                <th class="px-6 py-4 text-left text-sm font-semibold text-gray-400">Type</th>
                <th class="px-6 py-4 text-left text-sm font-semibold text-gray-400">Amount</th>
                <th class="px-6 py-4 text-left text-sm font-semibold text-gray-400">Price</th>
                <th class="px-6 py-4 text-left text-sm font-semibold text-gray-400">Total</th>
                <th class="px-6 py-4 text-left text-sm font-semibold text-gray-400">Status</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-[#293038]">
              <tr v-for="tx in transactions" :key="tx.id" class="hover:bg-[#161a1f] transition-colors">
                <td class="px-6 py-4 text-sm text-gray-300">{{ tx.date }}</td>
                <td class="px-6 py-4 text-sm text-white font-medium">{{ tx.pair }}</td>
                <td class="px-6 py-4">
                  <span :class="tx.type === 'Buy' ? 'bg-green-500/20 text-green-500' : 'bg-red-500/20 text-red-500'" 
                        class="px-2 py-1 rounded text-sm font-medium">
                    {{ tx.type }}
                  </span>
                </td>
                <td class="px-6 py-4 text-sm text-white">{{ tx.amount }}</td>
                <td class="px-6 py-4 text-sm text-white">${{ tx.price }}</td>
                <td class="px-6 py-4 text-sm text-white">${{ tx.total }}</td>
                <td class="px-6 py-4">
                  <span class="bg-green-500/20 text-green-500 px-2 py-1 rounded text-sm">
                    {{ tx.status }}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
