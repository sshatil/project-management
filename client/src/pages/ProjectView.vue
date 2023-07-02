<template>
  <Layout>
    <div class="w-full p-6 mt-7">
      <h1 class="text-2xl font-bold">Your Projects</h1>
      <div class="mt-7 flex justify-between border-b-2 border-gray-400 py-2">
        <div class="">
          <h1>filter</h1>
        </div>
        <h1>Create new Project</h1>
      </div>
      <div class="flex gap-3 flex-wrap justify-center p-5">
        <div
          class=""
          v-for="data in store.state.project.projects"
          :key="data._id"
        >
          <ProjectList :data="data" />
        </div>
      </div>
      <!-- drag -->
      <!-- <div class="flex justify-center">
        <div class="flex mx-10">
          <div class="card1 w-64 flex justify-center px-5">
            <draggable
              class="dragArea list-group w-full"
              :list="store.state.project.projects"
              group="people"
              :sort="true"
              @change="log"
              :move="checkMove"
              @end="handleDragEnd"
            >
              <div
                class="list-group-item bg-gray-300 m-1 p-3 rounded-md text-center"
                v-for="element in store.state.project.projects"
                :key="element._id"
              >
                {{ element.projectName }}
              </div>
            </draggable>
          </div>
          <div class="card1 w-64 flex justify-center">
            <draggable
              class="dragArea list-group w-full"
              :list="list2"
              group="people"
              :sort="true"
              @change="log"
              :move="checkMove"
              @end="handleDragEnd"
            >
              <div
                class="list-group-item bg-gray-300 m-1 p-3 rounded-md text-center"
                v-for="element in list2"
                :key="element._id"
              >
                {{ element.projectName }}
              </div>
            </draggable>
          </div>
        </div>

        <div class="flex justify-between">
          <rawDisplays
            class="w-80 mr-1"
            :value="store.state.project.projects"
          />
          <rawDisplays class="w-80" :value="list2" />
        </div>
      </div> -->
    </div>
  </Layout>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import Layout from "../utils/Layout.vue";
import ProjectList from "../components/ProjectList.vue";
// import { VueDraggableNext } from "vue-draggable-next";
// import rawDisplays from "../components/rawDisplay.vue";

import store from "../store/index";

// const draggable = VueDraggableNext;

// const list1 = ref(store.state.project.projects);

// const list2 = ref([]);

const fetchProjects = async () => {
  await store.dispatch("fetchProjects");
};

onMounted(() => {
  fetchProjects();
});

// const checkMove = (event: { draggedContext: { from: any; to: any } }) => {
//   const { from, to } = event.draggedContext;
//   if (from === to) {
//     return true;
//   }
//   return false;
// };

// const handleDragEnd = (event) => {
//   if (event && event.draggedContext) {
//     const { from, to, removed } = toRefs(event.draggedContext);
//     if (removed.value) {
//       if (from.value === "list1" && to.value === "list2") {
//         removed.value.element.status = "status changed";
//         list2.value.push(removed.value.element);
//       } else if (from.value === "list2" && to.value === "list1") {
//         removed.value.element.status = "not started";
//         list1.value.push(removed.value.element);
//       } else if (from.value === "list1" && to.value === "list1") {
//         // Item moved within list1
//         removed.value.element.status = "status changed";
//       } else if (from.value === "list2" && to.value === "list2") {
//         // Item moved within list2
//         removed.value.element.status = "status changed";
//       }
//     }
//   }
// };

// const log = (event) => {
// const { moved, added } = event;
// if (added) {
//   added.element.status = "status changed";
//   console.log(added.element.status);
// }
// if (moved) console.log("moved", moved);
// if (added) console.log("added", added, added.element);
// };
</script>

<style scoped></style>
