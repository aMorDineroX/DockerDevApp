<template>
  <div 
    v-show="show"
    class="fixed bottom-4 right-4 max-w-sm w-full bg-card shadow-lg rounded-lg border border-border overflow-hidden"
    :class="{ 'animate-in slide-in-from-right': show }"
  >
    <div class="flex p-4">
      <div class="flex-shrink-0">
        <component 
          :is="icon" 
          :class="typeClasses[type].icon"
          class="h-5 w-5"
        />
      </div>
      <div class="ml-3 w-0 flex-1">
        <p class="text-sm font-medium text-foreground">
          {{ title }}
        </p>
        <p class="mt-1 text-sm text-muted-foreground">
          {{ message }}
        </p>
      </div>
      <div class="ml-4 flex-shrink-0 flex">
        <button
          class="rounded-md inline-flex text-muted-foreground hover:text-foreground"
          @click="hide"
        >
          <XMarkIcon class="h-5 w-5" />
        </button>
      </div>
    </div>
    <div 
      class="h-1 bg-primary/10 transition-all duration-300"
      :style="{ width: `${progress}%` }"
    />
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { XMarkIcon, CheckCircleIcon, ExclamationCircleIcon, InformationCircleIcon } from '@heroicons/vue/24/outline'

const props = defineProps({
  title: String,
  message: String,
  duration: {
    type: Number,
    default: 5000
  },
  type: {
    type: String,
    default: 'info'
  }
})

const show = ref(false)
const progress = ref(100)
let progressInterval = null
let timeout = null

const typeClasses = {
  success: { icon: 'text-success' },
  error: { icon: 'text-destructive' },
  info: { icon: 'text-primary' },
  warning: { icon: 'text-warning' }
}

const icons = {
  success: CheckCircleIcon,
  error: ExclamationCircleIcon,
  info: InformationCircleIcon,
  warning: ExclamationCircleIcon
}

const icon = computed(() => icons[props.type])

const hide = () => {
  show.value = false
  clearInterval(progressInterval)
  clearTimeout(timeout)
}

onMounted(() => {
  show.value = true
  
  const startTime = Date.now()
  const updateProgress = () => {
    const elapsed = Date.now() - startTime
    progress.value = 100 - (elapsed / props.duration) * 100
    if (progress.value <= 0) hide()
  }

  progressInterval = setInterval(updateProgress, 10)
  timeout = setTimeout(hide, props.duration)
})

onUnmounted(() => {
  clearInterval(progressInterval)
  clearTimeout(timeout)
})
</script>
