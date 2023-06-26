import { createApp } from 'vue';
import routes from '~pages';
import { createRouter, createWebHistory } from 'vue-router';
import { createPinia } from 'pinia';
import App from './App.vue';

const router = createRouter({ routes, history: createWebHistory() });
const pinia = createPinia();
const app = createApp(App);

app.use(pinia).use(router).mount('#app');
