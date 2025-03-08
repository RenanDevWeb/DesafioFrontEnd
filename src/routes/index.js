import {createRouter,createWebHashHistory} from 'vue-router'
import Login from '../components/login.vue';
import Home from '../views/home.vue';



const routes = [
  {path: "/", component: Login},
  {path: "/home", component: Home}
]



const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router;