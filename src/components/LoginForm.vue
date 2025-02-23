<template>
  <div class="login-container">
    <form @submit.prevent="handleSubmit" class="login-form">
      <h1 class="login-title">Вход в ERP-систему</h1>

      <FormInput
        v-model="tabel"
        type="text"
        label="Табельный номер"
        placeholder="Введите табельный номер"
        :error="errors.tabel"
        required
      />

      <FormInput
        v-model="login"
        type="text"
        label="Логин"
        placeholder="Введите логин"
        :error="errors.login"
        required
      />

      <FormInput
        v-model="password"
        type="password"
        label="Пароль"
        placeholder="Введите пароль"
        :error="errors.password"
        required
      />

      <div class="remember-me">
        <div class="checkbox-container">
          <input type="checkbox" v-model="rememberMe" id="remember" />
          <label class="checkbox-label" for="remember">Запомнить аккаунт</label>
        </div>
      </div>

      <div class="form-actions">
        <button type="submit" class="btn-primary" :disabled="loading">
          {{ loading ? 'Загрузка...' : 'Войти' }}
        </button>
      </div>

      <div v-if="error" class="error-message">
        {{ error }}
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { useAuth } from '../composables/useAuth.ts';
import FormInput from './FormInput.vue';

const router = useRouter();
const { loginUser, loading, error } = useAuth();

const login = ref('');
const tabel = ref('');
const password = ref('');
const rememberMe = ref(false);
const errors = reactive({
  login: '',
  tabel: '',
  password: '',
});

const validateForm = (): boolean => {
  let isValid = true;
  errors.login = '';
  errors.tabel = '';
  errors.password = '';

  if (!login.value) {
    errors.login = 'Login is required';
    isValid = false;
  }

  if (!tabel.value) {
    errors.tabel = 'Tabel number is required';
    isValid = false;
  }

  if (!password.value || password.value.length < 6) {
    errors.password = 'Password must be at least 6 characters';
    isValid = false;
  }

  return isValid;
};

const handleSubmit = async () => {
  if (!validateForm()) return;

  try {
    const response = await loginUser({
      login: login.value,
      tabel: tabel.value,
      password: password.value,
    });

    if (response.access_token) {
      if (rememberMe.value) {
        localStorage.setItem('token', response.access_token);
        localStorage.setItem('rememberMe', 'true');
      } else {
        sessionStorage.setItem('token', response.access_token);
      }
      router.push('/dashboard');
    }
  } catch (err) {
    console.error('Login failed:', err);
  }
};
</script>

<style scoped>
.login-title {
  font-weight: 400;
  font-size: 1.88rem;
  text-align: start;
  color: var(--black-color);
  margin-bottom: 1.875rem;
}
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  width: 100%;
  padding: 1rem;
}

.login-form {
  padding: 2rem;
  min-width: 28.6rem;
  @media (max-width: 768px) {
    width: 100%;
  }
}

.form-actions {
  margin-top: 1.5rem;
  border-radius: 0.62rem;
  max-width: 28.75rem;
  background: #f5f5f5;
}

.btn-primary {
  width: 100%;
  color: #757d8a;
  font-weight: 400;
  border: none;
  cursor: pointer;
  padding: 0.81rem 0.94rem;
  height: 3.5rem;
}

.btn-primary:hover {
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
.remember-me {
  margin: 1rem 0;
}

.checkbox-container {
  display: flex;
  align-items: center;
}

input[type='checkbox'] {
  width: 16px;
  height: 16px;
  cursor: pointer;
}

.checkbox-label {
  margin-left: 0.5rem;
  color: #666;
  font-size: 0.875rem;
  user-select: none;
}
</style>
