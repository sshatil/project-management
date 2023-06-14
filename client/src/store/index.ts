import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate";
import user from "./modules/user.ts";
import global from "./modules/global.ts";
import auth from "./modules/auth.ts";

const store = createStore({
  modules: {
    user,
    global,
    auth,
  },
  plugins: [
    createPersistedState({
      storage: window.localStorage,
      key: "store",
      paths: ["user", "global", "auth"],
    }),
  ],
});

export default store;
