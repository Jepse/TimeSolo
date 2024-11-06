import { createRouter, createWebHistory } from 'vue-router';
import Login from './components/Login.vue';
import Home from './components/Home.vue';
import RegisterForm from './components/RegisterForm.vue';
import Account from './components/pages/Account.vue';
import Achievements from './components/pages/Achievements.vue';
import Inventory from './components/pages/Inventory.vue';
import Quests from './components/pages/Quests.vue';
import Socials from './components/pages/Socials.vue';
import Skills from './components/pages/Skills.vue';
import PocketBase from 'pocketbase';

const pb = new PocketBase('http://127.0.0.1:8090');

const routes = [
  { path: '/login', name: 'Login', component: Login },
  { path: '/', name: 'Home', component: Home, meta: { requiresAuth: true } },
  { path: '/register', name: 'Register', component: RegisterForm },
  { path: '/account', name: 'Account', component: Account },
  { path: '/achievements', name: 'Achievements', component: Achievements },
  { path: '/inventory', name: 'Inventory', component: Inventory },
  { path: '/quests', name: 'Quests', component: Quests },
  { path: '/socials', name: 'Socials', component: Socials },
  { path: '/skills', name: 'Skills', component: Skills }
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
  return pb.authStore.isValid; // Check if the user is authenticated
}

export default router;