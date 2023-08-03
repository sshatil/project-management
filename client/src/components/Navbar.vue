<template>
  <div class="fixed left-0 right-0">
    <div class="flex justify-between items-center p-3 max-w-5xl mx-auto">
      <div class="flex items-center gap-3">
        <p class="text-2xl mr-6"><RouterLink to="/">Logo</RouterLink></p>
        <p><RouterLink :to="{ name: 'project' }">Project</RouterLink></p>
        <p><RouterLink to="/">Log in</RouterLink></p>
      </div>
      <div class="">
        <button @click="toggleDark()" class="cursor-pointer">
          <div
            v-if="isDark"
            class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <MoonIcon
              class="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
            />
          </div>
          <div
            v-else
            class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <SunIcon
              class="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
            />
          </div>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from "vue-router";
import { useDark, useToggle } from "@vueuse/core";

import { MoonIcon, SunIcon } from "@heroicons/vue/24/solid";

const isDark = useDark();
const toggleDark = useToggle(isDark);
</script>
