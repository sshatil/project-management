import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate";
import user from "./modules/user.ts";
import global from "./modules/global.ts";

const store = createStore({
  modules: {
    user,
    global,
  },
  plugins: [
    createPersistedState({
      storage: window.localStorage,
      key: "store",
      paths: ["user", "global"],
    }),
  ],
});

export default store;
