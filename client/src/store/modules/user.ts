import { User } from "../../../types/project";
import axiosClient from "../../utils/axios";

interface State {
  users: User[];
}

const user = {
  state() {
    return {
      users: [],
    };
  },
  mutations: {
    getUsers(state: State, payload: any) {
      state.users = payload;
    },
  },
  actions: {
    async getUsers({ commit, state }) {
      try {
        const { data } = await axiosClient.get("/users");
        commit("getUsers", data);
      } catch (error) {
        console.log(error);
      }
    },
  },
};

export default user;
