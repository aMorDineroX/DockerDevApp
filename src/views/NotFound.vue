<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-background">
    <div class="text-center space-y-6">
      <h1 class="text-6xl font-bold text-primary">404</h1>
      <p class="text-xl text-muted-foreground">Page not found</p>
      <button 
        @click="router.push('/')"
        class="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
      >
        Return to Home
      </button>
    </div>
  </div>
</template>
