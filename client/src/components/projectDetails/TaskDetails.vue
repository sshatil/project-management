<template>
  <!-- drawer init and toggle -->
  <div
    class="text-center"
    @click="store.commit('drawer', !state.showDrawer)"
  ></div>

  <div
    id="drawer-right-example"
    class="fixed top-0 right-0 z-40 h-screen p-4 overflow-y-auto transition-transform w-80 dark:bg-gray-800 bg-gray-100"
    :class="state.showDrawer && 'translate-x-full'"
    tabindex="-1"
    aria-labelledby="drawer-right-label"
  >
    <h5
      id="drawer-right-label"
      class="inline-flex items-center mb-4 text-base font-semibold text-gray-500 dark:text-gray-400"
    >
      Update Task
    </h5>
    <button
      type="button"
      data-drawer-hide="drawer-right-example"
      aria-controls="drawer-right-example"
      class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 absolute top-2.5 right-2.5 inline-flex items-center justify-center dark:hover:bg-gray-600 dark:hover:text-white"
      @click="store.commit('drawer', !state.showDrawer)"
    >
      <svg
        class="w-3 h-3"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 14 14"
      >
        <path
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
        />
      </svg>
      <span class="sr-only">Close menu</span>
    </button>
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
        <p class="mt-2 text-sm text-red-600 dark:text-red-500" v-if="error">
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
          class="border border-gray-500 text-sm rounded-lg dark:bg-gray-700 block w-full p-2.5"
        />
      </div>
      <div
        class="max-h-32 overflow-y-scroll px-2 py-1 dark:bg-gray-800 bg-gray-200 rounded-md"
        v-if="showResults"
      >
        <ul>
          <li
            v-for="result in searchResults"
            :key="result._id"
            @click="selectResult(result)"
            class="cursor-pointer hover:text-green-600"
          >
            {{ result.name }}
          </li>
        </ul>
      </div>
      <button
        class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        type="submit"
      >
        Create New Project
      </button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, computed, watch } from "vue";
import store from "../../store";
import axiosClient from "../../utils/axios";
import { User } from "../../../types/project";

interface FormType {
  taskName: string;
  status: string;
  dueDate: string;
  assignTo: string | any;
  _id?: string;
}

interface Props {
  selectedTask: FormType;
  paramValue: string;
}

const props = defineProps<Props>();
// const { taskName, status, dueDate } = toRefs(props.selectedTask);

const state = store.state.global;

// form
const fromData = reactive<FormType>({
  taskName: "",
  status: "",
  dueDate: "",
  assignTo: "",
});

watch(
  () => props.selectedTask,
  (newSelectedTask) => {
    if (newSelectedTask) {
      fromData.taskName = newSelectedTask.taskName || "";
      fromData.status = newSelectedTask.status || "";
      fromData.dueDate = newSelectedTask.dueDate || "";
      fromData.assignTo = newSelectedTask.assignTo?.name || "";
    }
  }
);

const error = ref<boolean>(false);
const searchResults = ref<User[]>([]);

const showResults = computed(() => searchResults.value.length > 0);

const handleInput = () => {
  if (fromData.assignTo === "") {
    searchResults.value = [];
  } else {
    searchResults.value = store.state.user.users.filter((item: User) =>
      item.name.toLowerCase().includes(fromData.assignTo.toLowerCase())
    );
  }
};

const selectResult = (result: User) => {
  fromData.assignTo = result._id;
  searchResults.value = [];
};

// fetch user
onMounted(() => {
  store.dispatch("getUsers");
});

const handleSubmit = async () => {
  store.commit("loading", true);
  if (fromData.taskName === "") {
    error.value = true;
  } else {
    try {
      await axiosClient.put(
        `/project/task/${props.paramValue}/${props.selectedTask._id}`,
        {
          taskName: fromData.taskName,
          status: fromData.status,
          dueDate: fromData.dueDate,
          assignTo: fromData.assignTo,
        }
      );
      store.commit("loading", false);
      fromData.taskName = "";
      fromData.status = "";
      fromData.dueDate = "";
      fromData.assignTo = "";
    } catch (error: any) {
      console.log(error.response?.data.message);
    }
  }
};
</script>
