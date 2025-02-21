import { ref } from 'vue'
import axios from 'axios'
import type { LoginCredentials, AuthResponse } from '@/types'

export const useAuth = () => {
  const loading = ref(false)
  const error = ref<string | null>(null)
  const isAuthenticated = ref(false)

  const loginUser = async (credentials: LoginCredentials): Promise<AuthResponse> => {
    loading.value = true
    error.value = null

    try {
      const { data } = await axios.post<AuthResponse>('/api/auth/login', credentials)
      isAuthenticated.value = true
      return data
    } catch (err) {
      error.value = 'Authentication failed'
      throw err
    } finally {
      loading.value = false
    }
  }

  const logout = () => {
    localStorage.removeItem('token')
    isAuthenticated.value = false
  }

  return {
    loading,
    error,
    isAuthenticated,
    loginUser,
    logout
  }
}