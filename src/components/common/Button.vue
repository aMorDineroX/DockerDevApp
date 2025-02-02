<script setup>
defineProps({
  variant: {
    type: String,
    default: 'primary'
  },
  size: {
    type: String,
    default: 'md'
  },
  disabled: {
    type: Boolean,
    default: false
  }
})
</script>

<template>
  <button 
    :class="[
      'rounded-lg font-medium transition-colors',
      variant === 'primary' && 'bg-blue-500 text-white hover:bg-blue-600',
      variant === 'secondary' && 'bg-gray-200 text-gray-800 hover:bg-gray-300',
      size === 'sm' && 'px-3 py-1.5 text-sm',
      size === 'md' && 'px-4 py-2',
      size === 'lg' && 'px-6 py-3 text-lg',
      disabled && 'opacity-50 cursor-not-allowed'
    ]"
    :disabled="disabled"
  >
    <slot></slot>
  </button>
</template>
