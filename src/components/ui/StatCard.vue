<template>
  <Card 
    hover 
    className="p-4 group hover:scale-[1.02] transition-all duration-300"
  >
    <div class="flex items-start justify-between">
      <div class="space-y-1">
        <p class="text-muted-foreground text-sm">{{ label }}</p>
        <p class="text-2xl font-bold">{{ value }}</p>
        <p :class="[
          'text-xs font-medium',
          trend > 0 ? 'text-success' : 'text-destructive'
        ]">
          {{ trend > 0 ? '↑' : '↓' }} {{ Math.abs(trend) }}% from last period
        </p>
      </div>
      <div :class="[
        'p-2 rounded-lg transition-colors',
        'bg-primary/10 group-hover:bg-primary/20'
      ]">
        <component :is="icon" class="w-5 h-5 text-primary" />
      </div>
    </div>
    <div class="mt-4 h-[60px]">
      <SparklineChart 
        :data="sparklineData" 
        :positive="trend > 0"
      />
    </div>
  </Card>
</template>

<script setup>
import { Card } from '@/components/ui'
import SparklineChart from '@/components/charts/SparklineChart.vue'

defineProps({
  label: String,
  value: String,
  trend: Number,
  sparklineData: Array,
  icon: Object
})
</script>
