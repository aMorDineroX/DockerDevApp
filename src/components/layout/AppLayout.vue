<script setup>
import NavigationBar from '../NavigationBar.vue'
</script>

<template>
  <div class="min-h-screen bg-background">
    <NavigationBar />
    <main class="container mx-auto px-4 py-8">
      <slot></slot>
    </main>
  </div>
</template>
