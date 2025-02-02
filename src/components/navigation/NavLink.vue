<template>
  <router-link 
    :to="to" 
    :class="[
      mobile ? 'nav-link-mobile' : 'nav-link',
      active ? 'active' : ''
    ]"
  >
    <i :class="[`fas fa-${icon}`, { 'mb-1': mobile }]" />
    <span v-if="label && !mobile">{{ label }}</span>
    <span v-if="mobile" class="text-xs">{{ label }}</span>
  </router-link>
</template>

<script setup>
defineProps({
  to: {
    type: String,
    required: true
  },
  label: {
    type: String,
    default: ''
  },
  icon: {
    type: String,
    required: true
  },
  active: {
    type: Boolean,
    default: false
  },
  mobile: {
    type: Boolean,
    default: false
  }
})
</script>

<style scoped>
.router-link-active {
  color: var(--color-primary);
}
</style>