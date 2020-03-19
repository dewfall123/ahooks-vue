import { createRouter, createWebHashHistory } from 'vue-router';
import { routes } from './nav'

const routerHash = createWebHashHistory();
const useToggle = () => import('@/views/content/hooks/state/useToggle');

export const router = createRouter({
  history: routerHash,
  routes: [
    { path: '/', redirect: '/state/useToggle' },
    ...routes,
  ],
});
