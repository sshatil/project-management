interface State {
  token: string;
}

const auth = {
  state() {
    return {
      token: "" || localStorage.getItem("token"),
    };
  },
  mutations: {
    SET_TOKEN(state: State, payload: string) {
      state.token = payload;
      localStorage.setItem("token", payload);
    },
  },
};

export default auth;
