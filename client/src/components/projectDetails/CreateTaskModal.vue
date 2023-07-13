<template>
  <!-- Modal toggle -->
  <button
    class="flex items-center gap-2 font-bold hover:text-green-400 transition"
    type="button"
    @click="handleModal"
  >
    New Task <PlusIcon class="w-7 h-7" />
  </button>

  <!-- Main modal -->
  <div
    class="fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full"
    :class="shoModal ? 'block' : 'hidden'"
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
              Create New Task
            </h3>
            <!-- from  -->
            <form @submit.prevent="handleSubmit" class="space-y-3">
              <div>
                <label
                  class="block mb-2 text-sm font-medium"
                  :class="error ? 'text-red-700 dark:text-red-500' : ''"
                  >Task Name</label
                >
                <input
                  v-model="fromData.taskName"
                  type="text"
                  id="error"
                  class="border text-sm rounded-lg focus:ring-red-500 dark:bg-gray-700 focus:border-red-500 block w-full p-2.5"
                  placeholder="Task Name"
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
                  Task name is required
                </p>
              </div>
              <label
                for="countries"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >Select an option</label
              >
              <select
                id="countries"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                v-model="fromData.status"
              >
                <option value="Not Started" selected>Not Started</option>
                <option value="In Progress">In Progress</option>
                <option value="Done">Done</option>
              </select>
              <div>
                <label class="block mb-2 text-sm font-medium">Due Date</label>
                <input
                  v-model="fromData.dueDate"
                  type="date"
                  id="error"
                  class="border border-gray-500 text-sm rounded-lg focus:ring-red-500 dark:bg-gray-700 focus:border-red-500 block w-full p-2.5"
                />
              </div>
              <!-- select user -->
              <div>
                <label class="block mb-2 text-sm font-medium">Assign To</label>
                <input
                  v-model="fromData.assignTo"
                  type="search"
                  id="error"
                  autocomplete="off"
                  @input="handleInput"
                  class="border border-gray-500 text-sm rounded-lg focus:ring-red-500 dark:bg-gray-700 focus:border-red-500 block w-full p-2.5"
                />
              </div>
              <ul v-if="showResults">
                <li
                  v-for="result in searchResults"
                  :key="result.id"
                  @click="selectResult(result)"
                >
                  {{ result.name }}
                </li>
              </ul>
              <button
                class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                type="submit"
              >
                Create New Project
              </button>
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
import { ref, reactive, computed } from "vue";
import { PlusIcon } from "@heroicons/vue/24/solid";
import axiosClient from "../../utils/axios";
import store from "../../store";

const shoModal = ref<boolean>(false);

interface Props {
  paramValue?: string | any;
}

const { paramValue } = defineProps<Props>();
console.log(paramValue);

const handleModal = () => {
  shoModal.value = !shoModal.value;
};

interface FormType {
  taskName: string;
  status: string;
  dueDate: string;
  assignTo: string;
}

// form
const fromData = reactive<FormType>({
  taskName: "",
  status: "",
  dueDate: "",
  assignTo: "",
});
const error = ref<boolean>(false);
const searchResults = ref([]);

// Simulated data for demonstration purposes
const data = [
  { id: 1, name: "Apple" },
  { id: 2, name: "Banana" },
  { id: 3, name: "Cherry" },
  { id: 4, name: "Grape" },
  { id: 5, name: "Lemon" },
];
const showResults = computed(() => searchResults.value.length > 0);

const handleInput = () => {
  if (fromData.assignTo === "") {
    searchResults.value = [];
  } else {
    searchResults.value = data.filter((item) =>
      item.name.toLowerCase().includes(fromData.assignTo.toLowerCase())
    );
  }
};

const selectResult = (result) => {
  fromData.assignTo = result.name;
  searchResults.value = [];
};

const handleSubmit = async () => {
  store.commit("loading", true);
  if (fromData.taskName === "") {
    error.value = true;
  } else {
    try {
      await axiosClient.post(`/project/task/${paramValue}`, {
        taskName: fromData.taskName,
        status: fromData.status,
        dueDate: fromData.dueDate,
      });
      store.commit("loading", false);
      fromData.taskName = "";
      shoModal.value = false;
    } catch (error: any) {
      console.log(error.response?.data.message);
    }
  }
};
</script>
