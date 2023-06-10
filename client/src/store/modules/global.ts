interface State {
  showSidebar: boolean;
}

const global = {
  state() {
    return {
      showSidebar: false,
    };
  },
  mutations: {
    sidebar(state: State, payload: boolean) {
      state.showSidebar = payload;
      console.log(payload);
    },
  },
};

export default global;
