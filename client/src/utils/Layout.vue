<template>
  <div class="flex w-screen">
    <Sidebar />
    <div class="h-screen overflow-x-scroll w-full">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import Sidebar from "../components/Sidebar.vue";
</script>
