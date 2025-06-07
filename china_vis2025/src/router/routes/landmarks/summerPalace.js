export default [
  {
    path: "/summerPalace",
    name: "summer-palace",
    component: () => import("@/views/landmarks/SummerPalace.vue"),
    meta: {
      title: "颐和园",
      icon: "icon-summer-palace"
    }
  }
];