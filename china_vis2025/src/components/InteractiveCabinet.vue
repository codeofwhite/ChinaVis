<template>
  <div class="cabinet-wrapper">
    <h2>交互式珍奇柜 / 数字展厅</h2>
    <div class="cabinet-container">
      <img src="https://th.bing.com/th/id/OIP.e7vqANULEiqJF8afzdB58wHaN1?w=648&h=1210&rs=1&pid=ImgDetMain" alt="珍奇柜背景" class="background-image">

      <div
        v-for="item in curiosities"
        :key="item.id"
        class="curio-item"
        :style="{ top: item.position.top, left: item.position.left }"
        @click="showStory(item)"
      >
        <img :src="item.icon" :alt="item.name" :title="item.name" class="curio-icon">
      </div>
    </div>

    <div v-if="isModalVisible" class="modal-overlay" @click.self="closeStory">
      <div class="modal-content">
        <button class="close-button" @click="closeStory">&times;</button>
        <div v-if="selectedCurio">
          <h3 class="modal-title">{{ selectedCurio.story.title }}</h3>
          <div class="modal-body">
            <img :src="selectedCurio.icon" :alt="selectedCurio.name" class="modal-icon">
            <p class="modal-text">{{ selectedCurio.story.content }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

// --- 数据中心 ---
// 在这里定义你所有的“宝物”
// 你可以随时添加、删除或修改这些对象
const curiosities = ref([
  {
    id: 'seal',
    name: '皇帝玉玺',
    // 建议使用透明背景的 .png 图标
    icon: 'https://th.bing.com/th/id/OIP.Wz-Q5BY2vk6vS87A7rW_hwHaHa?w=199&h=199&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3', 
    position: { top: '22%', left: '15%' },
    story: {
      title: '九龙玉玺的传说',
      content: '这枚玉玺据传是乾隆皇帝的珍爱之物，由整块和田玉雕刻而成。玉玺顶部盘踞九龙，象征着九五至尊的皇权。点击这枚印章，仿佛能听到紫禁城内历史的回响，每一个印记都记录了一段不为人知的宫廷秘事。'
    }
  },
  {
    id: 'ticket',
    name: '泛黄的戏票',
    icon: 'https://th.bing.com/th/id/OIP.fzNq53gDpikGZ-lfH4uP1QHaES?w=328&h=190&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3',
    position: { top: '45%', left: '50%' },
    story: {
      title: '梨园旧梦：一九三零年的绝唱',
      content: '这张来自“广和楼”戏园的戏票，见证了京剧大师梅兰芳先生的经典演出《贵妃醉酒》。票根虽已泛黄，但似乎仍能从中听到当年的满堂喝彩与锣鼓喧天。它不仅是一张入场券，更是一段黄金时代的文化记忆。'
    }
  },
  {
    id: 'lantern',
    name: '六角宫灯',
    icon: 'https://th.bing.com/th/id/OIP.4W8AFzwDdiPs78JcFdvNowAAAA?w=138&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3',
    position: { top: '15%', left: '78%' },
    story: {
      title: '宫灯下的夜话',
      content: '这盏精致的六角宫灯曾悬挂于恭王府的长廊之下，灯壁上绘制着《红楼梦》的经典场景。每当夜幕降临，烛光透过纱壁，将人物光影投射在墙上，仿佛在无声地诉说着一个家族的兴衰与荣辱。'
    }
  },
  {
    id: 'fan',
    name: '文人折扇',
    icon: 'https://th.bing.com/th/id/OIP.-9_7il1RQBAVHtuuzQaTGwAAAA?w=163&h=129&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3',
    position: { top: '70%', left: '30%' },
    story: {
      title: '墨香扇影',
      content: '此扇为明代才子唐伯虎所绘，扇面上一面是山水，一面是行书诗词。它不仅是文人雅士夏日纳凉的工具，更是身份与品味的象征。每一次开合，都带出淡淡墨香，扇动的是风，也是风雅。'
    }
  },
  {
    id: 'porcelain',
    name: '青花瓷瓶',
    icon: 'https://th.bing.com/th/id/OIP.HJ8HV31c5ay6YdgAX9TBuwHaJ3?w=161&h=215&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3',
    position: { top: '65%', left: '68%' },
    story: {
      title: '天青色等烟雨',
      content: '此瓶出自景德镇官窑，是元代青花瓷的典型代表。瓶身上的钴蓝色料，在烧制后呈现出独特的“苏麻离青”效果，深邃而富有层次感。它跨越了几个世纪，静静地在这里，等待着能读懂它故事的人。'
    }
  }
]);

// --- 交互逻辑 ---
const isModalVisible = ref(false);
const selectedCurio = ref(null);

// 点击物件时调用的函数
const showStory = (item) => {
  selectedCurio.value = item;
  isModalVisible.value = true;
};

// 关闭弹窗的函数
const closeStory = () => {
  isModalVisible.value = false;
  // 延迟清空数据，让淡出效果更平滑
  setTimeout(() => {
    selectedCurio.value = null;
  }, 300);
};
</script>

<style scoped>
/* 使用 scoped 以确保样式只作用于此组件 */

.cabinet-wrapper {
  font-family: 'Helvetica Neue', Arial, sans-serif;
  text-align: center;
  color: #333;
  width: 100%;
  max-width: 1000px;
  margin: 2rem auto;
}

.cabinet-container {
  position: relative; /* 这是关键，为所有物件提供定位的父容器 */
  width: 100%;
  /* 保持图片的宽高比 */
  aspect-ratio: 16 / 10; 
  margin: 0 auto;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0,0,0,0.2);
}

.background-image {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover; /* 确保图片填满容器而不变形 */
}

/* --- 物件样式 --- */
.curio-item {
  position: absolute; /* 物件使用绝对定位 */
  width: 8%; /* 物件的尺寸，可以根据需要调整 */
  height: auto;
  cursor: pointer;
  transition: transform 0.3s ease, filter 0.3s ease;
  z-index: 10; /* 确保在背景之上 */
}

.curio-icon {
  width: 100%;
  height: 100%;
  /* 为图标添加一点阴影，让它更有立体感 */
  filter: drop-shadow(2px 4px 6px rgba(0, 0, 0, 0.4));
}

.curio-item:hover {
  transform: scale(1.2); /* 鼠标悬停时放大 */
  /* 添加一个发光效果 */
  filter: drop-shadow(0px 0px 15px rgba(255, 255, 150, 0.8));
}


/* --- 弹窗 (Modal) 样式 --- */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.75);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  animation: fadeIn 0.3s ease;
}

.modal-content {
  position: relative;
  background: #fdfaf5; /* 略带米黄的背景色 */
  padding: 2rem 2.5rem;
  border-radius: 10px;
  width: 90%;
  max-width: 600px;
  box-shadow: 0 5px 20px rgba(0,0,0,0.3);
  border: 1px solid #d4c0a1;
  animation: slideIn 0.4s ease-out;
}

.close-button {
  position: absolute;
  top: 15px;
  right: 15px;
  background: none;
  border: none;
  font-size: 2rem;
  font-weight: bold;
  color: #8c7b60;
  cursor: pointer;
  transition: color 0.2s;
}
.close-button:hover {
  color: #333;
}

.modal-title {
  color: #5c4d3c;
  font-size: 1.8rem;
  margin-top: 0;
  margin-bottom: 1.5rem;
  text-align: center;
  border-bottom: 2px solid #e0d1b9;
  padding-bottom: 1rem;
}

.modal-body {
  display: flex;
  align-items: flex-start;
  gap: 1.5rem;
}

.modal-icon {
  width: 100px;
  height: 100px;
  object-fit: contain;
  flex-shrink: 0; /* 防止图标被压缩 */
}

.modal-text {
  font-size: 1.1rem;
  line-height: 1.8;
  color: #665a48;
  text-align: justify;
  margin: 0;
}

/* 动画效果 */
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideIn {
  from { transform: translateY(-50px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}
</style>