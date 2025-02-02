<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useWalletStore } from '@/stores/wallet'
import { useUiStore } from '@/stores/ui'
import Card from '@/components/ui/Card.vue'
import Button from '@/components/ui/Button.vue'

const router = useRouter()
const authStore = useAuthStore()
const walletStore = useWalletStore()
const uiStore = useUiStore()

const email = ref('')
const password = ref('')
const isLoading = ref(false)

const handleLogin = async () => {
  try {
    isLoading.value = true
    await authStore.login({
      email: email.value,
      password: password.value
    })
    router.push('/')
  } catch (error) {
    uiStore.showToast(error.message, 'error')
  } finally {
    isLoading.value = false
  }
}

const connectMetaMask = async () => {
  try {
    isLoading.value = true
    await walletStore.connect()
    router.push('/')
  } catch (error) {
    uiStore.showToast(error.message, 'error')
  } finally {
    isLoading.value = false
  }
}

const connectWalletConnect = async () => {
  uiStore.showToast('WalletConnect coming soon', 'info')
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-background px-4">
    <Card class="w-full max-w-md p-6 space-y-6">
      <div class="text-center space-y-2">
        <h1 class="text-2xl font-bold bg-gradient-to-r from-primary to-primary-hover bg-clip-text text-transparent">
          Welcome Back
        </h1>
        <p class="text-secondary">Sign in to your account to continue</p>
      </div>

      <form @submit.prevent="handleLogin" class="space-y-4">
        <div class="space-y-2">
          <label for="email" class="text-sm font-medium">Email</label>
          <input 
            id="email"
            v-model="email"
            type="email" 
            class="input w-full p-2"
            required
            :disabled="isLoading"
          />
        </div>

        <div class="space-y-2">
          <div class="flex justify-between">
            <label for="password" class="text-sm font-medium">Password</label>
            <RouterLink to="/forgot-password" class="text-sm text-primary hover:text-primary-hover">
              Forgot password?
            </RouterLink>
          </div>
          <input 
            id="password"
            v-model="password"
            type="password" 
            class="input w-full p-2"
            required
            :disabled="isLoading"
          />
        </div>

        <Button 
          type="submit" 
          class="w-full"
          :loading="isLoading"
        >
          {{ isLoading ? 'Signing in...' : 'Sign In' }}
        </Button>
      </form>

      <div class="relative">
        <div class="absolute inset-0 flex items-center">
          <span class="w-full border-t border-border"></span>
        </div>
        <div class="relative flex justify-center text-xs uppercase">
          <span class="bg-card px-2 text-secondary">Or continue with</span>
        </div>
      </div>

      <div class="grid grid-cols-2 gap-4">
        <Button variant="outline" @click="connectMetaMask">
          <img src="@/assets/images/metamask.svg" alt="MetaMask" class="w-5 h-5 mr-2" />
          MetaMask
        </Button>
        <Button variant="outline" @click="connectWalletConnect">
          <img src="@/assets/images/walletconnect.svg" alt="WalletConnect" class="w-5 h-5 mr-2" />
          WalletConnect
        </Button>
      </div>

      <p class="text-center text-sm text-secondary">
        Don't have an account?
        <RouterLink to="/register" class="text-primary hover:text-primary-hover font-medium">
          Sign up
        </RouterLink>
      </p>
    </Card>
  </div>
</template>
