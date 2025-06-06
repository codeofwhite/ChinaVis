import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import LandmarkPortal from "../views/LandmarkPortal.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView
  },
  {
    path: "/landmark/forbiddenCity",
    name: "ForbiddenCity",
    component: () => import("../views/landmarks/ForbiddenCity.vue"),
  },
  {
    path: "/landmark/temple-of-heaven",
    name: "TempleOfHeaven",
    component: () => import("@/views/landmarks/TempleOfHeaven.vue"),
    children: [
      {
        path: "life-cycle", 
        name: "heaven-LifeCycle", 
        component: () => import("@/components/temple-of-heaven/LifeCycle.vue")
      },
      {
        path: "influence", 
        name: "heaven-Influence", 
        component: () => import("@/components/temple-of-heaven/Influence.vue")
      },
      {
        path: "legends", 
        name: "heaven-Legends", 
        component: () => import("@/components/temple-of-heaven/Legends.vue")
      }
    ]
  },
  {
    path: "/landmark/greatWall",
    name: "GreatWall",
    component: () => import("../views/landmarks/GreatWall.vue"),
  },
  {
    path: "/landmark/mingTombs",
    name: "MingTombsPortal", // 修改路由名称以匹配 goBack 方法中的引用
    component: () => import("../views/landmarks/MingTombs.vue"),
  },
  {
    path: "/landmark/mingTombs/detail",
    name: "MingTombsDetail",
    component: () => import("../views/landmarks/LandmarkDetailView.vue"),
    props: true
  },
  {
    path: "/landmark/beihaiPark",
    name: "BeihaiPark",
    component: () => import("../views/landmarks/BeihaiPark.vue"),
  },
  {
    path: "/landmark/fayuanTemple",
    name: "FayuanTemple",
    component: () => import("../views/landmarks/FayuanTemple.vue"),
    children: [
      {
        path: "life-cycle", 
        name: "fayuan-LifeCycle", 
        component: () => import("@/components/fayuan-temple/LifeCycle.vue")
      },
      {
        path: "influence", 
        name: "fayuan-Influence", 
        component: () => import("@/components/fayuan-temple/Influence.vue")
      },
      {
        path: "legends", 
        name: "fayuan-Legends", 
        component: () => import("@/components/fayuan-temple/Legends.vue"),
      }
    ]
  },
  {
    path: "/landmark/summerPalace",
    name: "SummerPalace",
    component: () => import("../views/landmarks/SummerPalace.vue"),
  },
  {
    path: "/landmark/dashilar",
    name: "DashilarPortal", // 修改路由名称以匹配 goBack 方法中的引用
    component: () => import("../views/landmarks/Dashilan.vue"),
  },
  {
    path: "/landmark/dashilan/detail",
    name: "DashilanDetail",
    component: () => import("../views/landmarks/LandmarkDetailView.vue"),
    props: true
  },
  {
    path: "/landmark/:landmarkId",
    name: "LandmarkPortal",
    component: LandmarkPortal,
    props: true,
  },
  {
    path: "/landmark/:landmarkId/influence",
    name: "LandmarkRadarDisplayPage",
    component: () => import("../views/landmarks/LandmarkRadarDisplayPage.vue"),
    props: true
  },
  {
    path: "/landmark/:landmarkId/:direction",
    name: "LandmarkLifecyclePage",
    component: () => import("../views/landmarks/LandmarkLifecycle.vue"),
    props: true
  }
];

const router = createRouter({
  // Vue Router 4.x 使用 createWebHistory 而不是 mode: 'history'
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
