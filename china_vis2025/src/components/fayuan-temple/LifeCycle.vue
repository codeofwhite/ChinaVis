<template>
  <div class="lifecycle-container">
    <!-- 返回按钮 -->
    <button @click="goBack" class="back-button">← 返回法源寺门户</button>
    
    <!-- 页面标题 -->
    <div class="lifecycle-header">
      <h1>法源寺千年兴衰史</h1>
      <p>从唐太宗敕建到现代佛教文化中心的沧桑变迁</p>
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
            
            <!-- 建筑特点部分 -->
            <div class="architectural-features" v-if="activeData.features">
              <h3>建筑特点</h3>
              <ul>
                <li v-for="(feature, idx) in activeData.features" :key="idx">{{ feature }}</li>
              </ul>
            </div>
          </div>
        </div>
        
        <!-- 建筑规模变化图表 -->
        <div class="chart-section">
          <h3>法源寺建筑规模演变</h3>
          <div ref="chart" class="chart-container"></div>
        </div>
        
        <!-- 建筑功能演变图表 -->
        <div class="chart-section">
          <h3>寺院功能性质演变</h3>
          <div ref="functionChart" class="chart-container"></div>
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
const goBack = () => router.push('/landmarks/fayuan-temple');

// 时间轴数据 - 法源寺特有的历史节点
const timelineData = ref([
  {
    year: "645",
    title: "唐代始建",
    period: "唐贞观十九年",
    description: '唐太宗李世民为悼念东征阵亡将士下诏建寺，初名悯忠寺。工程浩大，历时51年才建成。建筑群采用典型唐代寺院布局，中轴线对称，建有山门、钟鼓楼、悯忠阁、大雄宝殿等核心建筑。建筑材料以木结构为主，屋顶覆盖青瓦，体现盛唐建筑的雄浑风格。',
    image: "https://img2.baidu.com/it/u=173075004,1001130261&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=500",
    metrics: [
      { value: "51年", label: "建造工期" },
      { value: "7进院落", label: "建筑布局" },
      { value: "30+座", label: "主要殿堂" }
    ],
    features: [
      "典型唐代寺院中轴对称布局",
      "木构架承重体系",
      "青瓦歇山顶建筑群"
    ]
  },
  {
    year: "882",
    title: "唐代焚毁",
    period: "唐中和二年",
    description: "悯忠寺遭火灾焚毁，主体建筑悯忠阁及东西双塔化为灰烬。此时正值唐末战乱，朝廷无力重修，寺院荒废近百年。史料记载'悯忠高阁，去天一握'的壮丽景象就此消失，仅存地基遗址。这是法源寺历史上第一次重大损毁。",
    image: "https://img0.baidu.com/it/u=2429986127,1302041570&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=500",
    metrics: [
      { value: "100%", label: "主殿损毁" },
      { value: "70年", label: "荒废时间" },
      { value: "2座", label: "焚毁佛塔" }
    ],
    features: [
      "主体建筑全毁",
      "仅存地基遗址",
      "荒废近百年"
    ]
  },
  {
    year: "1057",
    title: "辽代地震",
    period: "辽清宁三年",
    description: "幽州大地震导致寺院全毁，这是法源寺历史上第二次重大损毁。辽代皇室虽崇信佛教，但因战事频繁，仅对部分建筑进行了简单修复。寺内现存最古老的建筑遗存——辽代石经幢就是震后重建时安放的。",
    image: "https://img2.baidu.com/it/u=4153467665,1521801940&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=500",
    metrics: [
      { value: "8.0级", label: "地震强度" },
      { value: "100%", label: "建筑损毁" },
      { value: "20年", label: "修复时间" }
    ],
    features: [
      "现存辽代石经幢",
      "部分建筑基础保留",
      "规模大幅缩减"
    ]
  },
  {
    year: "1447",
    title: "明代重修",
    period: "明正统二年",
    description: "明英宗敕令重修寺院，并赐额'崇福寺'。此次重建奠定了现存建筑群的基础格局。大雄宝殿、悯忠阁等主要建筑均按明代官式营造法式重建，采用楠木柱梁，屋顶改为黄色琉璃瓦。现存的明代风格斗拱和梁架结构大多源自此次重建。",
    image: "https://img0.baidu.com/it/u=1199122887,2021459&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=500",
    metrics: [
      { value: "30年", label: "工期" },
      { value: "48根", label: "楠木柱" },
      { value: "5进院落", label: "新布局" }
    ],
    features: [
      "黄色琉璃瓦顶",
      "明代官式斗拱",
      "楠木梁柱结构"
    ]
  },
  {
    year: "1733",
    title: "雍正赐名",
    period: "清雍正十一年",
    description: "雍正皇帝敕令全面重修，赐名'法源寺'并沿用至今。重建工程严格按照清代营造则例，大修各殿宇，增建藏经阁、戒坛等重要建筑。寺内现存主体建筑大多定型于此次重修，形成了七进六院的宏大格局。同时铸造了大量佛教文物，现存寺内重要法器大多源于此时期。",
    image: "https://img1.baidu.com/it/u=330730148,3984278631&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=500",
    metrics: [
      { value: "法源寺", label: "赐名" },
      { value: "7进6院", label: "建筑格局" },
      { value: "300+件", label: "新增法器" }
    ],
    features: [
      "清代官式彩绘",
      "满汉双语匾额",
      "戒坛与藏经阁"
    ]
  },
  {
    year: "1900",
    title: "庚子劫难",
    period: "清光绪二十六年",
    description: "八国联军占领北京期间，法源寺遭严重破坏。寺内文物被掠夺，建筑被损毁，佛像法器被劫掠一空。据记载，侵略军将寺院作为马厩和军营，导致多处建筑受损。这是近代史上法源寺最严重的劫难。",
    image: "https://img1.baidu.com/it/u=2479781627,3435865456&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=500",
    metrics: [
      { value: "60%", label: "建筑损毁" },
      { value: "200+件", label: "文物损失" },
      { value: "8年", label: "修复时间" }
    ],
    features: [
      "建筑作为马厩使用",
      "大量文物被掠夺",
      "佛像金箔被刮除"
    ]
  },
  {
    year: "1956",
    title: "佛学院成立",
    period: "新中国时期",
    description: "法源寺成为中国佛学院所在地，开启佛教教育新篇章。政府拨款进行保护性修缮，修复了战争损毁的建筑部分。寺院功能从纯粹宗教场所转变为佛教教育中心，培养了大批佛教人才。1963年曾在此举办亚洲宗教会议。",
    image: "https://img0.baidu.com/it/u=1931515007,3894831794&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=500",
    metrics: [
      { value: "中国佛学院", label: "新功能" },
      { value: "200+位", label: "培养学僧" },
      { value: "40+次", label: "国际会议" }
    ],
    features: [
      "佛教教育中心",
      "保护性修缮",
      "国际交流平台"
    ]
  },
  {
    year: "2001",
    title: "国保单位",
    period: "现代",
    description: "法源寺被列为全国重点文物保护单位，启动全面修缮工程。采用传统工艺修复了所有殿宇，重建了部分历史建筑。同时成立中国佛教图书文物馆，珍藏历代佛教文物。现今法源寺集宗教活动、文化展示、旅游观光于一体，成为北京重要的文化地标。",
    image: "https://img0.baidu.com/it/u=318203156,3842292057&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=500",
    metrics: [
      { value: "全国重点", label: "文物保护" },
      { value: "8万+件", label: "馆藏文物" },
      { value: "30万+", label: "年访客量" }
    ],
    features: [
      "传统工艺修复",
      "佛教文物馆藏",
      "多元文化空间"
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

// ECharts图表实例
const chart = ref(null);
const functionChart = ref(null);
let chartInstance = null;
let functionChartInstance = null;

// 建筑规模变化数据 - 法源寺特有的规模变化
const chartData = ref({
  years: timelineData.value.map(item => item.year),
  sizes: [100, 0, 20, 70, 100, 40, 80, 95] // 百分比数据
});

// 建筑功能演变数据
const functionData = ref({
  years: timelineData.value.map(item => item.year),
  functions: [
    {name: '皇家祭祀', data: [100, 0, 50, 60, 70, 30, 0, 0]},
    {name: '宗教活动', data: [0, 0, 30, 30, 20, 20, 60, 40]},
    {name: '佛教教育', data: [0, 0, 0, 0, 0, 0, 30, 30]},
    {name: '文物收藏', data: [0, 0, 20, 10, 10, 10, 10, 30]}
  ]
});

// 初始化规模变化图表
const initChart = () => {
  if (chart.value) {
    chartInstance = echarts.init(chart.value);
    
    const option = {
      tooltip: {
        trigger: 'axis',
        formatter: '{b0}<br/>规模：{c0}%'
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
        min: 0,
        max: 100,
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
          data: chartData.value.sizes,
          markPoint: {
            data: [
              {name: '火灾', value: '焚毁', xAxis: 1, yAxis: 0},
              {name: '地震', value: '全毁', xAxis: 2, yAxis: 20},
              {name: '庚子劫难', value: '严重损毁', xAxis: 5, yAxis: 40}
            ],
            symbol: 'pin',
            symbolSize: 50,
            label: {
              formatter: '{c}'
            }
          }
        }
      ]
    };
    
    chartInstance.setOption(option);
  }
};

// 初始化功能演变图表
const initFunctionChart = () => {
  if (functionChart.value) {
    functionChartInstance = echarts.init(functionChart.value);
    
    const option = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        },
        formatter: function(params) {
          let result = params[0].name + '<br/>';
          params.forEach(item => {
            result += `${item.marker} ${item.seriesName}: ${item.value}%<br/>`;
          });
          return result;
        }
      },
      legend: {
        data: functionData.value.functions.map(item => item.name),
        textStyle: {
          color: '#5a4a42'
        },
        bottom: 0
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '15%',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        data: functionData.value.years,
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
        max: 100,
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
      series: functionData.value.functions.map((func, index) => ({
        name: func.name,
        type: 'bar',
        stack: 'total',
        barWidth: '60%',
        emphasis: {
          focus: 'series'
        },
        data: func.data,
        itemStyle: {
          color: ['#8b4513', '#d4a76a', '#9c7c5c', '#5a4a42'][index]
        }
      }))
    };
    
    functionChartInstance.setOption(option);
  }
};

// 监听活动索引变化
watch(activeIndex, (newIndex) => {
  if (chartInstance) {
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
  
  if (functionChartInstance) {
    functionChartInstance.dispatchAction({
      type: 'highlight',
      seriesIndex: newIndex
    });
  }
});

// 响应窗口大小变化
const handleResize = () => {
  if (chartInstance) chartInstance.resize();
  if (functionChartInstance) functionChartInstance.resize();
};

onMounted(() => {
  initChart();
  initFunctionChart();
  window.addEventListener('resize', handleResize);
});
</script>

<style scoped>
/* 法源寺专属样式优化 */
.lifecycle-header h1 {
  color: #5d4037; /* 更深的棕色 */
}

.history-info h2 {
  color: #5d4037;
}

.history-info h2:after,
.lifecycle-header h1:after,
.chart-section h3:after {
  background: linear-gradient(90deg, #a1887f 0%, #5d4037 100%);
}

.timeline-point.active .timeline-marker,
.timeline-item.active .timeline-dot {
  background-color: #5d4037;
}

.timeline-point.active .timeline-year {
  color: #5d4037;
}

.architectural-features h3 {
  color: #5d4037;
}

/* 原有样式保持不变 */
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

  .chart-section {
    padding: 20px;
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
  
  .history-info {
    padding: 20px;
  }
  
  .chart-container {
    height: 250px;
  }
}
</style>