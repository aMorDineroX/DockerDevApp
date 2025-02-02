<template>
  <div class="p-6">
    <div class="relative h-[148px]">
      <svg width="100%" height="148" viewBox="-3 0 478 150" fill="none" xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none">
        <path
          d="M0 109C18.1538 109 18.1538 21 36.3077 21C54.4615 21 54.4615 41 72.6154 41C90.7692 41 90.7692 93 108.923 93C127.077 93 127.077 33 145.231 33C163.385 33 163.385 101 181.538 101C199.692 101 199.692 61 217.846 61C236 61 236 45 254.154 45C272.308 45 272.308 121 290.462 121C308.615 121 308.615 149 326.769 149C344.923 149 344.923 1 363.077 1C381.231 1 381.231 81 399.385 81C417.538 81 417.538 129 435.692 129C453.846 129 453.846 25 472 25V149H326.769H0V109Z"
          fill="url(#paint0_linear_chart)" />
        <path
          d="M0 109C18.1538 109 18.1538 21 36.3077 21C54.4615 21 54.4615 41 72.6154 41C90.7692 41 90.7692 93 108.923 93C127.077 93 127.077 33 145.231 33C163.385 33 163.385 101 181.538 101C199.692 101 199.692 61 217.846 61C236 61 236 45 254.154 45C272.308 45 272.308 121 290.462 121C308.615 121 308.615 149 326.769 149C344.923 149 344.923 1 363.077 1C381.231 1 381.231 81 399.385 81C417.538 81 417.538 129 435.692 129C453.846 129 453.846 25 472 25"
          stroke="#9dabb8" stroke-width="3" stroke-linecap="round" />
        <defs>
          <linearGradient id="paint0_linear_chart" x1="236" y1="1" x2="236" y2="149" gradientUnits="userSpaceOnUse">
            <stop stop-color="#293038" />
            <stop offset="1" stop-color="#293038" stop-opacity="0" />
          </linearGradient>
        </defs>
      </svg>
    </div>
    <TimeframeSelector @update:timeframe="updateTimeframe" />
    <MetricsGrid />
    <BenchmarkComparison />
  </div>
</template>

<script setup>
import TimeframeSelector from './TimeframeSelector.vue'
import MetricsGrid from './MetricsGrid.vue'
import BenchmarkComparison from './BenchmarkComparison.vue'

const updateTimeframe = (newTimeframe) => {
  // Logique de mise à jour du timeframe
}
</script>
