<template>
  <header class="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
    <div class="container flex h-14 items-center">
      <NavMenu />
    </div>
  </header>
  <div>
    <div class="flex gap-2 border-t border-[#293038] bg-[#1c2126] px-4 pb-3 pt-2">
      <NavLink href="#" icon="House" label="Home" :active="true" />
      <NavLink href="#" icon="ChartLine" label="Trade" />
      <NavLink href="#" icon="Robot" label="Bot" />
      <NavLink href="#" icon="Tray" label="Inbox" />
      <NavLink href="#" icon="User" label="Profile" />
    </div>
    <div class="h-5 bg-[#1c2126]"></div>
  </div>
</template>

<script setup>
import NavMenu from './navigation/NavMenu.vue'

const NavLink = defineComponent({
  props: {
    href: String,
    icon: String,
    label: String,
    active: Boolean
  },
  setup(props) {
    return () => (
      <a class={`just flex flex-1 flex-col items-center justify-end gap-1 ${props.active ? 'text-white' : 'text-[#9dabb8]'}`} href={props.href}>
        <div class={`flex h-8 items-center justify-center ${props.active ? 'text-white' : 'text-[#9dabb8]'}`}>
          <component is={props.icon} />
        </div>
        <p class={`text-xs font-medium leading-normal tracking-[0.015em] ${props.active ? 'text-white' : 'text-[#9dabb8]'}`}>{props.label}</p>
      </a>
    )
  }
})
</script>
