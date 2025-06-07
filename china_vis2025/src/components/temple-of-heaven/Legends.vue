<template>
  <div class="legends-container">
    <!-- 返回按钮 -->
    <button @click="goBack" class="back-button">← 返回天坛门户</button>
    
    <!-- 页面标题 -->
    <div class="legends-header">
      <h1>天坛六百年皇家秘事</h1>
      <p>从嘉靖帝雷击事件到光绪帝祈雨传奇，感受圣坛背后的历史风云</p>
    </div>
    
    <!-- 主要布局 -->
    <div class="legends-content">
      <!-- 左侧时间轴 -->
      <div class="timeline-section">
        <div class="timeline">
          <div class="timeline-line"></div>
          <div 
            v-for="(item, index) in legendsData" 
            :key="index" 
            :class="['timeline-item', { 'active': activeIndex === index }]"
            @click="setActiveIndex(index)"
          >
            <div class="timeline-dot" :style="{ backgroundColor: item.color }"></div>
            <div class="timeline-year">{{ item.year }}</div>
            <div class="timeline-title">{{ item.title }}</div>
          </div>
        </div>
      </div>
      
      <!-- 右侧内容区域 -->
      <div class="content-section">
        <!-- 传奇事件卡片 -->
        <div class="legend-card">
          <div class="legend-media" :style="{ backgroundImage: `url(${activeData.image})` }">
            <div class="event-type" :style="{ backgroundColor: activeData.color }">
              {{ activeData.type }}
            </div>
          </div>
          
          <div class="legend-info">
            <h2>{{ activeData.title }}</h2>
            <div class="legend-period">{{ activeData.period }}</div>
            <div class="legend-desc">{{ activeData.description }}</div>
            
            <div class="legend-significance">
              <h3>历史意义</h3>
              <p>{{ activeData.significance }}</p>
            </div>
          </div>
        </div>
        
        <!-- 传奇事件类型分布图表 -->
        <div class="chart-section">
          <h3>天坛传奇事件类型分布</h3>
          <div ref="typeChart" class="chart-container"></div>
        </div>
      </div>
    </div>
    
    <!-- 事件时间分布图表 -->
    <div class="timeline-chart">
      <h3>天坛传奇事件时间分布 (1420-1918)</h3>
      <div ref="timelineChart" class="chart-container"></div>
    </div>
    
    <!-- 页脚 -->
    <div class="legends-footer">
      <p>天坛作为明清两代皇家祭坛，见证了无数历史风云变幻，这些传奇故事至今仍为人们所传颂。</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, computed } from 'vue';
import { useRouter } from 'vue-router';
import * as echarts from 'echarts';

const router = useRouter();

// 返回门户主页
const goBack = () => router.push('/landmarks/temple-of-heaven');

// 传奇事件数据
const legendsData = ref([
  {
    year: "1524",
    title: "嘉靖祭天惊雷",
    period: "明嘉靖三年",
    type: "天象异事",
    color: "#8b4513",
    description: "嘉靖皇帝首次祭天时，天空突降惊雷，击中斋宫檐角。钦天监解读为上天警示，建议皇帝反省施政。嘉靖遂下诏减免赋税，大赦天下，此事被记入《明实录》。",
    significance: "此次雷击事件被视为上天对皇帝的警示，促使嘉靖皇帝反思治国方略，对后续政治改革产生了深远影响。",
    image: "https://picsum.photos/600/400?lightning=1"
  },
  {
    year: "1540",
    title: "大旱祈雨显灵",
    period: "明嘉靖十九年",
    type: "祭祀灵验",
    color: "#1e90ff",
    description: "华北连年大旱，嘉靖皇帝亲赴圜丘祈雨。祭祀礼成时，乌云突聚，甘霖普降三日。皇帝命在祈年殿前立'感应碑'记述此事，此碑至今犹存。",
    significance: "此次祈雨成功极大提升了皇家祭祀的权威性，巩固了天坛作为天人沟通圣地的地位，成为明清两代重要的政治象征。",
    image: "https://picsum.photos/600/400?rain=1"
  },
  {
    year: "1644",
    title: "崇祯最后一祭",
    period: "明崇祯十七年",
    type: "历史转折",
    color: "#b22222",
    description: "李自成兵临北京城下，崇祯皇帝仍按例赴天坛祭天。据《明史》记载，祭祀途中狂风大作，燎炉倾倒，被视为亡国凶兆。十日后，崇祯自缢煤山。",
    significance: "这次祭祀成为明朝最后一次皇家祭天仪式，象征着大明王朝的终结，具有重要的历史节点意义。",
    image: "https://picsum.photos/600/400?last=1"
  },
  {
    year: "1743",
    title: "乾隆祈谷奇观",
    period: "清乾隆八年",
    type: "祭祀灵验",
    color: "#1e90ff",
    description: "乾隆皇帝祈谷礼毕，数万燕子盘旋于祈年殿上空，形成'百鸟朝凤'奇观。乾隆视为祥瑞，命画院绘《天坛瑞应图》，并作《瑞应颂》诗文刻石纪念。",
    significance: "这一自然奇观被解读为上天对乾隆盛世的嘉许，极大提升了乾隆皇权的神圣性，成为康乾盛世的重要象征事件。",
    image: "https://picsum.photos/600/400?birds=1"
  },
  {
    year: "1889",
    title: "祈年殿雷火劫",
    period: "清光绪十五年",
    type: "天象异事",
    color: "#8b4513",
    description: "农历八月二十四日，祈年殿遭雷击起火，三昼夜方熄。京城轰动，传言'天罚昏君'。光绪帝顶住压力，耗银百万两重建，历时七年方成。",
    significance: "此次雷击事件引发朝野震动，光绪帝力排众议重建祈年殿，展现了皇权对天坛象征意义的重视，也为后世留下了珍贵的建筑遗产。",
    image: "https://picsum.photos/600/400?fire=1"
  },
  {
    year: "1899",
    title: "光绪祈雨传奇",
    period: "清光绪二十五年",
    type: "祭祀灵验",
    color: "#1e90ff",
    description: "北方大旱，光绪皇帝素服步行至圜丘祈雨。祭祀当日酷热难当，但礼成时忽起东风，三日内普降甘霖。京城百姓跪迎'圣雨'，此事件被多国使节记录在回忆录中。",
    significance: "在清朝国势衰微之际，此次祈雨成功短暂提振了皇权威望，成为晚清重要的政治宣传事件，展示了传统祭祀文化的持久影响力。",
    image: "https://picsum.photos/600/400?pray=1"
  }
]);

// 当前活动索引
const activeIndex = ref(0);
const setActiveIndex = (index) => {
  activeIndex.value = index;
};

// 当前活动数据
const activeData = computed(() => legendsData.value[activeIndex.value]);

// ECharts图表相关
const typeChart = ref(null);
const timelineChart = ref(null);
let typeChartInstance = null;
let timelineChartInstance = null;

// 事件类型分布数据
const typeData = computed(() => {
  const types = {};
  legendsData.value.forEach(item => {
    types[item.type] = (types[item.type] || 0) + 1;
  });
  
  return Object.keys(types).map(type => {
    return {
      name: type,
      value: types[type],
      itemStyle: { color: legendsData.value.find(d => d.type === type).color }
    };
  });
});

// 时间分布数据
const timelineData = computed(() => {
  return legendsData.value.map(item => {
    return {
      name: item.title,
      value: [item.year, 1], // 在时间轴上位置
      itemStyle: { color: item.color },
      year: item.year,
      description: item.description.substring(0, 60) + '...'
    };
  });
});

// 初始化事件类型图表
const initTypeChart = () => {
  if (typeChart.value) {
    typeChartInstance = echarts.init(typeChart.value);
    
    const option = {
      tooltip: {
        trigger: 'item',
        formatter: '{b}: {c}次 ({d}%)'
      },
      legend: {
        orient: 'vertical',
        right: 10,
        top: 'center',
        textStyle: {
          color: '#5a4a42'
        }
      },
      series: [
        {
          name: '事件类型',
          type: 'pie',
          radius: ['40%', '70%'],
          center: ['40%', '50%'],
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 10,
            borderColor: '#f5f2e9',
            borderWidth: 2
          },
          label: {
            show: true,
            formatter: '{b}: {c}次',
            fontSize: 14
          },
          emphasis: {
            label: {
              show: true,
              fontSize: 16,
              fontWeight: 'bold'
            }
          },
          labelLine: {
            show: true
          },
          data: typeData.value
        }
      ]
    };
    
    typeChartInstance.setOption(option);
    
    // 窗口大小改变时重绘图表
    window.addEventListener('resize', () => {
      typeChartInstance.resize();
    });
  }
};

// 初始化时间线图表
const initTimelineChart = () => {
  if (timelineChart.value) {
    timelineChartInstance = echarts.init(timelineChart.value);
    
    const years = [];
    for (let year = 1420; year <= 1918; year += 10) {
      years.push(year);
    }
    
    const option = {
      tooltip: {
        trigger: 'item',
        formatter: function(params) {
          return `<strong>${params.data.name}</strong><br/>
                  <span style="color:${params.color}">●</span> ${params.data.year}年<br/>
                  ${params.data.description}`;
        }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        data: years,
        axisLine: {
          lineStyle: {
            color: '#8b4513'
          }
        },
        axisLabel: {
          color: '#5a4a42'
        },
        name: '年份',
        nameLocation: 'middle',
        nameGap: 30
      },
      yAxis: {
        type: 'value',
        show: false
      },
      series: [
        {
          name: '传奇事件',
          type: 'scatter',
          symbolSize: function(data) {
            return 20 + data[1] * 10;
          },
          data: timelineData.value,
          markLine: {
            symbol: 'none',
            label: {
              formatter: '天坛传奇事件时间分布',
              position: 'start'
            },
            lineStyle: {
              color: '#d4a76a',
              type: 'solid'
            },
            data: [
              { yAxis: 0.5 }
            ]
          }
        }
      ]
    };
    
    timelineChartInstance.setOption(option);
    
    // 窗口大小改变时重绘图表
    window.addEventListener('resize', () => {
      timelineChartInstance.resize();
    });
  }
};

// 监听活动索引变化
watch(activeIndex, () => {
  if (timelineChartInstance) {
    // 高亮时间线图表对应点
    timelineChartInstance.dispatchAction({
      type: 'downplay',
      seriesIndex: 0
    });
    
    timelineChartInstance.dispatchAction({
      type: 'highlight',
      seriesIndex: 0,
      dataIndex: activeIndex.value
    });
    
    timelineChartInstance.dispatchAction({
      type: 'showTip',
      seriesIndex: 0,
      dataIndex: activeIndex.value
    });
  }
});

onMounted(() => {
  initTypeChart();
  initTimelineChart();
});
</script>

<style scoped>
.legends-container {
  font-family: "Noto Serif SC", serif;
  color: #333;
  line-height: 1.6;
  background: linear-gradient(135deg, #f0e6d1 0%, #e2d4b7 100%);
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

.legends-header {
  text-align: center;
  padding: 60px 20px 40px;
  position: relative;
}

.legends-header h1 {
  font-size: 2.8rem;
  color: #8b4513;
  margin-bottom: 15px;
  position: relative;
  display: inline-block;
}

.legends-header h1:after {
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

.legends-header p {
  font-size: 1.2rem;
  color: #5a4a42;
  max-width: 700px;
  margin: 25px auto 0;
  line-height: 1.8;
}

/* 主要内容布局 */
.legends-content {
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
  border: 3px solid #f5f2e9;
  box-shadow: 0 0 0 4px rgba(0, 0, 0, 0.1);
  transition: all 0.4s ease;
}

.timeline-item.active .timeline-dot {
  width: 24px;
  height: 24px;
  box-shadow: 0 0 0 6px rgba(0, 0, 0, 0.1);
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

/* 传奇事件卡片 */
.legend-card {
  background: linear-gradient(135deg, #ffffff 0%, #f9f5ed 100%);
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 15px 40px rgba(101, 67, 33, 0.15);
  margin-bottom: 40px;
}

.legend-media {
  height: 350px;
  background-size: cover;
  background-position: center;
  position: relative;
  transition: all 0.8s ease;
}

.legend-card:hover .legend-media {
  transform: scale(1.02);
}

.event-type {
  position: absolute;
  top: 20px;
  right: 20px;
  padding: 8px 16px;
  border-radius: 30px;
  color: white;
  font-weight: bold;
  font-size: 0.9rem;
  backdrop-filter: blur(5px);
  background-color: rgba(0, 0, 0, 0.5);
}

.legend-info {
  padding: 30px;
}

.legend-info h2 {
  font-size: 2rem;
  color: #8b4513;
  margin-bottom: 10px;
  position: relative;
  display: inline-block;
}

.legend-info h2:after {
  content: "";
  position: absolute;
  bottom: -5px;
  left: 0;
  width: 60px;
  height: 2px;
  background: linear-gradient(90deg, #d4a76a 0%, #8b4513 100%);
}

.legend-period {
  font-size: 1.1rem;
  color: #9c7c5c;
  font-style: italic;
  margin-bottom: 20px;
}

.legend-desc {
  font-size: 1.05rem;
  color: #5a4a42;
  line-height: 1.8;
  margin-bottom: 30px;
}

.legend-significance {
  background: rgba(212, 167, 106, 0.1);
  border-left: 4px solid #d4a76a;
  padding: 15px 20px;
  border-radius: 0 8px 8px 0;
}

.legend-significance h3 {
  font-size: 1.3rem;
  color: #8b4513;
  margin-bottom: 10px;
}

.legend-significance p {
  color: #5a4a42;
  line-height: 1.8;
}

/* 图表区域 */
.chart-section {
  background: linear-gradient(135deg, #ffffff 0%, #f9f5ed 100%);
  border-radius: 20px;
  padding: 30px;
  box-shadow: 0 15px 40px rgba(101, 67, 33, 0.15);
  margin-bottom: 40px;
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

/* 时间线图表区域 */
.timeline-chart {
  max-width: 1400px;
  margin: 0 auto 40px;
  background: linear-gradient(135deg, #ffffff 0%, #f9f5ed 100%);
  border-radius: 20px;
  padding: 30px;
  box-shadow: 0 15px 40px rgba(101, 67, 33, 0.15);
}

.timeline-chart h3 {
  font-size: 1.5rem;
  color: #8b4513;
  margin-bottom: 20px;
  text-align: center;
  position: relative;
  padding-bottom: 15px;
}

.timeline-chart h3:after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 180px;
  height: 2px;
  background: linear-gradient(90deg, #d4a76a 0%, #8b4513 100%);
}

/* 页脚 */
.legends-footer {
  text-align: center;
  padding: 40px 20px;
  color: #5a4a42;
  font-size: 1.1rem;
  line-height: 1.8;
  max-width: 800px;
  margin: 0 auto;
  border-top: 1px solid rgba(139, 69, 19, 0.2);
}

/* 响应式设计 */
@media (max-width: 1200px) {
  .legends-content {
    flex-direction: column;
  }
  
  .timeline-section {
    margin-bottom: 40px;
  }
}

@media (max-width: 768px) {
  .legends-header h1 {
    font-size: 2.2rem;
  }
  
  .timeline-item {
    padding: 20px 15px 20px 60px;
  }
  
  .legend-media {
    height: 250px;
  }
}

@media (max-width: 480px) {
  .legends-header {
    padding: 40px 15px 30px;
  }
  
  .back-button {
    top: 15px;
    left: 15px;
    padding: 10px 15px;
  }
}
</style>