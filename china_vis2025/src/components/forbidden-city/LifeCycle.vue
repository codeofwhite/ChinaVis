<template>
  <div class="lifecycle-container">
    <!-- 返回按钮 -->
    <button @click="goBack" class="back-button">← 返回天坛门户</button>

    <!-- 页面标题 -->
    <div class="lifecycle-header">
      <h1>天坛建筑群演变与修缮历程</h1>
      <p>从永乐敕建到世界文化遗产的六百年建筑变迁</p>
    </div>

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

    <!-- 主要内容区域 -->
    <div class="lifecycle-content">
      <!-- 时间轴左侧 -->
      <div class="timeline-section">
        <div class="timeline">
          <div class="timeline-line"></div>
          <div
            v-for="(item, index) in timelineData"
            :key="index"
            :class="['timeline-item', { active: activeIndex === index }]"
            @click="setActiveIndex(index)"
          >
            <div class="timeline-dot"></div>
            <div class="timeline-year">{{ item.year }}</div>
            <div class="timeline-title">{{ item.title }}</div>
          </div>
        </div>
      </div>

      <!-- 右侧内容区域 -->
      <div class="content-section">
        <div class="history-card">
          <div class="history-media"></div>
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

            <!-- 新增建筑特点部分 -->
            <div class="architectural-features" v-if="activeData.features">
              <h3>建筑特点</h3>
              <ul>
                <li v-for="(feature, idx) in activeData.features" :key="idx">
                  {{ feature }}
                </li>
              </ul>
            </div>
          </div>
        </div>

        <!-- 建筑规模变化图表 -->
        <div class="chart-section">
          <h3>天坛建筑群规模演变</h3>
          <div ref="chart" class="chart-container"></div>
        </div>

        <!-- 新增建筑类型分布图表 -->
        <div class="chart-section">
          <h3>建筑类型分布变化</h3>
          <div ref="typeChart" class="chart-container"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, computed } from "vue";
import { useRouter } from "vue-router";
import * as echarts from "echarts";

const router = useRouter();

// 返回门户主页
const goBack = () => router.push("/landmarks/forbidden-city");

// 时间轴数据 - 重点强化建筑演变内容
const timelineData = ref([
  {
    year: "1420",
    title: "永乐敕建",
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

// 当前活动索引
const activeIndex = ref(0);
const setActiveIndex = (index) => {
  activeIndex.value = index;
};

// 当前活动数据
const activeData = computed(() => timelineData.value[activeIndex.value]);

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
/* 新增样式 */
.history-media img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.8s ease;
}

.history-card:hover .history-media img {
  transform: scale(1.05);
}

.architectural-features {
  margin-top: 25px;
  padding-top: 20px;
  border-top: 1px dashed rgba(139, 69, 19, 0.2);
}

.architectural-features h3 {
  font-size: 1.2rem;
  color: #8b4513;
  margin-bottom: 12px;
}

.architectural-features ul {
  list-style-type: none;
  padding-left: 20px;
}

.architectural-features li {
  position: relative;
  margin-bottom: 10px;
  padding-left: 20px;
  color: #5a4a42;
}

.architectural-features li:before {
  content: "•";
  color: #d4a76a;
  font-size: 1.5rem;
  position: absolute;
  left: 0;
  top: -3px;
}

/* 原有样式保持不变 */
.lifecycle-container {
  font-family: "Noto Serif SC", serif;
  color: #333;
  line-height: 1.6;
  background: linear-gradient(135deg, #f5f2e9 0%, #e8d8c3 100%);
  min-height: 100vh;
  padding: 20px;
  position: relative;
  overflow-x: hidden;
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

.back-button:hover {
  background-color: rgba(160, 82, 45, 0.9);
  transform: translateX(-5px);
}

.lifecycle-header {
  text-align: center;
  padding: 60px 20px 40px;
  position: relative;
}

.lifecycle-header h1 {
  font-size: 2.8rem;
  color: #8b4513;
  margin-bottom: 15px;
  position: relative;
  display: inline-block;
}

.lifecycle-header h1:after {
  content: "";
  position: absolute;
  bottom: -10px;
  left: 50%;
  transform: translateX(-50%);
  width: 120px;
  height: 3px;
  background: linear-gradient(90deg, #d4a76a 0%, #8b4513 100%);
  border-radius: 3px;
}

.lifecycle-header p {
  font-size: 1.2rem;
  color: #5a4a42;
  max-width: 700px;
  margin: 20px auto 0;
  line-height: 1.8;
}

/* 时间轴导航 */
.timeline-nav {
  display: flex;
  justify-content: center;
  gap: 15px;
  margin: 20px auto 40px;
  max-width: 1000px;
}

.timeline-point {
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  transition: all 0.3s ease;
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
}

/* 主要内容布局 */
.lifecycle-content {
  display: flex;
  max-width: 1400px;
  margin: 0 auto;
  gap: 40px;
}

.timeline-section {
  flex: 1;
  position: relative;
}

.content-section {
  flex: 2;
}

/* 时间轴样式 */
.timeline {
  position: relative;
  padding: 40px 0;
}

.timeline-line {
  position: absolute;
  left: 30px;
  top: 0;
  bottom: 0;
  width: 4px;
  background: linear-gradient(to bottom, #d4a76a, #8b4513);
  border-radius: 2px;
}

.timeline-item {
  position: relative;
  padding: 25px 20px 25px 70px;
  margin-bottom: 10px;
  cursor: pointer;
  border-radius: 12px;
  transition: all 0.4s ease;
  background: rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(5px);
  border: 1px solid rgba(139, 69, 19, 0.1);
}

.timeline-item:hover {
  background: rgba(255, 248, 225, 0.8);
  transform: translateX(10px);
}

.timeline-item.active {
  background: rgba(255, 248, 225, 0.95);
  box-shadow: 0 10px 30px rgba(139, 69, 19, 0.15);
  transform: translateX(15px);
}

.timeline-dot {
  position: absolute;
  left: 26px;
  top: 50%;
  transform: translateY(-50%);
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: #d4a76a;
  border: 3px solid #f5f2e9;
  box-shadow: 0 0 0 4px rgba(212, 167, 106, 0.3);
  transition: all 0.4s ease;
}

.timeline-item.active .timeline-dot {
  background-color: #8b4513;
  width: 24px;
  height: 24px;
  box-shadow: 0 0 0 6px rgba(139, 69, 19, 0.3);
}

.timeline-year {
  font-size: 1.3rem;
  font-weight: bold;
  color: #8b4513;
  margin-bottom: 8px;
}

.timeline-title {
  font-size: 1.1rem;
  color: #5a4a42;
  line-height: 1.5;
}

/* 历史卡片样式 */
.history-card {
  background: linear-gradient(135deg, #ffffff 0%, #f9f5ed 100%);
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 15px 40px rgba(101, 67, 33, 0.15);
  display: flex;
  flex-direction: column;
}

.history-media {
  height: 300px;
  overflow: hidden;
  position: relative;
}

.history-info {
  padding: 30px;
}

.history-info h2 {
  font-size: 2rem;
  color: #8b4513;
  margin-bottom: 10px;
  position: relative;
  display: inline-block;
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
  font-size: 1.1rem;
  color: #9c7c5c;
  font-style: italic;
  margin-bottom: 20px;
}

.history-desc {
  font-size: 1.05rem;
  color: #5a4a42;
  line-height: 1.8;
  margin-bottom: 30px;
}

.history-metrics {
  display: flex;
  gap: 20px;
  border-top: 1px dashed rgba(139, 69, 19, 0.2);
  padding-top: 20px;
}

.metric {
  text-align: center;
  flex: 1;
}

.metric-value {
  font-size: 1.5rem;
  font-weight: bold;
  color: #8b4513;
  margin-bottom: 5px;
}

.metric-label {
  font-size: 0.9rem;
  color: #9c7c5c;
}

/* 图表区域 */
.chart-section {
  margin-top: 40px;
  background: linear-gradient(135deg, #ffffff 0%, #f9f5ed 100%);
  border-radius: 20px;
  padding: 30px;
  box-shadow: 0 15px 40px rgba(101, 67, 33, 0.15);
}

.chart-section h3 {
  font-size: 1.5rem;
  color: #8b4513;
  margin-bottom: 20px;
  text-align: center;
  position: relative;
  padding-bottom: 15px;
}

.chart-section h3:after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 80px;
  height: 2px;
  background: linear-gradient(90deg, #d4a76a 0%, #8b4513 100%);
}

.chart-container {
  height: 300px;
  width: 100%;
}

/* 响应式设计 */
@media (max-width: 1200px) {
  .lifecycle-content {
    flex-direction: column;
  }

  .timeline-section {
    margin-bottom: 40px;
  }
}

@media (max-width: 768px) {
  .lifecycle-header h1 {
    font-size: 2.2rem;
  }

  .timeline-item {
    padding: 20px 15px 20px 60px;
  }

  .history-media {
    height: 250px;
  }

  .chart-section {
    padding: 20px;
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
    height: 250px;
  }
}
</style>
