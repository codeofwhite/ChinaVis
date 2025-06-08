// router.js
export default [
  {
    path: "/dashilar",
    name: "dashilar",
    component: () => import("@/views/landmarks/Dashilan.vue"),
    meta: {
      title: "大栅栏",
      icon: "icon-dashilar",
    },
    props: true,
    children: [
      {
        path: "detail",
        name: "landmark-detail-dashilar",
        component: () =>
          import("@/views/landmarks/Dashilan/LandmarkDetailView.vue"),
        props: true,
        meta: {
          title: "景区详情",
          dynamic: true,
        },
      },
      {
        path: "influence",
        name: "landmark-radar-dashilar",
        component: () =>
          import("@/views/landmarks/Dashilan/LandmarkRadarDisplayPage.vue"),
        props: true,
        meta: {
          title: "影响力雷达图",
          dynamic: true,
        },
      },
      {
        path: ":direction",
        name: "landmark-lifecycle-dashilar",
        component: () =>
          import("@/views/landmarks/Dashilan/LandmarkLifecyclePage.vue"),
        props: true,
        meta: {
          title: "生命周期分析",
          dynamic: true,
        },
      },
    ],
  },
];
