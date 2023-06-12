<template>
  <div class="flex">
    <Sidebar />
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import Sidebar from "../components/Sidebar.vue";
</script>
