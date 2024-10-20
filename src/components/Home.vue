<template>
  <div>
    <h1>Home Page</h1>
    <p>Welcome to the home page!</p>
    <button @click="handleLogout">Logout</button>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import PocketBase from 'pocketbase';

const pb = new PocketBase('http://127.0.0.1:8090'); // Update with your PocketBase server URL
const router = useRouter();

function handleLogout() {
  pb.authStore.clear();  // Clear the authentication session
  router.push('/login'); // Redirect to login page
}
</script>

<style scoped>
/* Add your styles here */
button {
  padding: 10px 20px;
  background-color: red;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: darkred;
}
</style>
