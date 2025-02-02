
<script setup>
const benchmarks = [
  { name: 'BTC', performance: 8.5 },
  { name: 'S&P500', performance: 4.2 },
  { name: 'Your Portfolio', performance: 12.5 }
]
</script>

<template>
  <div class="bg-[#1e2329] rounded-xl p-6 border border-[#293038]">
    <h3 class="text-lg font-bold text-white mb-4">Performance Comparison</h3>
    <div class="space-y-4">
      <div v-for="benchmark in benchmarks" :key="benchmark.name" class="flex items-center justify-between">
        <span class="text-gray-400">{{ benchmark.name }}</span>
        <span :class="benchmark.performance > 0 ? 'text-green-500' : 'text-red-500'">
          {{ benchmark.performance }}%
        </span>
      </div>
    </div>
  </div>
</template>
