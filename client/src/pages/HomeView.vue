<template>
  <div class="max-w-5xl mx-auto px-6">
    <Navbar />
    <div class="pt-24 md:pt-20 md:flex justify-evenly items-center space-y-3">
      <div
        class="md:basis-2/4 space-y-3 text-center max-w-sm mx-auto md:max-w-xl"
      >
        <h1 class="md:text-3xl text-2xl">
          Manage Your all Projects. Unite Your Tasks, Teammates, and Tools
        </h1>
        <p>Everything in One Place, Wherever Your Team Is</p>
        <div class="">
          <RouterLink :to="{ name: 'register' }">
            <button
              class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Sign Up for free account
            </button>
          </RouterLink>
        </div>
      </div>
      <div class="md:basis-2/4 max-w-sm mx-auto md:max-w-2xl">
        <img src="/project-work.svg" alt="" class="w-full h-full" />
      </div>
    </div>
    <div class="mt-12">
      <h1 class="text-center">Features</h1>
      <div class="">
        <h3>Project List</h3>
        <div class="max-w-xl mx-auto">
          <img src="/project-page.png" alt="" class="w-full h-full" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Navbar from "../components/Navbar.vue";
</script>

<style scoped></style>
