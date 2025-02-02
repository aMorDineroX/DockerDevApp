
<script setup>
const timeframes = [
  { value: '1D', label: '1 Day' },
  { value: '1W', label: '1 Week' },
  { value: '1M', label: '1 Month' },
  { value: '1Y', label: '1 Year' }
]

const emit = defineEmits(['update:timeframe'])
</script>

<template>
  <div class="flex space-x-2">
    <button v-for="tf in timeframes" 
            :key="tf.value"
            @click="emit('update:timeframe', tf.value)"
            class="px-4 py-2 rounded-lg bg-[#161a1f] text-gray-400 hover:bg-[#293038] hover:text-white transition-all">
      {{ tf.label }}
    </button>
  </div>
</template>
