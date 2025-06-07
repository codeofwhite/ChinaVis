<template>
  <div class="lifecycle-container">
    <header class="lifecycle-header">
      <button @click="goBackToPortal" class="back-button">
        ← 返回 {{ landmarkName }}
      </button>
      <h1>{{ landmarkName }} - {{ currentSectionTitle }}</h1>
      <p class="intro-text">{{ currentSectionIntro }}</p>
    </header>

    <main class="timeline-section" v-if="direction === 'lifeCycle'">
      <div v-if="timelineEvents.length" class="timeline">
        <div
          v-for="(event, index) in sortedTimelineEvents"
          :key="index"
          class="timeline-item"
        >
          <div class="timeline-marker">
            <div class="timeline-event-info">
              <h4>{{ event.date }} - {{ event.title }}</h4>
              <p>{{ event.description }}</p>
              <img
                v-if="event.image"
                :src="getImagePath(event.image)"
                :alt="event.title"
                class="event-image-tooltip"
              />
            </div>
          </div>
          <div class="timeline-item-date">
            {{ event.year || getYearFromDate(event.date) }}
          </div>
        </div>
      </div>
      <p v-else class="no-data">暂无生命历程数据。</p>
    </main>
    <main class="content-section" v-else-if="direction === 'influence'">
      <p class="no-data">影响力光环内容正在建设中...</p>
    </main>
    <main class="content-section" v-else-if="direction === 'legends'">
      <p class="no-data">传奇故事内容正在建设中...</p>
    </main>

    <footer class="lifecycle-footer">
      <p class="copyright">© 2023 北京历史文化遗产数字平台</p>
    </footer>
  </div>
</template>

<script>
export default {
  name: "LandmarkLifecyclePage", // 保持路由名称一致性
  props: {
    landmarkId: {
      type: String,
      required: true,
    },
    direction: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      landmarkName: "",
      timelineEvents: [],
      sectionTitles: {
        lifeCycle: "生命年轮",
        influence: "影响力光环", // 或您更新后的标题
        legends: "传奇故事", // 或您更新后的标题
      },
      sectionIntros: {
        lifeCycle: `鼠标悬停在时间节点上，探索${this.landmarkNamePlaceholder}从诞生至今的关键历史时刻与变迁。`,
        influence: `解析${this.landmarkNamePlaceholder}如何融入当代生活，评估其在全球范围内的文化影响力与认知度。`,
        legends: `聆听${this.landmarkNamePlaceholder}背后那些引人入胜的帝王轶事、民间传说与文人墨客的动人篇章。`,
      },
      // 数据源
      allLifecycleData: {
        dashilar: [
          // ... (大栅栏数据，同上次回复，确保year和image文件名正确)
          {
            year: 1420,
            date: "明永乐年间 (15世纪初)",
            title: "廊房商业街区兴建",
            description: "北京鼓励商贸，在皇城四门等地兴建廊房商业街区。",
            image: "olddashilan.jpg",
          },
          {
            year: 1488,
            date: "明弘治元年 (1488年)",
            title: "“大栅栏”得名",
            description:
              "为维护京师治安，廊房四条两端设木质栅栏，由商户出资修建，规模格外巨大，逐渐被称为“大栅栏”。",
            image: "dashilan_bg.jpg",
          },
          {
            year: 1750,
            date: "清乾隆年间",
            title: "地图标注",
            description: "地图已标注“大栅栏”地名 (见《乾隆京城全图》)。",
            image: "",
          },
          {
            year: 1899,
            date: "清光绪二十五年 (1899年)",
            title: "火灾毁栏",
            description: "大栅栏发生火灾，木质栅栏被烧毁。",
            image: "",
          },
          {
            year: 1900,
            date: "1900年",
            title: "义和团运动影响",
            description: "义和团运动中，街区多家店铺被焚毁。",
            image: "",
          },
          {
            year: 1902,
            date: "1902年后",
            title: "重建与新发展",
            description:
              "各商户重建复业，大栅栏依旧繁华，甚至随着前门火车站建成而迎来新的发展契机。",
            image: "",
          },
          {
            year: 2000,
            date: "2000年",
            title: "铁艺栅栏重建",
            description:
              "北京市政府在大栅栏街口重新修建铁艺栅栏，恢复了街名由来的“栅栏”。",
            image: "dashilan_bg.jpg",
          },
          {
            year: 2008,
            date: "2008年",
            title: "街区整体修缮开放",
            description: "完成街区整体修缮对外开放。",
            image: "olddashilan.jpg",
          },
          {
            year: 2017,
            date: "近年来 (如2017年)",
            title: "保护性整修",
            description:
              "大栅栏区域又启动保护性整修 (如2017年珠粮街区整体修缮)，力图再现民国初期历史风貌。",
            image: "",
          },
          {
            year: 0,
            date: "风格演变",
            title: "建筑风格",
            description:
              "承袭北京传统商街风格，主要以灰砖灰瓦为主，辅以雕花木窗、红柱绿瓦等明清装饰元素。部分商号立面引入西洋彩色瓷砖等外来元素。街口的标志性铁艺拱门即为现代建构。",
            image: "dashilan_bg.jpg",
          },
        ],
        mingTombs: [
          // ... (明十三陵数据，同上次回复，确保year和image文件名正确)
          {
            year: 1409,
            date: "永乐七年 (1409年)",
            title: "长陵始建",
            description: "明代从永乐帝(朱棣)在此建长陵开始营建十三陵。",
            image: "长陵.jpg",
          },
          {
            year: 1644,
            date: "崇祯末年 (1644年)",
            title: "营建终止",
            description: "明十三陵的营建终止于崇祯帝入陵。",
            image: "",
          },
          {
            year: 1650,
            date: "清初",
            title: "保护与修缮",
            description: "清初对十三陵予以一定保护并多次修缮。",
            image: "",
          },
          {
            year: 1850,
            date: "晚清",
            title: "管理疏忽",
            description: "晚清后期因政权衰微，修缮管理疏忽，陵区多处设施失修。",
            image: "",
          },
          {
            year: 1950,
            date: "1950年代",
            title: "考古发掘",
            description:
              "在吴晗、郭沫若等文史专家倡议下，先后发掘并开放了定陵和长陵等。",
            image: "碑亭.jpg",
          },
          {
            year: 1957,
            date: "1957年",
            title: "市级文保",
            description: "北京政府公布十三陵为北京市第一批重点文物保护单位。",
            image: "",
          },
          {
            year: 1961,
            date: "1961年",
            title: "国家级文保",
            description: "国务院列为全国重点文物保护单位。",
            image: "",
          },
          {
            year: 1966,
            date: "文革期间 (1966年起)",
            title: "严重破坏",
            description:
              "十三陵遭到严重破坏，万历帝及皇后的遗骸被红卫兵烧毁，多处建筑被拆毁。",
            image: "",
          },
          {
            year: 1972,
            date: "1970年代后",
            title: "加强保护",
            description:
              "政府加强保护。定陵博物馆于1959年开馆，1972年归属北京园林局管理。",
            image: "",
          },
          {
            year: 1982,
            date: "1982年",
            title: "设立风景区",
            description: "国务院批准设立“八达岭一十三陵风景区”。",
            image: "",
          },
          {
            year: 1995,
            date: "1995年",
            title: "博物馆成立",
            description: "成立“明十三陵博物馆”。",
            image: "",
          },
          {
            year: 2003,
            date: "2003年7月3日",
            title: "世界文化遗产",
            description:
              "十三陵与清东陵、西陵一同被联合国教科文组织列为世界文化遗产。",
            image: "Ming_Tombs.jpg",
          },
          {
            year: 0,
            date: "风格演变",
            title: "建筑风格",
            description:
              "沿袭古制，体现皇家陵寝规格。大型土木结构均采用黄琉璃瓦屋面和朱红梁柱。神道沿线遍布石像生。石牌坊建于嘉靖十九年(1540年)。21世纪的修缮工程也用了钢结构加固、仿古琉璃瓦复盖等现代技术。",
            image: "明十三陵神道_大宫门.jpg",
          },
        ],
      },
    };
  },
  computed: {
    sortedTimelineEvents() {
      const eventsWithYear = this.timelineEvents.filter(
        (event) => event.year !== 0
      );
      const sorted = [...eventsWithYear].sort((a, b) => a.year - b.year);
      const styleEvolutionEvent = this.timelineEvents.find(
        (event) => event.year === 0
      );
      if (styleEvolutionEvent) {
        sorted.push(styleEvolutionEvent);
      }
      return sorted;
    },
    currentSectionTitle() {
      if (this.landmarkId === "dashilar") {
        const titles = {
          lifeCycle: "街巷记忆",
          influence: "商韵流传",
          legends: "坊间拾趣",
        };
        return titles[this.direction] || "详情探索";
      } else if (this.landmarkId === "mingTombs") {
        const titles = {
          lifeCycle: "皇陵沿革",
          influence: "世遗之尊",
          legends: "陵寝秘语",
        };
        return titles[this.direction] || "详情探索";
      }
      return "生命年轮"; // Default
    },
    currentSectionIntro() {
      const name = this.landmarkNamePlaceholder;
      const intros = {
        dashilar: {
          lifeCycle: `鼠标悬停在时间节点上，探索大栅栏从诞生至今的关键历史时刻与变迁。`,
          influence: `解读大栅栏作为京城重要商贸枢纽的历史地位，品味老字号的百年商誉与京味商业文化。评估其在当代如何延续商业活力，吸引八方来客，并在城市发展中焕发新的光彩。`,
          legends: `漫步大栅栏，聆听那些流传于街头巷尾的奇闻轶事、梨园往事与民俗风情。从义和团的烽火到“大观楼”的首映光影，从“大石烂儿”的读音传说到元宵灯会的市井喧嚣，拾取那些生动鲜活的地标故事。`,
        },
        mingTombs: {
          lifeCycle: `鼠标悬停在时间节点上，探索明十三陵从诞生至今的关键历史时刻与变迁。`,
          influence: `探究明十三陵作为中华文明瑰宝的显赫地位，及其被联合国教科文组织列为世界文化遗产的核心价值。评估其宏伟的皇家规制、独特的风水格局和丰富的历史遗存对当代文化、旅游及学术研究产生的深远影响。`,
          legends: `揭开沉睡帝陵的神秘面纱，聆听万历帝定陵发掘的幕后故事与考古传奇，探寻民间流传的“陵中宝藏”传说。感受帝王将相的功过是非，以及这座皇家陵园在历史长河中低语的未尽之言。`,
        },
      };
      return (
        (intros[this.landmarkId] && intros[this.landmarkId][this.direction]) ||
        `探索${name}的更多详情。`
      );
    },
    landmarkNamePlaceholder() {
      // 用于 intro text 中在 landmarkName 加载前提供占位
      return this.landmarkName || "此地标";
    },
  },
  watch: {
    landmarkId: "loadLifecycleData", // Reload data if landmarkId changes
    direction: "loadLifecycleData", // Reload data if direction changes (though unlikely for this specific component)
  },
  created() {
    this.loadLifecycleData();
  },
  methods: {
    goBackToPortal() {
      // 动态确定返回的二级门户页面的路由名称
      let portalRouteName = "LandmarkPortalPage"; // 一个通用的回退名称
      if (this.landmarkId === "dashilar") {
        portalRouteName = "dashilar"; // 假设大栅栏门户页的路由名称
      } else if (this.landmarkId === "mingTombs") {
        portalRouteName = "ming-tombs"; // 假设明十三陵门户页的路由名称
      }
      // 检查路由是否存在，如果不存在则回退到更通用的页面或首页
      if (this.$router.hasRoute(portalRouteName)) {
        this.$router.push({
          name: portalRouteName,
          params: { landmarkId: this.landmarkId },
        });
      } else {
        this.$router.push("/"); // 如果特定门户路由不存在，则返回首页
      }
    },
    loadLifecycleData() {
      this.landmarkName =
        this.landmarkId === "dashilar" ? "大栅栏" : "明十三陵";
      document.title = `${this.landmarkName} - ${this.currentSectionTitle}`; // 更新浏览器标签页标题

      if (this.direction === "lifeCycle") {
        this.timelineEvents = this.allLifecycleData[this.landmarkId] || [];
      } else {
        this.timelineEvents = []; // 清空时间轴数据，因为其他方向可能不使用时间轴
        // 在这里可以为 'influence' 和 'legends' 加载不同的数据结构
        console.log(
          `加载 ${this.landmarkName} 的 ${this.currentSectionTitle} 内容...`
        );
      }
    },
    getImagePath(imageName) {
      if (!imageName) return "";
      try {
        // 确保图片在 src/assets/ 目录下，或相应调整路径
        return require(`@/assets/${imageName}`);
      } catch (e) {
        // console.warn(`Lifecycle Image not found: ${imageName} for ${this.landmarkId}`);
        return ""; // 可以返回一个默认的占位图路径
      }
    },
    getYearFromDate(dateString) {
      // 从 "永乐七年 (1409年)" 这样的字符串中提取年份
      const match = dateString.match(/\((\d{4})年\)/);
      if (match && match[1]) {
        return match[1];
      }
      // 如果没有括号中的年份，尝试从 "YYYY年后" 或纯数字年份提取
      const yearMatch = dateString.match(/^(\d{4})/);
      if (yearMatch && yearMatch[1]) {
        return yearMatch[1];
      }
      return dateString.split(" ")[0]; // Fallback
    },
  },
};
</script>

<style scoped>
/* 样式与上次回复一致，确保简洁背景和突出的时间轴 */
.lifecycle-container {
  font-family: "Noto Serif SC", serif;
  color: #333;
  background-color: #f9f5ed; /* Simplified background */
  min-height: 100vh;
  padding: 20px;
  display: flex;
  flex-direction: column;
}

.lifecycle-header {
  text-align: center;
  margin-bottom: 30px;
  padding-top: 20px;
  position: relative;
}

.lifecycle-header h1 {
  font-size: 2.5em;
  color: #8b4513;
  margin-bottom: 8px;
  font-weight: 700;
}

.lifecycle-header .intro-text {
  font-size: 1em;
  color: #5a4a42;
  max-width: 700px;
  margin: 0 auto 15px;
  line-height: 1.6;
}

.back-button {
  position: absolute;
  top: 15px;
  left: 15px;
  background-color: rgba(139, 69, 19, 0.65);
  color: #fff8e1;
  border: none;
  padding: 8px 16px;
  border-radius: 20px;
  cursor: pointer;
  font-size: 0.9em;
  z-index: 10;
  transition: all 0.3s ease;
  backdrop-filter: blur(4px);
  box-shadow: 0 3px 12px rgba(0, 0, 0, 0.1);
}

.back-button:hover {
  background-color: rgba(160, 82, 45, 0.85);
  transform: translateX(-2px);
}

.timeline-section {
  /* For lifecycle */
  width: 100%;
  max-width: 1200px;
  margin: 20px auto;
  padding: 20px;
  flex-grow: 1;
  overflow: visible; /* 允许所有方向溢出 */
  display: flex;
  justify-content: center;
  position: relative;
  /* 添加内部容器使滚动更顺滑 */
  & > div {
    padding: 0 200px; /* 在时间轴两端添加足够的空间 */
  }

  /* 添加滚动阴影提示 */
  &::before,
  &::after {
    content: "";
    position: fixed;
    top: 0;
    bottom: 0;
    width: 40px;
    pointer-events: none;
  }

  &::before {
    left: 0;
    background: linear-gradient(
      to right,
      rgba(249, 245, 237, 0.9),
      transparent
    );
  }

  &::after {
    right: 0;
    background: linear-gradient(to left, rgba(249, 245, 237, 0.9), transparent);
  }
}

.content-section {
  /* For other directions like influence, legends */
  width: 100%;
  max-width: 900px;
  margin: 20px auto;
  padding: 30px;
  flex-grow: 1;
  background-color: rgba(255, 255, 255, 0.85);
  border-radius: 15px;
  box-shadow: 0 10px 35px rgba(101, 67, 33, 0.2);
}

.timeline {
  display: flex;
  align-items: flex-start;
  position: relative;
  padding: 100px 0 120px 0;
  min-width: min-content;
  margin-top: 40px;
  width: 100%;
  overflow: visible; /* 确保内容可以溢出 */
}

.timeline::before {
  content: "";
  position: absolute;
  top: 120px; /* 调整时间轴位置 */
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(to right, #d4a76a, #8b4513, #d4a76a);
  border-radius: 2px;
  z-index: 1;
}

.timeline-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  margin: 0 40px; /* 增加水平间距 */
  z-index: 2;
}

.timeline-marker {
  width: 24px;
  height: 24px;
  background-color: #fff;
  border: 4px solid #b8860b;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  margin-top: calc(120px - 24px / 2 - 4px); /* 调整点的位置 */
}

.timeline-marker:hover {
  transform: scale(1.3);
  border-color: #8b4513;
}

.timeline-item-date {
  margin-top: 15px;
  font-size: 0.9em;
  color: #5a4a42;
  font-weight: bold;
  text-align: center;
  min-width: 80px;
}

.timeline-event-info {
  visibility: hidden;
  opacity: 0;
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%) translateY(15px);
  background-color: rgba(255, 250, 235, 0.98);
  color: #4a3b32;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  width: 320px;
  z-index: 10;
  transition: all 0.3s ease;
  border: 1px solid #d4a76a;
  text-align: left;
  max-height: 400px;
  overflow-y: auto;

  /* 处理两端的信息框 */
  .timeline-item:first-child & {
    left: 0;
    transform: translateY(15px);
  }

  .timeline-item:last-child & {
    left: auto;
    right: 0;
    transform: translateY(15px);
  }
}

.timeline-marker:hover .timeline-event-info {
  visibility: visible;
  opacity: 1;
  transition-delay: 0s;
}

.timeline-event-info h4 {
  font-size: 1.1em;
  margin-top: 0;
  margin-bottom: 8px;
  color: #8b4513;
  font-weight: 600;
}

.timeline-event-info p {
  font-size: 0.9em;
  line-height: 1.5;
  margin-bottom: 8px;
}

.event-image-tooltip {
  max-width: 100%;
  height: auto;
  border-radius: 4px;
  margin-top: 5px;
}

.no-data {
  text-align: center;
  font-size: 1.1em;
  color: #777;
  padding: 50px 0;
}

.lifecycle-footer {
  text-align: center;
  padding: 25px 20px;
  margin-top: auto;
  color: #5a4a42;
  font-size: 0.9em;
  border-top: 1px solid rgba(139, 69, 19, 0.15);
}

@media (max-width: 768px) {
  .timeline {
    padding: 30px 0 50px 0;
  }
  .timeline::before {
    top: 50px;
  }
  .timeline-marker {
    margin-top: calc(50px - 24px / 2 - 4px);
  }
  .timeline-item {
    margin: 0 20px;
  }
  .timeline-event-info {
    width: 240px;
  }
}
</style>
