<template>
  <div class="page-wrapper">
    <div class="login-container">
      <SigninForm v-if="activeForm == 'signin'" @add-account="handleAddAccount"/>
      <LoginForm v-else-if="activeForm == 'login'"/>
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
</style>
