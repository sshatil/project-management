import { Project } from "../../../types/project";

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
    getProjects(state: State, payload: Project[]) {},
  },
};

export default auth;
