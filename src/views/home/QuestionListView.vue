<template>
  <div id="question-list-view">
    <!-- 搜索框 -->
    <div class="search-bar">
      <a-input-search
        v-model="questionSearchRequest.searchKeyword"
        placeholder="搜索题目、编号或标签"
        enter-button="搜索"
        style="margin-right: 16px; width: 500px"
        @search="handleSearch"
        search-button
      >
        <template #button-icon>
          <icon-search />
        </template>
        <template #button-default> 搜索题目</template>
      </a-input-search>
    </div>
    <!-- 题目列表 -->
    <a-table
      :columns="columns"
      :data="questionList.records"
      page-position="bottom"
      :pagination="{
        current: questionSearchRequest.currentPage,
        pageSize: questionSearchRequest.pageSize,
        total: questionList.total,
        showTotal: true,
      }"
      @pageChange="handlePageChange"
      class="question-table"
    >
      <!-- 题目 -->
      <template #questionLink="{ record }">
        <a-link
          :hoverable="false"
          style="color: rgb(17, 47, 143)"
          @click="toQuestionView(record.questionId)"
        >
          {{ record.questionId + "." + record.questionTitle }}
        </a-link>
      </template>
      <!-- 题目标签 -->
      <template #questionTags="{ record }">
        <a-space wrap>
          <a-tag
            v-for="(tag, index) in record.questionTags"
            :key="index"
            class="question-tag"
            :color="tagColor(tag)"
          >
            {{ tag }}
          </a-tag>
        </a-space>
      </template>
      <!-- 通过率 -->
      <template #passRate="{ record }">
        <a-progress
          :percent="
            calculatePassRate(
              record.questionAcceptedNum,
              record.questionSubmitNum
            )
          "
          width="60"
        />
      </template>
    </a-table>
  </div>
</template>

<script setup>
import { onMounted, reactive, ref } from "vue";
import QuestionControllerApi from "@/api/QuestionControllerApi";
import router from "@/router";

/**
 * 题目列表
 */
const questionList = ref([]);

/**
 * 题目列表请求对象
 */
const questionSearchRequest = reactive({
  // 当前页码
  currentPage: 1,
  // 页面尺寸
  pageSize: 10,
  // 搜索关键字
  searchKeyword: "",
});

/**
 * 获取题目列表
 */
const fetchQuestionList = () => {
  return QuestionControllerApi.questionSearchByPost(questionSearchRequest);
};

/**
 * 页面加载时获取题目列表
 */
onMounted(async () => {
  questionList.value = await QuestionControllerApi.questionListByUserByPost(
    questionSearchRequest
  );
});

/**
 * 展示列
 */
const columns = [
  {
    title: "题目",
    slotName: "questionLink",
    align: "center",
  },
  {
    title: "题目标签",
    slotName: "questionTags",
    align: "center",
  },
  {
    title: "通过数",
    dataIndex: "questionAcceptedNum",
    align: "center",
  },
  {
    title: "提交数",
    dataIndex: "questionSubmitNum",
    align: "center",
  },
  {
    title: "通过率",
    slotName: "passRate",
    align: "center",
  },
];

/**
 * 标签颜色
 */
const tagColor = (tag) => {
  switch (tag) {
    case "入门":
      return "green";
    case "中等":
      return "orange";
    case "困难":
      return "red";
    default:
      return "blue";
  }
};

/**
 * 计算通过率
 */
const calculatePassRate = (acceptedNum, submitNum) => {
  if (!submitNum || submitNum <= 0) {
    return 0;
  }
  // 保留两位小数
  return (acceptedNum / submitNum).toFixed(4);
};

/**
 * todo 结合seach
 * 处理页数变化
 */
const handlePageChange = async (currentPage) => {
  questionSearchRequest.currentPage = currentPage;
  questionList.value = await fetchQuestionList();
};

/**
 * 跳转到题目页面
 */
const toQuestionView = (questionId) => {
  router.push(`/question/${questionId}`);
};

/**
 * 处理搜索
 */
const handleSearch = async () => {
  // 搜索后重置到第一页
  questionSearchRequest.currentPage = 1;
  questionList.value = await fetchQuestionList();
};
</script>

<style lang="scss" scoped>
#question-list-view {
  .search-bar {
    display: flex !important;
    justify-content: center !important; /* 水平居中 */
    align-items: center !important; /* 垂直居中 */
    margin-bottom: 16px;
  }
}
</style>
