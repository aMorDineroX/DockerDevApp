<template>
    <div class="quick-stats">
        <h2>Quick Stats</h2>
        <p>Total Trades: {{ totalTrades }}</p>
        <p>Winning Trades: {{ winningTrades }}</p>
        <p>Losing Trades: {{ losingTrades }}</p>
    </div>
</template>

<script>
export default {
    name: 'QuickStats',
    props: {
        totalTrades: {
            type: Number,
            default: 0
        },
        winningTrades: {
            type: Number,
            default: 0
        },
        losingTrades: {
            type: Number,
            default: 0
        }
    }
}
</script>

<style scoped>
.quick-stats {
    border: 1px solid #ccc;
    padding: 1rem;
    margin: 1rem 0;
}
</style>