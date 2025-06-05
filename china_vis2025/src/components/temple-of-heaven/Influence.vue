<template>
  <button @click="goBack" class="back-button">← 返回天坛门户</button>

</template>

<script setup>
import * as echarts from 'echarts';
import { ref, onMounted } from 'vue';


import { useRouter } from 'vue-router'
const router = useRouter()
const goBack = () => router.push('/landmark/temple-of-heaven')
</script>