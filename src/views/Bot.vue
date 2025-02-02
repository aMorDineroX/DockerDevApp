<template>
  <div class="space-y-6">
    <header class="bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg p-6">
      <h1 class="text-2xl font-bold bg-gradient-to-r from-primary to-primary-hover bg-clip-text text-transparent">
        Trading Bot
      </h1>
      <p class="text-muted-foreground">Configure and monitor your automated trading strategies</p>
    </header>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Bot Control Panel -->
      <Card hover className="lg:col-span-2 p-6">
        <div class="flex items-center justify-between mb-6">
          <div>
            <h2 class="text-lg font-semibold">Trading Bot</h2>
            <p class="text-sm text-muted-foreground">Current Strategy: {{ currentStrategy }}</p>
          </div>
          <Badge :variant="botStatus === 'running' ? 'success' : 'warning'">
            {{ botStatus }}
          </Badge>
        </div>

        <div class="space-y-6">
          <div class="p-4 bg-surface-soft rounded-lg">
            <div class="flex justify-between items-center mb-4">
              <Label>Active Trading Pairs</Label>
              <Button variant="outline" size="sm" @click="openPairSelector">
                Edit Pairs
              </Button>
            </div>
            <div class="flex flex-wrap gap-2">
              <Badge 
                v-for="pair in selectedPairs" 
                :key="pair"
                variant="outline"
              >
                {{ pair }}
              </Badge>
            </div>
          </div>

          <div class="space-y-4">
            <div class="space-y-2">
              <Label>Risk Level</Label>
              <Select v-model="botSettings.riskLevel">
                <option value="low">Conservative (Low Risk)</option>
                <option value="medium">Balanced (Medium Risk)</option>
                <option value="high">Aggressive (High Risk)</option>
              </Select>
            </div>

            <div class="space-y-2">
              <Label>Position Size (USD)</Label>
              <Input 
                v-model="botSettings.positionSize"
                type="number"
                min="0"
              />
            </div>
          </div>

          <div class="flex gap-4">
            <Button 
              class="flex-1" 
              :variant="botStatus === 'running' ? 'destructive' : 'default'"
              @click="toggleBot"
            >
              {{ botStatus === 'running' ? 'Stop Bot' : 'Start Bot' }}
            </Button>
            <Button variant="outline" @click="openAdvancedSettings">
              Advanced Settings
            </Button>
          </div>
        </div>
      </Card>

      <!-- Performance Metrics -->
      <div class="space-y-6">
        <StatCard
          v-for="metric in performanceMetrics"
          :key="metric.label"
          v-bind="metric"
        />
      </div>
    </div>

    <!-- Bot Activity -->
    <Card hover className="p-6">
      <div class="flex items-center justify-between mb-6">
        <h2 class="text-lg font-semibold">Activity Log</h2>
        <div class="flex gap-2">
          <Select v-model="activityFilter" className="w-32">
            <option value="all">All Activity</option>
            <option value="trades">Trades Only</option>
            <option value="errors">Errors Only</option>
          </Select>
          <Button variant="outline" size="sm" @click="clearActivityLog">
            Clear Log
          </Button>
        </div>
      </div>

      <div class="space-y-4">
        <div v-for="log in filteredLogs" :key="log.id"
          class="p-4 bg-surface-soft rounded-lg border border-border flex items-center gap-4"
        >
          <div :class="[
            'p-2 rounded-full',
            activityTypeStyles[log.type]
          ]">
            <component :is="activityIcons[log.type]" class="w-4 h-4" />
          </div>
          <div class="flex-1">
            <p class="font-medium">{{ log.message }}</p>
            <p class="text-sm text-muted-foreground">{{ formatDate(log.timestamp) }}</p>
          </div>
          <Badge :variant="log.type">{{ log.type }}</Badge>
        </div>
      </div>
    </Card>

    <!-- Modals -->
    <Dialog v-model="showPairSelector">
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Select Trading Pairs</DialogTitle>
        </DialogHeader>
        <div class="grid grid-cols-2 gap-4 py-4">
          <div v-for="pair in availablePairs" :key="pair"
            class="flex items-center space-x-2"
          >
            <Checkbox 
              :id="pair"
              v-model="selectedPairs"
              :value="pair"
            />
            <Label :for="pair">{{ pair }}</Label>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" @click="showPairSelector = false">Cancel</Button>
          <Button @click="savePairs">Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { 
  Card, CardHeader, CardTitle, CardDescription, CardContent,
  Button, Input, Select, Label, Switch, Badge 
} from '@/components/ui'
import { StatCard } from '@/components/trading'
import { PlayIcon, PauseIcon, Settings2Icon } from 'lucide-vue-next'
import { useUiStore } from '@/stores/ui'

// State
const botStatus = ref('stopped')
const currentStrategy = ref('MACD Cross')
const showPairSelector = ref(false)
const activityFilter = ref('all')

const botSettings = ref({
  riskLevel: 'medium',
  positionSize: 100,
  maxPositions: 5,
  stopLoss: 2,
  takeProfit: 4
})

const selectedPairs = ref(['BTC/USD', 'ETH/USD'])
const availablePairs = ['BTC/USD', 'ETH/USD', 'XRP/USD', 'SOL/USD', 'ADA/USD']

const activityLogs = ref([
  {
    id: 1,
    type: 'info',
    message: 'Bot initialized',
    timestamp: new Date()
  },
  {
    id: 2,
    type: 'success',
    message: 'BTC/USD long position opened',
    timestamp: new Date()
  }
])

// Icons and styles mapping
const activityIcons = {
  info: Settings2Icon,
  success: CheckCircleIcon,
  error: AlertTriangleIcon
}

const activityTypeStyles = {
  info: 'bg-primary/10 text-primary',
  success: 'bg-success/10 text-success',
  error: 'bg-destructive/10 text-destructive'
}

// Performance metrics
const performanceMetrics = ref([
  {
    label: 'Total Profit',
    value: '$1,234.56',
    trend: 8.5,
    sparklineData: [4, 6, 8, 5, 7, 9, 8]
  },
  {
    label: 'Win Rate',
    value: '68%',
    trend: 2.3,
    sparklineData: [65, 62, 68, 64, 66, 68, 68]
  },
  {
    label: 'Active Positions',
    value: '3',
    trend: 0,
    sparklineData: [2, 3, 4, 3, 2, 3, 3]
  }
])

const showAdvancedSettings = ref(false)

// Computed
const filteredLogs = computed(() => {
  if (activityFilter.value === 'all') return activityLogs.value
  return activityLogs.value.filter(log => log.type === activityFilter.value)
})

// Methods
const toggleBot = () => {
  botStatus.value = botStatus.value === 'running' ? 'stopped' : 'running'
}

const openPairSelector = () => {
  showPairSelector.value = true
}

const openAdvancedSettings = () => {
  showAdvancedSettings.value = true
}

const savePairs = () => {
  // Implement save logic
  showPairSelector.value = false
}

const clearActivityLog = () => {
  activityLogs.value = []
}

const formatDate = (date) => {
  return new Date(date).toLocaleString()
}
</script>
