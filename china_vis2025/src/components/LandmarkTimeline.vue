<template>
  <div class="timeline-container">
    <h2>北京文化地标生命历程时间轴</h2>

    <div class="timeline-legend">
      <span
        v-for="landmarkName in uniqueLandmarks"
        :key="landmarkName"
        class="legend-item"
      >
        <span
          class="legend-color"
          :style="{ backgroundColor: getLandmarkColor(landmarkName) }"
        ></span>
        {{ landmarkName }}
      </span>
    </div>

    <div class="timeline-wrapper">
      <div
        class="timeline-main"
        ref="timelineMain"
        :style="{ height: timelineMainHeight + 'px' }"
      >
        <!-- 主线 -->
        <div class="timeline-line-vertical"></div>

        <!-- 朝代标签块 -->
        <div
          v-for="(era, index) in sortedEras"
          :key="era"
          class="timeline-era-vertical"
          :style="{
            top: calculateEraPosition(era) + 'px',
            height: calculateEraHeight(era) + 'px',
          }"
        >
          <div class="timeline-era-label">{{ era }}</div>
        </div>

        <!-- 事件点 -->
        <div
          v-for="(event, index) in sortedEvents"
          :key="event.id"
          class="timeline-event-vertical"
          :style="{
            top: convertYearToPixels(event.year) + 'px',
            left: getEventHorizontalOffset(index) + 'px',
          }"
          @click="showEventDetail(event)"
        >
          <div
            class="event-dot"
            :style="{ backgroundColor: event.color }"
          ></div>
          <div class="event-content">
            <div class="event-year">{{ event.year }}</div>
            <div class="event-title">{{ event.title }}</div>
          </div>
        </div>
      </div>
    </div>

    <div
      v-if="selectedEvent"
      class="event-detail-modal-overlay"
      @click.self="selectedEvent = null"
    >
      <div class="event-detail-modal">
        <h3>{{ selectedEvent.title }}</h3>
        <p><strong>地标：</strong>{{ selectedEvent.landmark }}</p>
        <p>
          <strong>时间：</strong>{{ selectedEvent.year }} 年 ({{
            selectedEvent.era
          }})
        </p>
        <p><strong>类型：</strong>{{ selectedEvent.type }}</p>
        <p>{{ selectedEvent.description }}</p>
        <button @click="selectedEvent = null">关闭</button>
      </div>
    </div>
  </div>
</template>

<script>
import { timelineEvents } from "./data/timelineData";
// 额外导入 landmarkColors 和 eras，确保可用
import { landmarkColors, eras } from "./data/timelineData";

export default {
  name: "LandmarkTimeline",
  data() {
    return {
      timelineEvents: timelineEvents,
      selectedEvent: null,
      minYear: 0,
      maxYear: 0,
      timelineMainHeight: 600, // 初始主时间轴高度，会在 mounted 后动态计算
      // 事件垂直偏移量配置
      eventVerticalOffset: 120, // 每个事件的垂直间距
      eventBaseTop: 50, // 基础偏移量，控制第一行事件的起始Y位置
    };
  },
  computed: {
    sortedEvents() {
      return [...this.timelineEvents].sort((a, b) => a.year - b.year);
    },
    sortedEras() {
      // 确保 eras 在这里能被正确获取到
      return eras;
    },
    uniqueLandmarks() {
      return [...new Set(this.timelineEvents.map((event) => event.landmark))];
    },
    // 动态计算每个朝代的起始年份和结束年份
    eraYearRanges() {
      const ranges = {};
      this.sortedEras.forEach((era) => {
        const eraEvents = this.timelineEvents.filter((e) => e.era === era);
        if (eraEvents.length > 0) {
          ranges[era] = {
            start: Math.min(...eraEvents.map((e) => e.year)),
            end: Math.max(...eraEvents.map((e) => e.year)),
          };
        }
      });
      return ranges;
    },
    // 计算每个朝代在时间轴上的大致垂直位置
    eraVerticalPositions() {
      const positions = {};
      this.sortedEras.forEach((era) => {
        const eraStartYear = this.eraYearRanges[era]?.start;
        if (eraStartYear) {
          // 将年份转换为在主时间轴高度上的像素值
          positions[era] = this.convertYearToPixels(eraStartYear);
        }
      });
      return positions;
    },
  },
  methods: {
    convertYearToPixels(year) {
      if (!this.$refs.timelineMain) return 0; // 避免在 DOM 未渲染时报错
      const range = this.maxYear - this.minYear;
      const percent = (year - this.minYear) / range;
      return percent * this.timelineMainHeight; // 基于主时间轴的实际高度
    },
    getEventHorizontalOffset(index) {
      // 事件横向交错排布
      return index % 2 === 0 ? 20 : 150;
    },
    // 计算事件在水平时间轴上的百分比位置
    calculatePosition(year) {
      const range = this.maxYear - this.minYear;
      return ((year - this.minYear) / range) * 100;
    },
    // 计算事件的垂直偏移量，避免重叠
    calculateEventVerticalOffset(year, index) {
      // 简单实现：奇数和偶数事件交错显示
      // 复杂实现：根据事件在同一年的数量进行动态计算
      const baseOffset = this.eventBaseTop; // 距离顶部的基础偏移
      const rowHeight = this.eventVerticalOffset; // 每行的高度

      // 找出所有同年份的事件
      const sameYearEvents = this.sortedEvents.filter((e) => e.year === year);
      const eventIndexInYear = sameYearEvents.findIndex(
        (e) => e.id === this.sortedEvents[index].id
      );

      // 如果同年份有多个事件，或仅仅为了视觉错开
      if (sameYearEvents.length > 1) {
        // 根据事件在同年份中的索引来调整 Y 轴位置，向上或向下错开
        if (eventIndexInYear % 2 === 0) {
          // 偶数索引，向上
          return baseOffset - Math.floor(eventIndexInYear / 2) * rowHeight - 20; // 20是微调
        } else {
          // 奇数索引，向下
          return baseOffset + Math.floor(eventIndexInYear / 2) * rowHeight + 20;
        }
      } else {
        // 否则，保持在主时间轴的中间
        return baseOffset;
      }
    },
    // 计算朝代在 Y 轴上的位置
    calculateEraPosition(era) {
      const eraStartYear = this.eraYearRanges[era]?.start;
      if (eraStartYear) {
        return this.convertYearToPixels(eraStartYear);
      }
      return 0; // 默认值
    },
    // 计算朝代框的高度 (这里可以根据事件的密集程度动态调整)
    calculateEraHeight(era) {
      const eraRange = this.eraYearRanges[era];
      if (eraRange) {
        const startPx = this.convertYearToPixels(eraRange.start);
        const endPx = this.convertYearToPixels(eraRange.end);
        return endPx - startPx + 50; // 加一点余量，确保覆盖所有事件
      }
      return 150; // 默认高度
    },
    showEventDetail(event) {
      this.selectedEvent = event;
    },
    getLandmarkColor(landmarkName) {
      // 从导入的 landmarkColors 获取
      return landmarkColors[landmarkName] || "#cccccc";
    },
  },
  mounted() {
    const years = this.timelineEvents.map((event) => event.year);
    if (years.length > 0) {
      this.minYear = Math.min(...years) - 50;
      this.maxYear = Math.max(...years) + 50;
    }
    // 获取主时间轴的实际渲染高度
    this.$nextTick(() => {
      if (this.$refs.timelineMain) {
        this.timelineMainHeight = this.$refs.timelineMain.offsetHeight;
      }
    });
  },
};
</script>

<style scoped>
.timeline-container {
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  padding: 20px;
  max-width: 1200px;
  margin: 20px auto; /* 增加上下外边距 */
  background-color: #f8f9fa;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15); /* 更柔和的阴影 */
  color: #333;
  overflow: hidden; /* 确保内容不会溢出容器 */
}

h2 {
  text-align: center;
  color: #2a5a8f;
  margin-bottom: 30px;
  font-size: 2em;
}

.timeline-legend {
  text-align: center;
  margin-bottom: 25px;
  font-size: 1em;
  padding: 10px;
  background-color: #e9ecef;
  border-radius: 5px;
}

.legend-item {
  display: inline-flex;
  align-items: center;
  margin: 0 15px; /* 增加间距 */
  font-weight: 500;
}

.legend-color {
  width: 18px; /* 略微增大 */
  height: 18px; /* 略微增大 */
  border-radius: 50%;
  margin-right: 8px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

.timeline-wrapper {
  position: relative;
  margin-top: 40px;
}

.timeline-line-vertical {
  position: absolute;
  left: 0;
  top: 0;
  width: 4px;
  height: 100%;
  background-color: #2a5a8f;
}

.timeline-era-vertical {
  position: absolute;
  left: -100px;
  width: 100px;
  text-align: right;
  padding-right: 10px;
  box-sizing: border-box;
}

.timeline-era-label {
  font-weight: bold;
  color: #444;
  font-size: 1.1em;
}

.timeline-event-vertical {
  position: absolute;
  display: flex;
  align-items: center;
  cursor: pointer;
}

.timeline-event-vertical .event-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  margin-right: 8px;
}

.event-content {
  background: #fff;
  padding: 6px 12px;
  border-radius: 4px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
}

.timeline-main {
  flex-grow: 1;
  position: relative;
  min-height: 600px; /* 确保有足够高度，但允许内容扩展 */
  margin-left: 30px; /* 增加与左侧轴的距离 */
  padding-bottom: 50px; /* 底部留白 */
}

.timeline-line {
  position: absolute;
  top: v-bind('eventBaseTop + "px"'); /* 让时间轴线与事件点对齐 */
  left: 0;
  right: 0;
  height: 3px; /* 稍微粗一点 */
  background-color: #4caf50;
  z-index: 5; /* 确保线在事件点下方 */
}

.timeline-event {
  position: absolute;
  transform: translateX(-50%); /* 水平居中 */
  width: 150px; /* 增加事件卡片宽度 */
  text-align: center;
  cursor: pointer;
  padding: 10px 12px;
  border-radius: 8px; /* 更圆润的边角 */
  background-color: #fff;
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.15); /* 更明显的阴影 */
  transition: all 0.2s ease-in-out;
  border: 2px solid;
  z-index: 10;
}

.timeline-event:hover {
  transform: translateX(-50%) scale(1.05); /* 悬停效果更明显 */
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.25);
  z-index: 20; /* 悬停时凸显层级 */
}

.event-dot {
  width: 20px; /* 增大点 */
  height: 20px;
  border-radius: 50%;
  position: absolute;
  top: v-bind('eventBaseTop + "px"'); /* 与主时间轴线对齐 */
  left: 50%;
  transform: translate(-50%, -50%); /* 确保点中心对齐时间轴线 */
  z-index: 100;
  border: 3px solid #fff; /* 白边框更粗 */
  box-shadow: 0 0 0 3px rgba(0, 0, 0, 0.15); /* 外圈阴影 */
}

/* 调整年份和标题的位置，使其在卡片内 */
.event-year {
  font-weight: bold;
  font-size: 0.95em;
  color: #555;
  margin-bottom: 5px;
  position: static; /* 移除绝对定位，使其在流中 */
  transform: none;
  white-space: normal; /* 允许换行 */
}

.event-title {
  font-size: 0.9em;
  margin-top: 5px;
  white-space: normal; /* 允许换行 */
  overflow: visible; /* 允许内容完整显示 */
  text-overflow: unset; /* 移除省略号 */
  position: static; /* 移除绝对定位，使其在流中 */
  transform: none;
  font-weight: 600;
  color: #333;
  line-height: 1.3;
}

/* 弹窗样式不变，保持美观 */
.event-detail-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.event-detail-modal {
  background-color: #fff;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  width: 80%;
  max-width: 500px;
  animation: fadeIn 0.3s ease-out;
}

.event-detail-modal h3 {
  color: #2a5a8f;
  margin-top: 0;
  border-bottom: 1px solid #eee;
  padding-bottom: 10px;
  margin-bottom: 20px;
}

.event-detail-modal p {
  line-height: 1.6;
  margin-bottom: 10px;
}

.event-detail-modal button {
  display: block;
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #2a5a8f;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.event-detail-modal button:hover {
  background-color: #1e456e;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
