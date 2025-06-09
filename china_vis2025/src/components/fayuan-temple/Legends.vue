<template>
  <div class="legends-container">
    <!-- 返回按钮 -->
    <button @click="goBack" class="back-button">← 返回法源寺主页</button>
    
    <!-- 页面标题 -->
    <div class="legends-header">
      <h1>法源寺千年传奇</h1>
      <p>从高僧圣迹到历史名人，感受古刹背后的千年风云</p>
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
          <h3>法源寺传奇类型分布</h3>
          <div ref="typeChart" class="chart-container"></div>
        </div>
      </div>
    </div>
    
    <!-- 事件时间分布图表 -->
    <div class="timeline-chart">
      <h3>法源寺传奇事件时间分布 (645-2024)</h3>
      <div ref="timelineChart" class="chart-container"></div>
    </div>
    
    <!-- 页脚 -->
    <div class="legends-footer">
      <p>法源寺作为千年古刹，见证了无数历史风云变幻，这些传奇故事至今仍为人们所传颂。</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, computed } from 'vue';
import { useRouter } from 'vue-router';
import * as echarts from 'echarts';

const router = useRouter();

// 返回门户主页
const goBack = () => router.push('/landmarks/fayuan-temple');

// 法源寺传奇数据
const legendsData = ref([
  {
    year: "645",
    title: "玄奘译经圣迹",
    period: "唐贞观十九年",
    type: "高僧故事",
    color: "#8e6b47",
    description: "玄奘法师从天竺取经归来，唐太宗特命在法源寺设立译经院。玄奘在此翻译《大般若经》等重要佛典，传说每译完一卷，寺内古槐便开一次花，史称'译经开花'奇观。",
    significance: "奠定了法源寺作为汉传佛教重要译经中心的地位，促进了佛教文化在中国的传播与发展。",
    image: "https://picsum.photos/600/400?xuanzang=1"
  },
  {
    year: "1127",
    title: "靖康之变藏经",
    period: "宋靖康二年",
    type: "历史事件",
    color: "#b22222",
    description: "金兵攻陷汴梁，法源寺僧众冒死将《开宝藏》等珍贵佛经运至寺内地宫秘藏，保护了这批佛教文化瑰宝。传说地宫入口处有金刚护法显灵，吓退追兵。",
    significance: "保存了北宋佛教文化的重要遗产，体现了法源寺僧人的爱国精神和护法决心。",
    image: "https://picsum.photos/600/400?sutra=1"
  },
  {
    year: "1368",
    title: "道衍法师传奇",
    period: "明洪武元年",
    type: "高僧故事",
    color: "#8e6b47",
    description: "明成祖朱棣的谋臣姚广孝（道衍法师）曾在法源寺出家。传说他在寺中银杏树下参禅时顿悟'靖难'大计，后助朱棣夺取皇位，成为'黑衣宰相'。",
    significance: "展示了法源寺在历史关键节点的重要作用，体现了佛教与政治的密切关系。",
    image: "https://picsum.photos/600/400?monk=1"
  },
  {
    year: "1644",
    title: "崇祯帝遗诏",
    period: "明崇祯十七年",
    type: "历史事件",
    color: "#b22222",
    description: "李自成攻入北京前夜，崇祯帝秘访法源寺，在观音殿内留下血诏。住持了然法师将其藏于观音像内，三百年后方被发现。",
    significance: "保存了明末重要历史文物，见证了王朝更替的悲壮时刻。",
    image: "https://picsum.photos/600/400?emperor=1"
  },
  {
    year: "1898",
    title: "梁启超结缘",
    period: "清光绪二十四年",
    type: "名人渊源",
    color: "#1e90ff",
    description: "戊戌变法失败后，梁启超避难法源寺。传说他在丁香院中得高僧点化，完成《饮冰室文集》重要章节。寺内仍存有他题写的'法海真源'匾额。",
    significance: "展现了法源寺作为知识分子精神避难所的重要角色，促进了近代思想启蒙。",
    image: "https://picsum.photos/600/400?liangqichao=1"
  },
  {
    year: "1924",
    title: "泰戈尔访寺",
    period: "民国十三年",
    type: "名人渊源",
    color: "#1e90ff",
    description: "印度诗人泰戈尔访华期间，专程到法源寺赏丁香。他与徐志摩、林徽因在寺内论道，传说丁香花在三人交谈时异常盛开，形成'三贤论道，丁香映雪'的奇景。",
    significance: "促进了中印文化交流，成为近代中外佛教文化交流的佳话。",
    image: "https://picsum.photos/600/400?tagore=1"
  },
  {
    year: "1949",
    title: "千年古槐显灵",
    period: "建国之年",
    type: "神秘传说",
    color: "#2e8b57",
    description: "法源寺内千年古槐在建国大典当日突然开花，而此前三年从未开花。僧人视为吉兆，传言古槐通灵，每逢重大历史转折便会开花。",
    significance: "体现了佛教对中国重大历史事件的象征意义，增强了法源寺的神秘色彩。",
    image: "https://picsum.photos/600/400?tree=1"
  },
  {
    year: "2003",
    title: "佛牙舍利重现",
    period: "新世纪",
    type: "神秘传说",
    color: "#2e8b57",
    description: "寺内修缮时意外发现唐代佛牙舍利，据传是玄奘从天竺带回。发现当日，寺内梵钟自鸣三声，千年古井涌出甘泉，被视为祥瑞之兆。",
    significance: "丰富了法源寺的佛教圣物收藏，增强了其作为佛教圣地的地位。",
    image: "https://picsum.photos/600/400?relic=1"
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
      value: [parseInt(item.year), 1], // 在时间轴上位置
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
        formatter: '{b}: {c}个 ({d}%)'
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
          name: '传奇类型',
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
            formatter: '{b}: {c}个',
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
    for (let year = 600; year <= 2024; year += 100) {
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
        type: 'value',
        min: 600,
        max: 2024,
        axisLine: {
          lineStyle: {
            color: '#8e6b47'
          }
        },
        axisLabel: {
          color: '#5a4a42',
          formatter: function(value) {
            return value + '年';
          }
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
              formatter: '法源寺千年传奇',
              position: 'start'
            },
            lineStyle: {
              color: '#c49a6c',
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
  background: linear-gradient(135deg, #f8f4e9 0%, #f0e6d2 100%);
  min-height: 100vh;
  padding: 20px;
  position: relative;
  overflow-x: hidden;
}

.back-button {
  position: absolute;
  top: 30px;
  left: 30px;
  background-color: rgba(142, 107, 71, 0.8);
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
  background-color: rgba(160, 120, 80, 0.9);
  transform: translateX(-5px);
}

.legends-header {
  text-align: center;
  padding: 60px 20px 40px;
  position: relative;
}

.legends-header h1 {
  font-size: 2.8rem;
  color: #78583f;
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
  background: linear-gradient(90deg, #c49a6c 0%, #78583f 100%);
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
  background: linear-gradient(to bottom, #c49a6c, #8e6b47);
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
  border: 1px solid rgba(142, 107, 71, 0.1);
}

.timeline-item:hover {
  background: rgba(255, 248, 225, 0.8);
  transform: translateX(10px);
}

.timeline-item.active {
  background: rgba(255, 248, 225, 0.95);
  box-shadow: 0 10px 30px rgba(142, 107, 71, 0.15);
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
  border: 3px solid #f8f4e9;
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
  color: #8e6b47;
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
  color: #78583f;
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
  background: linear-gradient(90deg, #c49a6c 0%, #78583f 100%);
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
  background: rgba(196, 154, 108, 0.1);
  border-left: 4px solid #c49a6c;
  padding: 15px 20px;
  border-radius: 0 8px 8px 0;
}

.legend-significance h3 {
  font-size: 1.3rem;
  color: #78583f;
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
  color: #78583f;
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
  background: linear-gradient(90deg, #c49a6c 0%, #78583f 100%);
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
  color: #78583f;
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
  background: linear-gradient(90deg, #c49a6c 0%, #78583f 100%);
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
  border-top: 1px solid rgba(142, 107, 71, 0.2);
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
  
  .legends-header h1 {
    font-size: 1.8rem;
  }
  
  .legend-info h2 {
    font-size: 1.6rem;
  }
}
</style>