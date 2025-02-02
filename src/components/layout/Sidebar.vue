<script setup>
import { ref } from 'vue'

const isOpen = ref(true)
const menuItems = [
  { name: 'Dashboard', path: '/dashboard', icon: '📊' },
  { name: 'Profile', path: '/profile', icon: '👤' },
  { name: 'Settings', path: '/settings', icon: '⚙️' }
]
</script>

<template>
  <aside :class="['bg-gray-800 text-white h-screen', isOpen ? 'w-64' : 'w-20']">
    <div class="p-4">
      <button @click="isOpen = !isOpen" class="mb-4">
        {{ isOpen ? '←' : '→' }}
      </button>
      <nav class="space-y-2">
        <router-link v-for="item in menuItems" 
                     :key="item.path"
                     :to="item.path"
                     class="flex items-center space-x-2 p-2 rounded hover:bg-gray-700">
          <span>{{ item.icon }}</span>
          <span v-if="isOpen">{{ item.name }}</span>
        </router-link>
      </nav>
    </div>
  </aside>
</template>
