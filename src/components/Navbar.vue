<template>
  <nav class="navbar">
    <ul>
      <router-link to="/home" class="home"><i class="pi pi-home"></i> Home</router-link> 
      <router-link to="/clientes"><i class="pi pi-user"></i> Clientes</router-link> 
      
    </ul>
  </nav>
  </template>
  
  <script> 
      
  </script>
  
  <style scoped>

.navbar {
  width: 100px;
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
  width: 120px;
  font-size: 1.2rem;
}

.navbar a {
  color: white;
  text-decoration: none;
  font-weight: bold;
  padding: 10px 20px;
  display: block;
  font-size: 1.4rem;
  width: 120px;
  text-align: center;
}
.home{
  font-size: 1.5rem;
}
.navbar a:hover {
  background-color: #555;
}
.pi-user{

  margin-right: 5px;
}

  </style>