<template>
  <Layout>
    <div class="">
      <div class="border">Project details jdfkjdsfkjdskfj</div>
      <h1>{{ paramValue }}1</h1>
    </div>
  </Layout>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
import Layout from "../utils/Layout.vue";
import { onMounted, ref } from "vue";
import axiosClient from "../utils/axios";
const route = useRoute();
const paramValue = route.params.id;

const singleProject = ref({});

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
