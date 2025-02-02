<template>
  <div class="space-y-0">
    <h3 class="text-white text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4">Activity</h3>
    <div v-for="(activity, index) in activities" :key="index"
         class="flex items-center gap-4 bg-[#111418] px-4 min-h-[72px] py-2 justify-between">
      <div class="flex flex-col justify-center">
        <p class="text-white text-base font-medium leading-normal line-clamp-1">{{ activity.pair }}</p>
        <p class="text-[#9dabb8] text-sm font-normal leading-normal line-clamp-2">{{ activity.type }}</p>
      </div>
      <div class="shrink-0">
        <p class="text-white text-base font-normal leading-normal">${{ activity.amount }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  activities: {
    type: Array,
    required: true
  }
})
</script>
