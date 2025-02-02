<template>
  <div class="relative w-full h-full group">
    <!-- Fullscreen Button -->
    <button 
      @click="toggleFullscreen" 
      class="absolute top-2 right-2 p-2 rounded-lg bg-background/80 backdrop-blur-sm border border-border 
             opacity-0 group-hover:opacity-100 transition-opacity z-10"
    >
      <component :is="isFullscreen ? MinimizeIcon : MaximizeIcon" class="w-4 h-4 text-muted-foreground" />
    </button>

    <!-- Chart Container -->
    <div 
      ref="chartContainer"
      :class="[
        'relative w-full transition-all duration-300',
        isFullscreen ? 'fixed inset-0 z-50 bg-background p-6' : 'h-full'
      ]"
    >
      <canvas ref="chartRef" :class="{ 'max-h-screen': isFullscreen }"></canvas>
      
      <!-- Loading Overlay -->
      <div v-if="loading" class="absolute inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm">
        <div class="space-y-4 text-center">
          <LoadingSpinner size="lg" class="animate-bounce" />
          <p class="text-sm text-muted-foreground">Loading chart data...</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue'
import { Chart, registerables } from 'chart.js'
import { LoadingSpinner } from '@/components/ui'
import { 
  Maximize as MaximizeIcon, 
  Minimize as MinimizeIcon 
} from 'lucide-vue-next'
import { useKeyboardShortcut } from '@/composables/useKeyboardShortcut'

// Register Chart.js components
Chart.register(...registerables)

const props = defineProps({
  data: {
    type: Object,
    required: true
  },
  loading: {
    type: Boolean,
    default: false
  },
  options: {
    type: Object,
    default: () => ({})
  }
})

const emit = defineEmits(['period-select'])

const chartRef = ref(null)
let chart = null

const chartContainer = ref(null)
const isFullscreen = ref(false)

const toggleFullscreen = () => {
  isFullscreen.value = !isFullscreen.value
  if (isFullscreen.value) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
  // Redraw chart after transition
  setTimeout(() => {
    if (chart) {
      chart.resize()
    }
  }, 300)
}

// Keyboard shortcut for fullscreen
useKeyboardShortcut('f', toggleFullscreen)

const createChart = () => {
  const ctx = chartRef.value.getContext('2d')
  
  const defaultOptions = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      intersect: false,
      mode: 'index'
    },
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        backgroundColor: 'rgba(30, 35, 41, 0.9)',
        padding: 12,
        borderColor: 'rgba(41, 48, 56, 0.9)',
        borderWidth: 1,
        titleFont: {
          size: 13
        },
        bodyFont: {
          size: 12
        },
        callbacks: {
          label: (context) => {
            return `$${context.parsed.y.toLocaleString()}`
          }
        }
      }
    },
    scales: {
      x: {
        grid: {
          display: false
        },
        ticks: {
          color: 'rgba(255, 255, 255, 0.5)'
        }
      },
      y: {
        grid: {
          color: 'rgba(255, 255, 255, 0.1)'
        },
        ticks: {
          color: 'rgba(255, 255, 255, 0.5)',
          callback: (value) => `$${value.toLocaleString()}`
        }
      }
    }
  }

  chart = new Chart(ctx, {
    type: 'line',
    data: props.data,
    options: { ...defaultOptions, ...props.options }
  })
}

watch(() => props.data, (newData) => {
  if (chart) {
    chart.data = newData
    chart.update('none')
  }
}, { deep: true })

onMounted(() => {
  createChart()
})

onUnmounted(() => {
  if (chart) {
    chart.destroy()
  }
  document.body.style.overflow = ''
})
</script>
