<template>
  <div class="relative inline-block group">
    <slot />
    <div
      class="absolute z-50 px-2 py-1 text-xs leading-none text-white bg-black rounded opacity-0 
             group-hover:opacity-100 transition-opacity duration-300 pointer-events-none
             -translate-x-1/2 left-1/2 bottom-full mb-1"
    >
      {{ text }}
      <div class="absolute w-2 h-2 bg-black transform rotate-45 translate-y-1/2 left-1/2 -translate-x-1/2 bottom-0" />
    </div>
  </div>
</template>

<script setup>
defineProps({
  text: {
    type: String,
    required: true
  }
})
</script>

<style scoped>
.tooltip-container {
    position: relative;
    display: inline-block;
}

.tooltip {
    position: absolute;
    background-color: #333;
    color: white;
    padding: 5px 10px;
    border-radius: 4px;
    font-size: 14px;
    z-index: 1000;
    white-space: nowrap;
}

.top {
    bottom: 100%;
    left: 50%;
    transform: translateX(-50%);
    margin-bottom: 5px;
}

.bottom {
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    margin-top: 5px;
}

.left {
    right: 100%;
    top: 50%;
    transform: translateY(-50%);
    margin-right: 5px;
}

.right {
    left: 100%;
    top: 50%;
    transform: translateY(-50%);
    margin-left: 5px;
}
</style>