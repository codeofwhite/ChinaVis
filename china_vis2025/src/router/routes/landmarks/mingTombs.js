export default [
  {
    path: "/ming-tombs",
    name: "ming-tombs",
    component: () => import("@/views/landmarks/MingTombs.vue"),
    meta: {
      title: "故宫",
      icon: "icon-ming-tombs",
    },
    props: true,
    children: [
      {
        path: "detail",
        name: "landmark-detail-ming",
        component: () =>
          import("@/views/landmarks/MingTombs/LandmarkDetailView.vue"),
        props: true,
        meta: {
          title: "景区详情",
          dynamic: true,
        },
      },
      {
        path: "influence",
        name: "landmark-radar-ming",
        component: () =>
          import("@/views/landmarks/MingTombs/LandmarkRadarDisplayPage.vue"),
        props: true,
        meta: {
          title: "影响力雷达图",
          dynamic: true,
        },
      },
      {
        path: ":direction",
        name: "landmark-lifecycle-ming",
        component: () =>
          import("@/views/landmarks/MingTombs/LandmarkLifecycle.vue"),
        props: true,
        meta: {
          title: "生命周期分析",
          dynamic: true,
        },
      },
    ],
  },
];
