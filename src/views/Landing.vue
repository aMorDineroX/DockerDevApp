<template>
  <div class="min-h-[calc(100vh-4rem)] flex flex-col">
    <!-- Hero Section -->
    <section class="flex-1 flex items-center">
      <div class="max-w-4xl mx-auto text-center px-4 py-16">
        <h1 class="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary via-primary-hover to-primary bg-clip-text text-transparent mb-6">
          The Next Generation Trading Platform
        </h1>
        <p class="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          Trade smarter with advanced tools, real-time data, and automated strategies.
        </p>
        <div class="flex items-center justify-center gap-4">
          <Button size="lg" as="router-link" to="/register">Get Started</Button>
          <Button size="lg" variant="outline" as="router-link" to="/login">Sign In</Button>
        </div>
      </div>
    </section>

    <!-- Features Grid -->
    <section class="bg-muted/50 border-t border-border">
      <div class="max-w-7xl mx-auto px-4 py-16">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div v-for="feature in features" :key="feature.title" 
            class="p-6 rounded-lg bg-card border border-border hover:border-border-hover transition-all"
          >
            <div class="p-3 rounded-lg bg-primary/10 w-fit mb-4">
              <component :is="feature.icon" class="w-6 h-6 text-primary" />
            </div>
            <h3 class="text-lg font-semibold mb-2">{{ feature.title }}</h3>
            <p class="text-muted-foreground">{{ feature.description }}</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { Button } from '@/components/ui'
import { RocketIcon, ChartBarIcon, BotIcon } from 'lucide-vue-next'

const features = [
  {
    title: 'Advanced Trading',
    description: 'Execute trades with precision using our advanced trading interface.',
    icon: ChartBarIcon
  },
  {
    title: 'Automated Trading',
    description: 'Let our smart bots trade for you with customizable strategies.',
    icon: BotIcon
  },
  {
    title: 'Real-Time Analytics',
    description: 'Make informed decisions with real-time market data and analytics.',
    icon: RocketIcon
  }
]
</script>
