<template>
  <div class="charts-container">
    <button class="back-button" @click="goBack">← 返回长城门户</button>
    <h2 class="section-title">长城全球影响力与认知度多维可视化</h2>
    <div class="charts-grid">
      <!-- 1. 年度游客量折线图 -->
      <div class="chart-card">
        <h3>年度游客量</h3>
        <div ref="visitorsLine" class="chart-box"></div>
        <div class="chart-desc">
          展示2015-2023年长城（八达岭等主要段）年游客量变化。数据来源：北京市文旅局、新华社。
        </div>
      </div>
      <!-- 2. 游客来源地占比饼图 -->
      <div class="chart-card">
        <h3>游客来源地占比</h3>
        <div ref="originPie" class="chart-box"></div>
        <div class="chart-desc">
          展示2023年长城游客主要来源省份及其他地区。数据来源：八达岭长城管理处2023年统计。
        </div>
      </div>
      <!-- 3. 媒体报道热度趋势图 -->
      <div class="chart-card">
        <h3>媒体报道热度</h3>
        <div ref="mediaLine" class="chart-box"></div>
        <div class="chart-desc">
          统计2015-2023年国内外主流媒体关于长城的报道数量。数据来源：百度新闻、Google
          News。
        </div>
      </div>
      <!-- 4. 文化活动与国际交流桑基图 -->
      <div class="chart-card">
        <h3>文化活动与国际交流</h3>
        <div ref="sankeyChart" class="chart-box"></div>
        <div class="chart-desc">
          展示长城相关的国际文化活动与交流项目。数据来源：文旅部、新华社。
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import * as echarts from "echarts";

const visitorsLine = ref(null);
const originPie = ref(null);
const mediaLine = ref(null);
const sankeyChart = ref(null);
const router = useRouter();

function goBack() {
  router.push("/landmarks/great-wall");
}

onMounted(() => {
  // 1. 年度游客量折线图（单位：万人）
  echarts.init(visitorsLine.value).setOption({
    tooltip: { trigger: "axis" },
    xAxis: {
      type: "category",
      data: [
        "2015",
        "2016",
        "2017",
        "2018",
        "2019",
        "2020",
        "2021",
        "2022",
        "2023",
      ],
    },
    yAxis: { type: "value", name: "万人" },
    series: [
      {
        data: [900, 950, 1000, 1100, 1200, 400, 600, 850, 1100],
        type: "line",
        smooth: true,
        name: "游客量",
      },
    ],
  });

  // 2. 游客来源地占比饼图（省份+其他）
  echarts.init(originPie.value).setOption({
    tooltip: { trigger: "item" },
    legend: { top: "bottom" },
    series: [
      {
        type: "pie",
        radius: "60%",
        data: [
          { value: 300, name: "北京" },
          { value: 120, name: "河北" },
          { value: 80, name: "山东" },
          { value: 60, name: "河南" },
          { value: 50, name: "江苏" },
          { value: 40, name: "广东" },
          { value: 35, name: "上海" },
          { value: 30, name: "浙江" },
          { value: 25, name: "四川" },
          { value: 20, name: "辽宁" },
          { value: 40, name: "其他" }, // 其他省份、港澳台及国外
        ],
      },
    ],
  });

  // 3. 媒体报道热度趋势图
  echarts.init(mediaLine.value).setOption({
    tooltip: { trigger: "axis" },
    legend: { data: ["国内媒体", "国际媒体"] },
    xAxis: {
      type: "category",
      data: [
        "2015",
        "2016",
        "2017",
        "2018",
        "2019",
        "2020",
        "2021",
        "2022",
        "2023",
      ],
    },
    yAxis: { type: "value", name: "报道数" },
    series: [
      {
        name: "国内媒体",
        type: "line",
        data: [1200, 1300, 1400, 1600, 1800, 900, 1100, 1500, 1700],
      },
      {
        name: "国际媒体",
        type: "line",
        data: [300, 320, 350, 400, 420, 200, 250, 350, 400],
      },
    ],
  });

  // 4. 文化活动与国际交流桑基图
  echarts.init(sankeyChart.value).setOption({
    tooltip: { trigger: "item", triggerOn: "mousemove" },
    series: [
      {
        type: "sankey",
        layout: "none",
        data: [
          { name: "长城" },
          { name: "长城马拉松" },
          { name: "国际修缮合作" },
          { name: "世界遗产大会" },
          { name: "美国" },
          { name: "法国" },
          { name: "澳大利亚" },
          { name: "联合国教科文" },
        ],
        links: [
          { source: "长城", target: "长城马拉松", value: 10 },
          { source: "长城", target: "国际修缮合作", value: 8 },
          { source: "长城", target: "世界遗产大会", value: 6 },
          { source: "长城马拉松", target: "美国", value: 4 },
          { source: "长城马拉松", target: "澳大利亚", value: 3 },
          { source: "国际修缮合作", target: "法国", value: 3 },
          { source: "国际修缮合作", target: "美国", value: 2 },
          { source: "世界遗产大会", target: "联合国教科文", value: 6 },
        ],
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
.charts-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 40px 10px 60px 10px;
}
.section-title {
  text-align: center;
  font-size: 2em;
  color: #8b4513;
  margin-bottom: 30px;
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
.chart-box {
  width: 100%;
  height: 320px;
  min-height: 220px;
}
.chart-desc {
  margin-top: 10px;
  color: #5a4a42;
  font-size: 0.98em;
  text-align: center;
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
@media (max-width: 900px) {
  .charts-grid {
    grid-template-columns: 1fr;
  }
}
</style>
