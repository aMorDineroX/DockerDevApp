<script setup>
import { useUiStore } from '@/stores/ui'

const uiStore = useUiStore()

const typeClasses = {
  success: 'bg-[#0bda5b]/10 text-[#0bda5b] border border-[#0bda5b]/20',
  error: 'bg-red-500/10 text-red-500 border border-red-500/20',
  info: 'bg-blue-500/10 text-blue-500 border border-blue-500/20',
  default: 'bg-[#293038] text-white border border-[#374151]'
}
</script>

<template>
  <Transition name="toast">
    <div v-if="uiStore.currentToast"
         class="fixed bottom-4 right-4 p-4 rounded-lg shadow-lg min-w-[200px] z-50"
         :class="[typeClasses[uiStore.currentToast.type] || typeClasses.default]">
      {{ uiStore.currentToast.message }}
    </div>
  </Transition>
</template>

<style scoped>
.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s ease;
}

.toast-enter-from,
.toast-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
</style>
