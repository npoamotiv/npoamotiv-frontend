<template>
  <div class="page-wrapper">
    <div class="login-container">
      <SigninForm
        v-if="activeForm == 'signin'"
        @add-account="handleAddAccount"
      />
      <LoginForm
        v-else-if="activeForm == 'login'"
        @reset-account-state="resetAccountState"
      />
      <div class="login-footer" :class="{ 'login-footer-revers': activeForm == 'login' }">
        <svg
          width="11"
          height="11"
          viewBox="0 0 11 11"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <ellipse
            cx="5.41667"
            cy="5.49968"
            rx="5.41667"
            ry="5.41667"
            fill="#77A6FF"
          />
        </svg>
        <svg
          width="11"
          height="11"
          viewBox="0 0 11 11"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <ellipse
            cx="5.58329"
            cy="5.49968"
            rx="5.41667"
            ry="5.41667"
            fill="#D5D5D6"
          />
        </svg>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import LoginForm from '@/components/LoginForm.vue';
import SigninForm from '@/components/SigninForm.vue';

import { ref } from 'vue';

const activeForm = ref<'signin' | 'login'>('signin');

const handleAddAccount = () => {
  activeForm.value = 'login';
};

const resetAccountState = () => {
  activeForm.value = 'signin';
};
</script>

<style scoped>
.page-wrapper {
  background: var(--primary-color);
  padding: 55px;
  min-height: 100vh;
  height: 100%;
  display: flex;
}

.login-container {
  display: flex;
  justify-content: start;
  align-items: center;
  flex-direction: column;
  width: 100%;
  padding: 45px 50px;
  background: var(--white-color);
  border-radius: 1.56rem;
}
.login-footer {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 45px;
  gap: 10.33px;
}
.login-footer-revers {
  flex-direction: row-reverse;
}
</style>
