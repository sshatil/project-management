<template>
  <div
    class="max-w-sm w-72 p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
  >
    <div class="flex justify-between items-center">
      <h5
        class="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white"
      >
        {{ projectName }}
      </h5>
      <h6>{{ status }}</h6>
    </div>
    <p class="mb-3 font-normal text-gray-500 dark:text-gray-400">
      {{ startingDate }}
    </p>
    <a href="#" class="inline-flex items-center text-blue-600 hover:underline">
      See our guideline
    </a>
  </div>
</template>

<script setup lang="ts">
import { toRefs } from "vue";
import type { Project } from "../../types/project";

interface Props {
  data: Project;
}

const props = defineProps<Props>();

const { projectName, status, startingDate } = toRefs(props.data);
console.log(props.data);
</script>
