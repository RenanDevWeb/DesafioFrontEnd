

<template>
    <div class="menu">
      <AppHeader />
    </div>
    <div class="parte-principal">
      <navbar />
      <ListClients />
    </div>
    <div class="footer">
      <appFooter />
    </div>
  
  </template>
  
  
  <script>
  import navbar from '../components/navbar.vue';
  import appFooter from '../components/appFooter.vue'
  import AppHeader from '../components/appHeader.vue';
  import ListClients from '../components/Listclients.vue'
  import {getClients} from '../services/api.js'
  import {ref,onMounted} from 'vue'
  
  const clients = ref([])
  const erro = ref(null)




  
  export default {
    components: {
      navbar,
      appFooter,
      AppHeader,
      ListClients
    },
   

  };
  
  </script>
  
  
  
  <style scoped>
  
  .menu{
    display: flex;
  justify-content: space-between;
  color: #000;
  }
  .parte-principal{
    display: flex;
  flex-direction: column;
  justify-content: flex-start;  /* Ajuste para que a tabela não fique completamente centralizada */
  align-items: center;
  height: 100vh;
  color: #FFF;
  padding: 20px;
  }
  
  .footer{
    display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  color: #000;
  }
  
  
  </style>