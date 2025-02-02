<script setup>
import { ref } from 'vue'
import { useUiStore } from '@/stores/ui'

const settings = ref({
  notifications: true,
  darkMode: true,
  tradingEnabled: false
})

const uiStore = useUiStore()

const handleThemeChange = () => {
  uiStore.toggleTheme()
  uiStore.showToast(`Theme changed to ${uiStore.theme} mode`, 'info')
}
</script>

<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-2xl font-bold mb-6">Settings</h1>
    <div class="max-w-2xl mx-auto bg-card rounded-xl p-6 border border-border">
      <div class="space-y-6">
        <div class="flex items-center justify-between">
          <div>
            <h3 class="font-medium">Notifications</h3>
            <p class="text-sm text-muted-foreground">Receive trading alerts</p>
          </div>
          <input 
            type="checkbox" 
            v-model="settings.notifications"
            class="toggle"
          />
        </div>
        <div class="flex items-center justify-between">
          <div>
            <h3 class="font-medium">Dark Mode</h3>
            <p class="text-sm text-muted-foreground">Toggle dark theme</p>
          </div>
          <input 
            type="checkbox" 
            v-model="settings.darkMode"
            class="toggle"
          />
        </div>
        <div class="flex items-center justify-between p-4">
          <span>Dark Mode</span>
          <button @click="handleThemeChange" class="...">
            Toggle Theme
          </button>
        </div>
        <div class="flex items-center justify-between">
          <div>
            <h3 class="font-medium">Trading</h3>
            <p class="text-sm text-muted-foreground">Enable automated trading</p>
          </div>
          <input 
            type="checkbox" 
            v-model="settings.tradingEnabled"
            class="toggle"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.toggle {
  @apply h-6 w-11 rounded-full bg-muted relative cursor-pointer transition-colors;
}

.toggle:checked {
  @apply bg-primary;
}
</style>
