import HomeMenuRoutes from "@/router/HomeMenuRoutes";
import UserMenuRoutes from "@/router/UserMenuRoutes";
import LoginVue from "@/views/LoginView.vue";

const routes = [
  { path: "/user/login", name: "用户登录", component: LoginVue },
  ...HomeMenuRoutes,
  ...UserMenuRoutes,
];

export default routes;
