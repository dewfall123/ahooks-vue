import { createApp } from 'vue';
import App from '@/App';
import '@/assets/css';
import { router } from '@/plugins/router';

createApp(App)
  .use(router)
  .mount('#app');
