

<template>
  <div class="container">
   <AppHeader />
   <div class="container-body">
    <navbar />
    
  </div>
    <appFooter />
  </div>
   
 
</template>


<script>
import navbar from '../components/navbar.vue';
import appFooter from '../components/appFooter.vue'
import AppHeader from '../components/appHeader.vue';


export default {
  components: {
    navbar,
    appFooter,
    AppHeader
  }
};

</script>



<style scoped>

.container{
  display: flex;
  flex-direction: column;
}

.container-body{
    display: flex;
    flex-direction: row  ;
}



</style>