<template>
  <div id="question-add-basic-info">
    <!-- 用户注册表单 -->
    <a-form :model="form" label-col="8" wrapper-col="16">
      <!-- 题目标题 -->
      <a-form-item
        field="questionTitle"
        label="题目标题"
        :rules="[{ required: true, message: '题目标题是必填项' }]"
      >
        <a-input
          v-model="questionAddConfig.questionTitle"
          placeholder="请输入题目标题"
          class="input-field"
        />
      </a-form-item>
      <!-- 题目标签 -->
      <a-form-item field="questionTags" label="题目标签">
        <a-input
          v-model="questionAddConfig.questionTags"
          placeholder="请输入标签，按回车添加一个标签"
          class="input-field"
        />
      </a-form-item>
    </a-form>
  </div>
</template>

<script setup>
// 登录表单模型
import { computed } from "vue";
import { useQuestionAddConfigStore } from "@/stores/questionAddConfig";

const questionAddConfig = useQuestionAddConfigStore().questionAddConfig;

const form = computed(() => {
  return {
    questionTitle: questionAddConfig.questionTitle,
    questionTags: questionAddConfig.questionTags,
  };
});
</script>

<style lang="scss" scoped>
#user-register {
  display: flex;
  justify-content: center;
  align-items: center;

  /* 登录框样式 */
  .register-card {
    width: 440px;
    padding: 20px;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
    border-radius: 12px;
  }

  .register-header {
    text-align: center;
    margin-bottom: 20px;
  }

  .logo {
    width: 80px;
    margin-bottom: 10px;
    cursor: pointer;
  }

  .register-title {
    color: #4a00e0; /* 深紫色 */
    font-size: 24px;
    font-weight: bold;
  }

  /* 输入框样式 */
  .input-field {
    border-radius: 10px;
  }

  .input-field:focus {
    border-color: #4a00e0; /* 聚焦时的边框色 */
  }

  /* 登录按钮样式 */
  .register-btn {
    border-radius: 10px;
    background-color: #4a00e0; /* 按钮背景色 */
    color: #fff;
  }

  /* 发送验证码按钮样式 */
  .send-captcha-btn {
    border-radius: 10px;
    background-color: #4a00e0; /* 按钮背景色 */
    color: #fff;
    margin-left: 20vh;
  }

  .register-btn:hover {
    background-color: #8e2de2; /* 按钮悬停色 */
  }
}
</style>
