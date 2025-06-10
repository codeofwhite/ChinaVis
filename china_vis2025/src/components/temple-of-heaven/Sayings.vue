<template>
  <div class="tiantan-sayings-wrapper">
    <h2>天坛金句录</h2>
    <p class="subtitle">点击下方名句，探索其背后的故事与意境</p>

    <div class="sayings-wordcloud-container">
      <div ref="wordCloudChart" class="echarts-chart"></div>
      <p v-if="!processedSayings || processedSayings.length === 0" class="loading-text">金句加载中...</p>
    </div>

    <div v-if="isModalVisible" class="modal-overlay" @click.self="closeStory">
      <div class="modal-content">
        <button class="close-button" @click="closeStory">&times;</button>
        <div v-if="selectedSaying">
          <h3 class="modal-title">"{{ selectedSaying.saying }}"</h3>
          <p class="modal-story-title">{{ selectedSaying.story.title }}</p>
          <p class="modal-story-content">{{ selectedSaying.story.content }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from 'vue';
import * as echarts from 'echarts';
import 'echarts-wordcloud';

// --- 数据中心 ---
const palaceSayings = ref([
  {
    id: 'heavenlyTemple',
    saying: '天坛之上，天人合一',
    theme: '哲学思想',
    weight: 95,
    story: {
      title: '天坛的宗教象征',
      content: '天坛是明清时期皇帝祭天的场所，象征着天人合一的理念。其建筑设计不仅体现了古代中国的宇宙观，更是对天与地、人与神之间关系的深刻理解。每年，皇帝在此举行隆重的祭天仪式，表达对自然的敬畏与对天命的顺应。'
    }
  },
  {
    id: 'sacredAltar',
    saying: '祭天之坛，古韵悠长',
    theme: '历史感悟',
    weight: 90,
    story: {
      title: '祭天仪式的历史回顾',
      content: '天坛的祭天仪式有着悠久的历史，体现了中国古代对天命的重视。祭天不仅是对上天的祈求，更是对国家安定、风调雨顺的期盼。每一次的祭天，都是对历史的回顾与文化的传承。'
    }
  },
  {
    id: 'sacredArchitecture',
    saying: '圆顶之下，万象归一',
    theme: '建筑美学',
    weight: 85,
    story: {
      title: '天坛的建筑奇迹',
      content: '天坛的圆顶设计象征着天的完美与统一，体现了古代建筑师的智慧。其独特的建筑结构和精美的装饰，使其成为世界文化遗产，吸引了无数游客与学者的关注。'
    }
  },
  {
    id: 'culturalHeritage',
    saying: '文化传承，代代相承',
    theme: '文化传承',
    weight: 88,
    story: {
      title: '天坛与中华文化',
      content: '天坛不仅是祭天的场所，更是中华文化的重要象征。它承载着几千年的历史与文化，见证了无数的朝代更迭与历史变迁。每一块砖瓦都蕴含着深厚的文化底蕴，提醒着后人珍惜与传承。'
    }
  },
  // 新增金句
  {
    id: 'cosmicSymbol',
    saying: '天圆地方，宇宙至理',
    theme: '哲学思想',
    weight: 82,
    story: {
      title: '天坛的宇宙观',
      content: '天坛的整体布局完美体现了"天圆地方"的古代宇宙观。祈年殿的圆形三重檐象征"天"，方形的围墙代表"地"，这种设计理念展示了古人对宇宙秩序的深刻理解。'
    }
  },
  {
    id: 'dynastyChange',
    saying: '坛前烟雨，朝代更迭',
    theme: '历史感悟',
    weight: 80,
    story: {
      title: '天坛见证的历史变迁',
      content: '从明清至今，天坛见证了无数历史变迁。从皇帝祭天的庄严仪式到如今的旅游景点，天坛的每一块砖石都承载着历史的记忆，诉说着时代的变迁。'
    }
  },
  {
    id: 'soundMiracle',
    saying: '回音壁前，声传千年',
    theme: '科学智慧',
    weight: 78,
    story: {
      title: '天坛的声学奇迹',
      content: '回音壁是天坛建筑的声学奇迹之一，两人分别站在东西配殿后，贴近墙壁低声说话，声波会沿着墙壁连续反射前进，彼此都能听得一清二楚。这展示了古代工匠对声学原理的精妙运用。'
    }
  },
  {
    id: 'woodenStructure',
    saying: '榫卯之间，匠心独运',
    theme: '建筑美学',
    weight: 83,
    story: {
      title: '天坛的木构艺术',
      content: '天坛建筑群全部采用木结构，不使用一根钉子。祈年殿的28根立柱象征二十八星宿，这种设计不仅具有结构上的稳定性，更体现了古代工匠对天文知识的应用。'
    }
  },
  {
    id: 'blueGlaze',
    saying: '琉璃碧瓦，映照苍穹',
    theme: '艺术价值',
    weight: 76,
    story: {
      title: '天坛的色彩象征',
      content: '天坛建筑的蓝色琉璃瓦象征天空，汉白玉栏杆代表大地。这种色彩运用深含阴阳五行哲学，四方色彩分别对应四季五行，体现了古人对自然的敬畏与理解。'
    }
  },
  {
    id: 'pillarMeaning',
    saying: '三十六柱，天罡之数',
    theme: '建筑美学',
    weight: 77,
    story: {
      title: '天坛的数字哲学',
      content: '祈年殿内圈12根金柱代表12个月份，外圈12根檐柱象征12时辰，整体36根立柱对应36天罡。这种数字象征系统展示了古代建筑中的宇宙秩序观念。'
    }
  },
  {
    id: 'worldHeritage',
    saying: '世界遗产，人类瑰宝',
    theme: '文化传承',
    weight: 92,
    story: {
      title: '天坛的世界意义',
      content: '1998年，天坛被联合国教科文组织列入《世界遗产名录》。作为中国古代建筑的杰出代表，天坛不仅属于中国，更是全人类共同的文化遗产，体现了人类对宇宙的共同探索。'
    }
  },
  {
    id: 'architectWisdom',
    saying: '巧匠神工，天人共鉴',
    theme: '建筑美学',
    weight: 81,
    story: {
      title: '天坛的建造智慧',
      content: '天坛的建造凝聚了无数工匠的智慧。从精确的轴线布局到复杂的木结构，从精美的彩绘到精妙的声学设计，每一项都展示了古代中国建筑技术的巅峰成就。'
    }
  },
  {
    id: 'seasonSymbol',
    saying: '四季轮回，坛中尽显',
    theme: '哲学思想',
    weight: 79,
    story: {
      title: '天坛与四季象征',
      content: '天坛建筑群通过四方布局象征四季轮回。东侧建筑代表春季，南侧象征夏季，西侧对应秋季，北侧则代表冬季。这种设计体现了古人对自然规律的尊重与理解。'
    }
  },
  {
    id: 'sacredPath',
    saying: '神道悠悠，直通苍穹',
    theme: '建筑美学',
    weight: 84,
    story: {
      title: '天坛的轴线设计',
      content: '天坛的主轴线被称为"神道"，长达360米，笔直通往祈年殿。这条轴线不仅具有空间上的引导作用，更象征着连接天地的神圣通道，体现了古人对宇宙秩序的认知。'
    }
  },
  {
    id: 'prayerForRain',
    saying: '祈谷祭天，五谷丰登',
    theme: '文化传承',
    weight: 86,
    story: {
      title: '天坛的祈谷仪式',
      content: '每年孟春时节，皇帝在天坛举行祈谷大典，祈求风调雨顺、五谷丰登。这一仪式体现了农业社会对自然的依赖与敬畏，也是古代国家治理的重要活动。'
    }
  },
  {
    id: 'philosophyStone',
    saying: '石中藏道，道法自然',
    theme: '哲学思想',
    weight: 88,
    story: {
      title: '天坛的石材象征',
      content: '天坛的石材选择与布局深含哲学意义。圜丘坛的石板数均为9的倍数，象征"天数"；丹陛桥的石板数则象征一年的天数。这种设计体现了古人对自然的深刻理解。'
    }
  }
]);

// 定义主题颜色映射
const themeColors = {
  '哲学思想': '#3f7f9f', // 天蓝色，代表哲学思想
  '历史感悟': '#c0a16c', // 金色，代表历史感悟
  '建筑美学': '#8b5a2b', // 棕色，代表建筑美学
  '文化传承': '#5d4037', // 深棕色，代表文化传承
  '科学智慧': '#2e7d32', // 绿色，代表科学智慧
  '艺术价值': '#6a1b9a' // 紫色，代表艺术价值
};

// ECharts 相关
const wordCloudChart = ref(null);
let myChart = null;

// 计算属性：将 palaceSayings 转换为 ECharts 词云所需的格式
const processedSayings = computed(() => {
  return palaceSayings.value.map(item => ({
    name: item.saying,
    value: item.weight,
    theme: item.theme,
    originalData: item
  }));
});

// 根据主题获取颜色函数
function getWordColor(params) {
  const theme = params.data.theme;
  return themeColors[theme] || '#5c4d3c';
}

// 初始化 ECharts 词云
const initChart = () => {
  if (wordCloudChart.value) {
    myChart = echarts.init(wordCloudChart.value);
    setChartOption();
    window.addEventListener('resize', myChart.resize);
  }
};

// 设置 ECharts 选项
const setChartOption = () => {
  const option = {
    tooltip: {
      formatter: function (params) {
        return `<div style="font-size:14px;font-weight:bold;color:${params.color}">${params.name}</div>
                <div>主题：${params.data.theme}</div>`;
      }
    },
    series: [{
      type: 'wordCloud',
      shape: 'circle',
      left: 'center',
      top: 'center',
      width: '95%',
      height: '95%',
      sizeRange: [16, 70],
      rotationRange: [-45, 45],
      gridSize: 10,
      drawOutOfBound: false,
      layoutAnimation: true,
      textStyle: {
        fontFamily: 'Noto Serif SC, Songti SC, STSong, serif',
        fontWeight: 'bold',
        color: getWordColor
      },
      emphasis: {
        focus: 'self',
        textStyle: {
          shadowBlur: 15,
          shadowColor: '#333',
          fontWeight: 'bolder',
          fontSize: '1.2em'
        }
      },
      data: processedSayings.value
    }]
  };
  myChart.setOption(option);

  myChart.off('click');
  myChart.on('click', function (params) {
    if (params.componentType === 'series' && params.seriesType === 'wordCloud') {
      showStory(params.data.originalData);
    }
  });
};

// --- 交互逻辑 ---
const isModalVisible = ref(false);
const selectedSaying = ref(null);

const showStory = (item) => {
  selectedSaying.value = item;
  isModalVisible.value = true;
};

const closeStory = () => {
  isModalVisible.value = false;
  setTimeout(() => {
    selectedSaying.value = null;
  }, 300);
};

onMounted(() => {
  initChart();
});

onUnmounted(() => {
  if (myChart) {
    myChart.dispose();
    window.removeEventListener('resize', myChart.resize);
  }
});

watch(processedSayings, () => {
  if (myChart) {
    setChartOption();
  }
}, { deep: true });
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Noto+Serif+SC:wght@400;700&display=swap');

.tiantan-sayings-wrapper {
  background-color: #f9f6f2;
  padding: 2rem 1rem;
  width: 100%;
  max-width: 1200px;
  margin: 2rem auto;
  border-radius: 12px;
  box-shadow: 0 8px 25px rgba(101, 67, 33, 0.1);
  font-family: 'Noto Serif SC', 'Songti SC', 'STSong', serif;
  border: 1px solid #d4a76a;
}

.tiantan-sayings-wrapper h2 {
  font-size: 2.5rem;
  color: #8b4513;
  text-align: center;
  margin-bottom: 0.5rem;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
}

.subtitle {
  text-align: center;
  color: #5d4037;
  margin-bottom: 3rem;
  font-size: 1.1rem;
  font-style: italic;
}

/* ECharts 词云容器 */
.sayings-wordcloud-container {
  width: 100%;
  height: 500px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 2rem;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 15px rgba(139, 69, 19, 0.1);
  border: 1px solid #d4a76a;
}

.echarts-chart {
  width: 100%;
  height: 100%;
}

.loading-text {
  position: absolute;
  color: #8c7b60;
  font-size: 1.2rem;
}

/* --- 弹窗 (Modal) 样式 --- */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  animation: fadeIn 0.3s ease;
}

.modal-content {
  position: relative;
  background: #fdfaf5;
  padding: 3rem;
  border-radius: 12px;
  width: 90%;
  max-width: 700px;
  box-shadow: 0 8px 30px rgba(101, 67, 33, 0.2);
  border: 2px solid #d4a76a;
  animation: slideIn 0.4s ease-out;
}

.close-button {
  position: absolute;
  top: 15px;
  right: 15px;
  background: none;
  border: none;
  font-size: 2.2rem;
  color: #a08c70;
  cursor: pointer;
  transition: all 0.3s;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
}

.close-button:hover {
  color: #8b4513;
  background-color: rgba(212, 167, 106, 0.1);
  transform: rotate(90deg);
}

.modal-title {
  font-size: 2.2rem;
  color: #8b4513;
  text-align: center;
  margin-top: 0;
  margin-bottom: 1.5rem;
  padding: 0 20px;
  line-height: 1.3;
}

.modal-story-title {
  font-size: 1.3rem;
  font-weight: bold;
  color: #7a6a57;
  text-align: center;
  margin-bottom: 2rem;
  padding-bottom: 1.5rem;
  border-bottom: 2px solid #e0d1b9;
}

.modal-story-content {
  font-size: 1.15rem;
  line-height: 1.9;
  color: #665a48;
  text-align: justify;
  padding: 0 15px;
  max-height: 50vh;
  overflow-y: auto;
}

/* 滚动条美化 */
.modal-story-content::-webkit-scrollbar {
  width: 8px;
}
.modal-story-content::-webkit-scrollbar-track {
  background: #fdfaf5;
}
.modal-story-content::-webkit-scrollbar-thumb {
  background-color: #d4a76a;
  border-radius: 20px;
}

/* 动画效果 */
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideIn {
  from { transform: translateY(-50px) scale(0.95); opacity: 0; }
  to { transform: translateY(0) scale(1); opacity: 1; }
}

@media (max-width: 768px) {
  .tiantan-sayings-wrapper h2 {
    font-size: 2rem;
  }
  
  .subtitle {
    font-size: 1rem;
  }
  
  .sayings-wordcloud-container {
    height: 400px;
  }
  
  .modal-title {
    font-size: 1.8rem;
  }
  
  .modal-story-title {
    font-size: 1.2rem;
  }
  
  .modal-story-content {
    font-size: 1.05rem;
  }
}

@media (max-width: 480px) {
  .tiantan-sayings-wrapper {
    padding: 1.5rem 0.5rem;
  }
  
  .sayings-wordcloud-container {
    height: 350px;
  }
  
  .modal-content {
    padding: 2rem 1.5rem;
  }
  
  .modal-title {
    font-size: 1.6rem;
  }
}
</style>