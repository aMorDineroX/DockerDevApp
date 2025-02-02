<template>
  <div :class="[
    'flex flex-col min-h-dvh transition-colors duration-200',
    'bg-background text-primary'
  ]">
    <!-- Fixed Header -->
    <header class="fixed inset-x-0 top-0 glass-effect border-b border-border/50" style="z-index: 20;">
      <div class="max-w-7xl mx-auto px-4">
        <div class="flex h-16 items-center justify-between">
          <RouterLink to="/" class="text-2xl font-bold bg-gradient-to-r from-primary to-primary-hover bg-clip-text text-transparent">
            PayloadApp
          </RouterLink>
          
          <!-- Desktop Navigation -->
          <nav v-if="authStore.isAuthenticated" class="hidden md:flex items-center space-x-4">
            <NavLink v-for="item in navItems" 
                    :key="item.path"
                    v-bind="item"
                    :active="currentRoute === item.path" />
          </nav>
          <div v-else class="hidden md:flex items-center space-x-4">
            <RouterLink to="/login" class="text-muted-foreground hover:text-foreground transition-colors">
              Sign In
            </RouterLink>
            <Button as="router-link" to="/register" size="sm">
              Get Started
            </Button>
          </div>

          <div class="flex items-center gap-4">
            <ThemeToggle />
            <UserMenu v-if="authStore.isAuthenticated" />
            <Button v-else variant="ghost" size="sm" as="router-link" to="/login">
              Sign In
            </Button>
          </div>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="flex-1 mt-16 relative">
      <div class="max-w-7xl mx-auto px-4 py-6">
        <!-- Progress Bar -->
        <div v-if="authStore.isAuthenticated" class="fixed top-0 left-0 right-0 h-0.5 bg-primary/20">
          <div class="h-full bg-primary transition-all duration-300"
               :style="{ width: `${scrollProgress}%` }"
          ></div>
        </div>

        <!-- Quick Actions for authenticated users -->
        <template v-if="authStore.isAuthenticated">
          <div class="lg:hidden mb-6">
            <QuickActions className="md:mx-auto md:max-w-2xl" />
          </div>
          
          <div class="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div class="lg:col-span-3 relative">
              <ErrorBoundary>
                <RouterView />
              </ErrorBoundary>
            </div>
            <aside class="hidden lg:block lg:col-span-1">
              <div class="sticky top-[5rem]">
                <QuickActions />
              </div>
            </aside>
          </div>
        </template>
        
        <!-- Simple layout for non-authenticated users -->
        <template v-else>
          <ErrorBoundary>
            <RouterView />
          </ErrorBoundary>
        </template>
      </div>
    </main>

    <!-- Mobile Navigation -->
    <nav v-if="authStore.isAuthenticated" class="md:hidden fixed inset-x-0 bottom-0 glass-effect border-t border-border/50" style="z-index: 20;">
      <div class="grid grid-cols-5 p-2">
        <NavLink v-for="item in navItems" 
                :key="item.path"
                v-bind="item"
                :active="currentRoute === item.path"
                mobile />
      </div>
    </nav>

    <!-- Overlays -->
    <Teleport to="body">
      <LoadingScreen v-if="uiStore.isLoading" />
      <Toast v-if="uiStore.currentToast" />
      <LiveMarketUpdate v-if="authStore.isAuthenticated" />
      <KeyboardShortcuts ref="keyboardShortcuts" />
    </Teleport>
  </div>
</template>

<script setup>
import { Button } from '@/components/ui'
import { useUiStore } from '@/stores/ui'
import { useRouter, useRoute, RouterView } from 'vue-router'
import NavLink from '@/components/navigation/NavLink.vue'
import ErrorBoundary from '@/components/ErrorBoundary.vue'
import Toast from '@/components/ui/Toast.vue'
import LoadingScreen from '@/components/ui/LoadingScreen.vue'
import LoadingSpinner from '@/components/ui/LoadingSpinner.vue'
import QuickActions from '@/components/ui/QuickActions.vue'
import ThemeToggle from '@/components/ui/ThemeToggle.vue'
import UserMenu from '@/components/ui/UserMenu.vue'
import LiveMarketUpdate from '@/components/ui/LiveMarketUpdate.vue'
import KeyboardShortcuts from '@/components/ui/KeyboardShortcuts.vue'
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useKeyboardShortcut } from '@/composables/useKeyboardShortcut'

const router = useRouter()
const route = useRoute()
const uiStore = useUiStore()
const authStore = useAuthStore()

const currentRoute = computed(() => route.path)

// Update navigation items to include required RouterLink props
const navItems = [
  { to: '/', path: '/', label: 'Home', icon: 'HomeIcon' },
  { to: '/trade', path: '/trade', label: 'Trade', icon: 'ChartLineIcon' },
  { to: '/bot', path: '/bot', label: 'Bot', icon: 'RobotIcon' },
  { to: '/inbox', path: '/inbox', label: 'Inbox', icon: 'InboxIcon' },
  { to: '/profile', path: '/profile', label: 'Profile', icon: 'UserIcon' }
]

// Initialize theme correctly
onMounted(() => {
  uiStore.updateTheme() // This will apply the saved theme or system preference
})

// Watch theme changes for dynamic elements
watch(() => uiStore.theme, (newTheme) => {
  // Update any dynamic theme-dependent components
  document.documentElement.style.colorScheme = newTheme
}, { immediate: true })

// Prevent audio abort error
onMounted(() => {
  document.addEventListener('click', () => {
    document.querySelectorAll('audio, video').forEach(media => {
      media.pause()
    })
  }, { capture: true })
})

// Add scroll progress
const scrollProgress = ref(0)

const updateScrollProgress = () => {
  const winScroll = window.scrollY
  const height = document.documentElement.scrollHeight - window.innerHeight
  scrollProgress.value = (winScroll / height) * 100
}

onMounted(() => {
  window.addEventListener('scroll', updateScrollProgress)
})

onUnmounted(() => {
  window.removeEventListener('scroll', updateScrollProgress)
})

const keyboardShortcuts = ref(null)

// Add keyboard shortcut to show shortcuts dialog
useKeyboardShortcut('?', () => {
  keyboardShortcuts.value?.show()
})
</script>

<style>
/* Only keep essential global styles here */
:root {
  color-scheme: dark;
}

/* Use modern viewport units */
.min-h-dvh {
  min-height: 100dvh;
}

/* Transitions */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Focus styles */
:focus-visible {
  @apply outline-none ring-2 ring-[#0bda5b] ring-offset-2 ring-offset-[#111418];
}

/* Remove default outline and add custom focus styles */
:focus {
  outline: none;
}

:focus-visible {
  @apply ring-2 ring-[#0bda5b] ring-offset-1 ring-offset-[#111418];
}

/* Ensure proper overflow handling */
.overflow-container {
  @apply overflow-auto;
  -webkit-overflow-scrolling: touch;
}

/* Improve canvas rendering */
canvas {
  image-rendering: -webkit-optimize-contrast;
  image-rendering: crisp-edges;
}

.app-background {
  background-color: var(--color-background);
}

.app-nav {
  border-top: 1px solid var(--color-border);
  background-color: var(--color-surface);
  padding: var(--spacing-base) var(--spacing-xl) var(--spacing-large);
}

.container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem;
  text-align: center;
}
.header {
  margin-bottom: 2rem;
}
h1 {
  color: #42b883;
}
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}

.page-enter-active,
.page-leave-active {
  transition: all 0.3s ease;
}

.page-enter-from {
  opacity: 0;
  transform: translateX(20px);
}

.page-leave-to {
  opacity: 0;
  transform: translateX(-20px);
}

/* Ajout des styles pour la navigation */
.nav-link {
  @apply px-4 py-2 text-gray-400 hover:text-white hover:bg-[#293038] rounded-lg transition-all;
}

.nav-link.active {
  @apply text-[#0bda5b] bg-[#293038];
}

.nav-link-mobile {
  @apply flex flex-col items-center text-xs text-gray-400;
}

.nav-link-mobile.active {
  @apply text-[#0bda5b];
}
</style>
