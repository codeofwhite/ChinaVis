export default [
  {
    path: "/landmarks/:landmarkId/detail",
    name: "landmark-detail",
    component: () => import("@/views/landmarks/Dashilan/LandmarkDetailView.vue"),
    props: true,
    meta: {
      title: "景区详情",
      dynamic: true
    }
  },
  {
    path: "/landmarks/:landmarkId/influence",
    name: "landmark-radar",
    component: () => import("@/views/landmarks/Dashilan/LandmarkRadarDisplayPage.vue"),
    props: true,
    meta: {
      title: "影响力雷达图",
      dynamic: true
    }
  },
  {
    path: "/landmarks/:landmarkId/:direction",
    name: "landmark-lifecycle",
    component: () => import("@/views/landmarks/Dashilan/LandmarkLifecycle.vue"),
    props: true,
    meta: {
      title: "生命周期分析",
      dynamic: true
    }
  }
];