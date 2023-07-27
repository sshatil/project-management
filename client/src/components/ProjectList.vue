<template>
  <div class="relative">
    <RouterLink :to="`/details/${_id}`">
      <div
        class="max-w-sm p-6 w-72 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
      >
        <div class="">
          <h5
            class="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white truncate"
          >
            {{ projectName }}
          </h5>
        </div>
        <h6 class="mb-3 font-normal text-gray-500 dark:text-gray-400">
          Status: <span class="">{{ status }}</span>
        </h6>
      </div>
    </RouterLink>
    <button
      class="absolute right-2 top-3 hover:text-red-500 transition w-6 h-6 text-gray-500"
      @click="handleProjectDelete(_id)"
    >
      <TrashIcon />
    </button>
  </div>
</template>

<script setup lang="ts">
import { toRefs } from "vue";
import type { Project } from "../../types/project";
import { RouterLink } from "vue-router";
import { TrashIcon } from "@heroicons/vue/24/solid";
import axiosClient from "../utils/axios";
import store from "../store";

interface Props {
  data: Project;
}

const props = defineProps<Props>();

const { projectName, status, _id } = toRefs(props.data);

const handleProjectDelete = async (id: string) => {
  console.log(id);
  store.commit("projectLoadingMutation", true);
  try {
    await axiosClient.delete(`/project/${props.data._id}`);
    store.commit("projectLoadingMutation", false);
  } catch (error) {
    console.log(error);
  }
};
</script>
