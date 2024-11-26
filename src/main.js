import { createApp } from "vue";
import App from "@/App.vue";
import router from "@/router";
// arco-design
import ArcoVue from "@arco-design/web-vue";
import "@arco-design/web-vue/dist/arco.css";
// pinia
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";

// 创建 pinia 实例
const pinia = createPinia();
// 持久化插件
pinia.use(piniaPluginPersistedstate);

const app = createApp(App);

app.use(ArcoVue).use(pinia).use(router).mount("#app");
