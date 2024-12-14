<template>
  <div id="question-submit-view">
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
    >
      <!-- 题目 -->
      <template #questionLink="{ record }">
        <a-link
          :hoverable="false"
          style="color: rgb(17, 47, 143)"
          @click="toQuestionView(record.questionVO.questionId)"
        >
          {{
            record.questionVO.questionId + "." + record.questionVO.questionTitle
          }}
        </a-link>
      </template>
      <!-- 用户 -->
      <template #userLink="{ record }">
        <a-link
          :hoverable="false"
          style="color: rgb(17, 47, 143)"
          @click="toUserHomeView(record.userVO.userId)"
        >
          {{ record.userVO.userNickname }}
        </a-link>
      </template>
      <!-- 题目状态 -->
      <template #status="{ record }">
        <a-tag :color="statusColor(record.status)">
          {{ statusText(record.status) }}
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
import { QuestionSubmitStatus } from "@/constant/QuestionStatus";
import { useRouter } from "vue-router";
import { useGlobalHeaderSelectedKey } from "@/stores/globalHeaderSelectedKey";

const router = useRouter();

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
});

/**
 * 计算状态文本
 */
const statusText = (status) => {
  switch (status) {
    case QuestionSubmitStatus.WAITING:
      return "等待中";
    case QuestionSubmitStatus.RUNNING:
      return "运行中";
    case QuestionSubmitStatus.SUCCEED:
      return "成功";
    case QuestionSubmitStatus.FAILED:
      return "失败";
    default:
      return "未知状态";
  }
};

/**
 * 计算标签颜色
 */
const statusColor = (status) => {
  switch (status) {
    case QuestionSubmitStatus.WAITING:
      return "gray"; // 等待中 蓝色
    case QuestionSubmitStatus.RUNNING:
      return "blue"; // 运行中 黄色
    case QuestionSubmitStatus.SUCCEED:
      return "green"; // 成功 绿色
    case QuestionSubmitStatus.FAILED:
      return "red"; // 失败 红色
    default:
      return "gray"; // 未知状态 灰色
  }
};

/**
 * 获取题目提交列表
 */
const getQuestionSubmitList = () => {
  return QuestionSubmitControllerApi.questionSubmitListByPost(
    questionSubmitListRequest
  );
};

/**
 * 页面加载时获取题目提交列表
 */
onMounted(async () => {
  questionSubmitList.value = await getQuestionSubmitList();
});

/**
 * 展示列
 */
const columns = [
  {
    title: "提交编号",
    dataIndex: "questionSubmitId",
    align: "center",
  },
  {
    title: "题目",
    slotName: "questionLink",
    align: "center",
  },
  {
    title: "用户",
    slotName: "userLink",
    align: "center",
  },
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
  questionSubmitList.value = await getQuestionSubmitList();
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
#question-submit-view {
}
</style>
