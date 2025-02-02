<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import Button from '@/components/ui/Button.vue'

const router = useRouter()
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const loading = ref(false)
const error = ref('')

const isValid = computed(() => {
  return email.value.includes('@') && 
         password.value.length >= 6 && 
         password.value === confirmPassword.value
})

const handleRegister = async () => {
  if (!isValid.value) return
  
  loading.value = true
  error.value = ''
  
  try {
    // Simuler une requête API
    await new Promise(resolve => setTimeout(resolve, 1000))
    localStorage.setItem('user-token', 'demo-token')
    router.push('/')
  } catch (err) {
    error.value = err.message || 'An error occurred during registration'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-background p-4">
    <div class="w-full max-w-md space-y-8">
      <!-- Titre -->
      <div class="text-center">
        <h2 class="text-3xl font-bold tracking-tight">Create an account</h2>
        <p class="mt-2 text-sm text-muted-foreground">
          Enter your details to create your account
        </p>
      </div>

      <!-- Formulaire -->
      <div class="bg-card p-8 rounded-xl border border-border shadow-lg">
        <form @submit.prevent="handleRegister" class="space-y-6">
          <!-- Message d'erreur -->
          <div v-if="error" class="p-3 text-sm rounded-lg bg-destructive/10 text-destructive">
            {{ error }}
          </div>

          <!-- Email -->
          <div class="space-y-2">
            <label class="text-sm font-medium" for="email">Email</label>
            <input 
              id="email"
              type="email" 
              v-model="email"
              :class="{'border-destructive': email && !email.includes('@')}"
              class="w-full p-3 rounded-lg border border-input bg-background focus:border-ring focus:ring-2 focus:ring-ring/10 outline-none transition"
              required
            />
          </div>

          <!-- Mot de passe -->
          <div class="space-y-2">
            <label class="text-sm font-medium" for="password">Password</label>
            <input 
              id="password"
              type="password" 
              v-model="password"
              class="w-full p-3 rounded-lg border border-input bg-background focus:border-ring focus:ring-2 focus:ring-ring/10 outline-none transition"
              required
            />
          </div>

          <!-- Confirmer mot de passe -->
          <div class="space-y-2">
            <label class="text-sm font-medium" for="confirm-password">Confirm Password</label>
            <input 
              id="confirm-password"
              type="password" 
              v-model="confirmPassword"
              :class="{'border-destructive': confirmPassword && password !== confirmPassword}"
              class="w-full p-3 rounded-lg border border-input bg-background focus:border-ring focus:ring-2 focus:ring-ring/10 outline-none transition"
              required
            />
          </div>

          <!-- Bouton d'inscription -->
          <Button
            type="submit"
            :disabled="!isValid || loading"
            class="w-full"
          >
            <span v-if="loading">Creating account...</span>
            <span v-else>Create account</span>
          </Button>
        </form>
      </div>

      <!-- Lien de connexion -->
      <p class="text-center text-sm">
        Already have an account?
        <router-link to="/login" class="text-primary hover:underline">
          Sign in
        </router-link>
      </p>
    </div>
  </div>
</template>
