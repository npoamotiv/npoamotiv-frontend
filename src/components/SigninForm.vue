<template>
  <div class="signin-form">
    <img src="/sap-dark.png" alt="sap logo." class="signin-logo" />
    <p class="signin-subtitle">Вход в ERP-систему</p>
    <h1 class="signin-title">C возвращением!</h1>
    <div class="signin-account" @click="handleAddAccount">
      <span class="account-figure"
        ><svg
          width="32"
          height="32"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M16 7V26"
            stroke="#677074"
            stroke-width="2.64445"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M7 16H26"
            stroke="#677074"
            stroke-width="2.64445"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </span>
      <p class="account-text">Добавить аккаунт</p>
    </div>
    <ul class="signin-accounts">
      <li v-for="(account, index) in accounts" :key="account.id">
        <form @submit.prevent="login(account)" class="signin-account">
          <div class="account-header" @click="toggleAccount(index)">
            <img
              :src="account.avatar || '/avatar.png'"
              alt="avatar"
              class="account-img"
            />
            <div class="account-content">
              <p class="account-content-title">{{ account.name }}</p>
              <p class="account-content-subtitle">{{ account.code }}</p>
            </div>
          </div>

          <div v-if="selectedAccountIndex === index" class="account-actions">
            <div class="account-label">
              <p>Пароль</p>
              <svg
                @click="togglePasswordVisibility"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  v-if="!isPasswordVisible"
                  d="M17.94 17.94C16.2306 19.243 14.1491 19.9649 12 20C5 20 1 12 1 12C2.24389 9.68192 3.96914 7.65663 6.06 6.06003M9.9 4.24002C10.5883 4.0789 11.2931 3.99836 12 4.00003C19 4.00003 23 12 23 12C22.393 13.1356 21.6691 14.2048 20.84 15.19M14.12 14.12C13.8454 14.4148 13.5141 14.6512 13.1462 14.8151C12.7782 14.9791 12.3809 15.0673 11.9781 15.0744C11.5753 15.0815 11.1752 15.0074 10.8016 14.8565C10.4281 14.7056 10.0887 14.4811 9.80385 14.1962C9.51897 13.9113 9.29439 13.572 9.14351 13.1984C8.99262 12.8249 8.91853 12.4247 8.92563 12.0219C8.93274 11.6191 9.02091 11.2219 9.18488 10.8539C9.34884 10.4859 9.58525 10.1547 9.88 9.88003"
                  stroke="#757D8A"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  v-if="!isPasswordVisible"
                  d="M3 2.5L21.5 21.5"
                  stroke="#757D8A"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  v-if="isPasswordVisible"
                  d="M1 12C1 12 5 4 12 4C19 4 23 12 23 12C23 12 19 20 12 20C5 20 1 12 1 12Z"
                  stroke="#757D8A"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  v-if="isPasswordVisible"
                  d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z"
                  stroke="#757D8A"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
            <input
              :type="isPasswordVisible ? 'text' : 'password'"
              v-model="password"
              placeholder="Введите пароль"
            />
            <button type="submit" class="account-btn" :disabled="!password">
              Войти
            </button>
          </div>
        </form>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
interface Account {
  id: number;
  name: string;
  code: string;
  avatar?: string;
}
interface LoginResponse {
  success: boolean;
  token?: string;
  error?: string;
}

// Пример списка аккаунтов
const accounts = ref<Account[]>([
  { id: 1, name: 'Иванова И.И.', code: '001', avatar: '/avatar.png' },
  { id: 2, name: 'Петров П.П.', code: '002', avatar: '/avatar.png' },
  { id: 3, name: 'Сидорова С.С.', code: '003', avatar: '/avatar.png' },
]);

// State для управления отображением
const selectedAccountIndex = ref<number | null>(null); // Индекс выбранного аккаунта
const isPasswordVisible = ref<boolean>(false); // Видимость пароля
const password = ref<string>(''); // Введенный пароль

// Функция для переключения видимого аккаунта
const toggleAccount = (index: number): void => {
  if (selectedAccountIndex.value === index) {
    // Если уже открыт этот аккаунт, закрываем его
    selectedAccountIndex.value = null;
  } else {
    // Иначе открываем выбранный аккаунт и сбрасываем пароль
    selectedAccountIndex.value = index;
    password.value = '';
  }
};

// Переключение видимости пароля
const togglePasswordVisibility = (): void => {
  isPasswordVisible.value = !isPasswordVisible.value;
};

// Функция авторизации
const login = async (account: Account): Promise<void> => {
  if (!password.value) return;

  try {
    // Здесь будет логика авторизации с сервером
    // Пример имитации запроса:
    console.log(
      `Выполняется вход для пользователя ${account.name} с паролем ${password.value}`
    );

    // Имитация запроса на сервер
    // const response: LoginResponse = await apiService.login(account.code, password.value);

    // Просто для примера, без реального запроса:
    const mockResponse: LoginResponse = {
      success: true,
      token: 'example-auth-token',
    };

    if (mockResponse.success) {
      // Действия после успешной авторизации
      console.log('Авторизация успешна');

      // После успешной авторизации сбрасываем состояние
      password.value = '';
      selectedAccountIndex.value = null;

      // Здесь можно сохранить токен, перенаправить пользователя и т.д.
    } else {
      // Обработка ошибки авторизации
      console.error('Ошибка авторизации:', mockResponse.error);
    }
  } catch (error) {
    console.error('Произошла ошибка при авторизации:', error);
  }
};

interface Emits {
  (e: 'add-account'): void;
}

const emit = defineEmits<Emits>();

const handleAddAccount = () => {
  emit('add-account');
};
</script>

<style scoped>
.signin-form {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: linear-gradient(
    224deg,
    #a1c2ff 2.04%,
    #75a3fb 49.38%,
    #4781ee 100%
  );
  height: 100%;
  border-radius: 1.56rem;
  width: 45.31rem;
  padding: 2.5rem;
}
.signin-logo {
  margin-bottom: 23px;
}
.signin-subtitle {
  margin-bottom: 25px;
  font-weight: 700;
  font-size: 1.5rem;
  text-align: center;
  color: #fff;
}
.signin-title {
  font-weight: 600;
  font-size: 2.5rem;
  color: #fff;
  margin-bottom: 2.5rem;
}
.signin-accounts {
  display: flex;
  flex-direction: column;
  gap: 20px;
  max-width: 29.31rem;
  width: 100%;
  & .signin-account {
    margin-bottom: 0;
    flex-wrap: wrap;
  }
  & .account-content {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }
  & .account-content-title {
    font-weight: 400;
    font-size: 1.12rem;
    color: #111;
  }
  & .account-content-subtitle {
    font-weight: 400;
    font-size: 1rem;
    color: #757d8a;
  }
}
.signin-account {
  border-radius: 1.25rem;
  padding: 1rem;
  max-width: 29.31rem;
  min-height: 5.62rem;
  width: 100%;
  display: flex;
  gap: 15px;
  cursor: pointer;
  align-items: center;
  backdrop-filter: blur(30px);
  background: rgba(255, 255, 255, 0.5);
  margin-bottom: 20px;
}
.account-figure {
  width: 3.75rem;
  height: 3.75rem;
  border-radius: 100%;
  background: #f5f5f5;
  display: flex;
  align-items: center;
  justify-content: center;
}
.account-text {
  font-weight: 400;
  font-size: 1rem;
  color: #677074;
}
.account-actions {
  display: flex;
  flex-direction: column;
  border-top: 1px solid #77a6ff;
  width: 100%;
}
.account-header {
  display: flex;
  gap: 15px;
  align-items: center;
  width: 100%;
}
.account-label {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1px;
  font-weight: 400;
  font-size: 1rem;
  color: #757d8a;
  margin-top: 1rem;
}
.account-btn {
  border-radius: 0.62rem;
  padding: 0.81rem 0.94rem;
  height: 3.5rem;
  font-weight: 400;
  font-size: 1.25rem;
  color: var(--white-color);
  background: var(--blue-color);
  margin-top: 15px;
}
</style>
