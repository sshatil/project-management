import axios from "axios";
import store from "../store/index.ts";
import router from "../routes/index.ts";

const axiosClient = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}/api/v1`,
});

axiosClient.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${store.state.user.token}`;
  return config;
});

axiosClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 401) {
      store.commit("setToken", null);
      router.push({ name: "login" });
    }
    throw error;
  }
);

export default axiosClient;
