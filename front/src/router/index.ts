import { createRouter, createWebHistory } from "vue-router";
import LoginView from "../views/login/LoginView.vue";
import MenuView from "../views/menu/index.vue";
import HomeView from "../views/home/index.vue";
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      redirect: "/menu",
    },
    {
      path: "/login",
      name: "login",
      component: LoginView,
    },
    {
      path: "/menu",
      name: "menu",
      component: MenuView,
      children: [
        {
          path: "/home",
          name: "首页",
          component: HomeView,
        },
      ],
    },
  ],
});

export default router;
