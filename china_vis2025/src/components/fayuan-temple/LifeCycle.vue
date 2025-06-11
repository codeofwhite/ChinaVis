<template>
  <div class="lifecycle-container">
    <div class="lifecycle-header">
      <h1>法源寺建筑群演变与修缮历程</h1>
      <p class="intro-text">从唐代悯忠古刹到中国佛学院的千年佛寺变迁</p>
      <button @click="goBack" class="back-button">← 返回法源寺门户</button>
      <div class="status-overview">
        <div class="status-card">
          <span class="status-icon">🛍️</span>
          <div>
            <h3>主要殿宇</h3>
            <p class="status-value">超60家</p>
          </div>
        </div>
        <div class="status-card">
          <span class="status-icon">⏳</span>
          <div>
            <h3>历史跨度</h3>
            <p class="status-value">600+年</p>
          </div>
        </div>
        <div class="status-card">
          <span class="status-icon">🚶</span>
          <div>
            <h3>占地面积</h3>
            <p class="status-value">千万+</p>
          </div>
        </div>
      </div>
    </div>

    <div class="lifecycle-main">
      <div class="timeline-nav">
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

      <div class="content-wrapper">
        <div class="timeline-section">
          <div class="timeline">
            <div class="timeline-line"></div>
            <div
              v-for="(item, index) in timelineData"
              :key="index"
              :class="['timeline-item', { active: activeIndex === index }]"
              @click="handleClick(index, $event)"
            >
              <div class="timeline-dot"></div>
              <div class="timeline-year">{{ item.year }}</div>
              <div class="timeline-title">{{ item.title }}</div>
            </div>
          </div>
        </div>

        <div v-if="isModalOpen" class="modal-overlay" @click.self="closeModal">
          <div class="modal-content">
            <button class="modal-close" @click="closeModal">×</button>

            <div class="modal-body">
              <div class="history-card">
                <div class="history-info">
                  <h2>{{ activeData.title }}</h2>
                  <div class="history-period">{{ activeData.period }}</div>
                  <div class="history-desc">{{ activeData.description }}</div>

                  <div class="history-metrics">
                    <div
                      class="metric"
                      v-for="(metric, idx) in activeData.metrics"
                      :key="idx"
                    >
                      <div class="metric-value">{{ metric.value }}</div>
                      <div class="metric-label">{{ metric.label }}</div>
                    </div>
                  </div>

                  <div
                    class="architectural-features"
                    v-if="activeData.features"
                  >
                    <h3>建筑特点</h3>
                    <ul>
                      <li
                        v-for="(feature, idx) in activeData.features"
                        :key="idx"
                      >
                        {{ feature }}
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div class="network-section" v-if="selectedEvent">
                <h3>{{ selectedEvent.year }}年：{{ selectedEvent.event }}</h3>
                <LandmarkNetwork
                  :landmark="'dashilan'"
                  :event="selectedEvent"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="visualization-section">
        <div class="visualization-card">
          <h3>寺院规模演变</h3>
          <div ref="chart" class="chart-container"></div>
        </div>
        <div class="visualization-card">
          <h3>佛教建筑类型</h3>
          <div ref="typeChart" class="chart-container"></div>
        </div>
        <div class="visualization-card">
          <h3>历代佛像艺术</h3>
          <div ref="chartRef3" class="chart-container"></div>
        </div>
      </div>
    </div>

    <footer class="lifecycle-footer">
      <p class="copyright">
        © {{ new Date().getFullYear() }} 北京历史文化遗产数字平台
      </p>
    </footer>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, computed } from "vue";
import { useRouter } from "vue-router";
import * as echarts from "echarts";
import LandmarkNetwork from "../LandmarkNetwork.vue";
import forbiddenCityData from "../../assets/forbidden-city.json";

const router = useRouter();

const forbiddenCity = ref(forbiddenCityData);

// 返回门户主页
const goBack = () => router.push("/landmarks/fayuan-temple");

// 时间轴数据 - 法源寺特有的历史节点
const timelineData = ref([
  {
    year: "645",
    title: "唐代始建",
    event: "悯忠寺奠基",
    period: "唐贞观十九年",
    description:
      "唐太宗李世民为悼念东征阵亡将士下诏建寺，初名悯忠寺。工程浩大，历时51年才建成。建筑群采用典型唐代寺院布局，中轴线对称，建有山门、钟鼓楼、悯忠阁、大雄宝殿等核心建筑。建筑材料以木结构为主，屋顶覆盖青瓦，体现盛唐建筑的雄浑风格。",
    image:
      "https://img2.baidu.com/it/u=173075004,1001130261&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=500",
    metrics: [
      { value: "51年", label: "建造工期" },
      { value: "7进院落", label: "建筑布局" },
      { value: "30+座", label: "主要殿堂" },
    ],
    features: [
      "典型唐代寺院中轴对称布局",
      "木构架承重体系",
      "青瓦歇山顶建筑群",
    ],
  },
  {
    year: "882",
    title: "唐代焚毁",
    event: "寺院遭火灾",
    period: "唐中和二年",
    description:
      "悯忠寺遭火灾焚毁，主体建筑悯忠阁及东西双塔化为灰烬。此时正值唐末战乱，朝廷无力重修，寺院荒废近百年。史料记载'悯忠高阁，去天一握'的壮丽景象就此消失，仅存地基遗址。这是法源寺历史上第一次重大损毁。",
    image:
      "https://img0.baidu.com/it/u=2429986127,1302041570&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=500",
    metrics: [
      { value: "100%", label: "主殿损毁" },
      { value: "70年", label: "荒废时间" },
      { value: "2座", label: "焚毁佛塔" },
    ],
    features: ["主体建筑全毁", "仅存地基遗址", "荒废近百年"],
  },
  {
    year: "1057",
    title: "辽代地震",
    event: "寺院全毁",
    period: "辽清宁三年",
    description:
      "幽州大地震导致寺院全毁，这是法源寺历史上第二次重大损毁。辽代皇室虽崇信佛教，但因战事频繁，仅对部分建筑进行了简单修复。寺内现存最古老的建筑遗存——辽代石经幢就是震后重建时安放的。",
    image:
      "https://img2.baidu.com/it/u=4153467665,1521801940&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=500",
    metrics: [
      { value: "8.0级", label: "地震强度" },
      { value: "100%", label: "建筑损毁" },
      { value: "20年", label: "修复时间" },
    ],
    features: ["现存辽代石经幢", "部分建筑基础保留", "规模大幅缩减"],
  },
  {
    year: "1447",
    title: "明代重修",
    event: "敕令重建",
    period: "明正统二年",
    description:
      "明英宗敕令重修寺院，并赐额'崇福寺'。此次重建奠定了现存建筑群的基础格局。大雄宝殿、悯忠阁等主要建筑均按明代官式营造法式重建，采用楠木柱梁，屋顶改为黄色琉璃瓦。现存的明代风格斗拱和梁架结构大多源自此次重建。",
    image:
      "https://img0.baidu.com/it/u=1199122887,2021459&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=500",
    metrics: [
      { value: "30年", label: "工期" },
      { value: "48根", label: "楠木柱" },
      { value: "5进院落", label: "新布局" },
    ],
    features: ["黄色琉璃瓦顶", "明代官式斗拱", "楠木梁柱结构"],
  },
  {
    year: "1733",
    title: "雍正赐名",
    event: "法源寺定名",
    period: "清雍正十一年",
    description:
      "雍正皇帝敕令全面重修，赐名'法源寺'并沿用至今。重建工程严格按照清代营造则例，大修各殿宇，增建藏经阁、戒坛等重要建筑。寺内现存主体建筑大多定型于此次重修，形成了七进六院的宏大格局。同时铸造了大量佛教文物，现存寺内重要法器大多源于此时期。",
    image:
      "https://img1.baidu.com/it/u=330730148,3984278631&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=500",
    metrics: [
      { value: "法源寺", label: "赐名" },
      { value: "7进6院", label: "建筑格局" },
      { value: "300+件", label: "新增法器" },
    ],
    features: ["清代官式彩绘", "满汉双语匾额", "戒坛与藏经阁"],
  },
  {
    year: "1900",
    title: "庚子劫难",
    event: "寺院遭破坏",
    period: "清光绪二十六年",
    description:
      "八国联军占领北京期间，法源寺遭严重破坏。寺内文物被掠夺，建筑被损毁，佛像法器被劫掠一空。据记载，侵略军将寺院作为马厩和军营，导致多处建筑受损。这是近代史上法源寺最严重的劫难。",
    image:
      "https://img1.baidu.com/it/u=2479781627,3435865456&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=500",
    metrics: [
      { value: "60%", label: "建筑损毁" },
      { value: "200+件", label: "文物损失" },
      { value: "8年", label: "修复时间" },
    ],
    features: ["建筑作为马厩使用", "大量文物被掠夺", "佛像金箔被刮除"],
  },
  {
    year: "1956",
    title: "佛学院成立",
    event: "教育新篇章",
    period: "新中国时期",
    description:
      "法源寺成为中国佛学院所在地，开启佛教教育新篇章。政府拨款进行保护性修缮，修复了战争损毁的建筑部分。寺院功能从纯粹宗教场所转变为佛教教育中心，培养了大批佛教人才。1963年曾在此举办亚洲宗教会议。",
    image:
      "https://img0.baidu.com/it/u=1931515007,3894831794&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=500",
    metrics: [
      { value: "中国佛学院", label: "新功能" },
      { value: "200+位", label: "培养学僧" },
      { value: "40+次", label: "国际会议" },
    ],
    features: ["佛教教育中心", "保护性修缮", "国际交流平台"],
  },
  {
    year: "2001",
    title: "国保单位",
    event: "重点文物保护",
    period: "现代",
    description:
      "法源寺被列为全国重点文物保护单位，启动全面修缮工程。采用传统工艺修复了所有殿宇，重建了部分历史建筑。同时成立中国佛教图书文物馆，珍藏历代佛教文物。现今法源寺集宗教活动、文化展示、旅游观光于一体，成为北京重要的文化地标。",
    image:
      "https://img0.baidu.com/it/u=318203156,3842292057&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=500",
    metrics: [
      { value: "全国重点", label: "文物保护" },
      { value: "8万+件", label: "馆藏文物" },
      { value: "30万+", label: "年访客量" },
    ],
    features: ["传统工艺修复", "佛教文物馆藏", "多元文化空间"],
  },
]);

const isModalOpen = ref(false);

// 当前活动索引
const activeIndex = ref(0);

// 当前活动数据
const activeData = computed(() => timelineData.value[activeIndex.value]);

const selectedEvent = ref(null);

// 点击处理函数
function handleClick(index, event) {
  activeIndex.value = index;
  isModalOpen.value = true;
  selectedEvent.value = timelineData.value[index]; // ✅ 这才是正确的数据
}

function closeModal() {
  isModalOpen.value = false;
}

// ECharts图表实例
const chart = ref(null);
const typeChart = ref(null);
let chartInstance = null;
let typeChartInstance = null;

// 建筑规模变化数据
const chartData = ref({
  years: timelineData.value.map((item) => item.year),
  sizes: [85, 92, 95, 100, 87, 100], // 百分比数据
});

// 建筑类型分布数据
const typeData = ref({
  years: timelineData.value.map((item) => item.year),
  types: [
    { name: "祭祀建筑", data: [75, 65, 60, 60, 50, 55] },
    { name: "附属建筑", data: [15, 20, 25, 25, 25, 25] },
    { name: "服务设施", data: [0, 5, 5, 5, 15, 10] },
    { name: "园林景观", data: [10, 10, 10, 10, 10, 10] },
  ],
});

// 初始化规模变化图表
const initChart = () => {
  if (chart.value) {
    chartInstance = echarts.init(chart.value);

    const option = {
      tooltip: {
        trigger: "axis",
        formatter: "{b0}年<br/>规模：{c0}%",
      },
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true,
      },
      xAxis: {
        type: "category",
        data: chartData.value.years,
        axisLine: {
          lineStyle: {
            color: "#8b4513",
          },
        },
        axisLabel: {
          color: "#5a4a42",
        },
      },
      yAxis: {
        type: "value",
        min: 80,
        max: 105,
        axisLine: {
          lineStyle: {
            color: "#8b4513",
          },
        },
        axisLabel: {
          formatter: "{value}%",
          color: "#5a4a42",
        },
        splitLine: {
          lineStyle: {
            color: "rgba(139, 69, 19, 0.1)",
          },
        },
      },
      series: [
        {
          name: "建筑规模",
          type: "line",
          smooth: true,
          symbol: "circle",
          symbolSize: 8,
          lineStyle: {
            width: 4,
            color: "#d4a76a",
          },
          itemStyle: {
            color: "#8b4513",
          },
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: "rgba(212, 167, 106, 0.3)" },
              { offset: 1, color: "rgba(212, 167, 106, 0.05)" },
            ]),
          },
          data: chartData.value.sizes,
        },
      ],
    };

    chartInstance.setOption(option);
  }
};

// 初始化建筑类型分布图表
const initTypeChart = () => {
  if (typeChart.value) {
    typeChartInstance = echarts.init(typeChart.value);

    const option = {
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "shadow",
        },
      },
      legend: {
        data: typeData.value.types.map((item) => item.name),
        textStyle: {
          color: "#5a4a42",
        },
        bottom: 0,
      },
      grid: {
        left: "3%",
        right: "4%",
        bottom: "15%",
        containLabel: true,
      },
      xAxis: {
        type: "category",
        data: typeData.value.years,
        axisLine: {
          lineStyle: {
            color: "#8b4513",
          },
        },
        axisLabel: {
          color: "#5a4a42",
        },
      },
      yAxis: {
        type: "value",
        axisLine: {
          lineStyle: {
            color: "#8b4513",
          },
        },
        axisLabel: {
          formatter: "{value}%",
          color: "#5a4a42",
        },
        splitLine: {
          lineStyle: {
            color: "rgba(139, 69, 19, 0.1)",
          },
        },
      },
      series: typeData.value.types.map((type, index) => ({
        name: type.name,
        type: "bar",
        stack: "total",
        emphasis: {
          focus: "series",
        },
        data: type.data,
        itemStyle: {
          color: ["#d4a76a", "#8b4513", "#9c7c5c", "#5a4a42"][index],
        },
      })),
    };

    typeChartInstance.setOption(option);
  }
};

// 监听活动索引变化
watch(activeIndex, (newIndex) => {
  if (chartInstance) {
    chartInstance.dispatchAction({
      type: "downplay",
      seriesIndex: 0,
    });

    chartInstance.dispatchAction({
      type: "highlight",
      seriesIndex: 0,
      dataIndex: newIndex,
    });

    chartInstance.dispatchAction({
      type: "showTip",
      seriesIndex: 0,
      dataIndex: newIndex,
    });
  }

  if (typeChartInstance) {
    typeChartInstance.dispatchAction({
      type: "highlight",
      seriesIndex: newIndex,
    });
  }
});

// 响应窗口大小变化
const handleResize = () => {
  if (chartInstance) chartInstance.resize();
  if (typeChartInstance) typeChartInstance.resize();
};

onMounted(() => {
  initChart();
  initTypeChart();
  window.addEventListener("resize", handleResize);
});
</script>

<style scoped>
/* 基础容器样式 */
.lifecycle-container {
  font-family: "Noto Serif SC", "SimSun", serif;
  color: #5a4a42;
  background: linear-gradient(to bottom, #f9f5ed, #e8dfd1);
  min-height: 100vh;
  padding: 0;
  display: flex;
  flex-direction: column;
}

/* 头部区域 */
.lifecycle-header {
  text-align: center;
  padding: 60px 20px 30px;
  background: linear-gradient(to right, #c19a6b, #b78a56);
  position: relative;
  box-shadow: 0 4px 12px rgba(101, 67, 33, 0.2);
  margin-bottom: 30px;
}

.lifecycle-header h1 {
  font-size: 2.5em;
  color: #fff8e1;
  margin-bottom: 8px;
  font-weight: 700;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.3);
}

.intro-text {
  font-size: 1.1em;
  color: #fff8e1;
  max-width: 700px;
  margin: 0 auto 15px;
  line-height: 1.6;
  opacity: 0.9;
}

/* 返回按钮 */
.back-button {
  position: absolute;
  top: 20px;
  left: 20px;
  background-color: rgba(94, 66, 41, 0.8);
  color: #fff8e1;
  border: 1px solid #5d4037;
  padding: 8px 16px;
  border-radius: 20px;
  cursor: pointer;
  font-size: 0.9em;
  z-index: 10;
  transition: all 0.3s ease;
  backdrop-filter: blur(4px);
  box-shadow: 0 3px 12px rgba(0, 0, 0, 0.1);
}

.back-button:hover {
  background-color: rgba(121, 85, 72, 0.9);
  transform: translateX(-2px);
}

/* 状态概览卡片 */
.status-overview {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 25px;
  flex-wrap: wrap;
}

.status-card {
  background-color: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(5px);
  border-radius: 10px;
  padding: 15px 20px;
  min-width: 180px;
  display: flex;
  align-items: center;
  gap: 15px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.status-icon {
  font-size: 1.8em;
}

.status-card h3 {
  font-size: 0.9em;
  color: #fff8e1;
  margin: 0 0 5px;
  font-weight: normal;
}

.status-value {
  font-size: 1.4em;
  color: white;
  margin: 0;
  font-weight: bold;
}

/* 主要内容区域 */
.lifecycle-main {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 20px;
  width: 100%;
}

/* 时间轴导航 */
.timeline-nav {
  display: flex;
  justify-content: center;
  gap: 15px;
  margin: 0 auto 40px;
  max-width: 1000px;
  overflow-x: auto;
  padding: 10px 0;
}

.timeline-point {
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  transition: all 0.3s ease;
  min-width: 80px;
}

.timeline-point.active .timeline-year {
  color: #8b4513;
  font-weight: bold;
  transform: scale(1.1);
}

.timeline-marker {
  width: 12px;
  height: 12px;
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
  font-size: 1rem;
  color: #9c7c5c;
  transition: all 0.3s ease;
  white-space: nowrap;
}

/* 内容包装器 */
.content-wrapper {
  display: flex;
  gap: 30px;
}

/* 时间轴区域 */
.timeline-section {
  width: 100%;
  overflow-x: auto;
  padding-bottom: 20px; /* Space for scrollbar */
}

.timeline {
  position: relative;
  display: inline-flex; /* Changed from flex to inline-flex */
  align-items: center;
  padding: 40px 60px; /* Increased horizontal padding */
  height: auto;
  min-height: 120px;
  /* Add these: */
  min-width: 100%; /* Ensure it takes full width */
  white-space: nowrap; /* Prevent items from wrapping */
}

.timeline-line {
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(to right, #d4a76a, #8b4513);
  border-radius: 2px;
  z-index: 1;
}

/* 时间轴项横向排列 */
.timeline-item {
  position: relative;
  min-width: 180px;
  margin-right: 40px;
  padding-top: 60px;
  text-align: center;
  cursor: pointer;
  background: rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(5px);
  border: 1px solid rgba(139, 69, 19, 0.1);
  border-radius: 12px;
  z-index: 2;
  transition: all 0.4s ease;
}

.timeline-item:hover {
  background: rgba(255, 248, 225, 0.8);
  transform: translateY(-5px);
}

.timeline-item.active {
  background: rgba(255, 248, 225, 0.95);
  box-shadow: 0 10px 30px rgba(139, 69, 19, 0.15);
  transform: translateY(-10px);
}

.timeline-dot {
  position: absolute;
  top: -14px;
  left: 50%;
  transform: translateX(-50%);
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background-color: #d4a76a;
  border: 3px solid #f5f2e9;
  box-shadow: 0 0 0 4px rgba(212, 167, 106, 0.3);
  transition: all 0.4s ease;
  z-index: 3;
}

.timeline-item.active .timeline-dot {
  background-color: #8b4513;
  width: 22px;
  height: 22px;
  box-shadow: 0 0 0 6px rgba(139, 69, 19, 0.3);
}

.timeline-year {
  font-size: 1.1rem;
  font-weight: bold;
  color: #8b4513;
  margin-bottom: 5px;
}

.timeline-title {
  font-size: 1rem;
  color: #5a4a42;
  line-height: 1.5;
}

/* 历史卡片 */
.history-card {
  flex: 1.2;
  display: flex;
  flex-direction: column;
}

.history-info h2 {
  font-size: 28px;
  margin-bottom: 8px;
  color: #6c4f2c;
}

.history-info h2:after {
  content: "";
  position: absolute;
  bottom: -5px;
  left: 0;
  width: 60px;
  height: 2px;
  background: linear-gradient(90deg, #d4a76a 0%, #8b4513 100%);
}

.history-period {
  font-size: 16px;
  color: #9c805a;
  margin-bottom: 12px;
}

.history-desc {
  font-size: 16px;
  line-height: 1.8;
  margin-bottom: 20px;
  text-align: justify;
}

/* 数据指标 */
.history-metrics {
  display: flex;
  gap: 16px;
  margin-bottom: 20px;
}

.metric {
  background-color: #e8dbc2;
  padding: 12px;
  border-radius: 10px;
  text-align: center;
  min-width: 80px;
}

.metric-value {
  font-size: 18px;
  font-weight: bold;
  color: #5e4123;
}

.metric-label {
  font-size: 14px;
  color: #7e6b4e;
}

.architectural-features h3 {
  margin-bottom: 8px;
  color: #5e4123;
}

.architectural-features ul {
  padding-left: 20px;
  list-style: square;
}

.network-section {
  flex: 1;
  background-color: #f2ebd8;
  padding: 20px;
  border-radius: 12px;
  box-shadow: inset 0 0 12px rgba(100, 80, 40, 0.15);
  display: flex;
  flex-direction: column;
  align-items: center;
}

.network-section h3 {
  font-size: 20px;
  color: #6a5030;
  margin-bottom: 12px;
}

/* 可视化图表区域 */
.visualization-section {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
}

.visualization-card {
  background: linear-gradient(135deg, #ffffff 0%, #f9f5ed 100%);
  border-radius: 15px;
  padding: 25px;
  box-shadow: 0 10px 30px rgba(101, 67, 33, 0.1);
  border: 1px solid rgba(139, 69, 19, 0.1);
}

.visualization-card h3 {
  color: #5d4037;
  font-size: 1.2em;
  margin-top: 0;
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 1px solid #d4b483;
  text-align: center;
}

.chart-container {
  height: 250px;
  background-color: rgba(255, 253, 245, 0.5);
  border: 1px dashed #8d6e63;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #8d6e63;
  position: relative;
}

.chart-container:after {
  content: "可视化图表区域";
  position: absolute;
  font-size: 1.1em;
}

/* 页脚 */
.lifecycle-footer {
  text-align: center;
  padding: 25px 20px;
  margin-top: 50px;
  color: #5a4a42;
  font-size: 0.9em;
  border-top: 1px solid rgba(139, 69, 19, 0.15);
  background-color: rgba(255, 253, 245, 0.7);
}

/* 响应式设计 */
@media (max-width: 1200px) {
  .content-wrapper {
    flex-direction: column;
  }

  .timeline-section {
    margin-bottom: 40px;
  }

  .timeline {
    display: flex;
    flex-direction: column;
    padding: 0;
  }

  .timeline-line {
    display: none;
  }

  .timeline-item {
    padding: 15px;
    margin-bottom: 10px;
  }

  .timeline-dot {
    display: none;
  }
}

@media (max-width: 768px) {
  .lifecycle-header h1 {
    font-size: 2em;
    padding-top: 10px;
  }

  .status-overview {
    flex-direction: column;
    align-items: center;
  }

  .status-card {
    width: 100%;
    max-width: 250px;
  }

  .visualization-section {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 480px) {
  .lifecycle-header {
    padding: 40px 15px 30px;
  }

  .back-button {
    top: 15px;
    left: 15px;
    padding: 10px 15px;
  }

  .history-metrics {
    flex-direction: column;
    gap: 15px;
  }

  .history-info {
    padding: 20px;
  }

  .chart-container {
    height: 200px;
  }
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
}

.modal-content {
  background-color: #f4f1e1; /* 米黄色底 */
  border-radius: 16px;
  padding: 24px;
  max-width: 1200px;
  margin: 0 auto;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  font-family: "Serif", "Songti SC", serif;
  color: #3c2f1e;
}

.modal-body {
  display: flex;
  gap: 24px;
}

.modal-close {
  position: absolute;
  top: 10px;
  right: 15px;
  font-size: 24px;
  background: none;
  border: none;
  cursor: pointer;
}
</style>
