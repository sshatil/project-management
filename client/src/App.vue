<template>
  <main
    class="flex justify-between text-black dark:text-white dark:bg-black min-h-screen"
  >
    <Sidebar />
    <RouterView />
  </main>
</template>

<script setup lang="ts">
import Sidebar from "./components/Sidebar.vue";
</script>

<style scoped></style>
