<template>
  <Layout>
    <div class="mt-14 m-4 w-full">
      <div class="flex justify-between border-b-2 border-gray-500 pb-4">
        <div class="">
          <h1 class="text-lg md:text-3xl font-bold">
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

      <!-- project details -->
      <div class="">
        <h3>{{ singleProject.status }}</h3>
      </div>
      <!-- task table -->
      <div class="overflow-x-auto">
        <table
          class="w-full text-sm text-left text-gray-500 dark:text-gray-400"
        >
          <thead class="text-xs text-gray-700 uppercase dark:text-gray-400">
            <tr class="border-b dark:border-b dark:border-gray-700">
              <th scope="col" class="px-6 py-3">Task name</th>
              <th scope="col" class="px-6 py-3">Status</th>
              <th scope="col" class="px-6 py-3">Assign</th>
              <th scope="col" class="px-6 py-3">Due</th>
              <th scope="col" class="px-6 py-3">Create</th>
            </tr>
          </thead>
          <tbody>
            <tr
              class="border-b dark:border-gray-700"
              v-for="task in singleProject.tasks"
              :key="task._id"
            >
              <td
                class="px-6 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white border-r dark:border-gray-700"
              >
                {{ task.taskName }}
              </td>
              <td class="px-6 py-3 border-r dark:border-gray-700">
                {{ task.status }}
              </td>
              <!-- <td class="px-6 py-3 border-r dark:border-gray-700">
                {{ task.assignTo.name }}
              </td>
              <td class="px-6 py-3 border-r dark:border-gray-700">
                {{ task.assignTo.dueData }}
              </td> -->
              <td class="px-6 py-3 dark:border-gray-700">
                {{ task.createdAt.slice(0, 10) }}
              </td>
            </tr>
          </tbody>
        </table>
        <div class="dark:border-gray-700 border-b cursor-pointer w-full">
          <p class="px-6 py-3"><CreateTaskModal :paramValue="paramValue" /></p>
        </div>
      </div>
    </div>
  </Layout>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
import Layout from "../utils/Layout.vue";
import { onMounted, ref } from "vue";
import axiosClient from "../utils/axios";
import { Project } from "../../types/project";
import CreateTaskModal from "../components/projectDetails/CreateTaskModal.vue";
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
