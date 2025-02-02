<template>
  <span
    :class="[
      'inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ring-1 ring-inset',
      variants[variant]
    ]"
  >
    <slot />
  </span>
</template>

<script setup>
const props = defineProps({
  variant: {
    type: String,
    default: 'default',
    validator: (value) => [
      'default',
      'primary',
      'secondary',
      'success',
      'warning',
      'error',
      'destructive',
      'outline',
      'info'
    ].includes(value)
  }
})

const variants = {
  default: 'bg-primary/10 text-primary ring-primary/20',
  primary: 'bg-primary/10 text-primary ring-primary/20',
  secondary: 'bg-secondary/10 text-secondary-foreground ring-secondary/20',
  success: 'bg-success/10 text-success ring-success/20',
  warning: 'bg-warning/10 text-warning ring-warning/20',
  error: 'bg-error/10 text-error ring-error/20',
  destructive: 'bg-destructive/10 text-destructive ring-destructive/20',
  outline: 'bg-background text-foreground ring-border',
  info: 'bg-primary/10 text-primary ring-primary/20'
}
</script>
