<template>
  <div id="question-add-answer">
    <a-textarea
      placeholder="请输入题目答案（非必填项"
      v-model="questionAddRequest.questionAnswer"
      allow-clear
      :auto-size="{ minRows: 5 }"
    />
  </div>
</template>

<script lang="js" setup>
import { useQuestionAddRequestStore } from "@/stores/questionAddRequest";

const questionAddRequest = useQuestionAddRequestStore().questionAddRequest;
</script>

<style lang="scss" scoped></style>
