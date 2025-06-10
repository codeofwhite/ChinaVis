<template>
  <div class="relations-viz-container">
    <h2>北京地标关系概览</h2>

    <div class="chart-controls">
      <button
        :class="{ active: currentChartType === 'bubble' }"
        @click="currentChartType = 'bubble'"
      >
        历史气泡图
      </button>
      <button
        :class="{ active: currentChartType === 'force' }"
        @click="currentChartType = 'force'"
      >
        关系网络图
      </button>
    </div>

    <div class="charts-display-area">
      <div
        id="bubble-chart"
        v-show="currentChartType === 'bubble'"
        class="chart-instance"
      ></div>
      <div
        id="force-chart"
        v-show="currentChartType === 'force'"
        class="chart-instance"
      ></div>
    </div>

    <p class="viz-description">
      此图展示了北京八大地标之间的各种联系，包括历史、地理和功能上的关联。
      切换图表类型以探索不同维度的地标关系。
    </p>
  </div>
</template>

<script>
import * as echarts from "echarts";

export default {
  name: "LandmarkRelationsViz",
  data() {
    return {
      currentChartType: "bubble", // 默认显示气泡图
      // 地标数据，包含更多属性用于气泡图和连接图
      landmarksData: [
        {
          name: "故宫",
          type: "皇家建筑",
          era: "明清",
          importance: 9,
          geoProximity: 0.8,
        },
        {
          name: "大栅栏",
          type: "市井文化",
          era: "清民国",
          importance: 6,
          geoProximity: 0.7,
        },
        {
          name: "颐和园",
          type: "皇家园林",
          era: "清",
          importance: 8,
          geoProximity: 0.6,
        },
        {
          name: "北海公园",
          type: "皇家园林",
          era: "辽金明清",
          importance: 7,
          geoProximity: 0.65,
        },
        {
          name: "长城",
          type: "军事防御",
          era: "秦汉明",
          importance: 10,
          geoProximity: 0.2,
        },
        {
          name: "明十三陵",
          type: "皇家陵寝",
          era: "明",
          importance: 8,
          geoProximity: 0.3,
        },
        {
          name: "天坛",
          type: "皇家祭祀",
          era: "明清",
          importance: 9,
          geoProximity: 0.75,
        },
        {
          name: "法源寺",
          type: "宗教建筑",
          era: "唐",
          importance: 5,
          geoProximity: 0.85,
        },
      ],
      // 地标之间的关系数据
      // 关系值越大，表示联系越紧密或重要
      relationsData: [
        // 故宫
        { source: "故宫", target: "天坛", relation: "祭祀关联", value: 0.9 },
        {
          source: "故宫",
          target: "北海公园",
          relation: "皇家园林相邻",
          value: 0.7,
        },
        {
          source: "故宫",
          target: "颐和园",
          relation: "皇家建筑关联",
          value: 0.6,
        },
        {
          source: "故宫",
          target: "大栅栏",
          relation: "历史市井相邻",
          value: 0.5,
        },
        // 大栅栏
        {
          source: "大栅栏",
          target: "法源寺",
          relation: "地理相邻/市井",
          value: 0.8,
        },
        {
          source: "大栅栏",
          target: "天坛",
          relation: "地理相邻/历史",
          value: 0.6,
        },
        // 颐和园
        {
          source: "颐和园",
          target: "北海公园",
          relation: "皇家园林同类",
          value: 0.8,
        },
        // 北海公园
        {
          source: "北海公园",
          target: "故宫",
          relation: "皇家园林相邻",
          value: 0.7,
        },
        // 长城
        {
          source: "长城",
          target: "明十三陵",
          relation: "明代防御体系",
          value: 0.9,
        },
        // 明十三陵
        {
          source: "明十三陵",
          target: "长城",
          relation: "明代防御体系",
          value: 0.9,
        },
        // 天坛
        { source: "天坛", target: "故宫", relation: "祭祀关联", value: 0.9 },
        {
          source: "天坛",
          target: "大栅栏",
          relation: "地理相邻/历史",
          value: 0.6,
        },
        // 法源寺
        {
          source: "法源寺",
          target: "大栅栏",
          relation: "地理相邻/市井",
          value: 0.8,
        },
      ],
    };
  },
  mounted() {
    this.initBubbleChart();
    this.initForceChart();
    // 监听窗口大小变化，重新渲染图表
    window.addEventListener("resize", this.resizeCharts);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.resizeCharts);
    if (this.bubbleChart) {
      this.bubbleChart.dispose();
    }
    if (this.forceChart) {
      this.forceChart.dispose();
    }
  },
  watch: {
    // 当 currentChartType 变化时，重新调整图表大小以确保显示正常
    currentChartType() {
      this.$nextTick(() => {
        if (this.currentChartType === "bubble" && this.bubbleChart) {
          this.bubbleChart.resize();
        } else if (this.currentChartType === "force" && this.forceChart) {
          this.forceChart.resize();
        }
      });
    },
  },
  methods: {
    initBubbleChart() {
      const chartDom = document.getElementById("bubble-chart");
      if (!chartDom) return;
      this.bubbleChart = echarts.init(chartDom);

      const types = [...new Set(this.landmarksData.map((d) => d.type))]; // 提取所有地标类型
      const typeColors = {
        皇家建筑: "#8B4513", // 深棕色
        市井文化: "#D2B48C", // 浅棕色
        皇家园林: "#556B2F", // 深橄榄绿
        军事防御: "#696969", // 暗灰色
        皇家陵寝: "#A0522D", // 赭石色
        皇家祭祀: "#CD5C5C", // 印度红
        宗教建筑: "#BDB76B", // 暗黄褐色
      };

      const option = {
        title: {
          text: "地标属性气泡图",
          subtext:
            "大小：重要性 | 颜色：类型 | X轴：建成年代（虚拟）| Y轴：地理聚合度（虚拟）",
          left: "center",
          top: 20,
          textStyle: {
            color: "#333",
          },
          subtextStyle: {
            color: "#666",
          },
        },
        grid: {
          left: "10%",
          right: "15%",
          top: "20%",
          bottom: "15%",
        },
        xAxis: {
          name: "建成年代（越右越晚）",
          type: "value",
          min: 0,
          max: 10, // 映射 era 属性到数值
          axisLabel: {
            formatter: function (value) {
              // 简单映射，实际应用中可能需要更精确的年代映射
              if (value === 0) return "唐代";
              if (value === 2) return "辽金";
              if (value === 4) return "明代";
              if (value === 6) return "清代";
              if (value === 8) return "民国";
              return "";
            },
          },
        },
        yAxis: {
          name: "地理聚合度（越高越市中心）",
          type: "value",
          min: 0,
          max: 1,
          axisLabel: {
            formatter: "{value}",
          },
        },
        series: [
          {
            name: "地标",
            type: "scatter",
            symbolSize: function (data) {
              return data[2] * 5; // 根据 importance 调整气泡大小
            },
            itemStyle: {
              opacity: 0.8,
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowOffsetY: 0,
              shadowColor: "rgba(0, 0, 0, 0.5)",
            },
            data: this.landmarksData.map((d) => {
              let eraValue; // 将朝代映射为数值
              switch (d.era) {
                case "唐":
                  eraValue = 0;
                  break;
                case "辽金明清":
                  eraValue = 2;
                  break; // 多个时期，取中间值
                case "明":
                  eraValue = 4;
                  break;
                case "清":
                  eraValue = 6;
                  break;
                case "清民国":
                  eraValue = 8;
                  break;
                case "秦汉明":
                  eraValue = 4;
                  break; // 取最晚的时期
                default:
                  eraValue = 5;
              }
              return [eraValue, d.geoProximity, d.importance, d.type, d.name]; // [x, y, size, colorCategory, name]
            }),
          },
        ],
        visualMap: {
          show: true,
          type: "piecewise", // 分段式视觉映射
          categories: types,
          inRange: {
            color: types.map((type) => typeColors[type] || "#ccc"), // 根据类型分配颜色
          },
          dimension: 3, // 对应数据中的 type 索引
          right: 20,
          top: "center",
          textStyle: {
            color: "#333",
          },
        },
        tooltip: {
          formatter: function (params) {
            const data = params.data;
            const landmarkName = data[4]; // 地标名称
            const eraLabel = params.axisValueLabel; // X轴标签
            const geoProximity = data[1].toFixed(2); // Y轴值
            const importance = data[2]; // 大小
            const type = data[3]; // 颜色类别
            return `
              <strong>${landmarkName}</strong><br/>
              类型: ${type}<br/>
              建成年代: ${eraLabel}<br/>
              地理聚合度: ${geoProximity}<br/>
              重要性评分: ${importance}
            `;
          },
        },
      };
      this.bubbleChart.setOption(option);
    },

    initForceChart() {
      const chartDom = document.getElementById("force-chart");
      if (!chartDom) return;
      this.forceChart = echarts.init(chartDom);

      const nodes = this.landmarksData.map((d) => ({
        name: d.name,
        value: d.importance,
        category: d.type,
        // 节点大小调整，让重要性差异更明显，且确保最小可见性
        symbolSize: d.importance * 5 + 15,
        label: {
          show: true, // 默认显示名称
          position: "inside", // 标签显示在节点内部
          fontSize: 12,
          color: "#fff", // 标签颜色
          fontWeight: "bold",
        },
        itemStyle: {
          // 节点样式
          shadowBlur: 10,
          shadowColor: "rgba(0,0,0,0.3)",
        },
      }));

      const categories = [
        ...new Set(this.landmarksData.map((d) => d.type)),
      ].map((type) => ({ name: type }));

      // 调整连线的颜色和粗细
      const links = this.relationsData.map((r) => ({
        source: r.source,
        target: r.target,
        value: r.value,
        lineStyle: {
          color:
            r.value > 0.8 ? "#A0522D" : r.value > 0.6 ? "#D2B48C" : "#E8D8C3", // 根据关系强度分级颜色
          width: r.value * 4 + 1, // 边的粗细更明显
          opacity: 0.8,
          curveness: 0.2, // 稍微弯曲，避免重叠
        },
        label: {
          // 边的标签
          show: true, // 默认显示
          formatter: "{c}", // 显示边的值 (关系强度)
          fontSize: 10,
          color: "#666",
          backgroundColor: "rgba(255,255,255,0.7)",
          padding: [2, 4],
          borderRadius: 2,
        },
        emphasis: {
          lineStyle: {
            color: "#8B4513", // 鼠标悬浮时高亮颜色
            width: r.value * 4 + 3, // 鼠标悬浮时边更粗
          },
          label: {
            show: true,
            color: "#333",
            fontWeight: "bold",
          },
        },
        tooltip: {
          formatter: `<strong>{b}</strong> - {c} - <strong>{a}</strong>`, // source - value - target
        },
      }));

      const option = {
        title: {
          text: "北京地标关系网络图：关联与强度",
          subtext:
            "节点大小：地标重要性 | 颜色：地标类型 | 连线粗细与颜色：关系强度",
          left: "center",
          top: 20,
          textStyle: {
            color: "#333",
            fontSize: 18,
          },
          subtextStyle: {
            color: "#666",
            fontSize: 12,
          },
        },
        legend: {
          data: categories.map((c) => c.name),
          left: "center",
          bottom: 10, // 调整图例位置，避免遮挡
          textStyle: {
            color: "#333",
          },
        },
        series: [
          {
            name: "地标关系",
            type: "graph",
            layout: "force",
            data: nodes,
            links: links,
            categories: categories,
            roam: true,
            draggable: true,
            force: {
              // 调整力导向参数，让布局更清晰
              repulsion: 180, // 增大斥力，节点之间离得更远
              edgeLength: [60, 160], // 边的长度范围，增加变化
              gravity: 0.05, // 适当重力，让节点向中心聚集但又不至于太紧密
              layoutAnimation: true,
            },
            label: {
              // 节点标签的默认设置
              show: true,
              position: "right", // 标签显示位置
              formatter: "{b}",
              fontSize: 12,
              color: "#333",
            },
            lineStyle: {
              color: "#999", // 默认连线颜色
              curveness: 0.3,
            },
            emphasis: {
              focus: "adjacency",
              lineStyle: {
                color: "#666",
              },
            },
            tooltip: {
              trigger: "item", // 触发类型改为 item，更聚焦于单个元素
              backgroundColor: "rgba(255, 255, 255, 0.9)",
              borderColor: "#bd6b20",
              borderWidth: 1,
              textStyle: {
                color: "#333",
              },
              formatter: function (params) {
                if (params.dataType === "node") {
                  const nodeData = params.data;
                  return `
                    <div style="padding: 5px 0;">
                      <strong style="font-size: 1.1em; color: #8B4513;">${nodeData.name}</strong><br/>
                      <span style="color: #666;">类型:</span> ${nodeData.category}<br/>
                      <span style="color: #666;">重要性评分:</span> ${nodeData.value}
                    </div>
                  `;
                } else if (params.dataType === "edge") {
                  const edgeData = params.data;
                  return `
                    <div style="padding: 5px 0;">
                      <strong style="font-size: 1.1em; color: #8B4513;">${
                        edgeData.source
                      }</strong>
                      <span style="color: #666;">-</span> ${
                        edgeData.relation
                      } <span style="color: #666;">-</span>
                      <strong style="font-size: 1.1em; color: #8B4513;">${
                        edgeData.target
                      }</strong><br/>
                      <span style="color: #666;">关系强度:</span> ${edgeData.value.toFixed(
                        1
                      )}
                    </div>
                  `;
                }
                return "";
              },
            },
          },
        ],
      };
      this.forceChart.setOption(option);
    },

    resizeCharts() {
      if (this.bubbleChart) {
        this.bubbleChart.resize();
      }
      if (this.forceChart) {
        this.forceChart.resize();
      }
    },
  },
};
</script>

<style scoped>
.relations-viz-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start; /* 从顶部开始排列 */
  align-items: center;
  padding: 30px; /* 增加内边距，让内容不贴边 */
  box-sizing: border-box;
  background-color: rgba(255, 255, 255, 0.95); /* 稍微不那么透明，更显眼 */
  border-radius: 8px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
}

.relations-viz-container h2 {
  color: #8b4513;
  margin-bottom: 25px; /* 增加标题下边距 */
  font-size: 30px; /* 标题更大一些 */
  text-align: center;
  font-weight: bold;
}

.chart-controls {
  margin-bottom: 30px; /* 增加按钮组下边距 */
  display: flex;
  gap: 20px; /* 按钮之间间距增大 */
  align-items: center;
  justify-content: center;
}

.chart-controls button {
  padding: 12px 25px; /* 按钮更大一些 */
  font-size: 17px; /* 字体更大 */
  border: 2px solid #d4a76a; /* 边框更明显 */
  border-radius: 8px; /* 圆角更大 */
  background-color: #fcf8f0; /* 更亮的背景色 */
  color: #8b4513;
  cursor: pointer;
  transition: all 0.3s ease;
  min-width: 140px; /* 统一按钮宽度 */
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.08);
}

.chart-controls button:hover {
  background-color: #f0e8d5;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.12);
}

.chart-controls button.active {
  background-color: #bd6b20;
  color: #fff;
  border-color: #bd6b20;
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.25);
  transform: translateY(-3px); /* 悬浮效果更明显 */
}

/* 新增的图表显示区域 */
.charts-display-area {
  flex-grow: 1; /* 占据剩余所有垂直空间 */
  width: 100%;
  display: flex; /* 让内部的 chart-instance 能够 flex 布局 */
  justify-content: center; /* 水平居中 */
  align-items: center; /* 垂直居中 */
  position: relative; /* 内部图表如果需要绝对定位则会相对于此 */
  min-height: 400px; /* 确保有足够高度 */
  overflow: hidden; /* 防止图表溢出 */
}

.chart-instance {
  position: absolute; /* 让图表实例相互覆盖 */
  width: 100%;
  height: 100%;
  border-radius: 8px;
}

.viz-description {
  font-size: 16px; /* 描述文字大一点 */
  color: #666; /* 颜色深一点 */
  text-align: center;
  max-width: 800px;
  line-height: 1.7; /* 行高增加 */
  margin-top: 30px; /* 与图表有更大间距 */
  margin-bottom: 0; /* 底部无外边距 */
}

/* 响应式设计 */
@media (max-width: 768px) {
  .relations-viz-container {
    padding: 20px 15px;
  }
  .relations-viz-container h2 {
    font-size: 24px;
    margin-bottom: 20px;
  }
  .chart-controls {
    flex-direction: column; /* 按钮垂直排列 */
    gap: 10px;
    margin-bottom: 20px;
  }
  .chart-controls button {
    padding: 10px 20px;
    font-size: 15px;
    min-width: unset; /* 取消最小宽度限制 */
    width: 80%; /* 按钮宽度占大部分 */
  }
  .chart-area,
  .charts-display-area {
    min-height: 300px; /* 减小移动端图表高度 */
  }
  .viz-description {
    font-size: 14px;
    margin-top: 20px;
  }
}
</style>
