// src/main.js (Vue 3 + Vite)

import { createApp } from "vue"; // <-- 注意这里是命名导入 'createApp'
import App from "./App.vue";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import router from "./router"; // 确保路径正确

const app = createApp(App); // <-- 使用 createApp 函数创建应用实例
app.use(router); // 注册 Vue Router
app.use(ElementPlus)
app.mount("#app");
