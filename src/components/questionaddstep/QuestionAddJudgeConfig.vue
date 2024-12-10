<template>
  <div id="question-add-basic-info">
    <!-- 判题配置表单 -->
    <a-form
      :model="questionAddRequest.questionJudgeConfig"
      label-col="8"
      wrapper-col="16"
    >
      <!-- 时间限制 -->
      <a-form-item
        field="questionTitle"
        label="时间限制"
        tooltip="请输入时间限制（非必填项），单位为 ms"
      >
        <a-input-number
          v-model="questionAddRequest.questionJudgeConfig.timeLimit"
          placeholder="请输入时间限制（非必填项），单位为 ms"
          class="input-field"
          :min="0"
          allow-clear
        />
      </a-form-item>
      <!-- 内存限制 -->
      <a-form-item
        field="questionTitle"
        label="内存限制"
        tooltip="请输入内存限制（非必填项），单位为 kb"
      >
        <a-input-number
          v-model="questionAddRequest.questionJudgeConfig.memoryLimit"
          placeholder="请输入内存限制（非必填项），单位为 kb"
          class="input-field"
          :min="0"
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
