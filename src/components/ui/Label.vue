<template>
  <label :for="htmlFor" class="text-sm font-medium">
    <slot />
  </label>
</template>

<script setup>
defineProps({
  htmlFor: {
    type: String,
    default: ''
  }
})
</script>