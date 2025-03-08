<template >
 
        <nav>
            <h1>Logo</h1>
            <div class="logout">
                <h2><a href="">Sair</a></h2>
            </div>
        </nav>
    
</template>
<script>
export default {
    
}
</script>


<style scoped>

nav {
  width: 100%;
  height: 60px;
  background-color: #AB0A3D; /* Cor do cabeçalho */
  color: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000; /* Mantém acima do menu */
}

nav h1 {
  margin: 0;
}

.logout h2 {
  margin: 0;
}

.logout a {
  color: white;
  text-decoration: none;
}

.logout a:hover {
  text-decoration: underline;
}
</style>