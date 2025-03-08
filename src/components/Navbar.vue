<template>
  <nav class="navbar">
    <ul>
      <li><a href="#">Home</a></li>
      <li><a href="#">Clientes</a></li> 
    </ul>
  </nav>
  </template>
  
  <script>

  </script>
  
  <style scoped>

.navbar {
  width: 190px;
  height: calc(100vh - 60px); /* Ocupa toda a altura abaixo do cabeçalho */
  background-color: #333;
  color: white;
  position: fixed;
  left: 0;
  top: 60px; /* Começa logo abaixo do cabeçalho */
  display: flex;
  flex-direction: column;
  padding: 20px 0;
}

.navbar ul {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 100%;
}

.navbar a {
  color: white;
  text-decoration: none;
  font-weight: bold;
  padding: 10px 20px;
  display: block;
}

.navbar a:hover {
  background-color: #555;
}
  </style>