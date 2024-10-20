<template>
  <div class="login-page">
    <!-- Background Video -->
    <video autoplay loop muted class="background-video">
      <source src="../assets/clockBG.mp4" type="video/mp4" />
      Your browser does not support the video tag.
    </video>

    <!-- Logo -->
    <Logo class="logo" />

    <!-- Login Form -->
    <div class="login-container" v-if="showLogin">
      <div class="login-overlay">
        <form @submit.prevent="handleLogin" class="login-form">
          <input type="text" v-model="username" placeholder="Username" required />
          <input type="password" v-model="password" placeholder="Password" required minlength="8" />
          <button type="submit">Login</button>
        </form>
        <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
        <a @click="switchToRegister" class="create-credentials">Create Credentials</a>
      </div>
    </div>

    <!-- Register Form -->
    <RegisterForm v-if="!showLogin" @switchToLogin="switchToLogin" @registrationSuccess="handleRegistrationSuccess" />
  </div>
</template>

<script>
import Logo from './Logo.vue';
import RegisterForm from './RegisterForm.vue';
import PocketBase from 'pocketbase';

const pb = new PocketBase('http://127.0.0.1:8090'); // Change to your PocketBase server URL

export default {
  components: {
    Logo,
    RegisterForm,
  },
  data() {
    return {
      username: '',
      password: '',
      showLogin: true, // Controls whether login or register is shown
      errorMessage: '', // Error message for failed login
    };
  },
  methods: {
    async handleLogin() {
      if (this.password.length < 8) {
        this.errorMessage = 'Password must be at least 8 characters long.';
        return;
      }

      try {
        const authData = await pb.collection('users').authWithPassword(this.username, this.password);
        if (authData) {
          this.$router.push('/');
        }
      } catch (error) {
        console.error('Error logging in:', error);
        this.errorMessage = 'Invalid username or password';
      }
    },
    switchToRegister() {
      this.showLogin = false;
    },
    switchToLogin() {
      this.showLogin = true;
    },
    handleRegistrationSuccess() {
      this.showLogin = true;
    },
  },
};
</script>

<style scoped>
.create-credentials {
  color: red;
  text-decoration: underline;
  cursor: pointer;
  margin-top: 10px;
}

.error-message {
  color: red;
  font-size: 14px;
  margin-top: 10px;
}

.login-page {
  position: relative;
  width: 100%;
  height: 100vh;
}

.background-video {
  position: fixed; 
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: -1;
}

.login-content {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 2;
}

.logo {
  margin-top: 350px;
  margin-bottom: -100px;
  width: 600px;
}

.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 10px;
  border-radius: 8px;
}

.login-form input {
  font-size: 1em;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 256px;
}

.login-form button {
  background-color: red;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 4px;
  font-size: 1em;
  cursor: pointer;
}

.login-form button:hover {
  background-color: darkred;
}
</style>
