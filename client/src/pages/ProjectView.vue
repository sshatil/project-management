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
      <!-- draggable -->
      <div
        class=""
        v-for="data in store.state.project.projects"
        :key="data._id"
      >
        <p>{{ data.projectName }}</p>
      </div>
    </div>
  </Layout>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import Layout from "../utils/Layout.vue";

import store from "../store/index";

// fetch projects
const fetchProjects = async () => {
  await store.dispatch("fetchProjects");
};

onMounted(() => {
  fetchProjects();
});

console.log(store.state.project.projects.length);
</script>

<style scoped></style>
