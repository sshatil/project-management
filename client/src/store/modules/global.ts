interface State {
  showSidebar: boolean;
  showDrawer: boolean;
  shoModal: boolean;
}

const global = {
  state() {
    return {
      showSidebar: false,
      showDrawer: true,
      shoModal: false,
    };
  },
  mutations: {
    sidebar(state: State, payload: boolean) {
      state.showSidebar = payload;
    },
    drawer(state: State, payload: boolean) {
      state.showDrawer = payload;
    },
    modal(state: State, payload: boolean) {
      state.shoModal = payload;
    },
  },
};

export default global;
