<template>
  <div class="app-container">
    <router-view></router-view>
  </div>
</template>

<script setup>
// 由于使用路由管理视图，这里不需要其他导入
</script>

<style scoped>
.app-container {
  width: 100%;
  min-height: 100vh;
}
</style>