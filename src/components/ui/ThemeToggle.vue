<template>
  <button 
    @click="toggleTheme" 
    class="p-2 rounded-lg hover:bg-surface transition-colors"
    :aria-label="theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'"
  >
    <!-- Sun icon -->
    <svg v-if="theme === 'dark'" viewBox="0 0 24 24" fill="none" class="w-6 h-6 text-gray-400">
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
        stroke="currentColor"
      />
    </svg>
    <!-- Moon icon -->
    <svg v-else viewBox="0 0 24 24" fill="none" class="w-6 h-6 text-gray-400">
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
        stroke="currentColor"
      />
    </svg>
  </button>
</template>

<script setup>
import { useUiStore } from '@/stores/ui'
import { storeToRefs } from 'pinia'

const uiStore = useUiStore()
const { theme } = storeToRefs(uiStore)
const { toggleTheme } = uiStore
</script>
