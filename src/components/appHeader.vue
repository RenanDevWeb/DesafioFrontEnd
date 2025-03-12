<template >
 
        <nav>
            <img src="../img/fcc-1.jpg" alt="">
            <div class="logout">
                <h2><a href=""> <i class="pi pi-sign-out"></i>Sair</a></h2>
            </div>
        </nav>
    
</template>
<script>
export default {
    
}
</script>


<style scoped>
body{
  background-color: #fff;
}
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

nav img{
  width: 50px;
  height: 50px;
}

.logout h2 {
  margin: 0;
  font-size: 1.8rem;
}

.logout a {
  color: white;
  text-decoration: none;
}

.logout a:hover {
  text-decoration: none;
}
.pi-sign-out{
  margin-right: 5px;
}
</style>