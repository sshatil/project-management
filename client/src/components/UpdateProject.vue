<template>
  <div
    class="fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full"
    :class="store.state.global.shoModal ? 'block' : 'hidden'"
  >
    <div
      class="fixed top-0 left-0 right-0 w-screen h-screen bg-gray-400 bg-opacity-40"
      @click="handleModal"
    ></div>
    <!-- end -->
    <div class="flex justify-center items-center w-full h-full">
      <div class="relative w-full max-w-md max-h-full">
        <!-- Modal content -->
        <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <button
            type="button"
            class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
            data-modal-hide="authentication-modal"
            @click="handleModal"
          >
            <svg
              aria-hidden="true"
              class="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clip-rule="evenodd"
              ></path>
            </svg>
            <span class="sr-only">Close modal</span>
          </button>
          <div class="px-6 py-6 lg:px-8">
            <h3 class="mb-4 text-xl font-medium text-gray-900 dark:text-white">
              Update Project
            </h3>
            <!-- from  -->
            <form @submit.prevent="handleSubmit" class="space-y-3">
              <div>
                <label
                  class="block mb-2 text-sm font-medium"
                  :class="error ? 'text-red-700 dark:text-red-500' : ''"
                  >Project Name</label
                >
                <input
                  v-model="fromData.name"
                  type="text"
                  id="error"
                  class="border text-sm rounded-lg focus:ring-red-500 dark:bg-gray-700 focus:border-red-500 block w-full p-2.5"
                  placeholder="Project Name"
                  :class="
                    error
                      ? 'border-red-500 bg-red-50 text-red-900 dark:text-red-500 dark:border-red-500 placeholder-red-700 dark:placeholder-red-500'
                      : 'border-gray-500'
                  "
                />
                <p
                  class="mt-2 text-sm text-red-600 dark:text-red-500"
                  v-if="error"
                >
                  Project name is required
                </p>
              </div>
              <div>
                <label class="block mb-2 text-sm font-medium"
                  >Starting Date</label
                >
                <input
                  v-model="fromData.startingDate"
                  type="date"
                  id="error"
                  class="border border-gray-500 text-sm rounded-lg focus:ring-red-500 dark:bg-gray-700 focus:border-red-500 block w-full p-2.5"
                  placeholder="Project Name"
                />
              </div>
              <div>
                <label class="block mb-2 text-sm font-medium"
                  >Finishing Date</label
                >
                <input
                  v-model="fromData.finishingDate"
                  type="date"
                  id="error"
                  class="border border-gray-500 text-sm rounded-lg focus:ring-red-500 dark:bg-gray-700 focus:border-red-500 block w-full p-2.5"
                  placeholder="Project Name"
                />
              </div>
              <div class="">
                <label class="block mb-2 text-sm font-medium">Status</label>
                <select
                  id="countries"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  v-model="fromData.status"
                >
                  <option value="Not Started" selected>Not Started</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Done">Done</option>
                </select>
              </div>
              <button
                class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                type="submit"
              >
                Update Project
              </button>
            </form>
            <!-- end -->
          </div>
        </div>
      </div>
    </div>
    <!-- </div> -->
    {{ store.state.project.singleProject.projectName }}
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, watch } from "vue";
import axiosClient from "../utils/axios";
import store from "../store";
import { Project } from "../../types/project";
import { toast } from "vue3-toastify";

interface Props {
  data: Project;
  paramValue: string;
}

const props = defineProps<Props>();

const handleModal = () => {
  // shoModal.value = !shoModal.value;
  store.commit("modal", !store.state.global.shoModal);
};

interface FormType {
  name: string;
  startingDate: string;
  finishingDate: string;
  status: string;
}

// form
const fromData = reactive<FormType>({
  name: "",
  startingDate: "",
  finishingDate: "",
  status: "",
});

watch(
  () => props.data,
  (updateData) => {
    if (updateData) {
      fromData.name = updateData.projectName || "";
      fromData.startingDate = updateData.startingDate || "";
      fromData.finishingDate = updateData.finishingDate || "";
      fromData.status = updateData.status || "";
    }
  }
);

const error = ref<boolean>(false);

const handleSubmit = async () => {
  if (fromData.name === "") {
    error.value = true;
  } else {
    store.commit("loading", true);
    try {
      await axiosClient.put(`/project/${props.paramValue}`, {
        projectName: fromData.name,
        startingDate: fromData.startingDate,
        finishingDate: fromData.finishingDate,
        status: fromData.status,
      });
      fromData.name = "";
      fromData.startingDate = "";
      fromData.finishingDate = "";
      fromData.status = "";
      store.commit("loading", false);
      toast.success("Project updated successfully");
      store.commit("modal", !store.state.global.shoModal);
    } catch (error: any) {
      console.log(error.response?.data.message);
    }
  }
};
</script>
