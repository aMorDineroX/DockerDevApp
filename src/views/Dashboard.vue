<script setup>
import { ref, onMounted } from 'vue'
import { useMainStore } from '@/stores/main'
import api from '@/services/api'
import Modal from '@/components/common/Modal.vue'
import Table from '@/components/common/Table.vue'
import Alert from '@/components/common/Alert.vue'

const data = ref([])
const store = useMainStore()

const stats = ref([
  { label: 'Total Users', value: '1,234' },
  { label: 'Active Sessions', value: '56' },
  { label: 'Daily Views', value: '8,901' }
])

const showModal = ref(false)
const showAlert = ref(true)
const tableHeaders = [
  { key: 'id', label: 'ID' },
  { key: 'name', label: 'Name' },
  { key: 'status', label: 'Status' }
]
const tableData = ref([
  { id: 1, name: 'Item 1', status: 'Active' },
  { id: 2, name: 'Item 2', status: 'Pending' }
])

const handleRowClick = (item) => {
  console.log('Clicked row:', item)
  showModal.value = true
}

onMounted(async () => {
  try {
    const response = await api.get('/data')
    data.value = response.data
  } catch (error) {
    console.error('Failed to fetch data:', error)
  }
})
</script>

<template>
  <div class="min-h-screen bg-gray-100">
    <div class="container mx-auto px-4 py-8">
      <h1 class="text-3xl font-bold text-gray-800 mb-6">Dashboard</h1>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div v-for="stat in stats" :key="stat.label" 
             class="bg-white p-6 rounded-lg shadow">
          <h3 class="text-gray-500 text-sm">{{ stat.label }}</h3>
          <p class="text-3xl font-bold">{{ stat.value }}</p>
        </div>
      </div>
      <div class="space-y-6 mt-8">
        <Alert v-if="showAlert" 
               type="info" 
               @close="showAlert = false">
          Welcome to your dashboard!
        </Alert>

        <Table :headers="tableHeaders"
               :items="tableData"
               @row-click="handleRowClick" />

        <Modal :show="showModal"
               title="Row Details"
               @close="showModal = false">
          <p>Modal content here</p>
        </Modal>
      </div>
    </div>
  </div>
</template>
