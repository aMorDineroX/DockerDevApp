
<template>
  <select
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
    class="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background 
           file:border-0 file:bg-transparent file:text-sm file:font-medium 
           placeholder:text-muted-foreground focus-visible:outline-none 
           focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 
           disabled:cursor-not-allowed disabled:opacity-50"
    v-bind="$attrs"
  >
    <slot />
  </select>
</template>

<script setup>
defineProps({
  modelValue: {
    type: [String, Number],
    required: true
  }
})

defineEmits(['update:modelValue'])
</script>