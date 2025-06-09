<template>
  <div class="lifecycle-container">
    <button @click="goBack" class="back-button">← 返回长城门户</button>
    <div class="graph-layout">
      <div ref="graphChart" class="chart-box"></div>
      <div class="info-panel" v-if="selectedPerson">
        <h2>{{ selectedPerson.name }}</h2>
        <div v-for="(paragraph, index) in selectedPerson.detail" :key="index">
          <p>{{ paragraph }}</p>
        </div>
      </div>
    </div>
    <div class="chart-desc">
      展示长城历史上重要人物及其关联事件，了解帝王、将领、文人、修缮者等与长城的故事。
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import * as echarts from 'echarts'
import { useRouter } from 'vue-router'

const router = useRouter()
function goBack() {
  router.push('/great-wall')
}

const graphChart = ref(null)
const selectedPerson = ref(null)

// 长城相关历史人物与事件
const peopleData = {
  '秦始皇': [
    '嬴政，秦朝开国皇帝，首次实现中国大一统。',
    '下令连接和修筑北方旧有防御墙，形成“万里长城”雏形。',
    '动员数十万民夫、士兵、囚徒参与修筑，留下“筑长城”的千古传说。'
  ],
  '蒙恬': [
    '秦朝著名将领，被誉为“长城之父”。',
    '奉秦始皇之命主持修筑西起临洮、东至辽东的长城，抵御匈奴南侵。',
    '善于用兵，守边十余年，巩固了北疆安全。'
  ],
  '汉武帝': [
    '西汉第七位皇帝，积极北击匈奴，巩固边防。',
    '多次修缮和加固长城，设置“九边重镇”，加强西北防御体系。',
    '派卫青、霍去病等将领出击匈奴，长城成为汉匈对峙的重要屏障。'
  ],
  '卫青': [
    '西汉名将，汉武帝时期北击匈奴的主帅。',
    '多次率军出塞，收复河套，保障长城沿线安全。',
    '其军事行动极大提升了长城的战略地位。'
  ],
  '明成祖朱棣': [
    '明朝第三位皇帝，迁都北京后高度重视北方防御。',
    '大规模修缮和扩建长城，采用砖石结构，形成今日所见的明长城。',
    '设立九边重镇，完善烽燧、关隘体系。'
  ],
  '戚继光': [
    '明代著名抗倭名将，后镇守蓟州（今北京东北）。',
    '主持修筑蓟镇长城，创新“敌台”结构，加强防御。',
    '训练戚家军，极大提升长城北段的战斗力。'
  ],
  '徐达': [
    '明初开国大将，参与北方长城修筑与防御体系建设。',
    '镇守北平，负责边防，巩固明初北疆安全。'
  ],
  '长城修缮': [
    '明清以来，长城多次因战乱、自然灾害受损。',
    '20世纪80年代起，中国政府启动大规模修缮工程，重点保护八达岭、山海关等段落。',
    '长城成为世界文化遗产，修缮与保护持续进行。'
  ],
  '八达岭保卫战': [
    '1933年，长城抗战爆发，国民革命军在八达岭、古北口等地英勇抗击日军。',
    '八达岭保卫战成为中国近代史上著名的民族抗战象征。'
  ],
  '世界遗产申报': [
    '1987年，长城被联合国教科文组织列为世界文化遗产。',
    '成为中国首批世界遗产之一，标志着长城的国际影响力和保护价值。'
  ]
}

onMounted(() => {
  const myChart = echarts.init(graphChart.value)
  const option = {
    tooltip: {
      formatter: function (params) {
        return params.data.name
      }
    },
    legend: [
      {
        data: ['帝王', '将领', '修缮者', '历史事件'],
        orient: 'vertical',
        left: 'left'
      }
    ],
    series: [
      {
        type: 'graph',
        layout: 'force',
        symbolSize: 60,
        roam: true,
        label: {
          show: true
        },
        force: {
          repulsion: 300,
          edgeLength: 120
        },
        categories: [
          { name: '帝王', itemStyle: { color: '#d4a76a' } },
          { name: '将领', itemStyle: { color: '#8b4513' } },
          { name: '修缮者', itemStyle: { color: '#5a9bd5' } },
          { name: '历史事件', itemStyle: { color: '#d94e5d' } }
        ],
        data: [
          { name: '长城', category: 0, symbolSize: 80, draggable: true },
          { name: '秦始皇', category: 0 },
          { name: '汉武帝', category: 0 },
          { name: '明成祖朱棣', category: 0 },
          { name: '蒙恬', category: 1 },
          { name: '卫青', category: 1 },
          { name: '戚继光', category: 1 },
          { name: '徐达', category: 1 },
          { name: '长城修缮', category: 2 },
          { name: '八达岭保卫战', category: 3 },
          { name: '世界遗产申报', category: 3 }
        ],
        links: [
          { source: '长城', target: '秦始皇' },
          { source: '长城', target: '汉武帝' },
          { source: '长城', target: '明成祖朱棣' },
          { source: '长城', target: '蒙恬' },
          { source: '长城', target: '卫青' },
          { source: '长城', target: '戚继光' },
          { source: '长城', target: '徐达' },
          { source: '长城', target: '长城修缮' },
          { source: '长城', target: '八达岭保卫战' },
          { source: '长城', target: '世界遗产申报' },
          { source: '秦始皇', target: '蒙恬' },
          { source: '汉武帝', target: '卫青' },
          { source: '明成祖朱棣', target: '戚继光' },
          { source: '明成祖朱棣', target: '徐达' },
          { source: '长城修缮', target: '世界遗产申报' },
          { source: '八达岭保卫战', target: '长城修缮' }
        ],
        lineStyle: {
          color: 'source',
          curveness: 0.2
        },
        emphasis: {
          focus: 'adjacency',
          lineStyle: {
            width: 5
          }
        },
        roam: true,
        draggable: true,
        zoom: 1.2,
        edgeSymbol: ['circle', 'arrow']
      }
    ]
  }
  myChart.setOption(option)
  myChart.on('click', function (params) {
    if (peopleData[params.data.name]) {
      selectedPerson.value = {
        name: params.data.name,
        detail: peopleData[params.data.name]
      }
    } else {
      selectedPerson.value = null
    }
  })
})
</script>

<style scoped>
.lifecycle-container {
  padding: 30px 10px 60px 10px;
  max-width: 1400px;
  margin: 0 auto;
}
.back-button {
  margin-bottom: 20px;
  background: #8b4513;
  color: #fff8e1;
  border: none;
  padding: 10px 22px;
  border-radius: 30px;
  cursor: pointer;
  font-size: 1em;
  transition: all 0.3s;
}
.back-button:hover {
  background: #a67c52;
}
.graph-layout {
  display: flex;
  flex-direction: row;
  gap: 20px;
}
.chart-box {
  flex: 1;
  height: 600px;
  min-height: 400px;
  margin-bottom: 20px;
}
.info-panel {
  width: 320px;
  background: linear-gradient(to bottom, #fffaf3, #f9f3e8);
  border-left: 2px solid #d4a76a;
  padding: 20px;
  color: #4a3d2f;
  font-size: 1em;
  line-height: 1.6;
  box-shadow: -2px 0 8px rgba(0, 0, 0, 0.05);
  border-radius: 8px;
  overflow-y: auto;
  max-height: 600px;
}
.info-panel h2 {
  font-size: 1.25em;
  margin-bottom: 10px;
  color: #8b4513;
}
.chart-desc {
  color: #5a4a42;
  font-size: 1em;
  text-align: center;
  margin-top: 20px;
}
</style>
