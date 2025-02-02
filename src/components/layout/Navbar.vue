<script setup>
import { useMainStore } from '@/stores/main'
import { useThemeStore } from '@/stores/theme'

const store = useMainStore()
const themeStore = useThemeStore()
</script>

<template>
  <nav class="bg-white shadow-md dark:bg-gray-800">
    <div class="container mx-auto px-4">
      <div class="flex justify-between items-center h-16">
        <router-link to="/" class="flex items-center space-x-3">
          <img src="/vite.svg" class="h-8 w-8" alt="Logo" />
          <span class="text-xl font-bold text-gray-800">PayloadApp</span>
        </router-link>
        
        <div class="flex space-x-4">
          <router-link to="/dashboard" class="nav-link">Dashboard</router-link>
          <router-link to="/profile" class="nav-link">Profile</router-link>
          <router-link to="/settings" class="nav-link">Settings</router-link>
          <button @click="themeStore.toggleTheme" 
                  class="nav-link">
            {{ themeStore.isDark ? '☀️' : '🌙' }}
          </button>
        </div>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.nav-link {
  @apply px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100;
}
</style>
