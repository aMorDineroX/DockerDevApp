<template>
  <div class="relative">
    <Button 
      variant="ghost" 
      size="sm" 
      @click="isOpen = !isOpen"
      class="flex items-center gap-2 p-2"
    >
      <Avatar 
        :src="authStore.user?.avatar" 
        :alt="authStore.user?.name"
        size="sm"
      />
      <span class="hidden md:block">{{ authStore.user?.email }}</span>
      <ChevronDownIcon 
        class="w-4 h-4 text-muted-foreground transition-transform"
        :class="{ 'rotate-180': isOpen }"
      />
    </Button>

    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="transform scale-95 opacity-0"
      enter-to-class="transform scale-100 opacity-100"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="transform scale-100 opacity-100"
      leave-to-class="transform scale-95 opacity-0"
    >
      <div 
        v-if="isOpen" 
        class="absolute right-0 mt-2 w-56 rounded-md bg-card border border-border shadow-lg"
      >
        <!-- User Info -->
        <div class="px-4 py-3 border-b border-border">
          <p class="text-sm font-medium">{{ authStore.user?.name }}</p>
          <p class="text-xs text-muted-foreground truncate">
            {{ authStore.user?.email }}
          </p>
        </div>

        <!-- Menu Items -->
        <div class="py-1">
          <RouterLink
            v-for="item in menuItems"
            :key="item.to"
            :to="item.to"
            class="flex items-center px-4 py-2 text-sm hover:bg-muted/50 transition-colors"
            @click="isOpen = false"
          >
            <component :is="item.icon" class="w-4 h-4 mr-3 text-muted-foreground" />
            {{ item.label }}
          </RouterLink>

          <div class="border-t border-border my-1"></div>
          
          <button
            @click="handleSignOut"
            class="flex items-center w-full px-4 py-2 text-sm text-destructive hover:bg-destructive/10 transition-colors"
          >
            <LogOutIcon class="w-4 h-4 mr-3" />
            Sign Out
          </button>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { Button, Avatar } from '@/components/ui'
import { 
  UserIcon, 
  SettingsIcon, 
  LogOutIcon,
  ChevronDownIcon 
} from 'lucide-vue-next'

const router = useRouter()
const authStore = useAuthStore()
const isOpen = ref(false)

const menuItems = [
  { 
    label: 'Profile',
    to: '/profile',
    icon: UserIcon
  },
  { 
    label: 'Settings',
    to: '/settings',
    icon: SettingsIcon
  }
]

const handleSignOut = async () => {
  await authStore.logout()
  isOpen.value = false
  router.push('/login')
}

// Close menu when clicking outside
const handleClickOutside = (event) => {
  if (!event.target.closest('.relative')) {
    isOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>
