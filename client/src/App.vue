<template>
  <main
    class="flex text-black dark:text-[#93999F] dark:bg-[#0D1117] min-h-screen"
  >
    <Sidebar />
    <RouterView />
  </main>
</template>

<script setup lang="ts">
import Sidebar from "./components/Sidebar.vue";
</script>

<style scoped></style>
