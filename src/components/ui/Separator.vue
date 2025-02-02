<template>
  <div
    :class="[
      'shrink-0 bg-border',
      orientation === 'horizontal' ? 'h-[1px] w-full' : 'h-full w-[1px]'
    ]"
    :role="decorative ? undefined : 'separator'"
    :aria-orientation="decorative ? undefined : orientation"
  />
</template>

<script setup>
defineProps({
  orientation: {
    type: String,
    default: 'horizontal',
    validator: (value) => ['horizontal', 'vertical'].includes(value)
  },
  decorative: {
    type: Boolean,
    default: false
  }
})
</script>
