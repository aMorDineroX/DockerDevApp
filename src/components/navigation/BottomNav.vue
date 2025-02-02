<template>
  <div class="fixed bottom-0 w-full">
    <div class="flex gap-2 border-t border-[#293038] bg-[#1c2126] px-4 pb-3 pt-2">
      <NavLink v-for="(item, index) in navItems" 
               :key="index"
               :to="item.path"
               :class="[isActive(item.path) ? 'text-white' : 'text-[#9dabb8]']"
               class="just flex flex-1 flex-col items-center justify-end gap-1">
        <div :class="isActive(item.path) ? 'text-white' : 'text-[#9dabb8]'"
             class="flex h-8 items-center justify-center">
          <component :is="item.icon" />
        </div>
        <p :class="isActive(item.path) ? 'text-white' : 'text-[#9dabb8]'"
           class="text-xs font-medium leading-normal tracking-[0.015em]">
          {{ item.label }}
        </p>
      </NavLink>
    </div>
    <div class="h-5 bg-[#1c2126]"></div>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
import NavLink from './NavLink.vue'
import { House, ChartLine, Robot, Tray, User } from '../icons'

const route = useRoute()
const isActive = (path) => route.path === path

const navItems = [
  { path: '/', label: 'Home', icon: House },
  { path: '/trade', label: 'Trade', icon: ChartLine },
  { path: '/bot', label: 'Bot', icon: Robot },
  { path: '/inbox', label: 'Inbox', icon: Tray },
  { path: '/profile', label: 'Profile', icon: User }
]
</script>
