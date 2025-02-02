<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
    <Card v-for="stat in stats" :key="stat.label">
      <CardContent class="p-6">
        <div class="flex items-center space-x-4">
          <div class="p-2 rounded-full bg-primary/10">
            <component :is="stat.icon" class="w-5 h-5 text-primary" />
          </div>
          <div>
            <p class="text-sm text-muted-foreground">{{ stat.label }}</p>
            <p class="text-2xl font-bold">{{ stat.value }}</p>
            <p class="text-xs text-muted-foreground">
              {{ stat.change }}% from last month
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  </div>
</template>

<script setup>
import { Card, CardContent } from '@/components/ui'
import { 
  TrendingUpIcon, UsersIcon, 
  ActivityIcon, DollarSignIcon 
} from 'lucide-vue-next'

const stats = [
  {
    label: 'Total Trades',
    value: '2,345',
    change: '+12.5',
    icon: ActivityIcon
  },
  {
    label: 'Win Rate',
    value: '68%',
    change: '+2.3',
    icon: TrendingUpIcon
  },
  {
    label: 'Total Profit',
    value: '$12,345',
    change: '+15.2',
    icon: DollarSignIcon
  },
  {
    label: 'API Keys',
    value: '3',
    change: '0',
    icon: UsersIcon
  }
]
</script>
