
export const initMessageHandler = () => {
  window.addEventListener('message', (event) => {
    if (event.source !== window) return
    
    if (event.data.type && event.data.type === 'FROM_EXTENSION') {
      // Handle extension messages
      console.log('Message received from extension:', event.data)
    }
  })
}
