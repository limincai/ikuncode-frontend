import UserRole from "@/constant/UserRole";
import QuestionAddBasicInfo from "@/components/questionaddstep/QuestionAddBasicInfo.vue";
import QuestionAddDescription from "@/components/questionaddstep/QuestionAddDescription.vue";
import QuestionAddAnswer from "@/components/questionaddstep/QuestionAddAnswer.vue";
import QuestionAddJudgeCase from "@/components/questionaddstep/QuestionAddJudgeCase.vue";
import QuestionAddJudgeConfig from "@/components/questionaddstep/QuestionAddJudgeConfig.vue";

const QuestionAddStepRoutes = [
  {
    path: "/question/add/basic-info",
    name: "基本信息",
    component: QuestionAddBasicInfo,
    meta: {
      requiredRole: UserRole.ADMIN,
      description: "输入题目基本信息",
    },
  },
  {
    path: "/question/add/description",
    name: "题目描述",
    component: QuestionAddDescription,
    meta: {
      requiredRole: UserRole.ADMIN,
      description: "输入题目描述",
    },
  },
  {
    path: "/question/add/answer",
    name: "题目答案",
    component: QuestionAddAnswer,
    meta: {
      requiredRole: UserRole.ADMIN,
      description: "输入题目标准答案",
    },
  },
  {
    path: "/question/add/judge-case",
    name: "判题用例",
    component: QuestionAddJudgeCase,
    meta: {
      requiredRole: UserRole.ADMIN,
      description: "输入题目判题用例",
    },
  },
  {
    path: "/question/add/judge-config",
    name: "判题配置",
    component: QuestionAddJudgeConfig,
    meta: {
      requiredRole: UserRole.ADMIN,
      description: "输入题目判题配置",
    },
  },
];

export default QuestionAddStepRoutes;
