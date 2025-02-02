<template>
  <div class="relative h-[300px] w-full">
    <canvas ref="chartRef" class="w-full h-full"></canvas>
    <div v-if="loading" class="absolute inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm">
      <LoadingSpinner />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue'
import Chart from 'chart.js/auto'
import { LoadingSpinner } from '@/components/ui'

const props = defineProps({
  data: {
    type: Array,
    required: true
  }
})

const chartRef = ref(null)
const loading = ref(true)
let chart = null

const createChart = () => {
  const ctx = chartRef.value.getContext('2d')
  
  chart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: props.data.map((_, i) => i),
      datasets: [{
        label: 'Balance',
        data: props.data,
        borderColor: '#0bda5b',
        backgroundColor: (context) => {
          const gradient = ctx.createLinearGradient(0, 0, 0, 300)
          gradient.addColorStop(0, 'rgba(11, 218, 91, 0.2)')
          gradient.addColorStop(1, 'rgba(11, 218, 91, 0)')
          return gradient
        },
        tension: 0.4,
        fill: true,
        borderWidth: 2
      }]
    },
    options: {
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
          display: false
        },
        y: {
          beginAtZero: false,
          grid: {
            color: 'rgba(255, 255, 255, 0.1)'
          },
          ticks: {
            callback: (value) => `$${value.toLocaleString()}`
          }
        }
      }
    }
  })

  loading.value = false
}

watch(() => props.data, (newData) => {
  if (chart) {
    chart.data.datasets[0].data = newData
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
})
</script>
