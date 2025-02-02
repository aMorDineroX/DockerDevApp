<template>
    <section class="performance-metrics">
        <h2>Performance Metrics</h2>
        <p>Total Trades: {{ totalTrades }}</p>
    </section>
</template>

<script setup>
import { ref, computed } from 'vue'

const trades = ref([])
const totalTrades = computed(() => trades.value.length)
</script>

<style scoped>
.performance-metrics {
    padding: 1rem;
}
</style>