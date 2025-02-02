<template>
  <div class="flex min-w-72 flex-1 flex-col gap-2">
    <p class="text-white text-base font-medium leading-normal">Account Balance</p>
    <p class="text-white tracking-light text-[32px] font-bold leading-tight truncate">${{ balance }}</p>
    <div class="flex gap-1">
      <p class="text-[#9dabb8] text-base font-normal leading-normal">Last 30 Days</p>
      <p class="text-[#0bda5b] text-base font-medium leading-normal">+{{ percentageChange }}%</p>
    </div>
    <div class="flex min-h-[180px] flex-1 flex-col gap-8 py-4">
      <slot name="chart"></slot>
    </div>
  </div>
</template>

<script setup>
defineProps({
  balance: {
    type: Number,
    default: 5943
  },
  percentageChange: {
    type: Number,
    default: 12
  }
})
</script>
