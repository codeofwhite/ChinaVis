<template>
  <div class="landmark-portal-container">
    <header class="landmark-header">
      <button @click="goBack" class="back-button">← 返回地图</button>
      <div class="media-background">
        <img
          v-if="landmark.image"
          :src="landmark.image"
          :alt="landmark.name"
          class="landmark-main-media"
        />
      </div>
      <div class="landmark-info">
        <h1>{{ landmark.name }}</h1>
        <p class="summary">{{ landmark.summary }}</p>
        <div class="core-metrics">
          <div
            v-for="(metric, index) in landmark.metrics"
            :key="index"
            class="metric-item"
          >
            <span class="icon">{{ metric.icon }}</span>
            <span class="value">{{ metric.value }}</span>
            <span class="label">{{ metric.label }}</span>
          </div>
        </div>
      </div>
    </header>

    <section class="exploration-cards-section">
      <div class="exploration-card" @click="explore('lifeCycle')">
        <div class="card-content">
          <h2 class="card-title">生命年轮</h2>
          <div class="card-preview-media">
            <div class="media-overlay"></div>
            <img
              src="https://5b0988e595225.cdn.sohucs.com/images/20190302/76301000101248c5b5b98902edd505af.jpeg"
              alt="生命年轮预览"
            />
          </div>
          <p class="card-description">
            从兴建到重生的时光之旅，探索{{
              landmark.name
            }}的建筑更迭与功能演变。
          </p>
          <button class="explore-button">立即探索 →</button>
        </div>
      </div>

      <div class="exploration-card" @click="explore('influence')">
        <div class="card-content">
          <h2 class="card-title">影响力光环</h2>
          <div class="card-preview-media">
            <div class="media-overlay"></div>
            <img
              src="https://th.bing.com/th/id/R.8f12a0feaa00223ec8b12150d8457f96?rik=w0LNbzIwxSPCmQ&riu=http%3a%2f%2fwww.br-cn.com%2fimage%2f2023-01-02%2fthumb%2f1059526375796510720.jpg&ehk=PDDMjLZpIGqmoj%2boTIDuzZoQ7O384zqlJ7MA%2fypr0%2fA%3d&risl=&pid=ImgRaw&r=0"
              alt="影响力预览"
            />
          </div>
          <p class="card-description">
            解析{{
              landmark.name
            }}如何融入当代生活，评估其在全球范围内的文化影响力与认知度。
          </p>
          <button class="explore-button">立即探索 →</button>
        </div>
      </div>

      <div class="exploration-card" @click="explore('legends')">
        <div class="card-content">
          <h2 class="card-title">传奇故事</h2>
          <div class="card-preview-media">
            <div class="media-overlay"></div>
            <img
              src="data:image/webp;base64,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"
              alt="传奇故事预览"
            />
          </div>
          <p class="card-description">
            聆听{{
              landmark.name
            }}背后那些引人入胜的帝王轶事、民间传说与文人墨客的动人篇章。
          </p>
          <button class="explore-button">立即探索 →</button>
        </div>
      </div>
    </section>

    <footer class="portal-footer">
      <p>发现更多：<a href="#">推荐探索路线</a> | <a href="#">更多发现</a></p>
      <p class="copyright">© 2023 北京历史文化遗产数字平台</p>
    </footer>
  </div>
</template>

<script>
export default {
  name: "BeihaiPark",
  props: {
    landmarkId: {
      type: String,
      required: false,
    },
  },
  data() {
    return {
      landmark: {
        name: "颐和园",
        summary:
          "中国现存规模最大、保存最完整的皇家行宫御苑，被誉为'皇家园林博物馆'。",
        image:
          "https://image.arrivalguides.com/x/05/9b69ea7184c4dc9e31b123f924aa265a.jpg",
        metrics: [
          { icon: "⏳", value: "1750年", label: "始建时间" }, // 改用沙漏emoji表示历史
          { icon: "🌊", value: "2.9km²", label: "水域占比70%" }, // 用水波emoji强调昆明湖特色
          { icon: "🏯", value: "长廊", label: "世界之最" }, // 用楼阁emoji代表建筑
          { icon: "👑", value: "慈禧", label: "重建主持" }, // 用皇冠emoji关联历史人物
        ],
      },
    };
  },
  methods: {
    goBack() {
      this.$router.push("/");
    },
    explore(direction) {
      // 跳转到不同的三级页面
      if (direction === "lifeCycle") {
        this.$router.push({
          name: "BeihaiParkLifeCycle",
          params: { landmarkId: this.landmarkId || "beihaiPark" },
        });
      } else if (direction === "influence") {
        this.$router.push({
          name: "BeihaiParkInfluence",
          params: { landmarkId: this.landmarkId || "beihaiPark" },
        });
      } else if (direction === "legends") {
        this.$router.push({
          name: "BeihaiParkLegends",
          params: { landmarkId: this.landmarkId || "beihaiPark" },
        });
      }
    },
  },
};
</script>

<style scoped>
.landmark-portal-container {
  font-family: "Noto Serif SC", serif;
  color: #333;
  line-height: 1.6;
  background: linear-gradient(135deg, #f5f2e9 0%, #e8d8c3 100%);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.header-content {
  position: relative;
  z-index: 2;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 180px;
}

.main-title {
  text-align: center;
  font-size: 2.8em;
  font-weight: bold;
  margin-top: 0;
  margin-bottom: 30px;
  color: #8b4513;
  letter-spacing: 2px;
}

.intro-cards {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 24px;
  margin-bottom: 40px;
}

.intro-card {
  background: linear-gradient(135deg, #fffbe6 0%, #f5e6c8 100%);
  border-radius: 16px;
  box-shadow: 0 4px 16px rgba(139, 69, 19, 0.08);
  padding: 24px 32px;
  min-width: 220px;
  max-width: 320px;
  flex: 1 1 220px;
  text-align: left;
  border: 1px solid #e0cfa6;
}

.intro-card h2 {
  font-size: 1.2em;
  color: #a67c52;
  margin-bottom: 10px;
  font-weight: 600;
}

.intro-card p {
  font-size: 1em;
  color: #5a4a42;
  margin: 0;
}

.landmark-header {
  position: relative;
  width: 100%;
  height: 70vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  text-align: center;
  color: white;
  padding-bottom: 30px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
}

.media-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
}

.landmark-main-media {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: brightness(0.6) sepia(0.3) hue-rotate(-10deg) contrast(0.9);
}

.landmark-info {
  position: relative;
  z-index: 1;
  padding: 0 20px;
  text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.7);
  margin-bottom: 40px;
}

.landmark-info h1 {
  font-size: 3.2em;
  margin-bottom: 15px;
  font-weight: 700;
  letter-spacing: 1px;
  color: #fff8e1;
}

.landmark-info .summary {
  font-size: 1.2em;
  margin-bottom: 30px;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
  color: #f5f5f5;
  line-height: 1.8;
}

.core-metrics {
  display: flex;
  justify-content: center;
  gap: 30px;
  flex-wrap: wrap;
  margin-top: 20px;
}

.metric-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 1.1em;
  background-color: rgba(255, 248, 225, 0.15);
  border-radius: 12px;
  padding: 12px 20px;
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 235, 205, 0.3);
  transition: all 0.3s ease;
}

.metric-item:hover {
  background-color: rgba(255, 248, 225, 0.25);
  transform: translateY(-3px);
}

.metric-item .icon {
  font-size: 1.8em;
  margin-bottom: 8px;
  color: #ffd54f;
}

.metric-item .value {
  font-size: 1.4em;
  font-weight: bold;
  color: #fff8e1;
  margin-bottom: 5px;
}

.metric-item .label {
  font-size: 0.9em;
  color: #f5f5f5;
  opacity: 0.9;
}

.back-button {
  position: absolute;
  top: 30px;
  left: 30px;
  background-color: rgba(139, 69, 19, 0.7);
  color: #fff8e1;
  border: none;
  padding: 12px 20px;
  border-radius: 30px;
  cursor: pointer;
  font-size: 1em;
  z-index: 10;
  transition: all 0.3s ease;
  backdrop-filter: blur(5px);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
}

.back-button:hover {
  background-color: rgba(160, 82, 45, 0.9);
  transform: translateX(-5px);
}

.exploration-cards-section {
  display: flex;
  justify-content: center;
  gap: 30px;
  padding: 40px;
  background: transparent;
  flex-wrap: wrap;
  margin-top: -80px;
  position: relative;
  z-index: 2;
}

.exploration-card {
  background: linear-gradient(135deg, #ffffff 0%, #f9f5ed 100%);
  border-radius: 20px;
  box-shadow: 0 15px 40px rgba(101, 67, 33, 0.2);
  padding: 0;
  width: 28%;
  max-width: 380px;
  min-width: 280px;
  text-align: center;
  transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
  cursor: pointer;
  overflow: hidden;
  border: 1px solid rgba(139, 69, 19, 0.1);
}

.exploration-card:hover {
  transform: translateY(-15px) scale(1.02);
  box-shadow: 0 25px 60px rgba(101, 67, 33, 0.3);
}

.card-content {
  padding: 30px;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.card-title {
  font-size: 1.6em;
  color: #8b4513;
  margin-bottom: 20px;
  font-weight: 600;
  position: relative;
  padding-bottom: 10px;
}

.card-title:after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 50px;
  height: 2px;
  background: linear-gradient(90deg, #d4a76a 0%, #8b4513 100%);
}

.card-preview-media {
  width: 100%;
  height: 160px;
  overflow: hidden;
  border-radius: 12px;
  margin-bottom: 25px;
  position: relative;
}

.media-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    to bottom,
    rgba(139, 69, 19, 0.1),
    rgba(101, 67, 33, 0.4)
  );
  z-index: 1;
}

.card-preview-media img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: brightness(0.8) sepia(0.2);
  transition: all 0.5s ease;
}

.exploration-card:hover .card-preview-media img {
  transform: scale(1.05);
  filter: brightness(0.9) sepia(0.1);
}

.card-description {
  font-size: 1em;
  color: #5a4a42;
  margin-bottom: 25px;
  line-height: 1.7;
}

.explore-button {
  background: linear-gradient(135deg, #d4a76a 0%, #8b4513 100%);
  color: white;
  border: none;
  padding: 12px 30px;
  border-radius: 10px;
  font-size: 1em;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(139, 69, 19, 0.3);
  font-weight: 500;
  letter-spacing: 0.5px;
}

.explore-button:hover {
  background: linear-gradient(135deg, #e0b87a 0%, #9c5a29 100%);
  transform: translateY(-3px);
  box-shadow: 0 8px 25px rgba(139, 69, 19, 0.4);
}

.portal-footer {
  text-align: center;
  padding: 30px 20px;
  background: linear-gradient(135deg, #8b4513 0%, #5a2c0b 100%);
  color: #f5f5f5;
  font-size: 0.9em;
  margin-top: auto;
}

.portal-footer a {
  color: #ffd54f;
  text-decoration: none;
  margin: 0 10px;
  transition: color 0.3s ease;
  font-weight: 500;
}

.portal-footer a:hover {
  color: #fff8e1;
  text-decoration: underline;
}

.portal-footer .copyright {
  margin-top: 15px;
  opacity: 0.8;
}

@media (max-width: 1200px) {
  .exploration-card {
    width: 45%;
    margin-bottom: 30px;
  }

  .landmark-header {
    height: 65vh;
  }

  .landmark-info h1 {
    font-size: 2.8em;
  }
}

@media (max-width: 768px) {
  .landmark-header {
    height: 60vh;
  }

  .landmark-info h1 {
    font-size: 2.2em;
  }

  .landmark-info .summary {
    font-size: 1em;
  }

  .exploration-cards-section {
    flex-direction: column;
    align-items: center;
    padding: 30px 20px;
    margin-top: -60px;
  }

  .exploration-card {
    width: 90%;
    margin-bottom: 25px;
  }

  .core-metrics {
    gap: 15px;
  }
}

@media (max-width: 480px) {
  .landmark-info h1 {
    font-size: 1.8em;
  }

  .back-button {
    top: 20px;
    left: 20px;
    padding: 10px 15px;
  }

  .exploration-card {
    width: 100%;
  }

  .card-title {
    font-size: 1.4em;
  }
}
</style>
