<template>
  <div class="influence-container">
    <!-- 返回按钮 -->
    <button @click="goBack" class="back-button">← 返回天坛门户</button>

    <!-- 页面标题 -->
    <div class="influence-header">
      <h1>天坛建筑的宇宙观与世界影响</h1>
      <p>解读古代建筑中的哲学智慧及其全球文化遗产价值</p>
    </div>

    <!-- 主要布局 -->
    <div class="main-content">
      <!-- 左侧：宇宙观解析 -->
      <div class="philosophy-section">
        <div class="section-title">
          <h2>天坛建筑中的宇宙哲学</h2>
          <div class="divider"></div>
        </div>

        <div class="philosophy-card">
          <div class="philosophy-item">
            <div class="icon-circle">
              <i class="icon">☯</i>
            </div>
            <h3>天圆地方的宇宙模型</h3>
            <p>
              天坛整体布局呈现"北圆南方"结构，祈年殿的圆形三重檐象征"天"，方形的围墙代表"地"，完美诠释了中国古代"天圆地方"的宇宙观。这种几何象征在建筑史上具有开创性意义。
            </p>
          </div>

          <div class="philosophy-item">
            <div class="icon-circle">
              <i class="icon">☀</i>
            </div>
            <h3>天人合一的哲学思想</h3>
            <p>
              建筑群通过精确的轴线布局（南北中轴线长360丈）与天文方位对应，体现"天人合一"哲学。冬至祭天时，阳光会穿过皇穹宇门洞照亮祭坛中心，展现自然与建筑的完美融合。
            </p>
          </div>

          <div class="philosophy-item">
            <div class="icon-circle">
              <i class="icon">🌌</i>
            </div>
            <h3>数字象征的宇宙秩序</h3>
            <p>
              祈年殿28根立柱象征二十八星宿；内圈12根金柱代表12个月份；外圈12根檐柱象征12时辰，整体36根立柱对应36天罡。这种数字象征系统表达了古人对宇宙秩序的深刻理解。
            </p>
          </div>

          <div class="philosophy-item">
            <div class="icon-circle">
              <i class="icon">☯</i>
            </div>
            <h3>阴阳五行的哲学系统</h3>
            <p>
              建筑色彩运用深含阴阳五行哲学：蓝色琉璃瓦象征蓝天（阳），汉白玉栏杆代表大地（阴）；东侧青砖对应木（春），南侧红墙象征火（夏），西侧白阶对应金（秋），北侧黑瓦象征水（冬）。
            </p>
          </div>
        </div>

        <div class="cosmos-chart">
          <div ref="cosmosChart" class="chart-box"></div>
        </div>
      </div>

      <!-- 右侧：全球影响 -->
      <div class="impact-section">
        <div class="section-title">
          <h2>天坛的世界文化遗产价值</h2>
          <div class="divider"></div>
        </div>

        <div class="impact-dimension">
          <h3><i class="icon">🏛️</i> 对建筑艺术的影响</h3>
          <div class="dimension-content">
            <p>天坛的象征性设计影响了全球宗教建筑：</p>
            <ul>
              <li>英国邱园中国塔（1762年）借鉴了天坛的琉璃瓦技术</li>
              <li>美国洛杉矶亨廷顿图书馆中式园林（1928年）模仿祈年殿造型</li>
              <li>日本明治神宫（1920年）参考了天坛的轴线布局和空间序列</li>
            </ul>
            <div class="chart-container">
              <div ref="archChart" class="chart-box"></div>
            </div>
          </div>
        </div>

        <div class="impact-dimension">
          <h3><i class="icon">📚</i> 对文化研究的影响</h3>
          <div class="dimension-content">
            <p>近30年天坛相关学术研究持续增长：</p>
            <ul>
              <li>1980-2023年发表相关论文2,400余篇</li>
              <li>全球42所高校开设中国建筑哲学课程</li>
              <li>联合国教科文组织将其列为东方宇宙观的建筑典范</li>
            </ul>
            <div class="chart-container">
              <div ref="cultureChart" class="chart-box"></div>
            </div>
          </div>
        </div>

        <div class="impact-dimension">
          <h3><i class="icon">✈️</i> 对旅游产业的影响</h3>
          <div class="dimension-content">
            <p>天坛已成为全球文化旅游重要目的地：</p>
            <ul>
              <li>年接待游客超过1000万人次（2019年数据）</li>
              <li>外国游客占比35%，来自120多个国家</li>
              <li>带动周边形成文化遗产旅游产业链</li>
            </ul>
            <div class="chart-container">
              <div ref="tourismChart" class="chart-box"></div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 全球影响总结 -->
    <div class="global-impact">
      <h2>天坛的全球文化遗产价值</h2>
      <div class="impact-grid">
        <div class="impact-item">
          <div class="impact-value">1,200+</div>
          <div class="impact-label">全球仿建建筑数量</div>
        </div>
        <div class="impact-item">
          <div class="impact-value">42</div>
          <div class="impact-label">国家建筑课程案例</div>
        </div>
        <div class="impact-item">
          <div class="impact-value">98%</div>
          <div class="impact-label">游客满意度</div>
        </div>
        <div class="impact-item">
          <div class="impact-value">500+</div>
          <div class="impact-label">年度学术出版物</div>
        </div>
      </div>
    </div>
    <!-- 雷达图评估板块 -->
    <div class="radar-section">
      <div class="section-title">
        <div class="title-icon">📊</div>
        <h2>天坛建筑综合评估</h2>
        <div class="divider"></div>
        <p class="section-description">基于文化遗产价值的多维度分析</p>
      </div>
      <RadarChartBoard class="radar-container" />
    </div>
    <!-- 页脚 -->
    <div class="influence-footer">
      <p>
        天坛作为中国古代宇宙观的建筑象征，不仅体现了华夏文明的哲学智慧，更成为全人类共同的文化遗产。
      </p>
      <p>联合国教科文组织世界遗产 · 编号881</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import * as echarts from "echarts";
import RadarChartBoard from "../RadarChartBoard.vue";

const router = useRouter();

// 返回门户主页
const goBack = () => router.push("/landmarks/ming-tombs");

// ECharts图表引用
const cosmosChart = ref(null);
const archChart = ref(null);
const cultureChart = ref(null);
const tourismChart = ref(null);

// 初始化宇宙哲学图表
const initCosmosChart = () => {
  if (cosmosChart.value) {
    const chart = echarts.init(cosmosChart.value);

    const option = {
      tooltip: {
        trigger: "item",
        formatter: "{b}: {c}",
      },
      legend: {
        top: "bottom",
        textStyle: {
          color: "#5a4a42",
        },
      },
      color: ["#8b4513", "#d4a76a", "#9c7c5c", "#b2967d"],
      series: [
        {
          name: "宇宙哲学要素",
          type: "pie",
          radius: ["40%", "70%"],
          center: ["50%", "40%"],
          roseType: "area",
          label: {
            show: true,
            formatter: "{b|{b}}\n{c|{c}%}",
            rich: {
              b: {
                fontSize: 14,
                color: "#5a4a42",
                lineHeight: 20,
              },
              c: {
                fontSize: 16,
                color: "#8b4513",
                fontWeight: "bold",
              },
            },
          },
          data: [
            { value: 35, name: "空间象征" },
            { value: 30, name: "数字哲学" },
            { value: 20, name: "色彩象征" },
            { value: 15, name: "祭祀礼仪" },
          ],
        },
      ],
    };

    chart.setOption(option);

    window.addEventListener("resize", () => {
      chart.resize();
    });
  }
};

// 初始化建筑影响图表
const initArchChart = () => {
  if (archChart.value) {
    const chart = echarts.init(archChart.value);

    const option = {
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "shadow",
        },
      },
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true,
      },
      xAxis: {
        type: "category",
        data: ["圆形布局", "色彩运用", "木构技术", "轴线序列", "声学设计"],
        axisLine: {
          lineStyle: {
            color: "#8b4513",
          },
        },
        axisLabel: {
          color: "#5a4a42",
          rotate: 30,
        },
      },
      yAxis: {
        type: "value",
        name: "影响指数",
        nameTextStyle: {
          color: "#5a4a42",
        },
        axisLine: {
          lineStyle: {
            color: "#8b4513",
          },
        },
        splitLine: {
          lineStyle: {
            color: "rgba(139, 69, 19, 0.1)",
          },
        },
      },
      series: [
        {
          name: "影响程度",
          type: "bar",
          barWidth: "60%",
          itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: "#d4a76a" },
              { offset: 1, color: "#8b4513" },
            ]),
          },
          data: [89, 78, 82, 75, 68],
        },
      ],
    };

    chart.setOption(option);

    window.addEventListener("resize", () => {
      chart.resize();
    });
  }
};

// 初始化文化研究图表
const initCultureChart = () => {
  if (cultureChart.value) {
    const chart = echarts.init(cultureChart.value);

    const option = {
      tooltip: {
        trigger: "axis",
      },
      legend: {
        data: ["论文数量", "研究项目"],
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
        boundaryGap: false,
        data: ["1990", "1995", "2000", "2005", "2010", "2015", "2020", "2023"],
        axisLine: {
          lineStyle: {
            color: "#8b4513",
          },
        },
      },
      yAxis: {
        type: "value",
        name: "数量/项",
        nameTextStyle: {
          color: "#5a4a42",
        },
        axisLine: {
          lineStyle: {
            color: "#8b4513",
          },
        },
        splitLine: {
          lineStyle: {
            color: "rgba(139, 69, 19, 0.1)",
          },
        },
      },
      series: [
        {
          name: "论文数量",
          type: "line",
          smooth: true,
          symbol: "circle",
          symbolSize: 8,
          lineStyle: {
            width: 4,
            color: "#8b4513",
          },
          itemStyle: {
            color: "#8b4513",
          },
          data: [12, 28, 45, 78, 120, 210, 285, 320],
        },
        {
          name: "研究项目",
          type: "line",
          smooth: true,
          symbol: "circle",
          symbolSize: 8,
          lineStyle: {
            width: 4,
            color: "#d4a76a",
          },
          itemStyle: {
            color: "#d4a76a",
          },
          data: [3, 8, 15, 26, 42, 68, 95, 120],
        },
      ],
    };

    chart.setOption(option);

    window.addEventListener("resize", () => {
      chart.resize();
    });
  }
};

// 初始化旅游影响图表
const initTourismChart = () => {
  if (tourismChart.value) {
    const chart = echarts.init(tourismChart.value);

    const option = {
      tooltip: {
        trigger: "item",
        formatter: "{b}: {c} ({d}%)",
      },
      legend: {
        orient: "vertical",
        right: 10,
        top: "center",
        textStyle: {
          color: "#5a4a42",
        },
      },
      color: ["#8b4513", "#d4a76a", "#9c7c5c", "#b2967d", "#c8b49c"],
      series: [
        {
          name: "游客来源",
          type: "pie",
          radius: ["40%", "70%"],
          center: ["40%", "50%"],
          avoidLabelOverlap: false,
          label: {
            show: true,
            formatter: "{b}: {d}%",
          },
          emphasis: {
            label: {
              show: true,
              fontSize: "18",
              fontWeight: "bold",
            },
          },
          labelLine: {
            show: true,
          },
          data: [
            { value: 65, name: "中国游客" },
            { value: 12, name: "东亚国家" },
            { value: 10, name: "北美地区" },
            { value: 8, name: "欧洲国家" },
            { value: 5, name: "其他地区" },
          ],
        },
      ],
    };

    chart.setOption(option);

    window.addEventListener("resize", () => {
      chart.resize();
    });
  }
};

onMounted(() => {
  initCosmosChart();
  initArchChart();
  initCultureChart();
  initTourismChart();
});
</script>

<style scoped>
.influence-container {
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

.influence-header {
  text-align: center;
  padding: 60px 20px 40px;
  position: relative;
  max-width: 900px;
  margin: 0 auto;
}

.influence-header h1 {
  font-size: 2.8rem;
  color: #8b4513;
  margin-bottom: 15px;
  position: relative;
  display: inline-block;
}

.influence-header h1:after {
  content: "";
  position: absolute;
  bottom: -10px;
  left: 50%;
  transform: translateX(-50%);
  width: 180px;
  height: 3px;
  background: linear-gradient(90deg, #d4a76a 0%, #8b4513 100%);
  border-radius: 3px;
}

.influence-header p {
  font-size: 1.2rem;
  color: #5a4a42;
  margin: 25px auto 0;
  line-height: 1.8;
  max-width: 700px;
}

/* 主要内容布局 */
.main-content {
  display: flex;
  max-width: 1400px;
  margin: 40px auto;
  gap: 40px;
}

.philosophy-section,
.impact-section {
  flex: 1;
  background: rgba(255, 255, 255, 0.5);
  border-radius: 20px;
  padding: 30px;
  backdrop-filter: blur(5px);
  box-shadow: 0 10px 30px rgba(101, 67, 33, 0.1);
  border: 1px solid rgba(139, 69, 19, 0.1);
}

.section-title {
  margin-bottom: 30px;
  text-align: center;
}

.section-title h2 {
  font-size: 1.8rem;
  color: #8b4513;
  margin-bottom: 15px;
}

.divider {
  height: 3px;
  width: 100px;
  background: linear-gradient(90deg, #d4a76a, #8b4513);
  margin: 0 auto;
  border-radius: 3px;
}

/* 哲学部分样式 */
.philosophy-card {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 25px;
  margin-bottom: 40px;
}

.philosophy-item {
  background: rgba(255, 248, 225, 0.8);
  border-radius: 15px;
  padding: 25px;
  transition: all 0.3s ease;
  border: 1px solid rgba(139, 69, 19, 0.1);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
}

.philosophy-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 25px rgba(139, 69, 19, 0.15);
}

.icon-circle {
  width: 70px;
  height: 70px;
  background: linear-gradient(135deg, #d4a76a, #8b4513);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 20px;
}

.icon-circle .icon {
  font-size: 32px;
  color: #fff8e1;
}

.philosophy-item h3 {
  font-size: 1.4rem;
  color: #5a4a42;
  text-align: center;
  margin-bottom: 15px;
}

.philosophy-item p {
  color: #5a4a42;
  line-height: 1.8;
  text-align: justify;
}

/* 图表容器 */
.chart-box {
  width: 100%;
  height: 300px;
  margin-top: 20px;
}

.cosmos-chart {
  background: rgba(255, 248, 225, 0.8);
  border-radius: 15px;
  padding: 20px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
}

/* 影响部分样式 */
.impact-dimension {
  background: rgba(255, 248, 225, 0.8);
  border-radius: 15px;
  padding: 25px;
  margin-bottom: 30px;
  border: 1px solid rgba(139, 69, 19, 0.1);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
}

.impact-dimension h3 {
  font-size: 1.5rem;
  color: #8b4513;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  gap: 10px;
}

.impact-dimension h3 .icon {
  font-size: 1.8rem;
}

.dimension-content p {
  color: #5a4a42;
  margin-bottom: 15px;
  font-weight: 500;
}

.dimension-content ul {
  padding-left: 20px;
  margin-bottom: 20px;
}

.dimension-content li {
  color: #5a4a42;
  margin-bottom: 8px;
  position: relative;
  padding-left: 20px;
}

.dimension-content li:before {
  content: "•";
  color: #d4a76a;
  font-size: 1.4rem;
  position: absolute;
  left: 0;
  top: -5px;
}

.chart-container {
  margin-top: 20px;
  height: 250px;
}

/* 全球影响总结 */
.global-impact {
  max-width: 1200px;
  margin: 60px auto;
  padding: 40px;
  background: linear-gradient(135deg, #ffffff 0%, #f9f5ed 100%);
  border-radius: 20px;
  box-shadow: 0 15px 40px rgba(101, 67, 33, 0.15);
  text-align: center;
}

.global-impact h2 {
  font-size: 2rem;
  color: #8b4513;
  margin-bottom: 30px;
  position: relative;
}

.global-impact h2:after {
  content: "";
  position: absolute;
  bottom: -10px;
  left: 50%;
  transform: translateX(-50%);
  width: 100px;
  height: 3px;
  background: linear-gradient(90deg, #d4a76a 0%, #8b4513 100%);
  border-radius: 3px;
}

.impact-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 30px;
  margin-top: 30px;
}

.impact-item {
  background: rgba(212, 167, 106, 0.2);
  border-radius: 15px;
  padding: 25px;
  transition: all 0.3s ease;
  border: 1px solid rgba(139, 69, 19, 0.15);
}

.impact-item:hover {
  transform: translateY(-5px);
  background: rgba(212, 167, 106, 0.3);
  box-shadow: 0 10px 25px rgba(139, 69, 19, 0.1);
}

.impact-value {
  font-size: 3rem;
  font-weight: bold;
  color: #8b4513;
  margin-bottom: 10px;
}

.impact-label {
  font-size: 1.1rem;
  color: #5a4a42;
}

/* 页脚 */
.influence-footer {
  text-align: center;
  padding: 40px 20px;
  color: #5a4a42;
  font-size: 1.1rem;
  line-height: 1.8;
  max-width: 800px;
  margin: 0 auto;
  border-top: 1px solid rgba(139, 69, 19, 0.2);
}

.influence-footer p:first-child {
  font-style: italic;
  margin-bottom: 15px;
}

.influence-footer p:last-child {
  font-weight: bold;
  color: #8b4513;
}

/* 响应式设计 */
@media (max-width: 1200px) {
  .main-content {
    flex-direction: column;
    gap: 40px;
  }
}

@media (max-width: 768px) {
  .influence-header h1 {
    font-size: 2.2rem;
  }

  .global-impact {
    padding: 30px 20px;
  }

  .philosophy-card {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 480px) {
  .influence-header {
    padding: 40px 15px 30px;
  }

  .back-button {
    top: 15px;
    left: 15px;
    padding: 10px 15px;
  }

  .impact-grid {
    grid-template-columns: 1fr;
  }
}

/* 雷达图部分样式 */
.radar-section {
  max-width: 1200px;
  margin: 60px auto;
  padding: 40px;
  background: linear-gradient(
    135deg,
    rgba(255, 248, 230, 0.8),
    rgba(240, 230, 210, 0.7)
  );
  border-radius: 15px;
  box-shadow: 0 15px 40px rgba(101, 67, 33, 0.15);
  text-align: center;
}

.radar-section .section-title {
  margin-bottom: 30px;
}

.section-description {
  color: #7a6b5a;
  font-size: 1.1rem;
  margin-top: 10px;
}

.radar-container {
  width: 100%;
  min-height: 400px;
  background: rgba(255, 255, 255, 0.7);
  border-radius: 12px;
  padding: 20px;
  border: 1px solid rgba(139, 69, 19, 0.1);
}

/* 响应式调整 */
@media (max-width: 768px) {
  .radar-section {
    padding: 30px 20px;
  }

  .radar-container {
    min-height: 300px;
  }
}
</style>
