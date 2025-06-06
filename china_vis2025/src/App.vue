<template>
  <div class="app-container">
    <router-view></router-view>
  </div>
  <LawScreen></LawScreen>
  <CulturalTree />
  <PhoenixVisualization />
</template>

<script setup>
import { ref } from "vue";
import TimeLine from "./components/TimeLine.vue";
import LandmarkNetwork from "./components/LandmarkNetwork.vue";
import forbiddenCityData from "./assets/forbidden-city.json";

const forbiddenCity = ref(forbiddenCityData);
const dialogVisible = ref(false);
const selectedEvent = ref(null);

const openModal = (event) => {
  selectedEvent.value = event;
  dialogVisible.value = true;
};
</script>

<style scoped>
.app-container {
  width: 100%;
  min-height: 100vh;
}
</style>
