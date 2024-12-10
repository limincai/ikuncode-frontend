<template>
  <div id="question-add-judge-case">
    <a-form :model="questionAddRequest.questionJudgeCase">
      <div
        v-for="(caseItem, index) in questionAddRequest.questionJudgeCase"
        :key="index"
        class="case-item"
      >
        <a-form-item
          :label="'输入用例 ' + (index + 1)"
          class="input-item"
          tooltip="非必填项"
        >
          <a-input
            v-model="caseItem.input"
            placeholder="请输入输入值"
            class="input-field"
            allow-clear
          />
        </a-form-item>
        <a-form-item
          :label="'输出用例 ' + (index + 1)"
          class="output-item"
          tooltip="非必填项"
        >
          <div class="output-row">
            <a-input
              v-model="caseItem.output"
              placeholder="请输入输出值"
              class="output-field"
              allow-clear
            />
            <a-button
              status="danger"
              @click="removeCase(index)"
              class="remove-button"
              type="primary"
              v-if="judgeCaseLength > 1"
            >
              删除
            </a-button>
          </div>
        </a-form-item>
      </div>
    </a-form>
    <div class="add-case-container">
      <a-button type="primary" @click="addCase">添加新用例</a-button>
    </div>
  </div>
</template>

<script lang="js" setup>
import { useQuestionAddRequestStore } from "@/stores/questionAddRequest";
import { computed } from "vue"; // 判题用例对象数组

const questionAddRequest = useQuestionAddRequestStore().questionAddRequest;

/**
 * 判题用例数组长度
 */
const judgeCaseLength = computed(() => {
  return questionAddRequest.questionJudgeCase.length;
});

/**
 * 添加用例
 */
const addCase = () => {
  questionAddRequest.questionJudgeCase.push({ input: "", output: "" });
};

/**
 * 删除用例
 */
const removeCase = (index) => {
  if (questionAddRequest.questionJudgeCase.length === 1) {
    return;
  }
  questionAddRequest.questionJudgeCase.splice(index, 1);
};
</script>

<style lang="scss" scoped>
#question-add-judge-case {
  margin-left: 260px;
  min-height: 25vh;

  .case-item {
    margin-bottom: 20px;
  }

  .input-field {
    width: 250px;
  }

  .output-field {
    width: 250px;
  }

  .output-row {
    display: flex;
    align-items: center;
    gap: 30px; /* 输出框和删除按钮的间距 */
  }

  .add-case-container {
    margin-left: 240px;
  }
}
</style>
