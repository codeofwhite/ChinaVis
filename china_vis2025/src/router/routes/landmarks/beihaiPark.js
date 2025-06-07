export default [
  {
    path: "/beihai-park",
    name: "beihai-park",
    component: () => import("@/views/landmarks/BeihaiPark.vue"),
    meta: {
      title: "故宫",
      icon: "icon-beihai-park"
    }
  }
];