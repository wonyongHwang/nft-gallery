import { createApp } from 'vue';
//Vue 상태관리 라이브러리
import { createPinia } from 'pinia';
import App from './App.vue';
import './assets/styles/tailwind.css';
import './assets/global.scss';

createApp(App)
  .use(createPinia())
  .mount('#app');