<template>
  <div class="login">
    <h1>Login</h1>
    <form @submit.prevent="handleLogin">
      <div>
        <label for="username">Username:</label>
        <input v-model="username" type="text" id="username" required />
      </div>
      <div>
        <label for="password">Password:</label>
        <input v-model="password" type="password" id="password" required />
      </div>
      <button type="submit">Login</button>
      <p v-if="error" style="color: red;">{{ error }}</p>
    </form>
  </div>
</template>

<script>
import { ref } from 'vue';
import users from '../assets/users.json';
import router from '../routes';


export default {
  setup() {
    const username = ref('');
    const password = ref('');
    const error = ref('');
 

    const handleLogin = () => {
      const user = users.find(
        (u) => u.username === username.value && u.password === password.value
      );

      if (user) {
        
        router.push({path: "/home"});
      
      } else {
        error.value = 'Invalid username or password';
      }
    };

    return {
      username,
      password,
      error,
      handleLogin
    };
  }
};
</script>

<style scoped>
/* Estilos do componente */
</style>