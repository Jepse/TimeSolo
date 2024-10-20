<template>
  <div class="register-form">
    <form @submit.prevent="handleRegister" class="form-container">
      <input type="text" v-model="username" placeholder="Username" required />
      <input type="password" v-model="password" placeholder="Password" required minlength="8" />
      <input type="password" v-model="passwordConfirm" placeholder="Confirm Password" required minlength="8" />
      <button type="submit">Save Credentials</button>
    </form>
    <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
  </div>
</template>

<script>
import PocketBase from 'pocketbase';

const pb = new PocketBase('http://127.0.0.1:8090'); // Change to your PocketBase server URL

export default {
  data() {
    return {
      username: '',
      password: '',
      passwordConfirm: '',
      errorMessage: '', // Error message for registration issues
    };
  },
  methods: {
    async handleRegister() {
      // Reset error message
      this.errorMessage = '';

      // Validate password length
      if (this.password.length < 8) {
        this.errorMessage = 'Password must be at least 8 characters long!';
        return;
      }

      // Validate password match
      if (this.password !== this.passwordConfirm) {
        this.errorMessage = 'Passwords do not match!';
        return;
      }

      try {
        const data = {
          username: this.username,
          password: this.password,
          passwordConfirm: this.passwordConfirm,
        };

        // Create user in PocketBase
        await pb.collection('users').create(data);
        this.$emit('registrationSuccess'); // Emit success event
      } catch (error) {
        console.error('Error creating account:', error);
        // Check if the error is due to an existing username
        if (error.isPocketBase && error.data && error.data.username) {
          this.errorMessage = 'Username already exists';
        } else {
          this.errorMessage = 'Invalid Username or Password';
        }
      }
    },
  },
};
</script>

<style scoped>
.register-form {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  border-radius: 8px;
}

.form-container {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.error-message {
  color: red;
  font-size: 14px;
  margin-top: 10px;
}

.register-form input {
  font-size: 1em;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 256px;
}

.register-form button {
  background-color: red;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 4px;
  font-size: 1em;
  cursor: pointer;
}

.register-form button:hover {
  background-color: darkred;
}
</style>
