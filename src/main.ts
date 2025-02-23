import { createApp } from 'vue'
import './style.css'
import './assets/styles/reset.css'
import App from './App.vue'
import router from './router';
import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'

createApp(App).use(router).use(Toast).mount('#app')
