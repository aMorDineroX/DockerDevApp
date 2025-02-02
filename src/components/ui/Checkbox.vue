<template>
  <div class="flex items-center">
    <input
      type="checkbox"
      :id="id"
      :checked="modelValue"
      @change="$emit('update:modelValue', $event.target.checked)"
      class="h-4 w-4 rounded border-border text-primary focus:ring-primary"
    />
    <slot />
  </div>
</template>

<script setup>
defineProps({
  id: String,
  modelValue: Boolean
})

defineEmits(['update:modelValue'])
</script>
