import { ADMIN } from "@/constant/UserRole";
import QuestionsView from "@/views/question/QuestionsView.vue";
import {
  IconCommand,
  IconEdit,
  IconFire,
  IconList,
  IconRobotAdd,
  IconUserGroup,
} from "@arco-design/web-vue/es/icon";
import AddQuestionView from "@/views/question/AddQuestionView.vue";
import BasicLayout from "@/layouts/BasicLayout.vue";

const HomeMenuRoutes = [
  {
    path: "/",
    name: "首页",
    component: BasicLayout,
    children: [
      {
        path: "/questions",
        name: "题目",
        component: QuestionsView,
        meta: {
          icon: IconList,
        },
      },
      {
        path: "/add-question",
        name: "添加题目",
        component: AddQuestionView,
        meta: {
          icon: IconRobotAdd,
          requiredRole: ADMIN,
        },
      },
      {
        path: "/manage-questions",
        name: "管理题目",
        component: "",
        meta: {
          icon: IconCommand,
          requiredRole: ADMIN,
        },
      },
      {
        path: "/status",
        name: "状态",
        component: "",
        meta: {
          icon: IconEdit,
        },
      },
      {
        path: "/ranking",
        name: "排名",
        component: "",
        meta: {
          icon: IconFire,
        },
      },
      {
        path: "/communicate",
        name: "交流",
        component: "",
        meta: {
          icon: IconUserGroup,
        },
      },
    ],
  },
];

export default HomeMenuRoutes;
