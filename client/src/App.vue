<template>
  <main class="text-black dark:text-[#93999F] dark:bg-[#0D1117] min-h-screen">
    <!-- <Sidebar /> -->
    <RouterView />
  </main>
</template>

<script setup lang="ts">
import { useDark, useToggle } from "@vueuse/core";

const isDark = useDark();
const toggleDark = useToggle(isDark);
</script>

<style scoped></style>
