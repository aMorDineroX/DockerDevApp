import { defineStore } from 'pinia'

export const useThemeStore = defineStore('theme', {
  state: () => ({
    isDark: localStorage.getItem('theme') === 'dark',
    accent: localStorage.getItem('accent') || 'blue'
  }),

  getters: {
    currentTheme: (state) => state.isDark ? 'dark' : 'light'
  },

  actions: {
    toggleTheme() {
      this.isDark = !this.isDark
      localStorage.setItem('theme', this.isDark ? 'dark' : 'light')
      this.updateDocumentClass()
    },

    setAccent(color) {
      this.accent = color
      localStorage.setItem('accent', color)
    },

    updateDocumentClass() {
      if (this.isDark) {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
      }
    },

    init() {
      this.updateDocumentClass()
    }
  }
})
