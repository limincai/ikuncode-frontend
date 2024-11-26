import { ADMIN } from "@/constant/UserRole";

const HomeMenuRoutes = [
  {
    path: "/questions",
    name: "题目",
    component: "",
  },
  {
    path: "/add-question",
    name: "添加题目",
    component: "",
    meta: {
      requiredRole: ADMIN,
    },
  },
  {
    path: "/manage-question",
    name: "管理题目",
    component: "",
    meta: {
      requiredRole: ADMIN,
    },
  },
  {
    path: "/status",
    name: "状态",
    component: "",
  },
  {
    path: "/ranking",
    name: "排名",
    component: "",
  },
  {
    path: "/communicate",
    name: "交流",
    component: "",
  },
];

export default HomeMenuRoutes;
