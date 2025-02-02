<template>
  <canvas ref="chartRef" class="w-full h-full"></canvas>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import Chart from 'chart.js/auto'

const props = defineProps({
  data: {
    type: Array,
    required: true
  },
  positive: {
    type: Boolean,
    default: true
  }
})

const chartRef = ref(null)
let chart = null

onMounted(() => {
  const ctx = chartRef.value.getContext('2d')
  
  chart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: props.data.map((_, i) => i),
      datasets: [{
        data: props.data,
        borderColor: props.positive ? '#22c55e' : '#ef4444',
        backgroundColor: (context) => {
          const gradient = ctx.createLinearGradient(0, 0, 0, 60)
          const color = props.positive ? '#22c55e' : '#ef4444'
          gradient.addColorStop(0, `${color}20`)
          gradient.addColorStop(1, `${color}05`)
          return gradient
        },
        tension: 0.4,
        fill: true,
        borderWidth: 1.5
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false
        }
      },
      scales: {
        x: {
          display: false
        },
        y: {
          display: false
        }
      },
      elements: {
        point: {
          radius: 0
        }
      }
    }
  })
})

onUnmounted(() => {
  if (chart) {
    chart.destroy()
  }
})
</script>
