<template>
  <div class="space-y-4">
    <ActivityItem
      v-for="activity in activities"
      :key="activity.id"
      :activity="activity"
    />
  </div>
</template>

<script setup>
import ActivityItem from './ActivityItem.vue'

defineProps({
  activities: {
    type: Array,
    required: true
  }
})
</script>

<style scoped>
.activity-list {
  padding: 1rem;
}
</style>
