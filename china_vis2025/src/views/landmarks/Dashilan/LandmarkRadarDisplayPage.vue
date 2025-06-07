<template>
  <div class="influence-page-container">
    <header class="page-header">
      <button @click="goBack" class="back-button">
        ← 返回 {{ landmarkDisplayName }}
      </button>
      <h1>{{ landmarkDisplayName }} - {{ sectionTitle }}</h1>
      <p class="intro-text">
        通过多维度评估，展现 {{ landmarkDisplayName }} 的综合影响力与文化价值。
      </p>
    </header>

    <main class="content-section">
      <RadarChart
        v-if="chartReady"
        :chartData="currentRadarData"
        :chartId="radarChartId"
        :options="radarChartOptions"
      />
      <div v-else>正在加载图表数据...</div>
      <div class="chart-analysis">
        <h4>图表解读：</h4>
        <p v-if="landmarkId === 'dashilar'">
          大栅栏在“公众热度”和“当代活力”方面表现突出，体现了其作为繁华商业街区和热门旅游目的地的特性。其“文化独特性”也因众多老字号和京味文化而显著。“官方评级”和“历史价值”虽高，但与世界顶级遗产相比略有差异。
        </p>
        <p v-if="landmarkId === 'mingTombs'">
          明十三陵在“官方评级”、“历史价值”和“文化独特性”方面均达到顶级水平，彰显其作为世界文化遗产和皇家陵寝的崇高地位。其“公众热度”也很高，但“当代活力”相较于日常活跃的商业区则表现为以文化展示和旅游为主。
        </p>
      </div>
    </main>

    <footer class="page-footer">
      <p class="copyright">© 2023 北京历史文化遗产数字平台</p>
    </footer>
  </div>
</template>

<script>
import RadarChart from "../../../components/dashilan/RadarChart.vue";
import { radarChartData } from "../../../components/data/radarChartData.js";

export default {
  name: "LandmarkRadarDisplayPage",
  components: {
    RadarChart,
  },
  props: {
    landmarkId: {
      // 从路由获取
      type: String,
      required: true,
    },
    // direction: String, // 如果此页面只处理 'influence'，则可能不需要
  },
  data() {
    return {
      landmarkDisplayName: "",
      sectionTitle: "", // 例如 "价值与共鸣" 或 "世遗之尊"
      chartReady: false,
      radarChartId: "landmarkRadar",
      allRadarData: { ...radarChartData },
      radarChartOptions: {
        // 可以覆盖 RadarChart 组件中的默认 options
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          r: {
            suggestedMin: 0,
            suggestedMax: 5,
            ticks: { stepSize: 1, font: { family: "'Noto Serif SC', serif" } },
            pointLabels: {
              font: { size: 13, family: "'Noto Serif SC', serif" },
              color: "#4a3b32",
            },
            grid: { color: "rgba(139, 69, 19, 0.2)" }, // 使用主题色系的网格线
          },
        },
        plugins: {
          legend: {
            labels: {
              font: { family: "'Noto Serif SC', serif" },
              color: "#4a3b32",
            },
          },
        },
      },
    };
  },
  computed: {
    currentRadarData() {
      const data = {
        labels: this.allRadarData.labels,
        datasets: [],
      };
      // 如果只想显示当前 landmarkId 的数据
      // if (this.allRadarData.datasets[this.landmarkId]) {
      //   data.datasets.push(this.allRadarData.datasets[this.landmarkId]);
      // }

      // 如果要对比两个地标（假设此页面固定对比这两个）
      data.datasets.push(this.allRadarData.datasets.dashilar);
      data.datasets.push(this.allRadarData.datasets.mingTombs);

      return data;
    },
  },
  created() {
    this.loadPageData();
  },
  methods: {
    loadPageData() {
      if (this.landmarkId === "dashilar") {
        this.landmarkDisplayName = "大栅栏";
        this.sectionTitle = "商韵流传"; // 使用您更新后的标题
      } else if (this.landmarkId === "mingTombs") {
        this.landmarkDisplayName = "明十三陵";
        this.sectionTitle = "世遗之尊"; // 使用您更新后的标题
      } else {
        this.landmarkDisplayName = "未知地标";
        this.sectionTitle = "影响力评估";
      }
      document.title = `${this.landmarkDisplayName} - ${this.sectionTitle}`;
      this.chartReady = true; // 假设数据已准备好
    },
    goBack() {
      // 返回到对应的二级门户页面
      let portalRouteName =
        this.landmarkId === "dashilar" ? "dashilar" : "ming-tombs";
      if (this.$router.hasRoute(portalRouteName)) {
        this.$router.push({ name: portalRouteName });
      } else {
        this.$router.push("/"); // 回到首页作为备选
      }
    },
  },
};
</script>

<style scoped>
/* 样式与 LandmarkLifecyclePage 类似，保持简洁和主题一致性 */
.influence-page-container {
  font-family: "Noto Serif SC", serif;
  color: #333;
  background-color: #f9f5ed;
  min-height: 100vh;
  padding: 20px;
  display: flex;
  flex-direction: column;
}
.page-header {
  text-align: center;
  margin-bottom: 20px;
  padding-top: 20px;
  position: relative;
}
.page-header h1 {
  font-size: 2.2em;
  color: #8b4513;
  margin-bottom: 8px;
}
.page-header .intro-text {
  font-size: 1em;
  color: #5a4a42;
  max-width: 700px;
  margin: 0 auto 15px;
}
.back-button {
  position: absolute;
  top: 15px;
  left: 15px;
  background-color: rgba(139, 69, 19, 0.65);
  color: #fff8e1;
  border: none;
  padding: 8px 16px;
  border-radius: 20px;
  cursor: pointer;
  font-size: 0.9em;
  z-index: 10;
  transition: all 0.3s ease;
  backdrop-filter: blur(4px);
}
.back-button:hover {
  background-color: rgba(160, 82, 45, 0.85);
}
.content-section {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: center; /* 让雷达图和解读居中 */
}
.chart-analysis {
  margin-top: 30px;
  max-width: 600px;
  padding: 20px;
  background-color: rgba(255, 255, 255, 0.6);
  border-radius: 8px;
  color: #4a3b32;
  font-size: 0.95em;
  line-height: 1.6;
}
.chart-analysis h4 {
  color: #8b4513;
  margin-top: 0;
  margin-bottom: 10px;
}
.page-footer {
  text-align: center;
  padding: 25px 20px;
  margin-top: auto;
  color: #5a4a42;
  font-size: 0.9em;
  border-top: 1px solid rgba(139, 69, 19, 0.15);
}
</style>
