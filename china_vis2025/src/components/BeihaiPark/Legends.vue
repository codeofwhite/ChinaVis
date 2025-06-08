<template>
  <div class="lifecycle-container">
    <!-- 返回按钮 -->
    <button @click="goBack" class="back-button">← 返回北海公园门户</button>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
const router = useRouter();
function goBack() {
  router.push("/landmarks/beihai-park");
}
</script>

<style scoped>
.lifecycle-container {
  padding: 30px 10px 60px 10px;
  max-width: 1200px;
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
</style>
