<template>
  <div class="home-container">
    <!-- 简介面板 -->
    <div class="info-panel">
      <h1>北京地标建筑</h1>
      <p class="intro-text">
        北京，中国的首都，拥有3000多年建城史和860多年建都史。
        这座城市融合了古老文明与现代繁华，紫禁城、天坛、长城等世界文化遗产见证着中华文明的辉煌。
        黄昏时分的北京，古建筑在金色余晖中更显庄严雄伟。
      </p>
      <div class="landmark-list">
        <h3>主要地标建筑</h3>
        <ul>
          <li v-for="landmark in landmarks" :key="landmark.id">
            <span class="landmark-name">{{ landmark.name }}</span>
          </li>
        </ul>
      </div>
    </div>

    <!-- 地图容器 -->
    <div class="map-container">
      <div class="map-wrapper">
        <BeijingMap
          v-if="currentLevel === 'city'"
          :mapData="mapData"
          :colorScaleConfig="colorScaleConfig"
          :landmarks="landmarks"
          @area-clicked="handleAreaClick"
          @landmark-clicked="handleLandmarkClick"
        />
        <DistrictMap
          v-if="currentLevel === 'district'"
          :districtName="selectedDistrict"
          :mapData="mapData"
          :colorScaleConfig="colorScaleConfig"
        />
        <button
          v-if="currentLevel === 'district'"
          @click="goBack"
          class="back-button"
        >
          返回北京全图
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import BeijingMap from "../components/BeijingMap.vue";
import DistrictMap from "../components/DistrictMap.vue";

export default {
  components: {
    BeijingMap,
    DistrictMap,
  },
  data() {
    return {
      currentLevel: "city",
      selectedDistrict: "",
      mapData: [],
      landmarks: [
        {
          id: "forbiddenCity",
          name: "故宫",
          position: [116.397, 39.918],
          routeName: "ForbiddenCity",
        },
        {
          id: "templeOfHeaven",
          name: "天坛",
          position: [116.41, 39.882],
          routeName: "TempleOfHeaven",
        },
        {
          id: "greatWall",
          name: "长城",
          position: [116.57, 40.431],
          routeName: "GreatWall",
        },
        {
          id: "mingTombs",
          name: "明十三陵",
          position: [116.234, 40.251],
          routeName: "MingTombs",
        },
        {
          id: "beihaiPark",
          name: "北海公园",
          position: [116.391, 39.928],
          routeName: "BeihaiPark",
        },
        {
          id: "fayuanTemple",
          name: "法源寺",
          position: [116.368, 39.884],
          routeName: "FayuanTemple",
        },
        {
          id: "summerPalace",
          name: "颐和园",
          position: [116.271, 39.999],
          routeName: "SummerPalace",
        },
        {
          id: "dashilan",
          name: "大栅栏",
          position: [116.399, 39.899],
          routeName: "Dashilan",
        },
      ],
      colorScaleConfig: {
        range: ["#f8e5b5", "#bd6b20"], // 调整为黄昏色调
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
    handleLandmarkClick(landmark) {
      this.$router.push({ name: landmark.routeName });
    },
  },
};
</script>

<style scoped>
.home-container {
  position: relative;
  width: 100%;
  height: 100vh;
  display: flex;
  background: linear-gradient(to bottom, #f5f2e9 0%, #e8d8c3 100%);
  overflow: hidden;
}

.map-container {
  flex: 1;
  height: 100%;
  position: relative;
}

.map-wrapper {
  width: 100%;
  height: 100%;
  position: relative;
}

.info-panel {
  width: 300px;
  height: 100%;
  padding: 30px;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  border-right: 1px solid rgba(255, 255, 255, 0.3);
  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1);
  overflow-y: auto;
  color: #333;
}

.info-panel h1 {
  font-size: 24px;
  margin-bottom: 20px;
  color: #8b4513;
  border-bottom: 1px solid #d4a76a;
  padding-bottom: 10px;
}

.intro-text {
  line-height: 1.6;
  margin-bottom: 25px;
  text-align: justify;
}

.landmark-list h3 {
  font-size: 18px;
  color: #8b4513;
  margin-bottom: 15px;
}

.landmark-list ul {
  list-style: none;
  padding: 0;
}

.landmark-list li {
  padding: 8px 0;
  border-bottom: 1px dashed #d4a76a;
}

.landmark-name {
  cursor: pointer;
  transition: color 0.3s;
}

.landmark-name:hover {
  color: #bd6b20;
  font-weight: bold;
}

.back-button {
  position: absolute;
  top: 20px;
  left: 20px;
  z-index: 1000;
  padding: 8px 16px;
  background: rgba(255, 255, 255, 0.8);
  border: 1px solid #d4a76a;
  border-radius: 4px;
  cursor: pointer;
  color: #8b4513;
  font-weight: bold;
  transition: all 0.3s;
}

.back-button:hover {
  background: rgba(255, 255, 255, 1);
  box-shadow: 0 0 5px rgba(210, 105, 30, 0.5);
}

/* 响应式设计 */
@media (max-width: 768px) {
  .home-container {
    flex-direction: column;
  }

  .info-panel {
    width: 100%;
    height: auto;
    max-height: 200px;
    border-right: none;
    border-bottom: 1px solid rgba(255, 255, 255, 0.3);
  }
}
</style>
