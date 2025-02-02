export const mockApi = {
  login: async (credentials) => {
    // Simuler une latence
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    if (credentials.email === 'test@test.com' && credentials.password === 'password') {
      return {
        data: {
          token: 'fake-jwt-token',
          user: {
            id: 1,
            email: credentials.email,
            name: 'Test User'
          }
        }
      }
    }
    throw new Error('Invalid credentials')
  }
}
