<template>
  <div id="question-view">
    <div>
      <a-split style="min-height: 100vh; min-width: 100vh">
        <template #first> 分类标签</template>
        <template #second>
          <div>
            <a-split direction="vertical" :style="{ height: '200px' }">
              <template #first> 做题</template>
              <template #second>
                {{ question }}
              </template>
            </a-split>
          </div>
        </template>
      </a-split>
    </div>
  </div>
</template>

<script setup>
import { onMounted, reactive } from "vue";
import { useRoute } from "vue-router";
import QuestionControllerApi from "@/api/QuestionControllerApi";

const route = useRoute();

/**
 * 题目初始化
 */
const question = reactive({});

/**
 * 页面加载时获取题目
 */
onMounted(async () => {
  const questionId = route.params.questionId;
  const res = await QuestionControllerApi.questionGetByIdByGet(questionId);
  Object.assign(question, res);
});
</script>

<style lang="scss" scoped></style>
