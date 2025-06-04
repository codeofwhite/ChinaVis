// src/main.js (Vue 3 + Vite)

import { createApp } from "vue"; // <-- 注意这里是命名导入 'createApp'
import App from "./App.vue";
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import router from "./router"; // 确保路径正确

const app = createApp(App);

// 先使用 Element Plus 和路由
app.use(ElementPlus);
app.use(router);

app.mount("#app");
