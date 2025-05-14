<template>
  <div>
    <BeijingMap
      v-if="currentLevel === 'city'"
      :mapData="mapData"
      :colorScaleConfig="colorScaleConfig"
      @area-clicked="handleAreaClick"
    />
    <DistrictMap
      v-if="currentLevel === 'district'"
      :districtName="selectedDistrict"
      :mapData="mapData"
      :colorScaleConfig="colorScaleConfig"
    />
    <button v-if="currentLevel === 'district'" @click="goBack">
      返回北京全图
    </button>
  </div>
</template>

<script>
import BeijingMap from "./components/BeijingMap.vue";
import DistrictMap from "./components/DistrictMap.vue";

export default {
  components: { BeijingMap, DistrictMap },
  data() {
    return {
      currentLevel: "city", // 或 'district'
      selectedDistrict: "",
      mapData: [], // 外部传入的数据
      colorScaleConfig: {
        range: ["#eee", "#bd0026"],
        domain: [0, 100],
      },
    };
  },
  methods: {
    handleAreaClick(districtName) {
      this.selectedDistrict = districtName;
      this.currentLevel = "district";
    },
    goBack() {
      this.currentLevel = "city";
      this.selectedDistrict = "";
    },
  },
};
</script>
