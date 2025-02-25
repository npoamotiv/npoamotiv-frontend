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
    <ul>
      <li>
        <img src="" alt="" />
        <div>
          <p>Иванова И.И.</p>
          <p>001</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
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
.signin-account {
  border-radius: 1.25rem;
  padding: 1rem;
  max-width: 29.31rem;
  height: 5.62rem;
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
</style>
