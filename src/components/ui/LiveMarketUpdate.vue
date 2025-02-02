
<template>
  <div class="fixed bottom-20 right-4 max-w-sm">
    <TransitionGroup
      name="notification"
      tag="div"
      class="space-y-2"
    >
      <div
        v-for="update in updates"
        :key="update.id"
        class="flex items-center p-4 bg-card/90 backdrop-blur-sm border border-border rounded-lg shadow-lg"
      >
        <div :class="[
          'w-2 h-2 rounded-full mr-3',
          update.type === 'up' ? 'bg-success' : 'bg-destructive'
        ]" />
        <div class="flex-1">
          <p class="font-medium">{{ update.pair }}</p>
          <p class="text-sm text-muted-foreground">
            {{ update.price }} 
            <span :class="update.type === 'up' ? 'text-success' : 'text-destructive'">
              {{ update.type === 'up' ? '↑' : '↓' }} {{ update.change }}%
            </span>
          </p>
        </div>
      </div>
    </TransitionGroup>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const updates = ref([])
const maxUpdates = 3
let wsConnection = null

const addUpdate = (update) => {
  updates.value.unshift(update)
  if (updates.value.length > maxUpdates) {
    updates.value.pop()
  }
  setTimeout(() => {
    updates.value = updates.value.filter(u => u.id !== update.id)
  }, 5000)
}

onMounted(() => {
  // Simuler des mises à jour en temps réel
  const pairs = ['BTC/USD', 'ETH/USD', 'XRP/USD']
  const interval = setInterval(() => {
    const pair = pairs[Math.floor(Math.random() * pairs.length)]
    const type = Math.random() > 0.5 ? 'up' : 'down'
    const change = (Math.random() * 2).toFixed(2)
    const price = type === 'up' 
      ? `$${(40000 + Math.random() * 1000).toFixed(2)}`
      : `$${(40000 - Math.random() * 1000).toFixed(2)}`

    addUpdate({
      id: Date.now(),
      pair,
      type,
      change,
      price
    })
  }, 3000)

  onUnmounted(() => clearInterval(interval))
})
</script>

<style scoped>
.notification-enter-active,
.notification-leave-active {
  transition: all 0.3s ease;
}

.notification-enter-from {
  opacity: 0;
  transform: translateX(30px);
}

.notification-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>