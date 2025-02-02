
<template>
  <div v-show="isOpen" 
    class="fixed inset-0 bg-background/80 backdrop-blur-sm z-50"
    @click="close"
  >
    <div class="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg"
      @click.stop
    >
      <div class="bg-card border border-border rounded-lg shadow-lg p-6">
        <div class="flex items-center justify-between mb-6">
          <div>
            <h2 class="text-lg font-semibold">Keyboard Shortcuts</h2>
            <p class="text-sm text-muted-foreground">Quick access to common actions</p>
          </div>
          <Button variant="ghost" size="icon" @click="close">
            <XIcon class="w-4 h-4" />
          </Button>
        </div>

        <!-- Shortcuts Grid -->
        <div class="grid gap-6">
          <div v-for="(group, title) in shortcutGroups" :key="title">
            <h3 class="text-sm font-medium mb-2">{{ title }}</h3>
            <div class="space-y-2">
              <div v-for="shortcut in group" 
                :key="shortcut.keys"
                class="flex items-center justify-between p-2 rounded-lg hover:bg-muted/50"
              >
                <span class="text-sm text-muted-foreground">
                  {{ shortcut.description }}
                </span>
                <kbd class="px-2 py-1 text-xs font-mono bg-muted rounded border border-border">
                  {{ shortcut.keys }}
                </kbd>
              </div>
            </div>
          </div>
        </div>

        <div class="mt-6 pt-6 border-t border-border">
          <p class="text-xs text-muted-foreground text-center">
            Press <kbd class="px-1 py-0.5 text-xs font-mono bg-muted rounded border border-border">?</kbd> to show this dialog
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Button } from '@/components/ui'
import { XIcon } from 'lucide-vue-next'

const isOpen = ref(false)

const shortcutGroups = {
  'Navigation': [
    { keys: 'g h', description: 'Go to Home' },
    { keys: 'g t', description: 'Go to Trading' },
    { keys: 'g b', description: 'Go to Bot' },
    { keys: 'g p', description: 'Go to Profile' }
  ],
  'Trading': [
    { keys: 'n t', description: 'New Trade' },
    { keys: 'b', description: 'Quick Buy' },
    { keys: 's', description: 'Quick Sell' },
    { keys: 'esc', description: 'Cancel Trade' }
  ],
  'Interface': [
    { keys: 't', description: 'Toggle Theme' },
    { keys: '?', description: 'Show Shortcuts' },
    { keys: 'f', description: 'Toggle Fullscreen' }
  ]
}

const show = () => {
  isOpen.value = true
}

const close = () => {
  isOpen.value = false
}

defineExpose({ show })
</script>

<style scoped>
@keyframes overlay-show {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes content-show {
  from { 
    opacity: 0;
    transform: translate(-50%, -48%) scale(0.96);
  }
  to { 
    opacity: 1;
    transform: translate(-50%, -50%) scale(1);
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

kbd {
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
}
</style>