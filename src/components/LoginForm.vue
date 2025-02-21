<template>
  <div class="login-container">
    <form @submit.prevent="handleSubmit" class="login-form">
      <h1>Login</h1>
      
      <FormInput
        v-model="login"
        type="text"
        label="Login"
        placeholder="Enter your login"
        :error="errors.login"
        required
      />

      <FormInput
        v-model="tabel"
        type="text"
        label="Tabel Number"
        placeholder="Enter your tabel number"
        :error="errors.tabel"
        required
      />

      <FormInput
        v-model="password"
        type="password"
        label="Password"
        placeholder="Enter your password"
        :error="errors.password"
        required
      />

      <div class="form-actions">
        <button 
          type="submit" 
          class="btn-primary"
          :disabled="loading"
        >
          {{ loading ? 'Loading...' : 'Sign In' }}
        </button>
      </div>

      <div v-if="error" class="error-message">
        {{ error }}
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '../composables/useAuth.ts'
import FormInput from './FormInput.vue'

const router = useRouter()
const { loginUser, loading, error } = useAuth()

const login = ref('')
const tabel = ref('')
const password = ref('')
const errors = reactive({
  login: '',
  tabel: '',
  password: ''
})

const validateForm = (): boolean => {
  let isValid = true
  errors.login = ''
  errors.tabel = ''
  errors.password = ''

  if (!login.value) {
    errors.login = 'Login is required'
    isValid = false
  }

  if (!tabel.value) {
    errors.tabel = 'Tabel number is required'
    isValid = false
  }

  if (!password.value || password.value.length < 6) {
    errors.password = 'Password must be at least 6 characters'
    isValid = false
  }

  return isValid
}

const handleSubmit = async () => {
  if (!validateForm()) return

  try {
    const response = await loginUser({
      login: login.value,
      tabel: tabel.value,
      password: password.value
    })
    
    if (response.access_token) {
      localStorage.setItem('token', response.access_token)
      router.push('/dashboard')
    }
  } catch (err) {
    console.error('Login failed:', err)
  }
}
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 1rem;
}

.login-form {
  width: 100%;
  max-width: 400px;
  padding: 2rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.form-actions {
  margin-top: 1.5rem;
}

.btn-primary {
  width: 100%;
  padding: 0.75rem;
  background: #4A90E2;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.2s;
}

.btn-primary:hover {
  background: #357ABD;
}

.btn-primary:disabled {
  background: #ccc;
  cursor: not-allowed;
}

.error-message {
  margin-top: 1rem;
  color: #dc3545;
  text-align: center;
}
</style>