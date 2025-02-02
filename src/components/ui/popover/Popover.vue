<template>
  <div class="relative" @mouseleave="onMouseLeave">
    <slot />
    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="transform scale-95 opacity-0"
      enter-to-class="transform scale-100 opacity-100"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="transform scale-100 opacity-100"
      leave-to-class="transform scale-95 opacity-0"
    >
      <div v-if="isOpen" v-bind="$attrs" ref="popoverRef" :style="position" class="absolute z-50">
        <slot name="content" />
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, nextTick } from 'vue'

const props = defineProps({
  offset: {
    type: Number,
    default: 8
  }
})

const isOpen = ref(false)
const triggerRef = ref(null)
const popoverRef = ref(null)
const position = ref({})

const calculatePosition = () => {
  if (!triggerRef.value || !popoverRef.value) return
  
  const triggerRect = triggerRef.value.getBoundingClientRect()
  const popoverRect = popoverRef.value.getBoundingClientRect()
  
  position.value = {
    top: `${triggerRect.bottom + props.offset}px`,
    left: `${triggerRect.left - (popoverRect.width - triggerRect.width) / 2}px`
  }
}

const toggle = () => {
  isOpen.value = !isOpen.value
  if (isOpen.value) {
    nextTick(() => calculatePosition())
  }
}

const onMouseLeave = () => {
  isOpen.value = false
}

onMounted(() => {
  window.addEventListener('scroll', calculatePosition)
  window.addEventListener('resize', calculatePosition)
})

onUnmounted(() => {
  window.removeEventListener('scroll', calculatePosition)
  window.removeEventListener('resize', calculatePosition)
})

defineExpose({ toggle, triggerRef })
</script>
