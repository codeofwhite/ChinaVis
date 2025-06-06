<template>
  <div class="radar-chart-container">
    <canvas :id="chartId" style="width: 100%; height: 100%;"></canvas>
  </div>
</template>

<script>
// 假设您选择并安装了 Chart.js 和 vue-chartjs
// npm install chart.js vue-chartjs
import { Radar } from 'vue-chartjs';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

export default {
  name: 'RadarChart',  props: {
    chartId: {
      type: String,
      default: 'radar-chart'
    },
    chartData: {
      type: Object,
      required: true
    },
    options: {
      type: Object,
      default: () => ({
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          r: {
            angleLines: {
              display: true
            },
            suggestedMin: 0,
            suggestedMax: 5, // 我们的评分体系是1-5
            ticks: {
              stepSize: 1,
              backdropColor: 'rgba(255, 255, 255, 0.75)', // 给刻度标签加个背景，使其更易读
              font: {
                  family: "'Noto Serif SC', serif",
              }
            },
            pointLabels: {
              font: {
                size: 13, // 轴标签字体大小
                family: "'Noto Serif SC', serif",
              },
              color: '#333'
            },
            grid: {
                color: 'rgba(0, 0, 0, 0.1)' // 网格线颜色
            }
          }
        },
        plugins: {
          legend: {
            position: 'top',
            labels: {
                font: {
                    size: 14,
                    family: "'Noto Serif SC', serif",
                },
                color: '#333'
            }
          },
          tooltip: {
            titleFont: { family: "'Noto Serif SC', serif" },
            bodyFont: { family: "'Noto Serif SC', serif" },
            callbacks: { // 自定义tooltip显示整数
                label: function(context) {
                    let label = context.dataset.label || '';
                    if (label) {
                        label += ': ';
                    }
                    if (context.parsed.r !== null) {
                        label += context.parsed.r;
                    }
                    return label;
                }
            }
          }
        }
      })
    }
  },
  data() {
    return {
      chart: null
    }
  },
  mounted() {
    this.initChart()
  },
  methods: {
    initChart() {
      const ctx = document.getElementById(this.chartId)
      if (this.chart) {
        this.chart.destroy()
      }
      this.chart = new ChartJS(ctx, {
        type: 'radar',
        data: this.chartData,
        options: this.options
      })
    }
  },
  watch: {
    chartData: {
      handler() {
        if (this.chart) {
          this.chart.data = this.chartData
          this.chart.update()
        }
      },
      deep: true
    },
    options: {
      handler() {
        if (this.chart) {
          this.chart.options = this.options
          this.chart.update()
        }
      },
      deep: true
    }
  }
};
</script>

<style scoped>
.radar-chart-container {
  position: relative; /* 对于 maintainAspectRatio: false 很重要 */
  width: 100%;
  max-width: 550px; /* 雷达图不宜过大 */
  height: 450px;   /* 设定一个合适的高度 */
  margin: 20px auto;
  padding: 15px;
  background-color: rgba(255, 253, 247, 0.8); /* 非常浅的米色背景，增加图表区域的可读性 */
  border-radius: 10px;
  box-shadow: 0 6px 18px rgba(101, 67, 33, 0.15);
}
</style>