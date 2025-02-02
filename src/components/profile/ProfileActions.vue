<template>
  <div class="space-y-4">
    <h3 class="text-sm font-medium text-muted-foreground">Quick Actions</h3>
    <div class="grid grid-cols-2 gap-4">
      <Button
        v-for="action in actions"
        :key="action.label"
        variant="outline"
        class="w-full"
        @click="action.onClick"
      >
        <component :is="action.icon" class="w-4 h-4 mr-2" />
        {{ action.label }}
      </Button>
    </div>
  </div>
</template>

<script setup>
import { Button } from '@/components/ui'
import { 
  KeyIcon, ShieldCheckIcon, BellIcon, 
  UserIcon, ArrowLeftIcon 
} from 'lucide-vue-next'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const actions = [
  {
    label: 'Change Password',
    icon: KeyIcon,
    onClick: () => router.push('/settings/security')
  },
  {
    label: 'Enable 2FA',
    icon: ShieldCheckIcon,
    onClick: () => router.push('/settings/security')
  },
  {
    label: 'Notifications',
    icon: BellIcon,
    onClick: () => router.push('/settings/notifications')
  },
  {
    label: 'Sign Out',
    icon: ArrowLeftIcon,
    onClick: () => authStore.logout()
  }
]
</script>
