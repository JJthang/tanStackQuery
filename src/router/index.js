import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import AddProduct from "../components/CRUD/AddProduct.vue";
import About from "../views/AboutView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/AddProduct",
      name: "AddProduct",
      component: AddProduct,
    },
    {
      path: "/About",
      name: "About",
      component: About,
    },
  ],
});

export default router;
