<template>
    <!-- 雷达图评估板块 -->
    <div class="radar-section">
      <div class="section-title">
        <div class="title-icon">📊</div>
        <h2>天坛建筑综合评估</h2>
        <div class="divider"></div>
        <p class="section-description">基于文化遗产价值的多维度分析</p>
      </div>
      <RadarChartBoard class="radar-container" />
    </div>
</template>

<script setup>
import RadarChartBoard from "../../../components/RadarChartBoard.vue";
</script>

<style scoped>
/* 雷达图部分样式 */
.radar-section {
  max-width: 1200px;
  margin: 60px auto;
  padding: 40px;
  background: linear-gradient(
    135deg,
    rgba(255, 248, 230, 0.8),
    rgba(240, 230, 210, 0.7)
  );
  border-radius: 15px;
  box-shadow: 0 15px 40px rgba(101, 67, 33, 0.15);
  text-align: center;
}

.radar-section .section-title {
  margin-bottom: 30px;
}

.section-description {
  color: #7a6b5a;
  font-size: 1.1rem;
  margin-top: 10px;
}

.radar-container {
  width: 100%;
  min-height: 400px;
  background: rgba(255, 255, 255, 0.7);
  border-radius: 12px;
  padding: 20px;
  border: 1px solid rgba(139, 69, 19, 0.1);
}

/* 响应式调整 */
@media (max-width: 768px) {
  .radar-section {
    padding: 30px 20px;
  }

  .radar-container {
    min-height: 300px;
  }
}
</style>