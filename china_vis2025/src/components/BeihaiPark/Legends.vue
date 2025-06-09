<template>
  <div class="lifecycle-container">
    <button @click="goBack" class="back-button">← 返回北海公园门户</button>
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
      展示北海公园历史上重要人物及其关联事件，了解帝王、文人、建筑师等与北海的故事。
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import * as echarts from 'echarts'
import { useRouter } from 'vue-router'

const router = useRouter()
function goBack() {
  router.push('/landmarks/beihai-park')
}

const graphChart = ref(null)
const selectedPerson = ref(null)

const peopleData = {
  '乾隆皇帝': [
    '清高宗爱新觉罗·弘历，清代在位时间最长的皇帝。',
    '他对北海进行大规模整修，兴建白塔、九龙壁、静心斋等景点。',
    '乾隆本人留下大量御笔题咏，强化了北海的皇家文化氛围。'
  ],
  '慈禧太后': [
    '清末实际统治者，长期在北海瀛台生活和办公。',
    '她多次主持北海整修，使瀛台成为政治与园林的结合体。',
    '北海成为慈禧日常起居与权力中枢并存之地。'
  ],
  '忽必烈': [
    '元朝开国皇帝，定都大都（今北京）。',
    '将北海区域设为皇家园林“龙泽苑”，并扩建太液池水系。',
    '确立了北海公园作为御苑的雏形。'
  ],
  '纪晓岚': [
    '清代著名学者与政治家，曾主持《四库全书》编纂。',
    '他常游北海，并赋诗题咏景色，是乾隆时期文化象征人物。'
  ],
  '曹雪芹': [
    '《红楼梦》作者，清代贵族出身，祖居北海附近。',
    '小说中“太虚幻境”据传部分取材于北海景观。'
  ],
  '梁思成': [
    '中国现代建筑学奠基人，清华大学建筑系创始人。',
    '20世纪30年代实地考察北海古建，提出“不改变原貌”的文物修缮理念。'
  ],
  '北海大修': [
    '乾隆时期，北海迎来史上最大规模的修缮。',
    '兴建琼岛白塔、永安寺、九龙壁，形成现有园林核心格局。'
  ],
  '瀛台政事': [
    '慈禧太后执政时期，瀛台为其主要办公与居住场所。',
    '多个重大清末政务，如戊戌变法决策等，皆发生于此。'
  ],
  '光绪皇帝': [
    '清末皇帝，居于瀛台，在北海度过幽禁岁月。',
    '其命运与瀛台密切相关，反映晚清政局风云。'
  ],
  '英法联军破坏': [
    '1860年英法联军入侵北京，北海建筑曾遭掠夺与破坏。',
    '事后部分建筑恢复重建，见证北海从战火中恢复的历程。'
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
        data: ['帝王', '文人', '建筑师', '历史事件'],
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
          { name: '文人', itemStyle: { color: '#8b4513' } },
          { name: '建筑师', itemStyle: { color: '#5a9bd5' } },
          { name: '历史事件', itemStyle: { color: '#d94e5d' } }
        ],
        data: [
          { name: '北海公园', category: 0, symbolSize: 80, draggable: true },
          { name: '乾隆皇帝', category: 0 },
          { name: '慈禧太后', category: 0 },
          { name: '忽必烈', category: 0 },
          { name: '光绪皇帝', category: 0 },
          { name: '纪晓岚', category: 1 },
          { name: '曹雪芹', category: 1 },
          { name: '梁思成', category: 2 },
          { name: '北海大修', category: 3 },
          { name: '瀛台政事', category: 3 },
          { name: '英法联军破坏', category: 3 }
        ],
        links: [
          { source: '北海公园', target: '乾隆皇帝' },
          { source: '北海公园', target: '慈禧太后' },
          { source: '北海公园', target: '忽必烈' },
          { source: '北海公园', target: '光绪皇帝' },
          { source: '北海公园', target: '纪晓岚' },
          { source: '北海公园', target: '曹雪芹' },
          { source: '北海公园', target: '梁思成' },
          { source: '北海公园', target: '北海大修' },
          { source: '北海公园', target: '瀛台政事' },
          { source: '北海公园', target: '英法联军破坏' },
          { source: '乾隆皇帝', target: '北海大修' },
          { source: '慈禧太后', target: '瀛台政事' },
          { source: '光绪皇帝', target: '瀛台政事' },
          { source: '梁思成', target: '北海大修' },
          { source: '英法联军破坏', target: '北海大修' }
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
