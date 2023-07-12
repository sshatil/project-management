import { Project } from "../../../types/project";
import axiosClient from "../../utils/axios";

interface State {
  projects: Project[];
  singleProject: Project;
  isLoading: boolean;
}

const auth = {
  state() {
    return {
      projects: [],
      singleProject: {},
      isLoading: true,
    };
  },
  mutations: {
    getProjects(state: State, payload: any) {
      state.projects = payload;
    },
    getSingleProjects(state: State, payload: any) {
      state.singleProject = payload;
    },
    loading(state: State, payload: any) {
      state.isLoading = payload;
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
    // fetch single project
    async fetchSingleProject({ commit, state }, paramValue: string) {
      try {
        const { data } = await axiosClient.get(`/project/${paramValue}`);
        commit("getSingleProjects", data);
        state.isLoading = false;
      } catch (error: any) {
        state.isLoading = true;
        console.log(error.response?.data.message);
      }
    },
  },
};

export default auth;
