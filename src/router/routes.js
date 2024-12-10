import HomeMenuRoutes from "@/router/HomeMenuRoutes";
import NotFoundView from "@/views/NotFoundView.vue";
import UserRoutes from "@/router/UserRoutes";
import QuestionView from "@/views/question/QuestionView.vue";
import UserRole from "@/constant/UserRole";

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
  // 做题页面
  {
    path: "/user/:userId",
    name: "题目页面",
    component: QuestionView,
    meta: {
      requiredRole: UserRole.USER,
    },
  },
  ...HomeMenuRoutes,
  ...UserRoutes,
];
export default routes;
