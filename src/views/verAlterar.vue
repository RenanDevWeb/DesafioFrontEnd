

<template>

<div class="dashboard">
    <div class="sidebar">
      <navbar />
    </div>

    <div class="content">
      <div class="header">
        <AppHeader />
      </div>

      <div class="main">
        <verAlterar />
      </div>

      <div class="footer">
        <appFooter />
      </div>
    </div>
  </div>
    



  </template>
  
  
  <script>
  import navbar from '../components/navbar.vue';
  import appFooter from '../components/appFooter.vue'
  import AppHeader from '../components/appHeader.vue';
  import verAlterar from '../components/verAlterar.vue'
  
  
  export default {
    components: {
      navbar,
      appFooter,
      AppHeader,
      verAlterar
    }
  };
  
  </script>
  
  
  <style scoped>
  
  .dashboard {
  display: flex;
  height: 100vh;
  position: relative;
  flex-direction: row;
}

/* Menu Lateral */
.sidebar {
  width: 240px;
  background-color: #333;
  color: #fff;
  padding: 20px;
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  z-index: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}

.sidebar ul {
  list-style: none;
  padding: 0;
}

.sidebar ul li {
  margin: 20px 0;
  font-size: 18px;
  cursor: pointer;
}

.sidebar ul li:hover {
  background-color: #444;
  padding-left: 10px;
  transition: padding 0.3s ease;
}

/* Conteúdo Principal */
.content {
  margin-left: 240px; /* Ajuste para a largura do menu lateral */
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  padding-top: 60px; /* Espaço para o menu superior */
}

/* Cabeçalho */
.header {
  background-color: #007bff;
  padding: 20px;
  color: #fff;
  text-align: center;
  font-size: 24px;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 2;
}

/* Main - Conteúdo Central */
.main {
  flex-grow: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
}

.central-content {
  background-color: #fff;
  width: 80%;
  padding: 20px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  text-align: center;
}

.central-content h2 {
  font-size: 32px;
  margin-bottom: 10px;
}

.central-content p {
  font-size: 18px;
  color: #333;
}

/* Rodapé */
/* .footer {
  background-color: #333;
  color: #fff;
  text-align: center;
  padding: 10px;
} */

/* Responsividade */
@media (max-width: 768px) {
  .dashboard {
    flex-direction: column;
  }

  .sidebar {
    width: 100%;
    height: auto;
    flex-direction: row;
    justify-content: space-around;
    padding: 10px 0;
  }

  .sidebar ul {
    display: flex;
    justify-content: space-around;
    width: 100%;
  }

  .sidebar ul li {
    margin: 0;
    font-size: 16px;
  }

  .content {
    margin-left: 0;
    padding-top: 50px; /* Espaço para o menu superior em telas pequenas */
  }

  .central-content {
    width: 90%;
  }
}
  
  
  </style>