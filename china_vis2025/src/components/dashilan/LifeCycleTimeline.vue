<template>
  <ul class="timeline">
    <li v-for="(item, idx) in events" :key="idx">
      <span class="year">{{ item.year }}</span>
      <span class="desc">{{ item.event }}</span>
    </li>
  </ul>
</template>

<script setup>
defineProps({ events: Array })
</script>

<style scoped>
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