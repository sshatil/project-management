<template>
  <div class="">
    <Navbar />
    <div class="flex flex-col justify-center items-center w-full h-screen">
      <div
        class="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-transparent dark:border-gray-800"
      >
        <form class="space-y-6" @submit.prevent="handleRegister">
          <h5 class="text-xl font-medium text-gray-900 dark:text-white">
            Login
          </h5>
          <div>
            <label
              for="email"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >Your email</label
            >
            <input
              type="email"
              name="email"
              id="email"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              placeholder="name@company.com"
              v-model="fromData.email"
            />
          </div>
          <div>
            <label
              for="password"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >Your password</label
            >
            <input
              type="password"
              name="password"
              id="password"
              placeholder="••••••••"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              v-model="fromData.password"
            />
          </div>
          <button
            type="submit"
            class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Login to your account
          </button>
          <div class="text-sm font-medium text-gray-500 dark:text-gray-300">
            Don't have an account?
            <RouterLink
              to="/register"
              class="text-blue-700 hover:underline dark:text-blue-500"
            >
              Register
            </RouterLink>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Navbar from "../../components/Navbar.vue";

import { reactive } from "vue";
import axiosClient from "../../utils/axios";
// import { AxiosError } from "axios";
import store from "../../store/index";
import { RouterLink, useRouter } from "vue-router";

const fromData = reactive({
  email: "",
  password: "",
});

const router = useRouter();
const handleRegister = async () => {
  console.log("register");
  try {
    const { data } = await axiosClient.post("/users/login", fromData);
    store.commit("SET_TOKEN", data.token);
    if (data.token) {
      router.push("/project");
    }
  } catch (error: any) {
    console.log(error.response?.data.message);
  }
};
</script>

<style scoped></style>
