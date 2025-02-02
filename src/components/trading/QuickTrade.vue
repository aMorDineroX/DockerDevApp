<template>
    <div class="quick-trade">
        <h2>Quick Trade</h2>
        <div>
            <label for="symbol">Symbol:</label>
            <input id="symbol" v-model="symbol" />
        </div>
        <div>
            <label for="size">Trade Size:</label>
            <input id="size" type="number" min="1" v-model="tradeSize" />
        </div>
        <div>
            <p v-if="!isTradeValid" style="color: red;">Invalid trade</p>
        </div>
        <button @click="executeTrade" :disabled="!isTradeValid">Execute Trade</button>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const symbol = ref('')
const tradeSize = ref(1)

const isTradeValid = computed(() => {
  return symbol.value.trim() !== '' && tradeSize.value > 0
})

function executeTrade() {
    if (isTradeValid.value) {
        console.log(`Trading ${tradeSize.value} shares of ${symbol.value}`)
        // Ajouter la logique de trading ici
    }
}
</script>

<style scoped>
.quick-trade {
    margin: 20px;
    border: 1px solid #aaa;
    padding: 16px;
    width: 300px;
    border-radius: 4px;
}
</style>