import { ADMIN } from "@/constant/UserRole";
import QuestionsView from "@/views/QuestionsView.vue";
import {
  IconCommand,
  IconEdit,
  IconFire,
  IconList,
  IconRobotAdd,
  IconUserGroup,
} from "@arco-design/web-vue/es/icon";

const HomeMenuRoutes = [
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
    component: "",
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
];

export default HomeMenuRoutes;
