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

// router.beforeEach((to, from, next) => {
//   if (to.meta.requireAuth && !store.state.auth.token) {
//     next({ name: "login" });
//   } else {
//     next();
//   }
// });

router.beforeEach((to, from, next) => {
  const isLoggedIn = !!store.state.auth.token;

  if (to.name === "home" && isLoggedIn) {
    next({ name: "project" });
  } else if (to.name === "register" && isLoggedIn) {
    next({ name: "project" });
  } else if (to.name === "login" && isLoggedIn) {
    next({ name: "project" });
  } else if (to.meta.requireAuth && !isLoggedIn) {
    next({ name: "login" });
  } else {
    next();
  }
});

export default router;
