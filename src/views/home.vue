

<template>




 




  <div class="menu">
    <AppHeader />
  </div>
  <div class="parte-principal">
    <navbar />
   
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



export default {
  components: {
    navbar,
    appFooter,
    AppHeader,
    ListClients
  }
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
  align-items: center;
  justify-content: center;
  color: #000;
}

.footer{
  display: flex;
}


</style>