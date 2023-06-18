<template>
  <Layout>
    <div class="w-full p-6 mt-7">
      <h1 class="text-2xl font-bold">Your Projects</h1>
      <!-- header -->
      <div class="mt-7 flex justify-between border-b-2 border-gray-400 py-2">
        <div class="">
          <h1>filter</h1>
        </div>
        <h1>Create new Project</h1>
      </div>
    </div>
  </Layout>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import Layout from "../utils/Layout.vue";
import axiosClient from "../utils/axios";

// fetch projects
const fetchProjects = async () => {
  try {
    const { data } = axiosClient.get("/project");
    console.log(data);
  } catch (error) {
    console.log(error);
  }
};

onMounted(() => {
  fetchProjects();
});
</script>

<style scoped></style>
