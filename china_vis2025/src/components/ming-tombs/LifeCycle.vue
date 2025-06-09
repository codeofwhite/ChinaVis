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
const goBack = () => router.push("/landmarks/ming-tombs");

// 时间轴数据 - 重点强化建筑演变内容
const timelineData = ref([
  {
    year: "1409",
    title: "长陵始建",
    event: "陵寝营建开始",
    period: "明永乐七年",
    description:
      "明成祖朱棣选定北京昌平天寿山南麓作为皇家陵区，开始营建自己的长陵。长陵作为十三陵的首陵，奠定了明代帝陵的基本规制：前有神道、石像生，中有棱恩殿，后有方城明楼和宝城。建筑采用最高规格的黄琉璃瓦顶和楠木梁柱结构。",
    image: "https://picsum.photos/600/400?mingtomb=1",
    metrics: [
      { value: "7年", label: "营建工期" },
      { value: "120亩", label: "陵园面积" },
      { value: "32座", label: "主要建筑" },
    ],
    features: ["黄琉璃瓦顶", "楠木梁柱结构", "前朝后寝格局"],
  },
  {
    year: "1424",
    title: "长陵竣工",
    period: "明永乐二十二年",
    description:
      "长陵正式竣工，朱棣成为首位入葬十三陵的明朝皇帝。陵区形成完整规制：神道长1.2公里，两侧排列石像生18对；棱恩殿面阔9间，进深5间，象征'九五之尊'；宝城直径达300米，为十三陵中规模最大。",
    image: "https://picsum.photos/600/400?mingtomb=2",
    metrics: [
      { value: "1.2公里", label: "神道长度" },
      { value: "18对", label: "石像生数量" },
      { value: "300米", label: "宝城直径" },
    ],
    features: ["九五之尊规制", "石像生雕刻", "三进院落布局"],
  },
  {
    year: "1540",
    title: "石牌坊建立",
    period: "明嘉靖十九年",
    description:
      "在十三陵神道最南端建立石牌坊，为陵区标志性入口建筑。牌坊为五门六柱十一楼结构，宽28.86米，高14米，全部用汉白玉石雕琢而成，是中国现存最大、最早的石牌坊。",
    image: "https://picsum.photos/600/400?mingtomb=3",
    metrics: [
      { value: "28.86米", label: "宽度" },
      { value: "14米", label: "高度" },
      { value: "11座", label: "楼阁数量" },
    ],
    features: ["汉白玉石材", "五门六柱结构", "浮雕云龙纹饰"],
  },
  {
    year: "1644",
    title: "营建终止",
    period: "明崇祯十七年",
    description:
      "随着明朝灭亡，十三陵的营建终止于崇祯帝入葬思陵。此时陵区总面积已达120平方公里，共葬有13位皇帝、23位皇后，形成中国现存规模最大、保存最完整的皇家陵寝建筑群。",
    image: "https://picsum.photos/600/400?mingtomb=4",
    metrics: [
      { value: "13座", label: "帝陵数量" },
      { value: "120km²", label: "总面积" },
      { value: "235年", label: "营建历时" },
    ],
    features: ["依山而建布局", "统一规划风格", "完整陵寝体系"],
  },
  {
    year: "1650",
    title: "清代保护",
    period: "清顺治七年",
    description:
      "清廷为笼络汉人，对明十三陵予以保护并多次修缮。设立专门护陵机构，划拨守陵户，定期祭祀。康熙、乾隆时期曾进行大规模修缮，基本保持了明代陵寝的原貌和格局。",
    image: "https://picsum.photos/600/400?mingtomb=5",
    metrics: [
      { value: "12次", label: "大型修缮" },
      { value: "500人", label: "守陵人员" },
      { value: "100两", label: "年维护银两" },
    ],
    features: ["保持明代原貌", "增设护陵机构", "定期祭祀制度"],
  },
  {
    year: "1956",
    title: "定陵发掘",
    period: "现代",
    description:
      "在吴晗、郭沫若等倡议下，开始对定陵（万历皇帝陵）进行考古发掘。这是中国首次对帝王陵寝进行科学发掘，出土金冠、凤冠等珍贵文物3000余件，但部分文物因保护技术不足而损毁。",
    image: "https://picsum.photos/600/400?mingtomb=6",
    metrics: [
      { value: "3000+", label: "出土文物" },
      { value: "2年", label: "发掘时间" },
      { value: "1959年", label: "博物馆开放" },
    ],
    features: ["地下宫殿发掘", "丝织品保护难题", "考古技术探索"],
  },
  {
    year: "1961",
    title: "国保单位",
    period: "现代",
    description:
      "国务院将明十三陵列为第一批全国重点文物保护单位。开始系统性的文物建档和保护规划，对陵区建筑进行测绘记录，为后续保护工作奠定基础。",
    image: "https://picsum.photos/600/400?mingtomb=7",
    metrics: [
      { value: "第一批", label: "国保批次" },
      { value: "80处", label: "保护建筑" },
      { value: "50卷", label: "测绘图纸" },
    ],
    features: ["系统性建档", "科学测绘记录", "保护规划制定"],
  },
  {
    year: "1982",
    title: "风景名胜区",
    period: "现代",
    description:
      '国务院批准设立"八达岭-十三陵风景名胜区"，将十三陵纳入国家级风景名胜保护体系。开始整治周边环境，控制建设活动，保护陵区历史风貌和生态环境。',
    image: "https://picsum.photos/600/400?mingtomb=8",
    metrics: [
      { value: "300km²", label: "保护区" },
      { value: "10km", label: "缓冲带" },
      { value: "1985年", label: "规划完成" },
    ],
    features: ["整体景观保护", "环境整治", "建设控制"],
  },
  {
    year: "2003",
    title: "世界遗产",
    period: "现代",
    description:
      '明十三陵作为"明清皇家陵寝"扩展项目被联合国教科文组织列入《世界遗产名录》。国际认可其建筑艺术成就和文化价值，推动保护标准提升，采用数字化监测等现代技术手段。',
    image: "https://picsum.photos/600/400?mingtomb=9",
    metrics: [
      { value: "120km²", label: "遗产区" },
      { value: "13项", label: "核心遗产" },
      { value: "20+", label: "监测系统" },
    ],
    features: ["国际保护标准", "数字化监测", "完整性保护"],
  },
  {
    year: "2020",
    title: "现代保护",
    period: "现代",
    description:
      "实施《明十三陵保护规划》，采用传统工艺与现代技术结合的方式全面修缮陵寝建筑。使用三维扫描记录建筑细节，传统材料修复彩绘，钢结构加固木构架，实现文化遗产的科学保护与传承。",
    image: "https://picsum.photos/600/400?mingtomb=10",
    metrics: [
      { value: "15年", label: "规划周期" },
      { value: "3D扫描", label: "记录技术" },
      { value: "30处", label: "修缮建筑" },
    ],
    features: ["传统工艺复兴", "现代技术应用", "科学保护体系"],
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
