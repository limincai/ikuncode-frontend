import HomeMenuRoutes from "@/router/HomeMenuRoutes";
import UserRoutes from "@/router/UserRoutes";
import QuestionView from "@/views/question/QuestionView.vue";
import UserRole from "@/constant/UserRole";
import NotFoundView from "@/views/NotFoundView.vue";
import QuestionUpdateView from "@/views/question/QuestionUpdateView.vue";

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
    path: "/question/:questionId",
    name: "题目页面",
    component: QuestionView,
    meta: {
      requiredRole: UserRole.USER,
    },
  },
  // 题目更新页面
  {
    path: "/question/update",
    name: "题目更新",
    component: QuestionUpdateView,
    meta: {
      requiredRole: UserRole.ADMIN,
    },
  },
  ...HomeMenuRoutes,
  ...UserRoutes,
];
export default routes;
