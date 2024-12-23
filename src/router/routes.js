import HomeMenuRoutes from "@/router/HomeMenuRoutes";
import UserRoutes from "@/router/UserRoutes";
import QuestionView from "@/views/home/QuestionView.vue";
import UserRole from "@/constant/UserRole";
import NotFoundView from "@/views/NotFoundView.vue";

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
