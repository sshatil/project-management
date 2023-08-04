<template>
  <div class="">
    <Navbar />
    <div class="flex flex-col justify-center items-center w-full h-screen">
      <div
        class="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-transparent dark:border-gray-800"
      >
        <form class="space-y-6" @submit.prevent="handleRegister">
          <h5 class="text-xl font-medium text-gray-900 dark:text-white">
            Sign in
          </h5>
          <div>
            <label
              class="block mb-2 text-sm font-medium"
              :class="error ? 'text-red-700 dark:text-red-500' : ''"
              >Your name</label
            >
            <input
              v-model="fromData.name"
              type="text"
              class="border text-sm rounded-lg focus:ring-red-500 dark:bg-gray-700 focus:border-red-500 block w-full p-2.5"
              placeholder="Enter your name"
              :class="
                error ? 'border-red-500 dark:border-red-500' : 'border-gray-500'
              "
            />
            <p class="mt-2 text-sm text-red-600 dark:text-red-500" v-if="error">
              Input field is required
            </p>
          </div>
          <div>
            <label
              class="block mb-2 text-sm font-medium"
              :class="error ? 'text-red-700 dark:text-red-500' : ''"
              >Your email</label
            >
            <input
              v-model="fromData.email"
              type="email"
              name="email"
              class="border text-sm rounded-lg focus:ring-red-500 dark:bg-gray-700 focus:border-red-500 block w-full p-2.5"
              placeholder="example@gmail.com"
              :class="
                error ? 'border-red-500 dark:border-red-500' : 'border-gray-500'
              "
            />
            <p class="mt-2 text-sm text-red-600 dark:text-red-500" v-if="error">
              Input field is required
            </p>
          </div>
          <div>
            <label
              class="block mb-2 text-sm font-medium"
              :class="error ? 'text-red-700 dark:text-red-500' : ''"
              >Your password</label
            >
            <input
              v-model="fromData.password"
              type="password"
              class="border text-sm rounded-lg focus:ring-red-500 dark:bg-gray-700 focus:border-red-500 block w-full p-2.5"
              placeholder="••••••••"
              :class="
                error ? 'border-red-500 dark:border-red-500' : 'border-gray-500'
              "
            />
            <p class="mt-2 text-sm text-red-600 dark:text-red-500" v-if="error">
              Input field is required
            </p>
          </div>
          <!-- <div class="flex items-start">
          <div class="flex items-start">
            <div class="flex items-center h-5">
              <input
                id="remember"
                type="checkbox"
                value=""
                class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
                required
              />
            </div>
            <label
              for="remember"
              class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >Remember me</label
            >
          </div>
          <a
            href="#"
            class="ml-auto text-sm text-blue-700 hover:underline dark:text-blue-500"
            >Lost Password?</a
          >
        </div> -->
          <button
            type="submit"
            class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Login to your account
          </button>
          <div class="text-sm font-medium text-gray-500 dark:text-gray-300">
            Already have an account?
            <RouterLink
              to="login"
              class="text-blue-700 hover:underline dark:text-blue-500"
              >Login</RouterLink
            >
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Navbar from "../../components/Navbar.vue";

import { reactive, ref } from "vue";
import axiosClient from "../../utils/axios";
// import { AxiosError } from "axios";
import store from "../../store/index";
import { useRouter } from "vue-router";
import { toast } from "vue3-toastify";

const fromData = reactive({
  name: "",
  email: "",
  password: "",
});

const router = useRouter();

const error = ref<boolean>(false);

const handleRegister = async () => {
  console.log("register");
  try {
    const { data } = await axiosClient.post("/users/register", fromData);
    store.commit("SET_TOKEN", data.token);
    if (data.token) {
      router.push("/project");
    }
  } catch (error: any) {
    toast(error.response?.data.message);
  }
};
</script>

<style scoped></style>
