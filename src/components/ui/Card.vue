<template>
  <div class="rounded-lg border bg-card text-card-foreground shadow">
    <slot />
  </div>
</template>

<script setup>
import { useUiStore } from '@/stores/ui'
import { lightTheme, darkTheme } from './theme'

const props = defineProps({
  hover: {
    type: Boolean,
    default: false
  },
  className: {
    type: String,
    default: ''
  }
})

const uiStore = useUiStore()
</script>

<style scoped>
.hover-enabled:hover {
  border-color: var(--color-border-hover);
  box-shadow: var(--shadow-elevated);
}
</style>
