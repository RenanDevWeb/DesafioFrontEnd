import {createRouter,createWebHashHistory} from 'vue-router'
import Login from '../components/login.vue';
import Home from '../views/home.vue';
import listarClientes from '../views/listarClientes.vue';
import addClients from '../views/addCliente.vue';
import veralterar from '../views/verAlterar.vue'


const routes = [
  {path: "/", component: Login},
  {path: "/home", component: Home},
  {path: "/clientes", component: listarClientes},
  {path: "/addClients", component: addClients},
  {path: "/edit/:clienteId",name:"edit-client", component: veralterar},
]



const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router;