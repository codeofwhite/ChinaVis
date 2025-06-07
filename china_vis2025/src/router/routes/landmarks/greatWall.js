export default [
  {
    path: "/great-wall",
    name: "great-wall",
    component: () => import("@/views/landmarks/GreatWall.vue"),
    meta: {
      title: "故宫",
      icon: "icon-great-wall",
    },
  },
];
