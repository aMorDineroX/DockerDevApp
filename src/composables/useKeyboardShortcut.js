
import { onMounted, onUnmounted } from 'vue'

export function useKeyboardShortcut(key, callback, modifiers = []) {
  const handler = (e) => {
    // Check if all modifiers are pressed
    const modifiersPressed = modifiers.every(modifier => e[`${modifier}Key`])
    
    // Check if no other modifiers are pressed when none are required
    const noExtraModifiers = modifiers.length === 0 
      ? !e.ctrlKey && !e.altKey && !e.shiftKey && !e.metaKey
      : true

    if (e.key.toLowerCase() === key.toLowerCase() && modifiersPressed && noExtraModifiers) {
      e.preventDefault()
      callback()
    }
  }

  onMounted(() => {
    window.addEventListener('keydown', handler)
  })

  onUnmounted(() => {
    window.removeEventListener('keydown', handler)
  })
}

// Shortcuts helper
export const shortcuts = {
  FULLSCREEN: 'f',
  NEW_TRADE: 'n',
  QUICK_BUY: 'b',
  QUICK_SELL: 's',
  TOGGLE_THEME: 't',
  HELP: '?'
}
