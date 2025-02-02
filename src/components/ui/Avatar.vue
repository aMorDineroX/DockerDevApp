
<template>
  <div class="relative inline-block">
    <img 
      :src="src || defaultAvatar"
      :alt="alt"
      :class="[
        'rounded-full object-cover',
        sizes[size],
        className
      ]"
      @error="handleImageError"
    />
    <slot name="badge"></slot>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import defaultAvatar from '@/assets/images/default-avatar.svg'

const props = defineProps({
  src: {
    type: String,
    default: ''
  },
  alt: {
    type: String,
    default: 'User avatar'
  },
  size: {
    type: String,
    default: 'md',
    validator: (value) => ['sm', 'md', 'lg', 'xl'].includes(value)
  },
  className: {
    type: String,
    default: ''
  }
})

const sizes = {
  sm: 'w-8 h-8',
  md: 'w-10 h-10',
  lg: 'w-12 h-12',
  xl: 'w-16 h-16'
}

const handleImageError = (e) => {
  e.target.src = defaultAvatar
}
</script>