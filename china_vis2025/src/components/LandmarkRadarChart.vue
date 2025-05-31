<template>
  <div class="radar-chart-container">
    <h2>北京文化地标多维度画像</h2>
    <div ref="chartDom" class="chart-instance"></div>
  </div>
</template>

<script>
import * as echarts from "echarts";
import { radarIndicators, landmarkRadarData } from "./data/radarChartData";

export default {
  name: "LandmarkRadarChart",
  data() {
    return {
      chart: null, // ECharts 实例
      radarData: landmarkRadarData,
      indicators: radarIndicators,
    };
  },
  mounted() {
    this.initChart();
    // 监听窗口大小变化，重新渲染图表
    window.addEventListener("resize", this.resizeChart);
  },
  beforeUnmount() {
    // 组件销毁前，销毁 ECharts 实例，并移除 resize 监听
    if (this.chart) {
      this.chart.dispose();
    }
    window.removeEventListener("resize", this.resizeChart);
  },
  methods: {
    initChart() {
      // 获取 DOM 元素
      const chartDom = this.$refs.chartDom;
      if (!chartDom) {
        console.error("ECharts DOM element not found!");
        return;
      }

      // 初始化 ECharts 实例
      this.chart = echarts.init(chartDom);

      // 准备 ECharts 配置项
      const option = {
        title: {
          // text: '北京文化地标多维度画像', // 标题已在 template 中
          show: false, // 不显示 ECharts 内部标题
        },
        tooltip: {
          trigger: "item", // 鼠标悬停在数据项上时触发
          formatter: function (params) {
            let tooltipContent = `<strong>${params.name}</strong><br/>`;
            params.value.forEach((score, index) => {
              tooltipContent += `${radarIndicators[index].name}: ${score}<br/>`;
            });
            return tooltipContent;
          },
        },
        legend: {
          data: this.radarData.map((item) => item.name), // 图例数据
          bottom: 0, // 图例位置
          left: "center",
          textStyle: {
            color: "#333",
          },
        },
        radar: {
          // 雷达图的指示器，即各个维度
          indicator: this.indicators,
          radius: "70%", // 雷达图的半径
          center: ["50%", "50%"], // 雷达图的中心位置
          axisName: {
            color: "#333", // 指示器名称颜色
            fontSize: 14, // 指示器名称字体大小
          },
          splitLine: {
            // 分割线样式
            lineStyle: {
              color: [
                "rgba(200, 200, 200, 0.1)",
                "rgba(200, 200, 200, 0.2)",
                "rgba(200, 200, 200, 0.4)",
                "rgba(200, 200, 200, 0.6)",
                "rgba(200, 200, 200, 0.8)",
              ].reverse(), // 从内到外颜色逐渐加深
            },
          },
          splitArea: {
            // 分割区域样式
            areaStyle: {
              color: ["rgba(255, 255, 255, 0.05)", "rgba(255, 255, 255, 0.1)"],
              shadowBlur: 10,
              shadowColor: "rgba(0, 0, 0, 0.1)",
              shadowOffsetX: 0,
              shadowOffsetY: 5,
            },
          },
          axisLine: {
            // 坐标轴线样式
            lineStyle: {
              color: "rgba(100, 100, 100, 0.5)",
            },
          },
        },
        series: [
          {
            name: "地标画像",
            type: "radar",
            // 每个地标的数据项
            data: this.radarData.map((item) => ({
              value: item.value,
              name: item.name,
              itemStyle: {
                color: item.color, // 使用地标专属颜色
              },
              lineStyle: {
                color: item.color, // 区域边框颜色
                width: 2,
              },
              areaStyle: {
                opacity: 0.6, // 区域填充透明度
              },
            })),
            symbol: "circle", // 数据点形状
            symbolSize: 8, // 数据点大小
            label: {
              // 数据点标签
              show: false, // 默认不显示，鼠标悬停时通过 tooltip 显示
              formatter: function (params) {
                return params.value;
              },
            },
          },
        ],
      };

      // 使用配置项渲染图表
      this.chart.setOption(option);
    },
    resizeChart() {
      if (this.chart) {
        this.chart.resize();
      }
    },
  },
};
</script>

<style scoped>
.radar-chart-container {
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  padding: 20px;
  max-width: 800px; /* 控制图表容器最大宽度 */
  margin: 20px auto;
  background-color: #f8f9fa;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  color: #333;
  text-align: center;
}

h2 {
  color: #2a5a8f;
  margin-bottom: 25px;
  font-size: 1.8em;
}

.chart-instance {
  width: 100%;
  height: 500px; /* 固定图表高度，可以根据需要调整 */
  min-height: 400px; /* 最小高度 */
}
</style>
