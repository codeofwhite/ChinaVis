<template>
  <div class="lifecycle-container">
    <!-- 返回按钮 -->
    <button @click="goBack" class="back-button">← 返回北海公园门户</button>
    <div class="p-4">
      <h1 class="text-2xl font-bold mb-4">北海公园数据可视化</h1>
      <div class="influence-header">
        <h1>北海公园数据洞察</h1>
        <p>多维度分析北海公园的游客特征与社会影响</p>
      </div>
      <div class="charts-grid">
        <!-- 游客画像雷达图 -->
        <div class="chart-card">
          <h2 class="chart-title">游客画像</h2>
          <div ref="radarChart" class="chart-box"></div>
          <div class="chart-desc">
            展示不同年龄段、性别、本地游客和文化兴趣的分布，反映北海公园主要游客群体特征。
          </div>
        </div>
        <!-- 媒体报道数量折线图 -->
        <div class="chart-card">
          <h2 class="chart-title">媒体报道</h2>
          <div ref="mediaLineChart" class="chart-box"></div>
          <div class="chart-desc">
            展示近年媒体对北海公园的关注度变化，反映其社会曝光度和影响力趋势。
          </div>
        </div>
        <!-- 海外提及增长趋势图 -->
        <div class="chart-card">
          <h2 class="chart-title">海外提及</h2>
          <div ref="internationalLineChart" class="chart-box"></div>
          <div class="chart-desc">
            展示北海公园在海外媒体和社交平台的提及次数，体现其国际知名度变化。
          </div>
        </div>
        <!-- 年龄段分布饼图 -->
        <div class="chart-card">
          <h2 class="chart-title">年龄分布</h2>
          <div ref="agePieChart" class="chart-box"></div>
          <div class="chart-desc">
            展示不同年龄段游客的占比，帮助了解北海公园的受众年龄结构。
          </div>
        </div>
        <!-- 互动热度柱状图 -->
        <div class="chart-card">
          <h2 class="chart-title">互动热度</h2>
          <div ref="interactionBarChart" class="chart-box"></div>
          <div class="chart-desc">
            展示北海公园在各大平台的互动热度，反映其在新媒体和社交网络的活跃度。
          </div>
        </div>
        <!-- 桑基图（游客游览路径流向） -->
        <div class="chart-card">
          <h2 class="chart-title">游客游览路径流向</h2>
          <div ref="sankeyChart" class="chart-box"></div>
          <div class="chart-desc">
            直观展现游客从入口到各景点再到出口的流动和比例，帮助理解游客路线优化和园区动线。
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import * as echarts from "echarts";
import { useRouter } from "vue-router";

const router = useRouter();
function goBack() {
  router.push("/landmarks/beihai-park");
}

const radarChart = ref(null);
const mediaLineChart = ref(null);
const internationalLineChart = ref(null);
const agePieChart = ref(null);
const interactionBarChart = ref(null);
const sankeyChart = ref(null);

onMounted(() => {
  // 游客画像雷达图
  const radar = echarts.init(radarChart.value);
  radar.setOption({
    tooltip: {},
    radar: {
      indicator: [
        { name: "18-25", max: 100 },
        { name: "26-35", max: 100 },
        { name: "女性", max: 100 },
        { name: "本地", max: 100 },
        { name: "文化兴趣", max: 100 },
      ],
    },
    series: [
      {
        type: "radar",
        data: [
          {
            value: [80, 70, 65, 50, 90],
            name: "游客画像",
          },
        ],
      },
    ],
  });

  // 媒体报道数量折线图
  const mediaLine = echarts.init(mediaLineChart.value);
  mediaLine.setOption({
    tooltip: { trigger: "axis" },
    xAxis: {
      type: "category",
      data: ["2019", "2020", "2021", "2022", "2023", "2024"],
    },
    yAxis: { type: "value" },
    series: [
      {
        data: [50, 60, 120, 180, 220, 300],
        type: "line",
        smooth: true,
        name: "媒体报道量",
      },
    ],
  });

  // 海外提及增长趋势图
  const internationalLine = echarts.init(internationalLineChart.value);
  internationalLine.setOption({
    tooltip: { trigger: "axis" },
    xAxis: {
      type: "category",
      data: ["2019", "2020", "2021", "2022", "2023", "2024"],
    },
    yAxis: { type: "value" },
    series: [
      {
        data: [5, 8, 12, 30, 50, 95],
        type: "line",
        name: "海外提及量",
        smooth: true,
        areaStyle: {},
      },
    ],
  });

  // 年龄段分布饼图
  const agePie = echarts.init(agePieChart.value);
  agePie.setOption({
    tooltip: { trigger: "item" },
    legend: { top: "bottom" },
    series: [
      {
        type: "pie",
        radius: "50%",
        data: [
          { value: 35, name: "18-25岁" },
          { value: 40, name: "26-35岁" },
          { value: 15, name: "36-45岁" },
          { value: 10, name: "其他" },
        ],
      },
    ],
  });

  // 互动热度柱状图
  const bar = echarts.init(interactionBarChart.value);
  bar.setOption({
    tooltip: { trigger: "axis" },
    xAxis: {
      type: "category",
      data: ["微博", "抖音", "小红书", "微信公众号", "新闻网站"],
    },
    yAxis: { type: "value" },
    series: [
      {
        data: [320, 410, 290, 180, 150],
        type: "bar",
        name: "热度指数",
      },
    ],
  });

  // 桑基图（游客游览路径流向）
  const sankey = echarts.init(sankeyChart.value);
  sankey.setOption({
    tooltip: { trigger: "item", triggerOn: "mousemove" },
    series: [
      {
        type: "sankey",
        layout: "none",
        data: [
          { name: "入口" },
          { name: "琼岛" },
          { name: "白塔" },
          { name: "九龙壁" },
          { name: "小西天" },
          { name: "出口" },
        ],
        links: [
          { source: "入口", target: "琼岛", value: 320 },
          { source: "琼岛", target: "白塔", value: 250 },
          { source: "琼岛", target: "九龙壁", value: 120 },
          { source: "白塔", target: "小西天", value: 100 },
          { source: "九龙壁", target: "小西天", value: 80 },
          { source: "小西天", target: "出口", value: 170 },
        ],
        emphasis: {
          focus: "adjacency",
        },
        lineStyle: {
          color: "gradient",
          curveness: 0.5,
        },
        label: {
          color: "#8b4513",
        },
      },
    ],
  });
});
</script>

<style scoped>
.lifecycle-container {
  padding: 30px 10px 60px 10px;
  max-width: 1200px;
  margin: 0 auto;
}
.back-button {
  margin-bottom: 20px;
  background: #8b4513;
  color: #fff8e1;
  border: none;
  padding: 10px 22px;
  border-radius: 30px;
  cursor: pointer;
  font-size: 1em;
  transition: all 0.3s;
}
.back-button:hover {
  background: #a67c52;
}
.influence-header {
  margin-bottom: 30px;
  text-align: center;
}
.influence-header h1 {
  font-size: 2em;
  color: #8b4513;
  margin-bottom: 8px;
}
.influence-header p {
  color: #5a4a42;
  font-size: 1.1em;
}
.charts-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 32px;
}
.chart-card {
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(139, 69, 19, 0.08);
  padding: 18px 18px 12px 18px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.chart-title {
  font-size: 1.2em;
  font-weight: bold;
  color: #8b4513;
  margin-bottom: 10px;
}
.chart-box {
  width: 100%;
  height: 400px;
  min-height: 220px;
}
.chart-desc {
  margin-top: 10px;
  color: #5a4a42;
  font-size: 0.98em;
  text-align: center;
}
@media (max-width: 900px) {
  .charts-grid {
    grid-template-columns: 1fr;
  }
}
</style>
