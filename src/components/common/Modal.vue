<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  show: Boolean,
  title: String,
  size: {
    type: String,
    default: 'md'
  }
})

const emit = defineEmits(['close'])

const modalRef = ref(null)

const close = () => emit('close')
</script>

<template>
  <Transition name="modal">
    <div v-if="show" class="fixed inset-0 z-50 overflow-y-auto" @click.self="close">
      <div class="flex min-h-screen items-center justify-center p-4">
        <div :class="[
          'bg-white rounded-lg shadow-xl w-full transform transition-all',
          size === 'sm' && 'max-w-md',
          size === 'md' && 'max-w-xl',
          size === 'lg' && 'max-w-2xl'
        ]" ref="modalRef">
          <div class="flex justify-between items-center p-4 border-b">
            <h3 class="text-lg font-semibold">{{ title }}</h3>
            <button @click="close" class="text-gray-400 hover:text-gray-600">&times;</button>
          </div>
          <div class="p-4">
            <slot></slot>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.modal-enter-active, .modal-leave-active {
  transition: opacity 0.3s;
}
.modal-enter-from, .modal-leave-to {
  opacity: 0;
}
</style>
