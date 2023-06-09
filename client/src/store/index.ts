import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate";
import user from "./modules/user.ts";

const store = createStore({
  modules: {
    user,
  },
  plugins: [
    createPersistedState({
      storage: window.localStorage,
      key: "store",
      paths: ["user"],
    }),
  ],
});

export default store;
