<template>
  <div class="lifecycle-container">
    <!-- 返回按钮 -->
    <button @click="goBack" class="back-button">← 返回北海公园门户</button>

    <!-- 上方展示区：SVG建筑分布地图 + 时代信息 -->
    <div class="display-section">
      <div class="svg-map-container">
        <svg viewBox="0 0 800 600" style="width: 600px; height: 400px">
          <!-- 注意这里用 :href 绑定图片地址 -->
          <image :href="mapUrl" x="0" y="0" width="800" height="600" />
          <g>
            <path
              v-for="b in currentBuildings"
              :key="b.id"
              :d="b.path"
              :fill="getBuildingColor(b)"
              :stroke="activeBuilding === b.id ? '#d2691e' : '#333'"
              :stroke-width="activeBuilding === b.id ? 4 : 2"
              @mouseenter="activeBuilding = b.id"
              @mouseleave="activeBuilding = null"
              @click="showBuildingInfo(b)"
            />
          </g>
        </svg>
        <div class="legend">
          <span class="legend-new"></span> 新建
          <span class="legend-change"></span> 功能变更
          <span class="legend-remove"></span> 拆除
        </div>
        <div v-if="selectedBuilding" class="building-info">
          <h3>{{ selectedBuilding.name }}</h3>
          <p>{{ selectedBuilding.description }}</p>
        </div>
      </div>
      <div class="era-info">
        <h2>{{ activeData.title }}</h2>
        <div class="era-period">{{ activeData.period }}</div>
        <div class="era-desc">{{ activeData.description }}</div>
      </div>
    </div>

    <!-- 下方横向时间轴 -->
    <div class="timeline-nav-horizontal">
      <div
        v-for="(item, index) in timelineData"
        :key="index"
        :class="['timeline-point', { active: activeIndex === index }]"
        @click="setActiveIndex(index)"
      >
        <div class="timeline-marker"></div>
        <span class="timeline-year">{{ item.year }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const goBack = () => router.push("/landmarks/beihai-park"); // 修改为正确路径

// 地图底图地址（请替换为你自己的图片或SVG地址）
const mapUrl = "https://your-domain.com/beihai-base.png"; // 或 .svg

// 每个时期的建筑分布数据（SVG path 仅为示例，请用真实数据替换）
const timelineData = ref([
  {
    year: "金代",
    title: "北海园林初建",
    period: "金代",
    description:
      "北海园林始建于金大定六年（1166年），形成了“一池三山”的基本格局，成为皇家园林的雏形。",
    buildings: [
      {
        id: "yaoyu",
        name: "瑶屿行宫",
        path: "M100,100 L120,100 L120,120 L100,120 Z",
        status: "new",
        description: "金代时期建造的瑶屿行宫，位于琼华岛上，是北海公园的前身。",
      },
    ],
  },
  {
    year: "元代",
    title: "纳入大都中轴线",
    period: "元代",
    description:
      "元代将北海纳入大都中轴线体系，完善了湖岛格局，成为元大都的重要景观核心。",
    buildings: [
      {
        id: "guanghan",
        name: "广寒殿",
        path: "M130,130 L150,130 L150,150 L130,150 Z",
        status: "new",
        description: "元代时期在瑶屿行宫基础上建造的广寒殿，湖泊称为‘西华潭’。",
      },
    ],
  },
  {
    year: "明代",
    title: "皇家园林扩建",
    period: "明代",
    description:
      "明成祖朱棣永乐十八年（1420年），明王朝定都北京后，在太液池以东建造了皇宫紫禁城，并向南拓展水系，形成中海、南海，与北海一起合称“西苑”，划入皇城的范围。",
    buildings: [
      {
        id: "baita",
        name: "白塔",
        path: "M160,160 L180,160 L180,180 L160,180 Z",
        status: "new",
        description: "明代时期增建的白塔，成为北海公园的标志性建筑。",
      },
    ],
  },
  {
    year: "清代",
    title: "园林鼎盛时期",
    period: "清代",
    description:
      "清代乾隆六年（1741年）起，北海开始了长达三十年的扩建，建起了许多亭、台、楼、阁，园林艺术达到鼎盛。",
    buildings: [
      {
        id: "jiulongbi",
        name: "九龙壁",
        path: "M200,200 L240,200 L240,220 L200,220 Z",
        status: "change",
        description: "清代时期修建的九龙壁，园林艺术的代表。",
      },
    ],
  },
  {
    year: "民国时期",
    title: "对外开放",
    period: "民国时期",
    description:
      "北海公园结束皇家专属，1925年正式对公众开放，增设服务设施，成为市民休闲游览的重要场所。",
    buildings: [
      {
        id: "wulongting",
        name: "五龙亭",
        path: "M300,300 L340,300 L340,320 L300,320 Z",
        status: "remove",
        description: "民国时期部分建筑功能发生变化，五龙亭成为市民游览热点。",
      },
    ],
  },
  {
    year: "现代",
    title: "遗产保护与修缮",
    period: "现代",
    description:
      "新中国成立后，北海公园多次进行大规模修缮与保护，成为国家重点文物保护单位和世界文化遗产的重要组成部分。",
    buildings: [
      {
        id: "baita",
        name: "白塔",
        path: "M160,160 L180,160 L180,180 L160,180 Z",
        status: "change",
        description: "现代对白塔等古建进行修缮与保护。",
      },
    ],
  },
]);

const activeIndex = ref(0);
const setActiveIndex = (index) => {
  activeIndex.value = index;
  selectedBuilding.value = null;
};
const activeData = computed(() => timelineData.value[activeIndex.value]);

const currentBuildings = computed(() => activeData.value.buildings || []);
const activeBuilding = ref(null);
const selectedBuilding = ref(null);

function getBuildingColor(b) {
  if (b.status === "new") return "#4caf50";
  if (b.status === "change") return "#ff9800";
  if (b.status === "remove") return "#f44336";
  return "#90caf9";
}
function showBuildingInfo(building) {
  selectedBuilding.value = building;
}
</script>

<style scoped>
.lifecycle-container {
  font-family: "Noto Serif SC", serif;
  color: #333;
  background: linear-gradient(135deg, #f5f2e9 0%, #e8d8c3 100%);
  min-height: 100vh;
  padding: 20px;
  position: relative;
}

.back-button {
  position: absolute;
  top: 30px;
  left: 30px;
  background-color: rgba(139, 69, 19, 0.7);
  color: #fff8e1;
  border: none;
  padding: 12px 20px;
  border-radius: 30px;
  cursor: pointer;
  font-size: 1em;
  z-index: 10;
  transition: all 0.3s ease;
  backdrop-filter: blur(5px);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
}

.display-section {
  display: flex;
  align-items: center;
  gap: 40px;
  margin: 80px auto 40px;
  max-width: 1000px;
  background: #fffbe6;
  border-radius: 20px;
  box-shadow: 0 8px 30px rgba(101, 67, 33, 0.08);
  padding: 40px 30px;
}

.svg-map-container {
  position: relative;
  max-width: 650px;
  min-width: 400px;
}

.legend {
  margin-top: 10px;
}
.legend span {
  display: inline-block;
  width: 18px;
  height: 18px;
  margin-right: 6px;
  vertical-align: middle;
  border-radius: 3px;
}
.legend-new {
  background: #4caf50;
}
.legend-change {
  background: #ff9800;
}
.legend-remove {
  background: #f44336;
}
.building-info {
  margin-top: 10px;
  padding: 8px;
  border: 1px solid #ccc;
  background: #fff;
  border-radius: 8px;
  font-size: 0.95em;
}

.era-info {
  flex: 1;
}

.era-info h2 {
  font-size: 2rem;
  color: #8b4513;
  margin-bottom: 10px;
}

.era-period {
  font-size: 1.1rem;
  color: #9c7c5c;
  font-style: italic;
  margin-bottom: 18px;
}

.era-desc {
  font-size: 1.1rem;
  color: #5a4a42;
  line-height: 1.7;
}

/* 横向时间轴 */
.timeline-nav-horizontal {
  display: flex;
  justify-content: center;
  gap: 30px;
  margin: 40px auto 0;
  max-width: 900px;
}

.timeline-point {
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  transition: all 0.3s ease;
}

.timeline-marker {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background-color: #d4a76a;
  margin-bottom: 8px;
  transition: all 0.3s ease;
}

.timeline-point.active .timeline-marker {
  background-color: #8b4513;
  transform: scale(1.3);
  box-shadow: 0 0 0 4px rgba(139, 69, 19, 0.2);
}

.timeline-year {
  font-size: 1.1rem;
  color: #9c7c5c;
  font-weight: bold;
  transition: all 0.3s ease;
}

.timeline-point.active .timeline-year {
  color: #8b4513;
  transform: scale(1.1);
}
</style>
