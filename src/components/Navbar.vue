<template>
  <nav class="navbar">
    <ul>
      <router-link to="/clientes"><i class="pi pi-user"></i> Clientes</router-link> 
      <router-link to="/addClients"><i class="pi pi-user-plus"></i> Adicionar Cliente</router-link> 
    </ul>
  </nav>
  </template>
  
  <script> 
      
  </script>
  
  <style scoped>

.navbar {
  width: 150px;
  height: calc(100vh - 60px); /* Ocupa toda a altura abaixo do cabeçalho */
  background-color: #333;
  color: white;
  margin-top: 40px;
  flex-direction: column;
  padding: 10px 0;
}

.navbar ul {
  list-style: none;
  padding: 5px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 200px;
  font-size: 1.2rem;
}

.navbar a {
  color: white;
  text-decoration: none;
  font-weight: bold;
  padding: 10px 20px;
  display: block;
  width: 200px;
}

.navbar a:hover {
  background-color: #555;
}
.pi-user{
  margin-right: 5px;
}

  </style>