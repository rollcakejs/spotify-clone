import Vue from "vue"
import VueRouter from "vue-router"
import Login from "../views/Login.vue"
import Callback from "../views/Callback.vue";

Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    name: "Login",
    component: Login
  },
  {
    path: "/callback",
    name: "Callback",
    component: Callback
  }
]

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
})

export default router
