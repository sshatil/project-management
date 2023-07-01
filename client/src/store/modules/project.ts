import { Project } from "../../../types/project";
import axiosClient from "../../utils/axios";

interface State {
  projects: Project[];
}

const auth = {
  state() {
    return {
      projects: [],
    };
  },
  mutations: {
    getProjects(state: State, payload: any) {
      state.projects = payload;
    },
  },
  actions: {
    async fetchProjects({ commit, state }) {
      try {
        const { data } = await axiosClient.get("/project");
        commit("getProjects", data);
      } catch (error) {
        console.log(error);
      }
    },
  },
};

export default auth;
