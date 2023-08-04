<template>
  <main class="text-black dark:text-[#93999F] dark:bg-[#0D1117] min-h-screen">
    <Sidebar />
    <RouterView />
  </main>
</template>

<script setup lang="ts">
import { useDark, useToggle } from "@vueuse/core";
// import store from "./store";
// import { onMounted } from "vue";

const isDark = useDark();
useToggle(isDark);

// const fetchProjects = async () => {
//   await store.dispatch("fetchProjects");
// };

// onMounted(() => {
//   fetchProjects();
// });
</script>

<style scoped></style>
