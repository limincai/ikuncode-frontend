<template>
  <div id="question-add-basic-info">
    <!-- 基本信息表单 -->
    <a-form :model="questionAddRequest" label-col="8" wrapper-col="16">
      <!-- 题目标题 -->
      <a-form-item
        field="questionTitle"
        label="题目标题"
        :rules="[{ required: true, message: '题目标题是必填项' }]"
      >
        <a-input
          v-model="questionAddRequest.questionTitle"
          placeholder="请输入题目标题"
          class="input-field"
          allow-clear
        />
      </a-form-item>
      <!-- 题目标签 -->
      <a-form-item class="tags-input" field="questionTags" label="题目标签">
        <a-input-tag
          v-model="questionAddRequest.questionTags"
          class="input-field"
          placeholder="输入后按回车添加一个标签"
          allow-clear
        />
      </a-form-item>
    </a-form>
  </div>
</template>

<script setup>
import { useQuestionAddRequestStore } from "@/stores/questionAddRequest";

const questionAddRequest = useQuestionAddRequestStore().questionAddRequest;
</script>

<style lang="scss" scoped>
#question-add-basic-info {
  margin-left: 150px;
  min-height: 25vh;

  .input-field {
    width: 60%;
  }
}
</style>
