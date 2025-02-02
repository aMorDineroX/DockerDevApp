<template>
    <div>
        <Transition name="fade">
            <div class="balance-overlay" v-show="isLoading">
                <div class="spinner"></div>
            </div>
        </Transition>
        <div class="flex min-w-72 flex-1 flex-col gap-2 balance-card">
            <p class="text-white text-base font-medium leading-normal">Account Balance</p>
            <p class="text-white tracking-light text-[32px] font-bold leading-tight truncate">${{
                formatBalance(currentBalance) }}</p>
            <div class="flex gap-1">
                <p class="text-[#9dabb8] text-base font-normal leading-normal">Last 30 Days</p>
                <p class="text-[#0bda5b] text-base font-medium leading-normal">
                    <i class="fas fa-arrow-up"></i> +{{ formatPercentage(changePercentage) }}
                </p>
            </div>
            <div class="flex min-h-[180px] flex-1 flex-col gap-8 py-4">
                <slot name="chart"></slot>
            </div>
        </div>
    </div>
</template>

<script>
import { ref, onMounted, onUnmounted, computed, watch } from 'vue'
import Chart from 'chart.js/auto'

export default {
    name: 'BalanceCard',
    props: {
        balanceHistory: {
            type: Array,
            default: () => []
        },
        currentBalance: {
            type: Number,
            required: true
        },
        changePercentage: {
            type: Number,
            required: true
        },
        changeAmount: {
            type: Number,
            default: 0
        },
        highValue: {
            type: Number,
            default: 0
        },
        lowValue: {
            type: Number,
            default: 0
        },
        isLoading: {
            type: Boolean,
            default: false
        },
        selectedPeriod: {
            type: String,
            default: '30d'
        }
    },
    setup(props) {
        const chartContainer = ref(null)
        const periods = [
            { label: '7D', value: '7d' },
            { label: '30D', value: '30d' },
            { label: '1Y', value: '1y' }
        ]

        const isPositive = computed(() => props.changePercentage >= 0)

        const formatBalance = (value) => {
            return new Intl.NumberFormat('en-US', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            }).format(value)
        }

        const formatPercentage = (value) => {
            return `${value >= 0 ? '+' : ''}${value}%`
        }

        const changePeriod = (period) => {
            props.selectedPeriod = period
            props.isLoading = true
            // Simuler un chargement des données
            setTimeout(() => {
                props.isLoading = false
            }, 800)
        }

        const updateChart = () => {
            if (!chart || !props.balanceHistory.length) return

            chart.data.labels = [...Array(props.balanceHistory.length).keys()]
            chart.data.datasets[0].data = props.balanceHistory
            chart.update('none')
        }

        watch(() => props.balanceHistory, () => {
            updateChart()
        }, { deep: true })

        onMounted(() => {
            if (!chartContainer.value) {
                console.warn('Chart container not found')
                return
            }

            try {
                props.isLoading = true
                const ctx = chartContainer.value.getContext('2d')
                if (!ctx) {
                    console.warn('Failed to get 2d context')
                    return
                }

                // Destroy existing chart if it exists
                if (chart) {
                    chart.destroy()
                }

                chart = new Chart(ctx, {
                    type: 'line',
                    data: {
                        labels: [...Array(props.balanceHistory.length).keys()],
                        datasets: [{
                            data: props.balanceHistory,
                            borderColor: '#4CAF50',
                            tension: 0.4,
                            fill: true,
                            backgroundColor: 'rgba(76, 175, 80, 0.1)',
                            borderWidth: 2,
                            pointRadius: 0,
                            pointHoverRadius: 4
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
                                enabled: true,
                                mode: 'index',
                                intersect: false,
                                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                                titleColor: '#1a1a1a',
                                bodyColor: '#1a1a1a',
                                borderColor: '#e0e0e0',
                                borderWidth: 1,
                                padding: 12,
                                displayColors: false
                            }
                        },
                        scales: {
                            x: {
                                display: false
                            },
                            y: {
                                display: false,
                                beginAtZero: false,
                                suggestedMax: Math.max(...props.balanceHistory) * 1.1
                            }
                        },
                        layout: {
                            padding: {
                                top: 20,
                                bottom: 20
                            }
                        }
                    }
                })
            } catch (error) {
                console.error('Chart initialization error:', error)
            } finally {
                props.isLoading = false
            }
        })

        onUnmounted(() => {
            if (chart) {
                chart.destroy()
                chart = null
            }
        })

        return {
            chartContainer,
            periods,
            changePeriod,
            formatBalance,
            formatPercentage
        }
    }
}
</script>

<style scoped>
.balance-card {
    padding: 1rem;
    width: 100%;
    max-width: 800px;
    /* Réduit de 1200px à 800px pour un meilleur aspect */
    margin: 0 auto;
    display: flex;
    justify-content: center;
    transition: transform 0.3s, box-shadow 0.3s;
}

.card {
    background: white;
    border-radius: 16px;
    padding: 1.5rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    position: relative;
    overflow: hidden;
    width: 100%;
    /* Assure que la carte prend toute la largeur disponible */
}

.card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
}

.actions {
    display: flex;
    gap: 0.5rem;
}

.action-btn {
    background: none;
    border: none;
    padding: 0.5rem;
    cursor: pointer;
    color: #666;
    border-radius: 8px;
    transition: all 0.2s;
}

.action-btn:hover {
    background: #f5f5f5;
    color: #1a1a1a;
}

.balance-grid {
    display: grid;
    gap: 1rem;
}

.balance-main {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

.title {
    font-size: 1.1rem;
    font-weight: 600;
    color: #1a1a1a;
    margin-bottom: 1.5rem;
}

.current-balance {
    display: flex;
    align-items: baseline;
    gap: 0.5rem;
}

.amount {
    font-size: 1.75rem;
    font-weight: 700;
    color: #1a1a1a;
}

.period {
    font-size: 0.9rem;
    color: #666;
    margin: 0.25rem 0;
}

.balance-change-container {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
}

.balance-change {
    font-size: 1rem;
    font-weight: 600;
    padding: 0.25rem 0;
}

.balance-change-absolute {
    font-size: 0.9rem;
    color: #666;
}

.balance-change-absolute.positive {
    color: #4CAF50;
}

.period-selector {
    display: flex;
    gap: 0.5rem;
    margin: 1rem 0;
}

.period-btn {
    padding: 0.5rem 1rem;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    background: none;
    cursor: pointer;
    font-size: 0.9rem;
    transition: all 0.2s;
}

.period-btn.active {
    background: #4CAF50;
    color: white;
    border-color: #4CAF50;
}

.balance-metrics {
    display: flex;
    gap: 2rem;
    margin-top: 1rem;
    padding: 1rem 0;
    border-top: 1px solid #e0e0e0;
}

.metric {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
}

.metric-label {
    font-size: 0.85rem;
    color: #666;
}

.metric-value {
    font-size: 1.1rem;
    font-weight: 600;
    color: #1a1a1a;
}

.chart-container {
    margin: 1.5rem auto 0;
    height: 120px;
    width: 100%;
    position: relative;
    display: flex;
    justify-content: center;
}

.balance-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(255, 255, 255, 0.9);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 10;
}

.spinner {
    width: 40px;
    height: 40px;
    border: 3px solid #f3f3f3;
    border-top: 3px solid #4CAF50;
    border-radius: 50%;
    animation: spin 1s linear infinite;
}

@keyframes spin {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}

@media (min-width: 480px) {
    .title {
        font-size: 1.25rem;
    }

    .amount {
        font-size: 2rem;
    }

    .chart-container {
        height: 150px;
    }
}

@media (min-width: 768px) {
    .balance-card {
        padding: 2rem;
    }

    .card {
        padding: 2rem;
        min-width: 600px;
        /* Largeur minimum pour les écrans plus larges */
    }

    .title {
        font-size: 1.4rem;
    }

    .amount {
        font-size: 2.5rem;
    }

    .period {
        font-size: 1rem;
    }

    .balance-change {
        font-size: 1.1rem;
    }

    .chart-container {
        height: 180px;
    }
}

@media (min-width: 1024px) {
    .balance-card {
        padding: 1.5rem;
    }

    .card {
        padding: 2.5rem;
        min-width: 700px;
        /* Largeur minimum pour les grands écrans */
    }

    .amount {
        font-size: 3rem;
    }

    .chart-container {
        height: 200px;
    }
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

.balance-card:hover {
    transform: scale(1.05);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}
</style>