<template>
  <div class="detail-view-container">
    <div class="graph-container">
        <button @click="goBack" class="back-button">← 返回</button>
        <NetworkGraph
            v-if="graphData.nodes.length"
            :nodes="graphData.nodes"
            :links="graphData.links"
            :categories="categories"
            @node-click="handleNodeClick"
        />
        <div v-else class="loading">正在加载数据...</div>
    </div>
    <div class="panel-container">
        <NarrativePanel :node="selectedNode" />
    </div>
  </div>
</template>

<script>
import NetworkGraph from '../../components/NetworkGraph.vue';
import NarrativePanel from './NarrativePanel.vue';
import { landmarkGraphData, categories } from '../../components/data/landmarkData.js';

export default {
  name: 'LandmarkDetailView',
  components: {
    NetworkGraph,
    NarrativePanel
  },
  data() {
    return {
      landmarkId: null,
      graphData: { nodes: [], links: [] },
      categories: categories,
      selectedNode: null,
    };
  },
  created() {
    // 从路由参数获取地标ID
    this.landmarkId = this.$route.params.id;
    this.loadData();
  },
  methods: {
    loadData() {
      if (landmarkGraphData[this.landmarkId]) {
        this.graphData = landmarkGraphData[this.landmarkId];
        // 默认选中核心地标节点
        this.selectedNode = this.graphData.nodes.find(n => n.category === '核心地标');
      } else {
        console.error(`No data found for landmarkId: ${this.landmarkId}`);
      }
    },
    handleNodeClick(nodeData) {
      this.selectedNode = nodeData;
    },
    goBack() {
      // 根据当前地标ID返回到对应的门户页面
      if (this.landmarkId === 'dashilar') {
        this.$router.push({ name: 'DashilarPortal' });
      } else if (this.landmarkId === 'mingTombs') {
        this.$router.push({ name: 'MingTombsPortal' });
      } else {
        this.$router.push('/');
      }
    }
  }
};
</script>

<style scoped>
.detail-view-container {
  display: flex;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
}
.graph-container {
  flex: 2; /* 占据2/3宽度 */
  position: relative;
  background-color: #f5f2e9;
}
.panel-container {
  flex: 1; /* 占据1/3宽度 */
  height: 100%;
}
.loading {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  font-size: 1.5em;
  color: #999;
}
.back-button {
  position: absolute;
  top: 20px;
  left: 20px;
  background-color: rgba(139, 69, 19, 0.7);
  color: #fff8e1;
  border: none;
  padding: 10px 18px;
  border-radius: 25px;
  cursor: pointer;
  font-size: 1em;
  z-index: 10;
}
</style>