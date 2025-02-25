<template>
  <div class="login-header">
    <div class="back-arrow" @click="backToList()">
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M15 18L9 12L15 6"
          stroke="#181818"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
      <p class="back-arrow-text">Назад</p>
    </div>
    <img src="/sap.png" alt="sap logo." class="login-logo" />
  </div>
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
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { useAuth } from '../composables/useAuth.ts';
import FormInput from './FormInput.vue';
import { useToast } from 'vue-toastification';

interface Emits {
  (e: 'reset-account-state'): void;
}

const router = useRouter();
const { loginUser, loading, error } = useAuth();
const toast = useToast();

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
        localStorage.setItem('rememberMe', 'true');
      }
      localStorage.setItem('token', response.access_token);
      login.value = '';
      password.value = '';
      tabel.value = '';
      rememberMe.value = false;
      toast.success('Correct user data!', {
        timeout: 2000,
      });
      router.push('/login');
    }
  } catch (err) {
    console.error('Login failed:', err);
    toast.error('Incorrect user data!', {
      timeout: 2000,
    });
  }
};
const emit = defineEmits<Emits>();

const backToList = () => {
  emit('reset-account-state');
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

.login-form {
  padding: 2rem;
  min-width: 28.6rem;
  flex: 1;
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
.back-arrow {
  display: flex;
  gap: 10px;
  & svg {
    cursor: pointer;
  }
}
.back-arrow-text {
  font-weight: 400;
  font-size: 1.25rem;
  color: #181818;
  line-height: 1;
  cursor: pointer;
}
.login-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 143px;
  width: 100%;
}
</style>
