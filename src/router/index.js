import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import AddProduct from "../components/CRUD/AddProduct.vue";
import About from "../views/AboutView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/About",
      name: "home",
      component: HomeView,
    },
    {
      path: "/",
      name: "About",
      component: About,
    },
  ],
});

export default router;
