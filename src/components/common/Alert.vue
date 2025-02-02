<script setup>
const props = defineProps({
  type: {
    type: String,
    default: 'info'
  },
  dismissible: {
    type: Boolean,
    default: true
  }
})

const emit = defineEmits(['close'])
</script>

<template>
  <div :class="[
    'rounded-lg p-4 mb-4',
    type === 'success' && 'bg-green-100 text-green-700',
    type === 'error' && 'bg-red-100 text-red-700',
    type === 'warning' && 'bg-yellow-100 text-yellow-700',
    type === 'info' && 'bg-blue-100 text-blue-700'
  ]">
    <div class="flex justify-between items-center">
      <div class="flex-1">
        <slot></slot>
      </div>
      <button v-if="dismissible" 
              @click="emit('close')"
              class="ml-4 text-gray-400 hover:text-gray-600">
        &times;
      </button>
    </div>
  </div>
</template>
