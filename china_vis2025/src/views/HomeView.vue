<template>
  <div class="home-container">
    <div class="info-panel">
      <h1>北京地标建筑</h1>
      <p class="intro-text">
        北京，作为中国的首都，不仅拥有三千余年建城史与八百六十载建都史，更是一座融合古老文明与现代繁华的宏伟都市。从壮丽的紫禁城到庄严的天坛，从绵延的长城到深邃的明十三陵，这些世界文化遗产共同见证着中华文明的辉煌与变迁。
      </p>

      <p class="intro-text">
        本导览项目精选八处最具代表性的北京文化地标，旨在引领您深入探索这座城市的历史演进与文化脉络。解析北京在不同历史时期的城市面貌、建筑风格及人文精神，展现古都黄昏时分，古建筑在金色余晖中更显庄严雄伟的独特魅力。
      </p>

      <LandmarkCarousel
        :landmarks="landmarks"
        :initialLandmarkId="activeLandmarkId"
        @view-details="handleLandmarkClick"
      />
    </div>

    <div class="map-container">
      <div class="map-wrapper">
        <button @click="toggleView" class="view-toggle-button">
          {{ currentView === "map" ? "查看地标关系图" : "返回地图视图" }}
        </button>

        <BeijingMap
          v-if="currentView === 'map' && currentLevel === 'city'"
          :mapData="mapData"
          :colorScaleConfig="colorScaleConfig"
          :landmarks="landmarks"
          @area-clicked="handleAreaClick"
          @landmark-clicked="handleLandmarkClickOnMap"
        />
        <DistrictMap
          v-if="currentView === 'map' && currentLevel === 'district'"
          :districtName="selectedDistrict"
          :mapData="mapData"
          :colorScaleConfig="colorScaleConfig"
        />

        <button
          v-if="currentLevel === 'district' && currentView === 'map'"
          @click="goBack"
          class="back-button"
        >
          返回北京全图
        </button>

        <LandmarkRelationsViz
          v-if="currentView === 'relations'"
        />
      </div>
    </div>
  </div>
</template>

<script>
import BeijingMap from "../components/BeijingMap.vue";
import DistrictMap from "../components/DistrictMap.vue";
import LandmarkRelationsViz from "./LandmarkRelationsViz.vue";
import LandmarkCarousel from "./LandmarkCarousel.vue"; // 引入轮播组件

export default {
  components: {
    BeijingMap,
    DistrictMap,
    LandmarkRelationsViz,
    LandmarkCarousel, // 注册轮播组件
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
          routeName: "forbidden-city",
          image:
            "data:image/webp;base64,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", // 替换为你的图片路径
          description:
            "故宫，又称紫禁城，是中国明清两代的皇家宫殿，是世界上现存规模最大、保存最为完整的木质结构古建筑之一。",
        },
        {
          id: "templeOfHeaven",
          name: "天坛",
          position: [116.41, 39.882],
          routeName: "temple-of-heaven",
          image:
            "https://th.bing.com/th/id/OIP.MVieoEkwnsIQA_rBh0INygHaEp?w=312&h=196&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3", // 替换为你的图片路径
          description:
            "天坛，明清两代皇帝祭天、祈谷的场所。其严谨的建筑布局、奇特的建筑构造和瑰丽的建筑装饰，被认为是东方古老文明的杰出代表。",
        },
        {
          id: "greatWall",
          name: "长城",
          position: [116.57, 40.431],
          routeName: "great-wall",
          image:
            "data:image/webp;base64,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", // 替换为你的图片路径
          description:
            "长城，作为中国古代的军事防御工程，是世界上修建时间最长、工程量最大的一项古代防御工程，象征着中华民族坚韧不拔的精神。",
        },
        {
          id: "mingTombs",
          name: "明十三陵",
          position: [116.234, 40.251],
          routeName: "ming-tombs",
          image:
            "https://th.bing.com/th/id/OIP.urR5j8-Em8cOvycZvh5mQwHaE7?w=279&h=185&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3",
          description:
            "明十三陵是明朝十三位皇帝的陵墓群，坐落于北京昌平区，是中华文化的重要遗产。",
        },
        {
          id: "beihaiPark",
          name: "北海公园",
          position: [116.391, 39.928],
          routeName: "beihai-park",
          image:
            "https://th.bing.com/th/id/OIP.8DhccPe9VRXg6zGn5NqCnwHaE7?w=270&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3",
          description:
            "北海公园是中国现存最古老、最完整、最具综合性和代表性的皇家园林之一。",
        },
        {
          id: "fayuanTemple",
          name: "法源寺",
          position: [116.368, 39.884],
          routeName: "fayuan-temple",
          image:
            "https://th.bing.com/th/id/OIP.b2ES3DrUVUO1ZbC4vi5ZbAHaFj?w=250&h=188&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3",
          description:
            "法源寺是北京城内现存最古老的寺庙之一，历史悠久，藏有大量佛教文物。",
        },
        {
          id: "summerPalace",
          name: "颐和园",
          position: [116.271, 39.999],
          routeName: "summer-palace",
          image:
            "https://th.bing.com/th/id/OIP.7PmB1QZWprJFUDm2apRdSgHaE8?w=259&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3",
          description:
            "颐和园是中国清朝的皇家园林，是中国古典园林艺术的杰作，被誉为“皇家园林博物馆”。",
        },
        {
          id: "dashilan",
          name: "大栅栏",
          position: [116.399, 39.899],
          routeName: "dashilan",
          image:
            "https://th.bing.com/th/id/OIP.IwJi2yNYtDsb5PiANk70RwHaE7?w=273&h=182&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3",
          description:
            "大栅栏是北京著名的商业街区，承载着丰富的历史文化和市井风情。",
        },
      ],
      colorScaleConfig: {
        range: ["#f8e5b5", "#bd6b20"], // 调整为黄昏色调
        domain: [0, 100],
      },
      currentView: "map", // 'map' 或 'relations'
      activeLandmarkId: null, // 新增：用于联动轮播组件
    };
  },
  methods: {
    handleAreaClick(districtName) {
      this.selectedDistrict = districtName;
      this.currentLevel = "district";
      this.currentView = "map";
    },
    goBack() {
      this.currentLevel = "city";
      this.selectedDistrict = "";
      this.currentView = "map";
    },
    // 处理轮播组件触发的查看详情事件
    handleLandmarkClick(landmark) {
      this.$router.push({ name: landmark.routeName });
    },
    // 处理地图上地标点击事件，更新activeLandmarkId以联动轮播
    handleLandmarkClickOnMap(landmark) {
      this.activeLandmarkId = landmark.id;
      // 同时也可以跳转路由，如果需要
      this.$router.push({ name: landmark.routeName });
    },
    toggleView() {
      this.currentView = this.currentView === "map" ? "relations" : "map";
      if (
        this.currentLevel === "district" &&
        this.currentView === "relations"
      ) {
        this.goBack();
      }
    },
  },
  watch: {
    $route(to) {
      if (to.meta?.title) {
        document.title = `${to.meta.title} | 北京地标导览`;
      }
    },
  },
};
</script>

<style scoped>
/* 保持原有的样式，仅对 info-panel 内部做调整 */
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
  margin-top: 1%;
  width: 100%;
  height: 95%;
  position: relative;
}

/* 关键样式：确保所有核心组件都能填充 map-wrapper */
.map-wrapper > :deep(.beijing-map-container), /* BeijingMap 根元素的类名 */
.map-wrapper > :deep(.district-map-container), /* DistrictMap 根元素的类名 */
.map-wrapper > :deep(.relations-viz-container) { /* LandmarkRelationsViz 根元素的类名 */
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  box-sizing: border-box; /* 确保 padding 不会导致溢出 */
}

.info-panel {
  width: 300px;
  height: 100%;
  padding: 50px;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  border-right: 1px solid rgba(255, 255, 255, 0.3);
  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1);
  overflow-y: auto;
  color: #333;
  display: flex; /* 让内容垂直居中 */
  flex-direction: column;
}

.info-panel h1 {
  font-size: 24px;
  margin-bottom: 20px;
  color: #8b4513;
  border-bottom: 1px solid #d4a76a;
  padding-bottom: 10px;
  text-align: center;
}

.intro-text {
  line-height: 1.6;
  margin-bottom: 15px;
  text-align: justify;
}

/* 移除 landmark-list 相关的样式，因为它被轮播组件替换了 */

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

.view-toggle-button {
  position: absolute;
  top: 20px;
  right: 20px;
  z-index: 1000;
  padding: 10px 18px;
  background: #bd6b20;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  transition: background-color 0.3s ease, transform 0.2s ease;
}

.view-toggle-button:hover {
  background-color: #a05a1a;
  transform: translateY(-2px);
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
