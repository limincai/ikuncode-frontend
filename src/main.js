import { createApp } from "vue";
import App from "@/App.vue";
import router from "@/router";
// arco-design
import ArcoVue from "@arco-design/web-vue";
import "@arco-design/web-vue/dist/arco.css";
// 额外引入图标库
import ArcoVueIcon from "@arco-design/web-vue/es/icon";
// pinia
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
// bytemd markdown 编辑器样式
import "bytemd/dist/index.css";

// 创建 pinia 实例
const pinia = createPinia();
// 持久化插件
pinia.use(piniaPluginPersistedstate);

const app = createApp(App);

// 全局错误处理
app.config.errorHandler = (err, vm, info) => {
  console.error("Vue 捕获到错误:", err, info);
  // 可以在这里弹出友好的提示或者将错误信息记录到后台
};

app.use(ArcoVue).use(ArcoVueIcon).use(pinia).use(router).mount("#app");
