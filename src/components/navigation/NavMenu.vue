<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const menuItems = ref([
  { label: 'Dashboard', path: '/', icon: 'dashboard' },
  { label: 'Trade', path: '/trade', icon: 'trade' },
  { label: 'Settings', path: '/settings', icon: 'settings' }
])
</script>

<template>
  <nav class="space-y-2">
    <router-link
      v-for="item in menuItems"
      :key="item.path"
      :to="item.path"
      class="flex items-center px-4 py-2 rounded-lg hover:bg-surface-dark transition-colors"
      :class="{ 'bg-surface-dark': $route.path === item.path }"
    >
      <span class="ml-3">{{ item.label }}</span>
    </router-link>
  </nav>
</template>
