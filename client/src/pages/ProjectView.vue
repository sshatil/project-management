<!-- <template>
  <Layout>
    <div class="w-full p-6 mt-7">
      <h1 class="text-2xl font-bold">Your Projects</h1>
      <div class="mt-7 flex justify-between border-b-2 border-gray-400 py-2">
        <div class="">
          <h1>filter</h1>
        </div>
        <h1>Create new Project</h1>
      </div>
      <div
        class=""
        v-for="data in store.state.project.projects"
        :key="data._id"
      >
        <p>{{ data.projectName }}</p>
      </div>
      <draggable
        v-model="list"
        handle=".handle"
        :group="{ name: 'people', pull: 'clone', put: false }"
        ghost-class="ghost"
        :sort="false"
      >
        <transition-group>
          <div v-for="element in list" :key="element.id">
            {{ element.name }}
          </div>
        </transition-group>
      </draggable>
    </div>
  </Layout>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import Layout from "../utils/Layout.vue";
import { VueDraggableNext } from "vue-draggable-next";

import store from "../store/index";

const draggable = VueDraggableNext;

const list = ref([
  { name: "John", id: 1 },
  { name: "Joao", id: 2 },
  { name: "Jean", id: 3 },
  { name: "Gerard", id: 4 },
]);

const fetchProjects = async () => {
  await store.dispatch("fetchProjects");
};

onMounted(() => {
  fetchProjects();
});

console.log(store.state.project.projects.length);
</script>

<style scoped></style> -->

<template>
  <div class="flex justify-center">
    <div class="flex mx-10">
      <div class="card1 w-64 flex justify-center px-5">
        <draggable
          class="dragArea list-group w-full"
          :list="list1"
          :group="{ name: 'people', pull: 'clone', put: false }"
          :sort="true"
          @change="log"
          :move="checkMove"
        >
          <div
            class="list-group-item bg-gray-300 m-1 p-3 rounded-md text-center"
            v-for="element in list1"
            :key="element.name"
          >
            {{ element.name }}
          </div>
        </draggable>
      </div>
      <div class="card1 w-64 flex justify-center">
        <draggable
          class="dragArea list-group w-full"
          :list="list2"
          group="people"
          @change="log"
          :move="checkMove"
        >
          <div
            class="list-group-item bg-gray-300 m-1 p-3 rounded-md text-center"
            v-for="element in list2"
            :key="element.name"
          >
            {{ element.name }}
          </div>
        </draggable>
      </div>
    </div>

    <!-- <div class="flex justify-between">
      <rawDisplays class="w-64 mr-1" :value="list1" />
      <rawDisplays class="w-64" :value="list2" />
    </div> -->
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { VueDraggableNext } from "vue-draggable-next";
// import rawDisplays from "../components/rawDisplay.vue";
export default defineComponent({
  name: "App",
  components: {
    draggable: VueDraggableNext,
  },
  data() {
    return {
      enabled: true,
      list1: [
        { name: "John", id: 1 },
        { name: "Joao", id: 2 },
        { name: "Jean", id: 3 },
        { name: "Gerard", id: 4 },
      ],
      list2: [
        { name: "Juan", id: 5 },
        { name: "Edgard", id: 6 },
        { name: "Johnson", id: 7 },
      ],
      dragging: false,
    };
  },
  methods: {
    add() {
      console.log("add");
    },
    replace() {
      console.log("replace");
    },
    checkMove(event) {
      console.log("checkMove", event.draggedContext);
      console.log("Future index: " + event.draggedContext.futureIndex);
    },
    log(event) {
      const { moved, added } = event;

      if (moved) console.log("moved", moved);
      if (added) console.log("added", added, added.element);
    },
  },
});
</script>
<style>
.item-attribute {
  padding: 10px;
  border: 1px solid black;
}
.clone-grid {
  display: flex;
}
</style>
