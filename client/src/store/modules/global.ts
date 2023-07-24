interface State {
  showSidebar: boolean;
  showDrawer: boolean;
}

const global = {
  state() {
    return {
      showSidebar: false,
      showDrawer: true,
    };
  },
  mutations: {
    sidebar(state: State, payload: boolean) {
      state.showSidebar = payload;
    },
    drawer(state: State, payload: boolean) {
      state.showDrawer = payload;
    },
  },
};

export default global;
