import UserRole from "@/constant/UserRole";
import QuestionListView from "@/views/question/QuestionListView.vue";
import {
  IconCommand,
  IconEdit,
  IconFire,
  IconList,
  IconRobotAdd,
  IconUserGroup,
} from "@arco-design/web-vue/es/icon";
import BasicLayout from "@/layouts/BasicLayout.vue";
import CommunicationView from "@/views/question/CommunicationView.vue";
import RankingView from "@/views/question/RankingView.vue";
import QuestionSubmitStatusView from "@/views/question/QuestionSubmitStatusView.vue";
import QuestionAddStepRoutes from "@/router/QuestionAddStepRoutes";
import QuestionManagementView from "@/views/question/QuestionManagementView.vue";
import QuestionAddVIew from "@/views/question/QuestionAddView.vue";
import QuestionUpdateView from "@/views/question/QuestionUpdateView.vue";
import QuestionView from "@/views/question/QuestionView.vue";

const HomeMenuRoutes = [
  {
    path: "/",
    name: "首页",
    component: BasicLayout,
    children: [
      {
        path: "/questions",
        name: "题目",
        component: QuestionListView,
        meta: {
          icon: IconList,
        },
      },
      {
        path: "/question/add",
        name: "添加题目",
        component: QuestionAddVIew,
        meta: {
          icon: IconRobotAdd,
          requiredRole: UserRole.ADMIN,
        },
        children: QuestionAddStepRoutes,
      },
      {
        path: "/questions/manage",
        name: "管理题目",
        component: QuestionManagementView,
        meta: {
          icon: IconCommand,
          requiredRole: UserRole.ADMIN,
        },
      },
      // 题目更新页面
      {
        path: "/question/update",
        name: "题目更新",
        component: QuestionUpdateView,
        meta: {
          requiredRole: UserRole.ADMIN,
          hidden: true,
        },
      },
      // 题目页面
      {
        path: "/question/:questionId",
        name: "题目页面",
        component: QuestionView,
        meta: {
          requiredRole: UserRole.USER,
          hidden: true,
        },
      },
      {
        path: "/status",
        name: "状态",
        component: QuestionSubmitStatusView,
        meta: {
          icon: IconEdit,
        },
      },
      {
        path: "/ranking",
        name: "排名",
        component: RankingView,
        meta: {
          icon: IconFire,
        },
      },
      {
        path: "/communication",
        name: "交流",
        component: CommunicationView,
        meta: {
          icon: IconUserGroup,
        },
      },
    ],
  },
];

export default HomeMenuRoutes;
