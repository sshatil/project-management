import { createRouter, createWebHistory } from "vue-router";
import store from "../store";

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
      meta: {
        requireAuth: true,
      },
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
      component: () => import("../pages/ProjectDetails.vue"),
      meta: {
        requireAuth: true,
      },
    },
  ],
});

router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth && !store.state.auth.token) {
    next({ name: "login" });
  } else {
    next();
  }
});

export default router;
