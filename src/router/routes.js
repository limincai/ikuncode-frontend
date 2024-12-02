import HomeMenuRoutes from "@/router/HomeMenuRoutes";
import NotFoundView from "@/views/NotFoundView.vue";
import UserRoutes from "@/router/UserRoutes";

const routes = [
  // / 直接跳转到问题页面
  {
    path: "/",
    redirect: "/questions",
  },
  // 404 页面
  {
    path: "/:pathMatch(.*)*",
    name: "当前页面不存在",
    component: NotFoundView,
  },
  ...HomeMenuRoutes,
  ...UserRoutes,
];
export default routes;
