<template>
  <Card :class="[
    'bg-surface/80 backdrop-blur-sm border border-border/50 transition-all duration-300',
    isSticky ? 'shadow-2xl shadow-primary/5' : 'shadow-lg',
    className
  ]">
    <div class="p-6">
      <!-- Header -->
      <div class="flex items-center justify-between mb-6">
        <h2 class="text-xl font-bold bg-gradient-to-r from-primary to-primary-hover bg-clip-text text-transparent">
          Quick Actions
        </h2>
        <div class="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
          <svg class="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>
      </div>
      
      <!-- Desktop Grid -->
      <div class="hidden lg:grid grid-cols-1 gap-3">
        <Tooltip 
          v-for="action in actions" 
          :key="action.path"
          :text="action.description"
        >
          <Button 
            @click="handleAction(action)"
            :variant="action.path === currentPath ? 'default' : 'outline'"
            class="w-full justify-between group hover:scale-[1.02] transition-all duration-200"
            :class="action.path === currentPath ? 'bg-primary shadow-lg shadow-primary/20' : 'hover:border-primary/50'"
          >
            <div class="flex items-center">
              <div :class="[
                'p-2 rounded-lg mr-3 transition-colors',
                action.path === currentPath ? 'bg-black/20' : 'bg-primary/10'
              ]">
                <component 
                  :is="action.icon" 
                  class="w-5 h-5"
                  :class="action.path === currentPath ? 'text-black' : 'text-primary'"
                />
              </div>
              <span :class="action.path === currentPath ? 'text-black' : 'text-primary-text'">
                {{ action.label }}
              </span>
            </div>
            <svg 
              class="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity"
              :class="action.path === currentPath ? 'text-black/50' : 'text-primary'"
              fill="none" viewBox="0 0 24 24" stroke="currentColor"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </Button>
        </Tooltip>
      </div>

      <!-- Mobile Grid -->
      <div class="lg:hidden grid grid-cols-2 gap-3">
        <Button 
          v-for="action in actions" 
          :key="action.path"
          @click="handleActionWithFeedback(action)"
          :variant="action.path === currentPath ? 'default' : 'outline'"
          class="flex-col py-4 hover:scale-[1.02] transition-all duration-200"
          :class="action.path === currentPath ? 'bg-primary shadow-lg shadow-primary/20' : 'hover:border-primary/50'"
        >
          <div :class="[
            'p-3 rounded-lg mb-2 transition-colors',
            action.path === currentPath ? 'bg-black/20' : 'bg-primary/10'
          ]">
            <component 
              :is="action.icon" 
              class="w-6 h-6"
              :class="action.path === currentPath ? 'text-black' : 'text-primary'"
            />
          </div>
          <span class="text-sm" :class="action.path === currentPath ? 'text-black' : 'text-primary-text'">
            {{ action.label }}
          </span>
        </Button>
      </div>
    </div>

    <!-- Mobile Quick Tips -->
    <div class="lg:hidden px-6 pb-6">
      <div class="bg-surface/50 rounded-lg p-3 border border-border/50">
        <div class="flex items-center text-xs text-secondary-text">
          <svg class="w-4 h-4 mr-2 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Swipe between actions for quick access
        </div>
      </div>
    </div>
  </Card>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import Card from './Card.vue'
import Button from './Button.vue'
import Tooltip from './Tooltip.vue'
import * as Icons from '@/components/icons'

const props = defineProps({
  className: {
    type: String,
    default: ''
  }
})

const router = useRouter()
const route = useRoute()
const isSticky = ref(false)

const currentPath = computed(() => route.path)

const actions = [
  { 
    label: 'New Trade',
    path: '/trade',
    variant: 'default',
    icon: Icons.ChartLineIcon,
    description: 'Start a new trading operation'
  },
  { 
    label: 'Start Bot',
    path: '/bot',
    variant: 'outline',
    icon: Icons.RobotIcon,
    description: 'Launch automated trading bot'
  },
  { 
    label: 'Settings',
    path: '/settings',
    variant: 'outline',
    icon: Icons.CogIcon,
    description: 'Configure your trading preferences'
  },
  { 
    label: 'Profile',
    path: '/profile',
    variant: 'outline',
    icon: Icons.UserIcon,
    description: 'View and edit your profile'
  }
]

const handleAction = (action) => {
  router.push(action.path)
}

const handleActionWithFeedback = async (action) => {
  if (window?.navigator?.vibrate) {
    window.navigator.vibrate(50)
  }
  await handleAction(action)
}

// Sticky scroll behavior
const handleScroll = () => {
  isSticky.value = window.scrollY > 100
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
.glass-card {
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
}
</style>
