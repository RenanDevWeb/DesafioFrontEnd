<template>
  <div class="container-login">
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
        
        router.push({path: "/clientes"});
      
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

<style >


        .container-login {
            background: white;
            color: #000;
            padding: 20px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            border-radius: 5px;
            width: 50vw;  
            display: flex;
            justify-content: center;
            align-items: center;
            margin: 100px 500px;
        }
        .login{
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
        .login input {
            width: 100%;
            padding: 10px;
            margin: 5px 0;
            border-radius: 5px;
        }
        .login button {
            width: 100%;
            padding: 10px;
            background: blue;
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
        }
        button:hover {
            background: darkblue;
        }

      
        

</style>