import { createRouter, createWebHistory } from 'vue-router';
import Login from './components/Login.vue';
import Home from './components/Home.vue';
import RegisterForm from './components/RegisterForm.vue'; // Import RegisterForm

const routes = [
  { path: '/login', component: Login },
  { path: '/', component: Home, meta: { requiresAuth: true } },
  { path: '/register', component: RegisterForm } // Add route for RegisterForm
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !isUserAuthenticated()) {
    next('/login');
  } else {
    next();
  }
});

function isUserAuthenticated() {
  // Implement your authentication logic here
  return false; // Placeholder
}

export default router;