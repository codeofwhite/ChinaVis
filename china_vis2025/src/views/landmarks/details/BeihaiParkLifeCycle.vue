<template>
  <div class="life-cycle-page">
    <h1>北海公园 · 生命年轮</h1>
    <LifeCycleTimeline :events="timelineEvents" />
    <section class="life-cycle-detail">
      <h2>历史沿革与重建</h2>
      <p>
        北海公园始建于辽代，历经金、元、明、清多次扩建与修缮，是中国皇家园林历史演变的缩影。主要建筑如白塔、九龙壁等见证了园林的历史变迁。
      </p>
      <img src="https://images.pexels.com/photos/7943027/pexels-photo-7943027.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="北海公园历史沿革图" class="timeline-img" />
    </section>
  </div>
</template>

<script setup>
import LifeCycleTimeline from '@/components/LifeCycleTimeline.vue'

const timelineEvents = [
  { year: '辽代', event: '初建北海' },
  { year: '金代', event: '扩建，定名太液池' },
  { year: '元代', event: '琼华岛建成' },
  { year: '明清', event: '多次修缮，增建白塔、九龙壁等' },
  { year: '近现代', event: '对外开放，成为公园' }
]
</script>

<style scoped>
.life-cycle-page {
  padding: 40px 20px;
  background: #f9f6f2;
}
.timeline-img {
  width: 100%;
  max-width: 600px;
  margin: 30px auto;
  display: block;
  border-radius: 12px;
  box-shadow: 0 4px 16px rgba(139, 69, 19, 0.08);
}
.timeline {
  list-style: none;
  padding: 0;
  margin: 30px 0;
}
.timeline li {
  margin-bottom: 18px;
  font-size: 1.1em;
}
.year {
  font-weight: bold;
  color: #8b4513;
  margin-right: 12px;
}
</style>