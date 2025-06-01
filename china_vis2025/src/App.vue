<template>
  <div class="app-container">
    <h1>故宫生命历程可视化</h1>
    <TimeLine :events="forbiddenCity.timeline" @show-network="openModal" />

    <!-- 网络图弹窗 -->
    <el-dialog
      v-model="dialogVisible"
      :title="
        selectedEvent ? `${selectedEvent.year}年: ${selectedEvent.event}` : ''
      "
      width="80%"
      top="5vh"
    >
      <LandmarkNetwork
        v-if="dialogVisible"
        :landmark="forbiddenCity"
        :event="selectedEvent"
      />
    </el-dialog>
  </div>
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
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}
h1 {
  text-align: center;
  color: #2c3e50;
}
</style>
