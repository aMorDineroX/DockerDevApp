<script setup>
import { useUiStore } from '@/stores/ui'
import { storeToRefs } from 'pinia'
import LoadingSpinner from './LoadingSpinner.vue'

const uiStore = useUiStore()
const { isLoading } = storeToRefs(uiStore)
</script>

<template>
  <Transition name="fade">
    <div v-if="isLoading" class="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center">
      <LoadingSpinner />
    </div>
  </Transition>
</template>
