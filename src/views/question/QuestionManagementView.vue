<template>
  <div id="question-management-view">
    <a-table
      :columns="columns"
      :data="questionList.records"
      page-position="bottom"
      :pagination="{
        defaultCurrent: 1,
        defaultPageSize: questionListRequest.pageSize,
        current: questionList.current,
        size: questionList.pageSize,
        total: questionList.total,
        showTotal: true,
      }"
    >
      <template #optional="{ record }">
        <a-button type="primary" @click="doQuestionUppdate(record)"
          >修改
        </a-button>
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
  {{ questionList }}
</template>

<script setup>
import { onMounted, reactive, ref } from "vue";
import QuestionControllerApi from "@/api/QuestionControllerApi";
import { Message } from "@arco-design/web-vue";

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

const columns = [
  {
    title: "题目编号",
    dataIndex: "questionId",
  },
  {
    title: "题目标题",
    dataIndex: "questionTitle",
  },
  {
    title: "题目描述",
    dataIndex: "questionDescription",
  },
  {
    title: "题目标签",
    dataIndex: "questionTags",
  },
  {
    title: "判题配置",
    dataIndex: "questionJudgeConfig",
  },
  {
    title: "创建时间",
    dataIndex: "createTime",
  },
  {
    title: "删除",
    slotName: "optional",
  },
];

/**
 * 删除题目
 */
const doQuestionDelete = async (questionId) => {
  const res = await QuestionControllerApi.questionDeleteByPost(questionId);
  if (res === undefined) {
    return;
  }
  console.log(res);
  Message.success("题目删除成功");
  // 重新获取题目列表
  questionList.value = await getQuestionList();
};
</script>

<style lang="scss" scoped>
#question-management-view {
}
</style>
