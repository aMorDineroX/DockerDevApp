<script setup>
const props = defineProps({
  headers: {
    type: Array,
    required: true
  },
  items: {
    type: Array,
    required: true
  },
  loading: Boolean
})

const emit = defineEmits(['row-click'])
</script>

<template>
  <div class="overflow-x-auto">
    <table class="min-w-full divide-y divide-gray-200">
      <thead class="bg-gray-50">
        <tr>
          <th v-for="header in headers" 
              :key="header.key"
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            {{ header.label }}
          </th>
        </tr>
      </thead>
      <tbody class="bg-white divide-y divide-gray-200">
        <template v-if="loading">
          <tr><td colspan="100%" class="text-center py-4">Loading...</td></tr>
        </template>
        <template v-else>
          <tr v-for="item in items" 
              :key="item.id"
              @click="emit('row-click', item)"
              class="hover:bg-gray-50 cursor-pointer">
            <td v-for="header in headers"
                :key="header.key"
                class="px-6 py-4 whitespace-nowrap">
              {{ item[header.key] }}
            </td>
          </tr>
        </template>
      </tbody>
    </table>
  </div>
</template>
