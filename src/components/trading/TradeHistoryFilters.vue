<template>
  <div class="space-y-4 p-4 bg-card/50 rounded-lg border border-border mb-4">
    <div class="flex items-center justify-between">
      <h3 class="text-sm font-medium">Filters</h3>
      <Button variant="ghost" size="sm" @click="resetFilters">
        Reset
      </Button>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
      <div class="space-y-2">
        <Label htmlFor="type">Type</Label>
        <Select v-model="filters.type" id="type">
          <option value="all">All Types</option>
          <option value="buy">Buy</option>
          <option value="sell">Sell</option>
        </Select>
      </div>

      <div class="space-y-2">
        <Label htmlFor="pair">Trading Pair</Label>
        <Select v-model="filters.pair" id="pair">
          <option value="all">All Pairs</option>
          <option v-for="pair in availablePairs" :key="pair" :value="pair">
            {{ pair }}
          </option>
        </Select>
      </div>

      <div class="space-y-2">
        <Label htmlFor="dateRange">Date Range</Label>
        <Select v-model="filters.dateRange" id="dateRange">
          <option value="all">All Time</option>
          <option value="today">Today</option>
          <option value="week">Last 7 Days</option>
          <option value="month">Last 30 Days</option>
        </Select>
      </div>

      <div class="space-y-2">
        <Label htmlFor="sort">Sort By</Label>
        <Select v-model="filters.sort" id="sort">
          <option value="date-desc">Date (Newest)</option>
          <option value="date-asc">Date (Oldest)</option>
          <option value="amount-desc">Amount (High-Low)</option>
          <option value="amount-asc">Amount (Low-High)</option>
        </Select>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { Button, Select, Label } from '@/components/ui'

const props = defineProps({
  availablePairs: {
    type: Array,
    default: () => ['BTC/USD', 'ETH/USD', 'XRP/USD']
  }
})

const emit = defineEmits(['update:filters'])

const filters = ref({
  type: 'all',
  pair: 'all',
  dateRange: 'all',
  sort: 'date-desc'
})

const resetFilters = () => {
  filters.value = {
    type: 'all',
    pair: 'all',
    dateRange: 'all',
    sort: 'date-desc'
  }
}

watch(filters, (newFilters) => {
  emit('update:filters', newFilters)
}, { deep: true })
</script>
