export default [
  {
    path: "/ming-tombs",
    name: "ming-tombs",
    component: () => import("@/views/landmarks/MingTombs.vue"),
    meta: {
      title: "故宫",
      icon: "icon-ming-tombs"
    }
  }
];