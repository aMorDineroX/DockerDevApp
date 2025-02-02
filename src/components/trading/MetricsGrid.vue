
<script setup>
import { useBalanceStore } from '@/stores/balanceStore'

const balanceStore = useBalanceStore()
</script>

<template>
  <div class="grid grid-cols-2 gap-4 mt-4">
    <div class="bg-[#161a1f] rounded-lg p-4 border border-[#293038]">
      <div class="text-gray-400 text-sm">ROI</div>
      <div class="text-white text-xl font-bold">{{ balanceStore.getRoi }}%</div>
    </div>
    <div class="bg-[#161a1f] rounded-lg p-4 border border-[#293038]">
      <div class="text-gray-400 text-sm">Total Trades</div>
      <div class="text-white text-xl font-bold">{{ balanceStore.getTradeCount }}</div>
    </div>
  </div>
</template>
