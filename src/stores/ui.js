import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

export const useUiStore = defineStore('ui', () => {
  // Initialize theme from localStorage or system preference
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
  const theme = ref(localStorage.getItem('theme') || (prefersDark ? 'dark' : 'light'))
  
  const isLoading = ref(false)
  const currentToast = ref(null)

  function toggleTheme() {
    theme.value = theme.value === 'dark' ? 'light' : 'dark'
    updateTheme()
  }

  function setTheme(newTheme) {
    theme.value = newTheme
    updateTheme()
  }

  function updateTheme() {
    // Update DOM
    document.documentElement.classList.remove('light', 'dark')
    document.documentElement.classList.add(theme.value)
    
    // Save preference
    localStorage.setItem('theme', theme.value)
    
    // Update meta theme-color
    document.querySelector('meta[name="theme-color"]')?.setAttribute(
      'content',
      theme.value === 'dark' ? '#111418' : '#ffffff'
    )
  }

  // Watch system preference changes
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) {
      setTheme(e.matches ? 'dark' : 'light')
    }
  })

  function showToast(message, type = 'info') {
    currentToast.value = { message, type }
    setTimeout(() => {
      currentToast.value = null
    }, 3000)
  }

  return {
    theme,
    isLoading,
    currentToast,
    toggleTheme,
    setTheme,
    updateTheme,
    showToast
  }
})
