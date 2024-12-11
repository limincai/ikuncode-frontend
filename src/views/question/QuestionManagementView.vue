<template>
  <div id="question-management-view">
    <!-- 题目列表 -->
    <a-table
      :columns="columns"
      :data="questionList.records"
      page-position="bottom"
      :pagination="{
        current: questionListRequest.currentPage,
        pageSize: questionListRequest.pageSize,
        total: questionList.total,
        showTotal: true,
      }"
      @pageChange="handlePageChange"
    >
      <!-- 题目标签 -->
      <template #questionTags="{ record }">
        <a-tag v-for="(tag, index) in record.questionTags" :key="index">
          {{ tag }}
        </a-tag>
      </template>
      <!-- 创建时间 -->
      <template #createTime="{ record }">
        {{ formatDate(record.createTime) }}
      </template>
      <!-- 操作 -->
      <template #optional="{ record }">
        <!-- 修改 -->
        <a-button type="primary" @click="toQuestionUpdateView(record)"
          >修改
        </a-button>
        <a-divider direction="vertical" />
        <!-- 删除 -->
        <a-popconfirm
          content="确定要删除这条题目吗？"
          ok-text="确认"
          cancel-text="取消"
          @ok="doQuestionDelete(record.questionId)"
          type="error"
        >
          <a-button type="primary" status="danger">删除</a-button>
        </a-popconfirm>
      </template>
    </a-table>
  </div>
</template>

<script setup>
import { onMounted, reactive, ref } from "vue";
import QuestionControllerApi from "@/api/QuestionControllerApi";
import { Message } from "@arco-design/web-vue";
import dayjs from "dayjs";
import router from "@/router";

/**
 * 题目列表
 */
const questionList = ref([]);

/**
 * 题目列表请求对象
 */
const questionListRequest = reactive({
  // 当前页码
  currentPage: 1,
  // 页面尺寸
  pageSize: 10,
});

/**
 * 获取题目列表
 */
const getQuestionList = () => {
  return QuestionControllerApi.questionListByAdminByPost(questionListRequest);
};

/**
 * 页面加载时获取题目列表
 */
onMounted(async () => {
  questionList.value = await getQuestionList();
});

/**
 * 展示列
 */
const columns = [
  {
    title: "题目编号",
    dataIndex: "questionId",
    align: "center",
  },
  {
    title: "题目标题",
    dataIndex: "questionTitle",
    align: "center",
  },
  {
    title: "题目描述",
    dataIndex: "questionDescription",
    align: "center",
  },
  {
    title: "题目标签",
    slotName: "questionTags",
    align: "center",
  },
  {
    title: "创建时间",
    slotName: "createTime",
    align: "center",
  },
  {
    title: "操作",
    slotName: "optional",
    align: "center",
  },
];

/**
 * 格式化日期
 */
const formatDate = (date) => {
  return dayjs(date).format("YYYY-MM-DD HH:mm:ss");
};

/**
 * 处理页数变化
 */
const handlePageChange = async (currentPage) => {
  questionListRequest.currentPage = currentPage;
  questionList.value = await getQuestionList();
};

/**
 * 删除题目
 */
const doQuestionDelete = async (questionId) => {
  const res = await QuestionControllerApi.questionDeleteByPost(questionId);
  if (!res) {
    return;
  }
  Message.success("题目删除成功");
  // 重新获取题目列表
  questionList.value = await getQuestionList();
};

// 跳转动题目更新页面
const toQuestionUpdateView = (record) => {
  router.push({
    path: "/question/update",
    query: {
      questionId: record.questionId,
    },
  });
};
</script>

<style lang="scss" scoped></style>
