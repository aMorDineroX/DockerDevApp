
<template>
  <component
    :is="as"
    ref="triggerRef"
    v-bind="$attrs"
    @click="handleClick"
  >
    <slot />
  </component>
</template>

<script setup>
import { inject, ref, onMounted } from 'vue'

const props = defineProps({
  as: {
    type: String,
    default: 'button'
  }
})

const triggerRef = ref(null)
const popover = inject('popover')

const handleClick = () => {
  popover?.toggle()
}

onMounted(() => {
  if (popover) {
    popover.triggerRef = triggerRef.value
  }
})
</script>