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

app.use(ArcoVue).use(ArcoVueIcon).use(pinia).use(router).mount("#app");
