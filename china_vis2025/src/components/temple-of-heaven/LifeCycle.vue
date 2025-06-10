<template>
  <div class="lifecycle-container">
    <!-- 页面标题 -->
    <div class="lifecycle-header">
      <h1>天坛建筑群演变与修缮历程</h1>
      <p class="intro-text">从永乐敕建到世界文化遗产的六百年建筑变迁</p>
      <!-- 返回按钮 -->
      <button @click="goBack" class="back-button">← 返回天坛门户</button>
      <!-- 新增状态概览卡片 -->
      <div class="status-overview">
        <div class="status-card">
          <span class="status-icon">🏗️</span>
          <div>
            <h3>主要修缮</h3>
            <p class="status-value">23次</p>
          </div>
        </div>
        <div class="status-card">
          <span class="status-icon">⏳</span>
          <div>
            <h3>历史跨度</h3>
            <p class="status-value">602年</p>
          </div>
        </div>
        <div class="status-card">
          <span class="status-icon">📐</span>
          <div>
            <h3>现存面积</h3>
            <p class="status-value">273公顷</p>
          </div>
        </div>
      </div>
    </div>

    <!-- 主要内容区域 -->
    <div class="lifecycle-main">
      <!-- 时间轴导航 -->
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
        <!-- 时间轴左侧 -->
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

        <!-- 右侧内容区域 -->
        <div v-if="isModalOpen" class="modal-overlay" @click.self="closeModal">
          <!-- 弹窗内容 -->
          <div class="modal-content">
            <button class="modal-close" @click="closeModal">×</button>

            <div class="modal-body">
              <!-- 左侧文字内容 -->
              <div class="history-card">
                <!-- 图 + 标题 -->
                <div class="history-info">
                  <h2>{{ activeData.title }}</h2>
                  <div class="history-period">{{ activeData.period }}</div>
                  <div class="history-desc">{{ activeData.description }}</div>

                  <!-- 数据指标 -->
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

                  <!-- 建筑特点 -->
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

              <!-- 右侧网络图 -->
              <div class="network-section" v-if="selectedEvent">
                <h3>{{ selectedEvent.year }}年：{{ selectedEvent.event }}</h3>
                <LandmarkNetwork
                  :landmark="forbiddenCity"
                  :event="selectedEvent"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 可视化图表区域 -->
      <div class="visualization-section">
        <div class="visualization-card">
          <h3>建筑规模演变</h3>
          <div ref="chart" class="chart-container"></div>
        </div>
        <div class="visualization-card">
          <h3>建筑类型分布</h3>
          <div ref="typeChart" class="chart-container"></div>
        </div>
        <div class="visualization-card">
          <h3>修缮材料变化</h3>
          <div class="chart-container"></div>
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
const goBack = () => router.push("/landmarks/temple-of-heaven");

// 时间轴数据 - 重点强化建筑演变内容
const timelineData = ref([
  {
    year: "1420",
    title: "永乐敕建",
    event: "开始建造",
    period: "明永乐十八年",
    description:
      '明成祖朱棣下诏建造天地坛，作为皇帝祭天、祈谷的场所。初建时采用天地合祀格局，主要建筑包括大祀殿、大祀门、斋宫等，奠定了天坛建筑群的基本格局。建筑群严格遵循"天圆地方"的宇宙观设计，主体建筑呈圆形，围墙为方形。',
    image: "https://picsum.photos/600/400?temple=1",
    metrics: [
      { value: "273公顷", label: "占地面积" },
      { value: "20座", label: "主要建筑" },
      { value: "4大区域", label: "建筑分区" },
    ],
    features: [
      "大祀殿为矩形重檐建筑",
      "采用蓝绿为主色调的琉璃瓦",
      "严格的中轴对称布局",
    ],
  },
  {
    year: "1530",
    title: "天地分祀",
    period: "明嘉靖九年",
    description:
      "嘉靖皇帝改革礼制，实行天地分祀制度。在天地坛南郊新建圜丘坛专用于祭天，原天地坛改建为祈谷坛（后称祈年殿）。此次改造新增了圜丘、皇穹宇等建筑，改变了天坛的整体格局。建筑工艺上大量使用汉白玉石材，形成了三重圆坛的独特结构。",
    image: "https://picsum.photos/600/400?temple=2",
    metrics: [
      { value: "圜丘坛", label: "新增建筑" },
      { value: "3层结构", label: "圜丘形制" },
      { value: "360块", label: "栏板数量" },
    ],
    features: [
      "圜丘三层九重坛台结构",
      "皇穹宇圆形单檐建筑",
      "汉白玉栏板雕刻云龙纹",
    ],
  },
  {
    year: "1751",
    title: "乾隆大修",
    period: "清乾隆十六年",
    description:
      "乾隆皇帝对天坛进行了史上最大规模的改建和扩建。将祈年殿三重檐全部更换为象征天空的蓝色琉璃瓦，重建皇穹宇为单檐圆攒尖顶，扩建圜丘坛。同时改建了斋宫、神乐署等配套建筑，形成了今日所见的天坛基本格局。此次修缮采用了最高规格的建筑材料和技术。",
    image: "https://picsum.photos/600/400?temple=3",
    metrics: [
      { value: "12年", label: "工期" },
      { value: "9.5万两", label: "耗银" },
      { value: "30处", label: "修缮建筑" },
    ],
    features: ["祈年殿蓝色琉璃瓦顶", "皇穹宇单檐圆攒尖顶", "楠木梁柱结构体系"],
  },
  {
    year: "1889",
    title: "祈年殿重建",
    period: "清光绪十五年",
    description:
      "祈年殿遭雷击焚毁，光绪皇帝下令按原样重建。此次重建严格遵循乾隆时期的建筑规制，采用珍贵的楠木作为主要结构材料，历时七年完成。重建过程中采用了传统榫卯结构技术，没有使用一颗钉子，成为中国古代木构建筑的巅峰之作。建筑细节上恢复了乾隆时期的彩绘图案。",
    image: "https://picsum.photos/600/400?temple=4",
    metrics: [
      { value: "38米", label: "高度" },
      { value: "28根", label: "楠木柱" },
      { value: "7年", label: "工期" },
    ],
    features: ["三重檐圆攒尖顶", "28根楠木柱象征星宿", "榫卯结构无钉建造"],
  },
  {
    year: "1918",
    title: "辟为公园",
    period: "民国七年",
    description:
      "天坛结束近500年的皇家禁地历史，正式作为公园向公众开放。民国政府对部分建筑进行了保护性修缮，修复了因战乱损坏的围墙和部分殿宇。同时增加了服务性建筑，如售票处、休息亭等，使建筑群适应公共游览需求。这一转变开启了天坛从皇家祭祀场所到公共文化空间的演变。",
    image: "https://picsum.photos/600/400?temple=5",
    metrics: [
      { value: "20万+", label: "年游客量" },
      { value: "10处", label: "开放区域" },
      { value: "5处", label: "新增设施" },
    ],
    features: ["保持原有建筑格局", "新增公共游览设施", "部分建筑功能转换"],
  },
  {
    year: "1998",
    title: "世界遗产",
    period: "现代",
    description:
      '天坛被联合国教科文组织列入《世界遗产名录》。中国政府启动了大规模的保护性修缮工程，采用传统工艺和材料对祈年殿、皇穹宇、圜丘等主要建筑进行了全面修缮。同时建立了科学的建筑监测系统，对木结构、彩绘等进行数字化保护。修缮严格遵循"修旧如旧"原则，恢复了部分历史建筑原貌。',
    image: "https://picsum.photos/600/400?temple=6",
    metrics: [
      { value: "273公顷", label: "保护面积" },
      { value: "50+次", label: "专业修缮" },
      { value: "800万+", label: "年游客量" },
    ],
    features: [
      "传统工艺与现代技术结合",
      "数字化建筑监测系统",
      "遗产完整性保护",
    ],
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
