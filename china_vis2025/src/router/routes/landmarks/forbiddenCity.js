export default [
  {
    path: "/forbidden-city",
    name: "forbidden-city",
    component: () => import("@/views/landmarks/ForbiddenCity.vue"),
    meta: {
      title: "故宫",
      icon: "icon-forbidden-city"
    }
  }
];