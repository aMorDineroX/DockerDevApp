<template>
  <div class="error-boundary">
    <div v-if="error" class="p-4 bg-destructive/10 text-destructive rounded-lg">
      <h3 class="font-medium">Something went wrong</h3>
      <p class="text-sm">{{ error.message }}</p>
    </div>
    <slot v-else></slot>
  </div>
</template>

<script setup>
import { ref, onErrorCaptured } from 'vue'

const error = ref(null)

onErrorCaptured((err) => {
  error.value = err
  return false
})
</script>
