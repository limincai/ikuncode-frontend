<template>
  <div id="user-question-submit-view">
    <!-- 题目列表 -->
    <a-table
      :columns="columns"
      :data="questionSubmitList.records"
      page-position="bottom"
      :pagination="{
        current: questionSubmitListRequest.currentPage,
        pageSize: questionSubmitListRequest.pageSize,
        total: questionSubmitList.total,
        showTotal: true,
      }"
      @pageChange="handlePageChange"
      style="height: 78vh"
    >
      <!-- 判题状态 -->
      <template #status="{ record }">
        <a-tag
          :color="QuestionSubmitStatusMap[record.status].color"
          v-if="record.status === 0 || record.status === 1"
        >
          <a-spin v-if="record.status === 0 || record.status === 1" />
          {{ QuestionSubmitStatusMap[record.status].text }}
        </a-tag>
        <a-tag :color="judgeMessageColor(record.questionJudgeInfo.message)">
          {{ record.questionJudgeInfo.message }}
        </a-tag>
      </template>
      <!-- 消耗内存 -->
      <template #memory="{ record }">
        {{ record.questionJudgeInfo?.memory || 0 + "kb" }}
      </template>
      <!-- 耗时 -->
      <template #time="{ record }">
        {{ record.questionJudgeInfo?.time || 0 + "ms" }}
      </template>
    </a-table>
  </div>
</template>

<script setup>
import { onMounted, reactive, ref } from "vue";
import QuestionSubmitControllerApi from "@/api/QuestionSubmitControllerApi";
import { useRoute, useRouter } from "vue-router";
import { useGlobalHeaderSelectedKey } from "@/stores/globalHeaderSelectedKey";
import QuestionSubmitStatusMap from "@/constant/QuestionSubmitStatusMap";
import { useLoginUserStore } from "@/stores/loginUser";

const router = useRouter();

const route = useRoute();

/**
 * 题目提交列表
 */
const questionSubmitList = ref({
  records: [
    {
      userVO: {
        userId: "",
        userNickname: "",
      },
      questionVO: {
        questionId: "",
        questionTitle: "",
      },
      status: "",
      questionJudgeInfo: {
        time: "",
        memory: "",
        message: "",
      },
    },
  ],
  total: 0,
});

/**
 * 题目列表请求对象
 */
const questionSubmitListRequest = reactive({
  // 当前页码
  currentPage: 1,
  // 页面尺寸
  pageSize: 10,
  // 用户 id
  userId: useLoginUserStore().loginUser.userId,
  // 题目 id
  questionId: route.params.questionId,
});

/**
 * 获取题目提交列表
 */
const getUserQuestionSubmitList = () => {
  return QuestionSubmitControllerApi.questionSubmitListByUserIdByQuestionIdByPost(
    questionSubmitListRequest
  );
};

/**
 * 页面加载时获取题目提交列表
 */
onMounted(async () => {
  questionSubmitList.value = await getUserQuestionSubmitList();
});

/**
 * 判题信息标签颜色
 */
const judgeMessageColor = (message) => {
  switch (message) {
    case "成功":
      return "green"; // ACCEPTED
    case "答案错误":
      return "red"; // WRONG_ANSWER
    case "编译错误":
      return "orange"; // COMPILE_WRONG
    case "内存溢出":
      return "purple"; // MEMORY_LIMIT_EXCEEDED
    case "超时":
      return "blue"; // TIME_LIMIT_EXCEEDED
    case "输出溢出":
      return "yellow"; // OUTPUT_LIMIT_EXCEEDED
    case "运行错误":
      return "red"; // RUNTIME_ERROR
    case "系统错误":
      return "gray"; // SYSTEM_ERROR
    case "等待中":
      return "default"; // WAITING
    default:
      return "default"; // 默认颜色
  }
};

/**
 * 展示列
 */
const columns = [
  {
    title: "状态",
    slotName: "status",
    align: "center",
  },
  {
    title: "消耗内存",
    slotName: "memory",
    align: "center",
  },
  {
    title: "耗时",
    slotName: "time",
    align: "center",
  },
  {
    title: "语言",
    dataIndex: "language",
    align: "center",
  },
  {
    title: "提交时间",
    dataIndex: "createTime",
    align: "center",
  },
];

/**
 * 处理页数变化
 */
const handlePageChange = async (currentPage) => {
  questionSubmitListRequest.currentPage = currentPage;
  questionSubmitList.value = await getUserQuestionSubmitList();
};

/**
 * 跳转到题目页面
 */
const toQuestionView = (questionId) => {
  useGlobalHeaderSelectedKey().setSelectedKey("/questions");
  router.push(`/question/${questionId}`);
};

/**
 * 跳转到用户首页
 */
const toUserHomeView = (userId) => {
  router.push(`/user/${userId}`);
};
</script>

<style lang="scss" scoped>
#user-question-submit-view {
}
</style>
