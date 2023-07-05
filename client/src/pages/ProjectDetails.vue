<template>
  <Layout>
    <div class="mt-14 m-4 w-full">
      <div class="flex justify-between">
        <div class="">
          <h1 class="text-lg md:text-3xl font-bold text-gray-300">
            {{ singleProject.projectName }}
          </h1>
        </div>
        <!-- right side -->
        <div class="flex -space-x-3">
          <div class="" v-for="user in singleProject.users" :key="user">
            <h1
              class="w-10 h-10 border bg-green-700 border-white rounded-full dark:border-gray-800 flex justify-center items-center text-lg uppercase text-white"
            >
              {{ user.name.slice(0, 1) }}
            </h1>
          </div>
        </div>
      </div>

      <!-- <div class="overflow-x-auto">
        <table
          class="w-full text-sm text-left text-gray-500 dark:text-gray-400"
        >
          <thead
            class="text-xs text-gray-700 uppercase dark:bg-gray-700 dark:text-gray-400"
          >
            <tr class="border-b">
              <th scope="col" class="px-6 py-3">Task name</th>
              <th scope="col" class="px-6 py-3">Status</th>
              <th scope="col" class="px-6 py-3">Assign</th>
              <th scope="col" class="px-6 py-3">Project name</th>
            </tr>
          </thead>
          <tbody>
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <td
                class="px-6 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white border-r"
              >
                Silver
              </td>
              <td class="px-6 py-3 border-r">Laptop</td>
              <td class="px-6 py-3 border-r">$2999</td>
              <td class="px-6 py-3">$2999</td>
            </tr>
          </tbody>
        </table>
      </div> -->
    </div>
  </Layout>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
import Layout from "../utils/Layout.vue";
import { onMounted, ref } from "vue";
import axiosClient from "../utils/axios";
import { Project } from "../../types/project";
const route = useRoute();
const paramValue = route.params.id;

const singleProject = ref<Project | any>({});

const fetchSingleProject = async () => {
  try {
    const { data } = await axiosClient.get(`/project/${paramValue}`);
    singleProject.value = data;
  } catch (error: any) {
    console.log(error.response?.data.message);
  }
};

onMounted(() => {
  fetchSingleProject();
});
</script>
