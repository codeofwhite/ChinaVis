<template>
  <div class="lifecycle-container">
    <header class="lifecycle-header">
      <button @click="goBackToPortal" class="back-button">← 返回 {{ landmarkName }}</button>
      <h1>{{ landmarkName }} - {{ pageTitle }}</h1>
      <p class="intro-text">{{ pageIntro }}</p>
    </header>

    <main class="timeline-section">
      <div v-if="timelineEvents.length" class="timeline-wrapper">
        <div class="timeline-event" v-for="(event, index) in sortedTimelineEvents" :key="index">
          <div class="timeline-date">{{ event.date }}</div>
          <div class="timeline-milestone"></div>
          <div class="timeline-content-wrapper">
            <div class="timeline-title">{{ event.title }}</div>
            <p class="timeline-description" v-html="formatDescription(event.description)"></p>
            <img v-if="event.image" :src="getImagePath(event.image)" :alt="event.title" class="timeline-event-image"/>
          </div>
        </div>
      </div>
      <p v-else class="no-data">暂无生命历程数据。</p>
    </main>

    <footer class="lifecycle-footer">
      <p class="copyright">© {{ new Date().getFullYear() }} 北京历史文化遗产数字平台</p>
    </footer>
  </div>
</template>

<script>
export default {
  name: "LandmarkLifecyclePage",
  props: {
    landmarkId: {
      type: String,
      required: true,
    },
    // direction prop 不再是必需的，因为此组件只处理生命历程
    // direction: {
    //   type: String,
    // }
  },
  data() {
    return {
      landmarkName: "",
      pageTitle: "",
      pageIntro: "",
      timelineEvents: [],
      allLifecycleData: { // 数据源保持不变
        dashilar: [
          { year: 1420, date: "明永乐年间 (15世纪初)", title: "廊房商业街区兴建", description: "北京鼓励商贸，在皇城四门等地兴建廊房商业街区。该地区最早称“廊房四条”。", image: "olddashilan.jpg" },
          { year: 1488, date: "明弘治元年 (1488年)", title: "“大栅栏”得名", description: "为维护京师治安，廊房四条两端设木质栅栏，由商户出资修建，规模格外巨大，逐渐被称为“大栅栏”而沿用至今。", image: "dashilan_bg.jpg" },
          { year: 1750, date: "清乾隆年间", title: "地图标注", description: "地图已标注“大栅栏”地名 (见《乾隆京城全图》)。", image: "" },
          { year: 1899, date: "清光绪二十五年 (1899年)", title: "火灾毁栏", description: "大栅栏发生火灾，木质栅栏被烧毁。", image: "" },
          { year: 1900, date: "1900年", title: "义和团运动影响", description: "义和团运动中，街区多家店铺被焚毁。", image: "" },
          { year: 1902, date: "1902年后", title: "重建与新发展", description: "各商户重建复业，大栅栏依旧繁华，甚至随着前门火车站建成而迎来新的发展契机。", image: "" },
          { year: 2000, date: "2000年", title: "铁艺栅栏重建", description: "北京市政府在大栅栏街口重新修建铁艺栅栏，恢复了街名由来的“栅栏”。", image: "dashilan_bg.jpg" },
          { year: 2008, date: "2008年", title: "街区整体修缮开放", description: "完成街区整体修缮对外开放。", image: "olddashilan.jpg" },
          { year: 2017, date: "近年来 (如2017年)", title: "保护性整修", description: "大栅栏区域又启动保护性整修(如2017年珠粮街区整体修缮)，力图再现民国初期历史风貌。", image: "" },
          { year: 0, date: "风格演变", title: "建筑风格", description: "大栅栏街区建筑承袭北京传统商街风格，主要以灰砖灰瓦为主，辅以雕花木窗、红柱绿瓦等明清装饰元素。老字号店铺普遍为两三层楼房，四合院式平顶阁楼或歇山顶，局部兼具西式立面和中式雕花装饰。街口的标志性铁艺拱门即为现代建构。原有建筑以灰砖灰瓦、木构件为主，部分商号立面引入西洋彩色瓷砖等外来元素。保护修缮中坚持“恢复原貌”，采用与历史相符的木料、青砖和琉璃瓦。", image: "dashilan_bg.jpg" },
        ],
        mingTombs: [
          { year: 1409, date: "永乐七年 (1409年)", title: "长陵始建", description: "明十三陵是明朝13位皇帝的陵寝群，始于永乐七年(1409年)朱棣在此建长陵开始营建。", image: "长陵.jpg" },
          { year: 1644, date: "崇祯末年 (1644年)", title: "营建终止", description: "明十三陵的营建终止于崇祯帝入陵(1644年)。", image: "" },
          { year: 1650, date: "清初", title: "保护与修缮", description: "清初对十三陵予以一定保护并多次修缮。", image: "" },
          { year: 1850, date: "晚清", title: "管理疏忽", description: "晚清后期因政权衰微，修缮管理疏忽，陵区多处设施失修。", image: "" },
          { year: 1950, date: "1950年代", title: "考古发掘", description: "在吴晗、郭沫若等文史专家倡议下，先后发掘并开放了定陵(万历皇帝陵)和长陵(成祖、孝陵)等。", image: "碑亭.jpg" },
          { year: 1957, date: "1957年", title: "市级文保", description: "北京政府公布十三陵为北京市第一批重点文物保护单位。", image: "" },
          { year: 1961, date: "1961年", title: "国家级文保", description: "国务院列为全国重点文物保护单位。", image: "" },
          { year: 1966, date: "文革期间 (1966年起)", title: "严重破坏", description: "十三陵遭到严重破坏：1966年“破四旧”运动中，万历帝及皇后的遗骸被红卫兵烧毁，多处建筑被拆毁。", image: "" },
          { year: 1972, date: "1970年代后", title: "加强保护", description: "政府加强保护：1959年定陵博物馆开馆，1972年归属北京园林局管理。", image: "" },
          { year: 1982, date: "1982年", title: "设立风景区", description: "国务院批准设立“八达岭一十三陵风景区”。", image: "" },
          { year: 1995, date: "1995年", title: "博物馆成立", description: "成立“明十三陵博物馆”。", image: "" },
          { year: 2003, date: "2003年7月3日", title: "世界文化遗产", description: "十三陵与清东陵、西陵一同被联合国教科文组织列为世界文化遗产。", image: "Ming_Tombs.jpg" },
          { year: 0, date: "风格演变", title: "建筑风格", description: "明十三陵沿袭古制，体现皇家陵寝规格。陵区依托山势，整体呈风水宝地格局。大型土木结构均采用黄琉璃瓦屋面和朱红梁柱。神道沿线遍布石像生、石马等雕塑。石牌坊建于嘉靖十九年(1540年)。21世纪的修缮工程在保护原材料的基础上，也用了钢结构加固、仿古琉璃瓦复盖等现代技术。", image: "明十三陵神道_大宫门.jpg" },
        ],
      }
    };
  },
  computed: {
    sortedTimelineEvents() {
      const eventsWithYear = this.timelineEvents.filter(event => event.year !== 0);
      const sorted = [...eventsWithYear].sort((a, b) => a.year - b.year);
      const styleEvolutionEvent = this.timelineEvents.find(event => event.year === 0);
      if (styleEvolutionEvent) {
        sorted.push(styleEvolutionEvent);
      }
      return sorted;
    }
  },
  watch: {
    landmarkId: "loadDataBasedOnLandmark",
  },
  created() {
    this.loadDataBasedOnLandmark();
  },
  methods: {
    goBackToPortal() {
      let portalRouteName = this.landmarkId === 'dashilar' ? 'DashilarPortal' : 'MingTombsPortal';
      if (this.$router.hasRoute(portalRouteName)) {
        this.$router.push({ name: portalRouteName });
      } else {
        this.$router.push('/');
      }
    },
    loadDataBasedOnLandmark() {
      if (this.landmarkId === "dashilar") {
        this.landmarkName = "大栅栏";
        this.pageTitle = "街巷记忆"; // 固定为第一个子标题的名称
        this.pageIntro = `鼠标悬停在时间节点上，探索大栅栏从诞生至今的关键历史时刻与变迁。`;
        this.timelineEvents = this.allLifecycleData.dashilar || [];
      } else if (this.landmarkId === "mingTombs") {
        this.landmarkName = "明十三陵";
        this.pageTitle = "皇陵沿革"; // 固定为第一个子标题的名称
        this.pageIntro = `鼠标悬停在时间节点上，探索明十三陵从诞生至今的关键历史时刻与变迁。`;
        this.timelineEvents = this.allLifecycleData.mingTombs || [];
      } else {
        this.landmarkName = "未知地标";
        this.pageTitle = "生命历程";
        this.pageIntro = "暂无此地标的生命历程信息。";
        this.timelineEvents = [];
      }
      document.title = `${this.landmarkName} - ${this.pageTitle}`;
    },
    getImagePath(imageName) {
      if (!imageName) return '';
      try {
        return require(`@/assets/${imageName}`);
      } catch (e) {
        console.warn(`Lifecycle Image not found: ${imageName}`);
        return '';
      }
    },
    getYearFromDate(dateString) {
      const match = dateString.match(/\((\d{4})年\)/);
      if (match && match[1]) {
        return match[1];
      }
      const yearMatch = dateString.match(/^(\d{4})/);
      if (yearMatch && yearMatch[1]) {
        return yearMatch[1];
      }
      return dateString.split(' ')[0];
    },    formatDescription(description) {
        // 将 [引用1,引用2] 格式的引用转换为上标，并添加悬停提示
        // 注意：在 v-html 中直接使用用户提供的内容可能存在 XSS 风险，请确保 description 内容是安全的
        if (typeof description !== 'string') return '';
        return description.replace(/\[([\w\s,]+)\]/g, (match, p1) => {
            const citations = p1.split(',').map(c => c.trim()).join(', ');
            return `<sup title="来源: ${citations}">[${citations}]</sup>`;
        });
    }
  },
};
</script>

<style scoped>
/* 使用您之前提供的垂直时间轴的 CSS 样式 */
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
  margin-bottom: 30px; /* Reduced margin */
  padding-top: 20px;
  position: relative;
}

.lifecycle-header h1 {
  font-size: 2.5em; /* Slightly reduced */
  color: #8b4513;
  margin-bottom: 8px;
  font-weight: 700;
}

.lifecycle-header .intro-text {
  font-size: 1em; /* Slightly reduced */
  color: #5a4a42;
  max-width: 700px;
  margin: 0 auto 15px;
  line-height: 1.6;
}

.back-button {
  position: absolute;
  top: 15px; /* Adjusted */
  left: 15px; /* Adjusted */
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
  width: 100%;
  max-width: 900px; /* 控制时间轴最大宽度 */
  margin: 0 auto; /* 居中 */
  background-color: rgba(255, 255, 255, 0.6); /* 半透明背景，增加可读性 */
  padding: 30px 40px;
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(101, 67, 33, 0.15);
  flex-grow: 1;
}

.timeline-wrapper { /* 垂直时间轴的包裹容器 */
  position: relative;
  padding-left: 50px; /* 为时间轴线和里程碑留出空间 */
}

/* 绘制中间的垂直时间轴线 */
.timeline-wrapper::before {
  content: '';
  position: absolute;
  left: 20px; /* 控制线的水平位置 */
  top: 0;
  bottom: 0;
  width: 4px;
  background: linear-gradient(to bottom, #d4a76a, #8b4513); /* 与二级页面按钮颜色呼应 */
  border-radius: 2px;
}

.timeline-event {
  margin-bottom: 30px;
  position: relative;
  /* cursor: pointer;  如果不需要点击事件，可以移除 */
  padding: 15px;
  background-color: #fdfaf3;
  border-radius: 10px;
  border: 1px solid rgba(139, 69, 19, 0.2);
  transition: all 0.3s ease;
}
.timeline-event:hover { /* 悬停效果可以保留或调整 */
  transform: translateX(5px) scale(1.01);
  box-shadow: 0 6px 20px rgba(101, 67, 33, 0.15);
}


.timeline-date {
  font-size: 1em;
  font-weight: bold;
  color: #8b4513;
  margin-bottom: 8px;
  background-color: rgba(255, 248, 225, 0.8);
  display: inline-block;
  padding: 5px 10px;
  border-radius: 5px;
}

/* 时间轴上的里程碑圆点 */
.timeline-milestone {
  position: absolute;
  left: -39px; /* (50px padding-left - 20px line-left - 10px/2 width) -> (50 - 20 - 9) */
  top: 20px; /* 大致与日期对齐或第一个元素顶部 */
  width: 18px;
  height: 18px;
  background-color: #fff; /* 白色圆点 */
  border: 4px solid #d4a76a; /* 金色边框 */
  border-radius: 50%;
  z-index: 1;
}
.timeline-content-wrapper { /* 包裹标题和描述 */
    /* 无需特殊样式，除非需要额外控制 */
}

.timeline-title {
  font-size: 1.3em;
  font-weight: 600;
  color: #5a2c0b;
  margin-bottom: 8px;
}

.timeline-description {
  font-size: 1em;
  color: #5a4a42;
  line-height: 1.7;
  margin-bottom: 10px;
}
/* 为v-html中的sup标签（引用）添加样式 */
.timeline-description :deep(sup) {
    font-size: 0.7em;
    color: #8b4513;
    cursor: default; /* 或者 pointer 如果有悬停提示 */
    margin-left: 2px;
    padding: 0 2px;
    border: 1px solid #e0b87a;
    border-radius: 3px;
    background-color: #fff8e1;
}


.timeline-event-image {
  max-width: 100%;
  height: auto;
  border-radius: 8px;
  margin-top: 10px;
  box-shadow: 0 4px 10px rgba(0,0,0,0.1);
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
</style>