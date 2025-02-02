<template>
  <div class="p-4 rounded-lg bg-surface-dark border border-border hover:border-border-hover transition-all">
    <div class="flex justify-between items-center">
      <div>
        <h4 class="font-medium text-foreground">{{ activity.pair }}</h4>
        <p class="text-sm text-muted-foreground">{{ activity.type }}</p>
      </div>
      <div class="text-right">
        <p class="font-medium">${{ activity.amount }}</p>
        <p class="text-sm text-muted-foreground">{{ new Date(activity.date).toLocaleDateString() }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  activity: {
    type: Object,
    required: true
  }
})
</script>
