<template>
  <!-- @click="() => (state.showSidebar = !state.showSidebar)" -->
  <section>
    <button
      data-drawer-target="sidebar-multi-level-sidebar"
      data-drawer-toggle="sidebar-multi-level-sidebar"
      aria-controls="sidebar-multi-level-sidebar"
      type="button"
      class="inline-flex items-center p-2 mt-1 ml-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 absolute"
      @click="store.commit('sidebar', true)"
    >
      <span class="sr-only">Open sidebar</span>
      <svg
        class="w-6 h-6"
        aria-hidden="true"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          clip-rule="evenodd"
          fill-rule="evenodd"
          d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
        ></path>
      </svg>
    </button>

    <!-- <aside
      class="top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
      :class="showSidebar ? '-translate-x-full' : 'translate-x-0'"
      aria-label="Sidebar"
    > -->
    <div class="">
      <div
        class="fixed top-0 left-0 right-0 w-screen h-screen bg-gray-600 bg-opacity-40"
        :class="state.showSidebar ? 'block' : 'hidden'"
        @click="store.commit('sidebar', false)"
      ></div>
      <aside
        class="fixed top-0 left-0 z-40 w-64 h-screen transition-transform sm:block sm:relative"
        :class="
          state.showSidebar
            ? 'block sm:-translate-x-full'
            : 'hidden sm:translate-x-0'
        "
        aria-label="Sidebar"
      >
        <div
          class="h-full px-3 py-4 overflow-y-auto bg-gray-200 dark:bg-[#161B22]"
        >
          <div
            class="absolute right-1 sm:hidden"
            @click="store.commit('sidebar', false)"
          >
            <XMarkIcon
              class="w-7 h-7 -mt-3 cursor-pointer hover:text-red-400"
            />
          </div>
          <ul
            class="space-y-2 font-medium flex flex-col justify-between h-full pt-4"
          >
            <RouterLink to="/">
              <li>
                <div
                  class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <HomeIcon
                    class="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  />
                  <span class="ml-3">Home</span>
                </div>
              </li>
              <li>
                <RouterLink to="/project">
                  <button
                    type="button"
                    class="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                    aria-controls="dropdown-example"
                    data-collapse-toggle="dropdown-example"
                    @click="handleDropdown"
                  >
                    <FolderIcon
                      class="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                    />
                    <span
                      class="flex-1 ml-3 text-left whitespace-nowrap"
                      sidebar-toggle-item
                      >Projects</span
                    >
                    <svg
                      sidebar-toggle-item
                      class="w-6 h-6"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                  </button>
                </RouterLink>
                <ul
                  id="dropdown-example"
                  class="py-2 space-y-2"
                  :class="dropdown ? 'block' : 'hidden'"
                  v-for="project in store.state.project.projects"
                >
                  <li>
                    <RouterLink
                      :to="`/details/${project._id}`"
                      class="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                    >
                      {{ project.projectName }}
                    </RouterLink>
                    <!-- {{ store.state.project.projects }} -->
                  </li>
                </ul>
              </li>
            </RouterLink>
            <div class="">
              <li @click="toggleDark()" class="cursor-pointer">
                <div
                  v-if="isDark"
                  class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <MoonIcon
                    class="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  />
                  <span class="flex-1 ml-3 whitespace-nowrap">Dark Mode</span>
                </div>
                <div
                  v-else
                  class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <SunIcon
                    class="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  />
                  <span class="flex-1 ml-3 whitespace-nowrap">Light Mode</span>
                </div>
              </li>
              <li>
                <div
                  class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                >
                  <ArrowLeftOnRectangleIcon
                    class="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  />
                  <span class="ml-3">Logout</span>
                </div>
              </li>
            </div>
          </ul>
        </div>
      </aside>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from "vue";
import {
  HomeIcon,
  FolderIcon,
  MoonIcon,
  SunIcon,
  ArrowLeftOnRectangleIcon,
  XMarkIcon,
} from "@heroicons/vue/24/solid";

import { useDark, useToggle } from "@vueuse/core";

const isDark = useDark();
const toggleDark = useToggle(isDark);

const dropdown = ref(true);
// const showSidebar = ref(false);
import store from "../store/index";
import { RouterLink } from "vue-router";

const state = store.state.global;

const handleDropdown = () => {
  dropdown.value = !dropdown.value;
};
</script>
