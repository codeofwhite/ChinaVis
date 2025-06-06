<template>
  <div class="lifecycle-container">
    <!-- 返回按钮 -->
    <button @click="goBack" class="back-button">← 返回天坛门户</button>
    
    <!-- 页面标题 -->
    <div class="lifecycle-header">
      <h1>天坛六百年祭天路</h1>
      <p>从永乐帝敕建到世界文化遗产的时光之旅</p>
    </div>
    
    <!-- 时间轴导航 -->
    <div class="timeline-nav">
      <div 
        v-for="(item, index) in timelineData" 
        :key="index" 
        :class="['timeline-point', { 'active': activeIndex === index }]"
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
            :class="['timeline-item', { 'active': activeIndex === index }]"
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
          <div class="history-media">
            
          </div>
          
          <div class="history-info">
            <h2>{{ activeData.title }}</h2>
            <div class="history-period">{{ activeData.period }}</div>
            <div class="history-desc">{{ activeData.description }}</div>
            
            <div class="history-metrics">
              <div class="metric" v-for="(metric, idx) in activeData.metrics" :key="idx">
                <div class="metric-value">{{ metric.value }}</div>
                <div class="metric-label">{{ metric.label }}</div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- 建筑规模变化图表 -->
        <div class="chart-section">
          <h3>天坛建筑群规模变化</h3>
          <div ref="chart" class="chart-container"></div>
        </div>
      </div>
    </div>
    
    
  </div>
</template>

<script setup>
import { ref, onMounted, watch, computed } from 'vue';
import { useRouter } from 'vue-router';
import * as echarts from 'echarts';

const router = useRouter();

// 返回门户主页
const goBack = () => router.push('/landmark/temple-of-heaven');

// 时间轴数据
const timelineData = ref([
  {
    year: "1420",
    title: "永乐敕建",
    period: "明永乐十八年",
    description: "明成祖朱棣下诏建造天地坛，作为皇帝祭天、祈谷的场所，初建时天地合祀，名天地坛。",
    image: "https://picsum.photos/600/400?temple=1",
    metrics: [
      { value: "273公顷", label: "占地面积" },
      { value: "20处", label: "主要建筑" },
      { value: "4大区域", label: "坛域布局" }
    ]
  },
  {
    year: "1530",
    title: "天地分祀",
    period: "明嘉靖九年",
    description: "嘉靖皇帝实行天地分祀制度，在天地坛南郊另建圜丘坛专门祭天，原天地坛改称天坛，专行祈谷之礼。",
    image: "https://picsum.photos/600/400?temple=2",
    metrics: [
      { value: "圜丘坛", label: "新建祭坛" },
      { value: "3层结构", label: "祭坛形制" },
      { value: "9重天", label: "设计理念" }
    ]
  },
  {
    year: "1751",
    title: "乾隆大修",
    period: "清乾隆十六年",
    description: "乾隆皇帝对天坛进行了大规模改建和扩建，将祈年殿三重檐改为蓝琉璃瓦，重建皇穹宇，形成今日规模。",
    image: "https://picsum.photos/600/400?temple=3",
    metrics: [
      { value: "12年", label: "工期" },
      { value: "9.5万两", label: "耗银" },
      { value: "30余处", label: "修缮建筑" }
    ]
  },
  {
    year: "1889",
    title: "祈年殿重建",
    period: "清光绪十五年",
    description: "祈年殿遭雷击焚毁，光绪皇帝下令按原样重建，历时七年完成，成为古代木构建筑的杰出代表。",
    image: "https://picsum.photos/600/400?temple=4",
    metrics: [
      { value: "38米", label: "高度" },
      { value: "28根", label: "楠木柱" },
      { value: "3重檐", label: "屋顶结构" }
    ]
  },
  {
    year: "1918",
    title: "辟为公园",
    period: "民国七年",
    description: "天坛正式辟为公园向公众开放，结束了近500年皇家祭坛的历史，成为北京重要的文化旅游景点。",
    image: "https://picsum.photos/600/400?temple=5",
    metrics: [
      { value: "2银元", label: "门票价格" },
      { value: "20万+", label: "年游客量" },
      { value: "10处开放区", label: "开放区域" }
    ]
  },
  {
    year: "1998",
    title: "世界遗产",
    period: "现代",
    description: "天坛被联合国教科文组织列入《世界遗产名录》，成为全人类共同的文化遗产，被誉为中国古代建筑艺术的瑰宝。",
    image: "https://picsum.photos/600/400?temple=6",
    metrics: [
      { value: "273公顷", label: "保护面积" },
      { value: "800万+", label: "年游客量" },
      { value: "20+", label: "保护公约" }
    ]
  }
]);

// 当前活动索引
const activeIndex = ref(0);
const setActiveIndex = (index) => {
  activeIndex.value = index;
};

// 当前活动数据
const activeData = computed(() => timelineData.value[activeIndex.value]);

// ECharts图表相关
const chart = ref(null);
let chartInstance = null;

// 建筑规模变化数据
const chartData = ref({
  years: timelineData.value.map(item => item.year),
  sizes: [85, 92, 95, 100, 87, 100] // 百分比数据
});

// 初始化图表
const initChart = () => {
  if (chart.value) {
    chartInstance = echarts.init(chart.value);
    
    const option = {
      tooltip: {
        trigger: 'axis',
        formatter: '{b0}年<br/>规模：{c0}%'
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        data: chartData.value.years,
        axisLine: {
          lineStyle: {
            color: '#8b4513'
          }
        },
        axisLabel: {
          color: '#5a4a42'
        }
      },
      yAxis: {
        type: 'value',
        min: 80,
        max: 105,
        axisLine: {
          lineStyle: {
            color: '#8b4513'
          }
        },
        axisLabel: {
          formatter: '{value}%',
          color: '#5a4a42'
        },
        splitLine: {
          lineStyle: {
            color: 'rgba(139, 69, 19, 0.1)'
          }
        }
      },
      series: [
        {
          name: '建筑规模',
          type: 'line',
          smooth: true,
          symbol: 'circle',
          symbolSize: 8,
          lineStyle: {
            width: 4,
            color: '#d4a76a'
          },
          itemStyle: {
            color: '#8b4513'
          },
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: 'rgba(212, 167, 106, 0.3)' },
              { offset: 1, color: 'rgba(212, 167, 106, 0.05)' }
            ])
          },
          data: chartData.value.sizes
        }
      ]
    };
    
    chartInstance.setOption(option);
    
    // 窗口大小改变时重绘图表
    window.addEventListener('resize', () => {
      chartInstance.resize();
    });
  }
};

// 监听活动索引变化，高亮图表对应点
watch(activeIndex, (newIndex) => {
  if (chartInstance) {
    // 高亮图表对应点
    chartInstance.dispatchAction({
      type: 'downplay',
      seriesIndex: 0
    });
    
    chartInstance.dispatchAction({
      type: 'highlight',
      seriesIndex: 0,
      dataIndex: newIndex
    });
    
    chartInstance.dispatchAction({
      type: 'showTip',
      seriesIndex: 0,
      dataIndex: newIndex
    });
  }
});

onMounted(() => {
  initChart();
});
</script>

<style scoped>
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

.history-media img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.8s ease;
}

.history-card:hover .history-media img {
  transform: scale(1.05);
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
  
}
</style>