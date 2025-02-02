<template>
  <div class="flex items-center justify-between p-4 rounded-lg bg-opacity-50 backdrop-blur-sm transition-all hover:bg-opacity-70">
    <span class="text-gray-400 font-medium">{{ label }}</span>
    <span class="text-white font-semibold">{{ value }}</span>
  </div>
</template>

<script setup>
defineProps({
  label: {
    type: String,
    required: true
  },
  value: {
    type: [String, Number],
    required: true
  }
})
</script>
