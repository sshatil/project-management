<template>
  <div
    class="relative transform transition-transform hover:scale-105"
    @mouseleave="showDropdown = false"
    @mouseover="showDropdown = true"
  >
    <RouterLink :to="`/details/${_id}`">
      <div
        class="max-w-sm p-6 w-72 bg-white border border-gray-200 rounded-lg shadow dark:bg-[#10131a] dark:border-gray-700"
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
    <!-- <button
      class="absolute right-2 top-3 hover:text-red-500 transition w-6 h-6 text-gray-500"
      @click="handleProjectDelete(_id)"
    >
      <TrashIcon />
    </button> -->
    <!-- dropdown -->
    <!-- <div class="absolute right-2 top-3">
      <button
        class="inline-flex items-end text-sm font-medium hover:text-green-500"
        type="button"
        :class="showDropdown ? 'block' : 'hidden'"
        @click="handleProjectUpdate(_id)"
      >
        <PencilSquareIcon class="w-5 h-5" />
      </button>
    </div> -->
    <div class="absolute right-2 bottom-3">
      <button
        class="inline-flex items-end text-sm font-medium hover:text-red-500"
        type="button"
        :class="showDropdown ? 'block' : 'hidden'"
        @click="handleProjectDelete(_id)"
      >
        <TrashIcon class="w-5 h-5" />
      </button>
    </div>
    <!-- <div
      id="dropdownDotsHorizontal"
      class="z-10 bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600 mx-1 absolute right-0 top-10 dropdown_btn"
      :class="showDropdown ? 'block' : 'hidden'"
    >
      <ul class="text-sm text-gray-700 dark:text-gray-200">
        <li class="">
          <button
            @click="handleProjectDelete(_id)"
            class="px-2 w-full flex items-center justify-between gap-1 cursor-pointer hover:text-green-400 transition"
          >
            <span>Edit</span><PencilSquareIcon class="w-4 h-4" />
          </button>
        </li>
        <li>
          <button
            @click="handleProjectDelete(_id)"
            class="px-2 w-full flex items-center justify-between gap-1 cursor-pointer hover:text-red-500 transition"
          >
            <span>Delete</span><TrashIcon class="w-4 h-4" />
          </button>
        </li>
      </ul>
    </div> -->
  </div>
</template>

<script setup lang="ts">
import { ref, toRefs } from "vue";
import type { Project } from "../../types/project";
import { RouterLink } from "vue-router";
import { PencilSquareIcon, TrashIcon } from "@heroicons/vue/24/solid";
import axiosClient from "../utils/axios";
import store from "../store";
import { toast } from "vue3-toastify";

interface Props {
  data: Project;
}

const props = defineProps<Props>();

const { projectName, status, _id } = toRefs(props.data);

const showDropdown = ref<boolean>(false);

const handleProjectDelete = async (id: string) => {
  store.commit("projectLoadingMutation", true);
  try {
    await axiosClient.delete(`/project/${props.data._id}`);
    toast.success("Project deleted");
    store.commit("projectLoadingMutation", false);
  } catch (error) {
    console.log(error);
  }
};
</script>
