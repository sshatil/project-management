<template>
  <div class="flex justify-between p-3 fixed left-0 right-0 max-w-5xl mx-auto">
    <RouterLink to="/">Logo</RouterLink>
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
</template>

<script setup lang="ts">
import { RouterLink } from "vue-router";
import { useDark, useToggle } from "@vueuse/core";

import { MoonIcon, SunIcon } from "@heroicons/vue/24/solid";

const isDark = useDark();
const toggleDark = useToggle(isDark);
</script>
