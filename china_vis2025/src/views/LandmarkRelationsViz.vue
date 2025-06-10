<template>
  <div class="relations-viz-container">
    <h2>北京地标关系概览</h2>
    <div id="relations-chart" style="width: 100%; height: 500px; background-color: #f9f9f9; border-radius: 8px;">
      <p style="text-align: center; padding-top: 200px; color: #666;">
        例如：故宫 --- 历史联系 --- 天坛；颐和园 --- 地理相邻 --- 北海公园
      </p>
    </div>
    <p class="viz-description">
      此图展示了北京八大地标之间的各种联系，包括历史、地理和功能上的关联。
    </p>
  </div>
</template>

<script>
export default {
  name: 'LandmarkRelationsViz',
  // 在这里你可以引入并渲染你的图表库（如 ECharts, D3.js）
  // 并在 mounted 钩子中初始化图表
  mounted() {
    // 示例：如果使用 ECharts
    // const myChart = echarts.init(document.getElementById('relations-chart'));
    // myChart.setOption({ ...你的图表配置 ... });
  }
}
</script>

<style scoped>
.relations-viz-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
  box-sizing: border-box;
  background-color: rgba(255, 255, 255, 0.9); /* 轻微透明，与背景融合 */
  border-radius: 8px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.relations-viz-container h2 {
  color: #8b4513;
  margin-bottom: 30px;
  font-size: 28px;
}

#relations-chart {
  margin-bottom: 20px;
}

.viz-description {
  font-size: 16px;
  color: #555;
  text-align: center;
  max-width: 800px;
  line-height: 1.6;
}
</style>