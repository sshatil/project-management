<template>
  <!-- Modal toggle -->
  <button
    class="flex items-center gap-2 font-bold hover:text-green-400"
    type="button"
    @click="handleModal"
  >
    Create Project <PlusIcon class="w-7 h-7" />
  </button>

  <!-- Main modal -->
  <div
    class="fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full"
    :class="shoModal ? 'block' : 'hidden'"
  >
    <!-- TODO: close popup by clicking anywhere -->
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
              Create New Project
            </h3>
            <!-- from  -->
            <form @submit.prevent="handleSubmit">
              <div>
                <label
                  class="block mb-2 text-sm font-medium"
                  :class="error ? 'text-red-700 dark:text-red-500' : ''"
                  >Project Name</label
                >
                <input
                  v-model="name"
                  type="text"
                  id="error"
                  class="border text-sm rounded-lg focus:ring-red-500 dark:bg-gray-700 focus:border-red-500 block w-full p-2.5"
                  placeholder="Error input"
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
                  Input field is required
                </p>
              </div>
            </form>
            <!-- end -->
          </div>
        </div>
      </div>
    </div>
    <!-- </div> -->
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { PlusIcon } from "@heroicons/vue/24/solid";

const shoModal = ref<boolean>(false);

const handleModal = () => {
  shoModal.value = !shoModal.value;
};

// form
const name = ref<string>("");
const error = ref<boolean>(false);
const handleSubmit = () => {
  if (name.value === "") {
    error.value = true;
  } else {
    console.log(name);
    error.value = false;
  }
};
</script>
