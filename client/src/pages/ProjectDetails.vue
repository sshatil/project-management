<template>
  <Layout>
    <div class="mt-14 m-4">
      <div class="flex justify-between border-b-2 border-gray-500 pb-4">
        <div class="flex gap-3">
          <h1 class="text-lg md:text-3xl font-bold">
            {{ store.state.project.singleProject.projectName }}
          </h1>
          <button
            class="text-sm font-medium hover:text-green-500"
            type="button"
            @click="handleProjectUpdate"
          >
            <PencilSquareIcon class="w-5 h-5" />
          </button>
        </div>
        <!-- right side -->
        <div class="flex -space-x-3">
          <div
            class=""
            v-for="user in store.state.project.singleProject.users"
            :key="user"
          >
            <h1
              class="w-10 h-10 border bg-green-700 border-white rounded-full dark:border-gray-800 flex justify-center items-center text-lg uppercase text-white"
            >
              {{ user.name.slice(0, 1) }}
            </h1>
          </div>
          <!-- add user -->
          <button
            class="w-10 h-10 border bg-green-700 border-white rounded-full dark:border-gray-800 flex justify-center items-center text-lg uppercase text-white cursor-pointer hover:bg-green-600 transition-all"
            @click="showAddMemberDropdown = !showAddMemberDropdown"
          >
            <UserPlusIcon class="w-4 h-4" />
          </button>
          <div
            class="absolute top-28 right-0 p-5 dark:bg-[#161B22] bg-slate-200 rounded-md"
            v-if="showAddMemberDropdown"
          >
            <div class="flex justify-between">
              <p class="font-medium mb-3">Add Members</p>
              <p
                class="cursor-pointer"
                @click="showAddMemberDropdown = !showAddMemberDropdown"
              >
                <XMarkIcon class="w-5 h-5" />
              </p>
            </div>
            <!-- search user -->
            <div>
              <input
                v-model="userId"
                type="search"
                id="error"
                autocomplete="off"
                placeholder="Search user"
                @input="handleInput"
                class="border border-gray-500 text-sm rounded-lg dark:bg-transparent block w-full p-2.5"
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
              class="bg-green-500 text-white font-semibold text-sm px-4 py-1 rounded-md mt-2 hover:bg-green-700 transition-all"
              @click="handleAddUser"
            >
              Add user
            </button>
          </div>
          <!-- add user end -->
        </div>
      </div>

      <!-- project details -->
      <div class="">
        <h3>{{ store.state.project.singleProject.status }}</h3>
      </div>
    </div>
    <div class="mt-7 m-4">
      <!-- task table -->
      <div class="overflow-x-auto">
        <table
          class="w-full text-sm text-left text-gray-500 dark:text-gray-400"
        >
          <thead class="text-xs text-gray-700 uppercase dark:text-gray-400">
            <tr class="border-b dark:border-b dark:border-gray-700">
              <th scope="col" class="px-6 py-3">Task name</th>
              <th scope="col" class="px-6 py-3">Status</th>
              <th scope="col" class="px-6 py-3">Assign</th>
              <th scope="col" class="px-6 py-3">Due</th>
              <th scope="col" class="px-6 py-3">Create</th>
            </tr>
          </thead>
          <!-- <TaskDetails> -->
          <tbody
            v-for="task in store.state.project.singleProject.tasks"
            :key="task._id"
          >
            <!-- table raw -->
            <tr
              @click="handleUpdateTask(task._id)"
              class="border-b dark:border-gray-700 cursor-pointer"
            >
              <td
                class="px-6 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white border-r dark:border-gray-700"
              >
                {{ task.taskName }}
              </td>
              <td class="px-6 py-3 border-r dark:border-gray-700 min-w-[150px]">
                {{ task.status }}
              </td>
              <td class="px-6 py-3 border-r dark:border-gray-700 min-w-[150px]">
                {{ task.assignTo?.name }}
              </td>
              <td class="px-6 py-3 border-r dark:border-gray-700 min-w-[150px]">
                {{ task?.dueDate }}
              </td>
              <td class="px-6 py-3 dark:border-gray-700 min-w-[150px]">
                {{ task.createdAt.slice(0, 10) }}
              </td>
            </tr>
          </tbody>
          <!-- </TaskDetails> -->
        </table>
        <div class="dark:border-gray-700 border-b w-full">
          <p class="px-6 py-3">
            <CreateTaskModal :paramValue="paramValue" />
          </p>
        </div>
      </div>
    </div>
    <!-- drawer -->
    <TaskDetails :selectedTask="selectedTask" :paramValue="paramValue" />
    <UpdateProject
      :data="store.state.project.singleProject"
      :paramValue="paramValue"
    />
  </Layout>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
import Layout from "../utils/Layout.vue";
import { computed, onMounted, ref, watch } from "vue";
// import { Project } from "../../types/project";
import CreateTaskModal from "../components/projectDetails/CreateTaskModal.vue";
import store from "../store";
import TaskDetails from "../components/projectDetails/TaskDetails.vue";
import { Task, User } from "../../types/project";
import UpdateProject from "../components/UpdateProject.vue";
import {
  PencilSquareIcon,
  UserPlusIcon,
  XMarkIcon,
} from "@heroicons/vue/24/solid";
import axiosClient from "../utils/axios";
import { toast } from "vue3-toastify";

const route = useRoute();
const paramValue = route.params.id;

const fetchSingleProject = async () => {
  await store.dispatch("fetchSingleProject", paramValue);
};

const isLoading = computed(() => store.state.project.isLoading);

watch([isLoading], () => {
  fetchSingleProject();
});

onMounted(() => {
  fetchSingleProject();
});

const selectedTask = ref<Task | any>({});
const handleUpdateTask = (taskId: string) => {
  // store.commit("storeTaskId", taskId);
  const task = store.state.project.singleProject.tasks.find(
    (f) => f._id === taskId
  );
  selectedTask.value = task;
  store.commit("drawer", !store.state.global.showDrawer);
};

const handleProjectUpdate = async () => {
  store.commit("modal", !store.state.global.shoModal);
  // store.commit("projectLoadingMutation", true);
  // try {
  //   await axiosClient.delete(`/project/${props.data._id}`);
  //   store.commit("projectLoadingMutation", false);
  // } catch (error) {
  //   console.log(error);
  // }
};

// form
const userId = ref<string>("");

const showAddMemberDropdown = ref<boolean>(false);

const searchResults = ref<User[]>([]);

const showResults = computed(() => searchResults.value.length > 0);

const handleInput = () => {
  if (userId.value === "") {
    searchResults.value = [];
  } else {
    searchResults.value = store.state.user.users.filter((item: User) =>
      item.name.toLowerCase().includes(userId.value.toLowerCase())
    );
  }
};

const selectResult = (result: User) => {
  userId.value = result._id;
  searchResults.value = [];
};

// fetch user
onMounted(() => {
  store.dispatch("getUsers");
});

const handleAddUser = async () => {
  if (userId.value === "") {
    alert("No user selected");
  } else {
    store.commit("loading", true);
    try {
      await axiosClient.put(`/project/addUser/${paramValue}`, {
        userId: userId.value,
      });
      showAddMemberDropdown.value = false;
      userId.value = "";
      store.commit("loading", false);
      toast.success("User added");
    } catch (error: any) {
      console.log(error.response?.data.message);
    }
  }
};
</script>
