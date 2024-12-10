<template>
  <div id="question-add-description">
    <MdEditor
      :value="questionAddRequest.questionDescription"
      :handleChange="handleChange"
      style="min-width: 80vh"
      placeholder="请输入题目描述（必填项），支持 markdown 语法"
    />
  </div>
</template>

<script lang="js" setup>
import { useQuestionAddRequestStore } from "@/stores/questionAddRequest";
import MdEditor from "@/components/common/MdEditor.vue";

const questionAddRequest = useQuestionAddRequestStore().questionAddRequest;

/**
 * md 编辑器变化触发方法
 */
const handleChange = (v) => {
  questionAddRequest.questionDescription = v;
};
</script>

<style lang="scss" scoped></style>
