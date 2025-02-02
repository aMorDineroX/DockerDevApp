<template>
  <div class="min-h-screen bg-[#111418]">
    <!-- Header Section -->
    <header class="bg-gradient-to-r from-[#1a1f25] to-[#111418] p-6 shadow-lg">
      <div class="max-w-7xl mx-auto">
        <h1 class="text-3xl font-bold text-white mb-2">Inbox</h1>
        <p class="text-gray-400">Manage your notifications and alerts</p>
      </div>
    </header>

    <!-- Main Content -->
    <div class="max-w-7xl mx-auto px-4 py-8">
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Sidebar -->
        <div class="lg:col-span-1">
          <div class="bg-[#1e2329] rounded-xl shadow-xl p-6 border border-[#293038]">
            <!-- Search -->
            <div class="mb-6">
              <input
                type="search"
                v-model="searchQuery"
                placeholder="Search messages..."
                class="w-full p-3 bg-[#161a1f] border border-[#293038] rounded-lg text-white focus:border-[#3d4654] transition-all"
              />
            </div>

            <!-- Filters -->
            <div class="space-y-2 mb-6">
              <button
                v-for="filter in filters"
                :key="filter.id"
                @click="selectedFilter = filter.id"
                :class="[
                  'w-full p-3 rounded-lg text-left transition-all',
                  selectedFilter === filter.id
                    ? 'bg-[#0bda5b] text-black font-medium'
                    : 'text-gray-400 hover:bg-[#161a1f]'
                ]"
              >
                {{ filter.label }}
                <span v-if="filter.id === 'unread' && unreadCount" class="float-right bg-red-500 text-white px-2 py-0.5 rounded-full text-xs">
                  {{ unreadCount }}
                </span>
              </button>
            </div>

            <!-- Actions -->
            <div class="space-y-2">
              <Button @click="markAllAsRead" class="w-full justify-center bg-[#161a1f] hover:bg-[#1f242b] text-white">
                Mark All as Read
              </Button>
            </div>
          </div>
        </div>

        <!-- Message List & Details -->
        <div class="lg:col-span-2 space-y-6">
          <!-- Message List -->
          <div class="bg-[#1e2329] rounded-xl shadow-xl p-6 border border-[#293038]">
            <div v-if="filteredMessages.length === 0" class="text-center py-8 text-gray-400">
              No messages found
            </div>
            <div v-else class="space-y-3">
              <div
                v-for="message in filteredMessages"
                :key="message.id"
                @click="selectMessage(message)"
                :class="[
                  'p-4 rounded-lg cursor-pointer transition-all',
                  message === selectedMessage
                    ? 'bg-[#0bda5b] text-black'
                    : 'bg-[#161a1f] hover:border-[#3d4654]',
                  !message.read && 'border-l-4 border-l-[#0bda5b]'
                ]"
                class="border border-[#293038]"
              >
                <div class="flex justify-between items-start mb-2">
                  <h3 :class="['font-medium', message === selectedMessage ? 'text-black' : 'text-white']">
                    {{ message.title }}
                  </h3>
                  <span :class="['text-sm', message === selectedMessage ? 'text-black/70' : 'text-gray-400']">
                    {{ formatDate(message.date) }}
                  </span>
                </div>
                <p :class="['text-sm line-clamp-2', message === selectedMessage ? 'text-black/80' : 'text-gray-400']">
                  {{ message.content }}
                </p>
              </div>
            </div>
          </div>

          <!-- Message Details -->
          <div v-if="selectedMessage" class="bg-[#1e2329] rounded-xl shadow-xl p-6 border border-[#293038]">
            <div class="flex justify-between items-start mb-6">
              <div>
                <h2 class="text-xl font-bold text-white mb-2">{{ selectedMessage.title }}</h2>
                <p class="text-sm text-gray-400">
                  {{ selectedMessage.date.toLocaleString() }}
                </p>
              </div>
              <Button @click="deleteMessage(selectedMessage.id)" class="bg-red-500 hover:bg-red-600">
                Delete
              </Button>
            </div>
            <div class="prose prose-invert max-w-none">
              <p class="text-gray-300">{{ selectedMessage.content }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import Button from '@/components/ui/Button.vue'
import Card from '@/components/ui/Card.vue'

const selectedFilter = ref('all')
const searchQuery = ref('')
const selectedMessage = ref(null)

const filters = [
  { id: 'all', label: 'All Messages' },
  { id: 'unread', label: 'Unread' },
  { id: 'alerts', label: 'Trade Alerts' },
  { id: 'system', label: 'System' }
]

const messages = ref([
  {
    id: 1,
    type: 'alert',
    title: 'BTC Price Alert',
    content: 'BTC has reached your target price of $45,000',
    date: new Date('2024-01-20T10:30:00'),
    read: false,
    priority: 'high'
  },
  {
    id: 2,
    type: 'system',
    title: 'System Maintenance',
    content: 'Scheduled maintenance in 24 hours',
    date: new Date('2024-01-19T15:45:00'),
    read: true,
    priority: 'medium'
  },
  {
    id: 3,
    type: 'alert',
    title: 'New Trade Executed',
    content: 'Successfully bought 0.1 ETH at $2,800',
    date: new Date('2024-01-19T09:15:00'),
    read: false,
    priority: 'high'
  }
])

const filteredMessages = computed(() => {
  let filtered = messages.value
  
  // Appliquer le filtre
  if (selectedFilter.value === 'unread') {
    filtered = filtered.filter(m => !m.read)
  } else if (selectedFilter.value !== 'all') {
    filtered = filtered.filter(m => m.type === selectedFilter.value)
  }
  
  // Appliquer la recherche
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(m => 
      m.title.toLowerCase().includes(query) || 
      m.content.toLowerCase().includes(query)
    )
  }
  
  return filtered.sort((a, b) => b.date - a.date)
})

const unreadCount = computed(() => 
  messages.value.filter(m => !m.read).length
)

const selectMessage = (message) => {
  selectedMessage.value = message
  if (!message.read) {
    message.read = true
  }
}

const formatDate = (date) => {
  const now = new Date()
  const diff = now - date
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  
  if (days === 0) {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  } else if (days === 1) {
    return 'Yesterday'
  } else {
    return date.toLocaleDateString()
  }
}

const markAllAsRead = () => {
  messages.value.forEach(m => m.read = true)
}

const deleteMessage = (id) => {
  messages.value = messages.value.filter(m => m.id !== id)
  if (selectedMessage.value?.id === id) {
    selectedMessage.value = null
  }
}
</script>
