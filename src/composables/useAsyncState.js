import { ref } from 'vue'
import { useUiStore } from '@/stores/ui'

export function useAsyncState(asyncFn, immediate = true) {
  const data = ref(null)
  const error = ref(null)
  const loading = ref(false)
  const uiStore = useUiStore()

  const execute = async (...args) => {
    loading.value = true
    error.value = null
    
    try {
      data.value = await asyncFn(...args)
      return data.value
    } catch (e) {
      error.value = e
      uiStore.showToast(e.message, 'error')
      return null
    } finally {
      loading.value = false
    }
  }

  if (immediate) {
    execute()
  }

  return {
    data,
    error,
    loading,
    execute
  }
}
