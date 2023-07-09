import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate";
import user from "./modules/user.ts";
import global from "./modules/global.ts";
import auth from "./modules/auth.ts";
import project from "./modules/project.ts";

const store = createStore({
  modules: {
    user,
    global,
    auth,
    project,
  },
  plugins: [
    createPersistedState({
      storage: window.localStorage,
      key: "store",
      paths: ["global", "auth"],
    }),
  ],
});

export default store;
