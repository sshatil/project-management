import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("../pages/HomeView.vue"),
    },
    {
      path: "/project",
      name: "project",
      component: () => import("../pages/ProjectView.vue"),
    },
    {
      path: "/register",
      name: "register",
      component: () => import("../pages/auth/RegisterView.vue"),
    },
    {
      path: "/login",
      name: "login",
      component: () => import("../pages/auth/LoginView.vue"),
    },
    {
      path: "/details/:id",
      name: "projectDetails",
      component: () => import("../pages/projectDetails.vue"),
    },
  ],
});

export default router;
