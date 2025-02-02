<script setup>
defineProps({
  title: {
    type: String,
    required: true
  },
  subtitle: {
    type: String,
    default: ''
  },
  hover: {
    type: Boolean,
    default: true
  }
})
</script>

<template>
  <div class="card hover-lift" :class="{ 'hover:scale-105': hover }">
    <div v-if="title" class="space-y-2">
      <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-100">
        {{ title }}
      </h3>
      <p v-if="subtitle" class="text-gray-600 dark:text-gray-400">
        {{ subtitle }}
      </p>
    </div>
    <div class="mt-4 space-y-4">
      <slot></slot>
    </div>
  </div>
</template>
