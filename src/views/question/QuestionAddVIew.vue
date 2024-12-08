<template>
  <div id="question-add-view">
    <!--  头部步骤条  -->
    <a-layout-header>
      <div>
        <a-steps :current="current">
          <a-step
            v-for="questionAddStepRoute in QuestionAddStepRoutes"
            :key="questionAddStepRoute.name"
            :description="questionAddStepRoute.meta.description"
            >{{ questionAddStepRoute.name }}
          </a-step>
        </a-steps>
      </div>
    </a-layout-header>
    {{ useQuestionAddConfigStore().questionAddConfig }}
    <a-divider />
    <!--  内容部分  -->
    <a-layout-content class="question-add-view-content">
      <component :is="currentComponent" />
    </a-layout-content>
    <a-divider />
    <!--  底部按钮 -->
    <a-layout-footer class="question-add-view-footer">
      <!-- 上一步按钮 -->
      <a-button
        :type="previousStepBtnType"
        :disabled="previousStepBtnEnabled"
        @click="handlePreviousStep()"
        class="previous-btn"
        >上一步
      </a-button>
      <a-divider direction="vertical" />
      <!-- 下一步按钮 -->
      <a-button
        :type="nextStepBtnType"
        :disabled="!nextStepBtnEnabled"
        @click="handleNextStep"
        class="next-btn"
        >下一步
      </a-button>
      <!-- 提交按钮 -->
      <a-button
        :type="submitBtnType"
        class="submit-btn"
        :disabled="!submitBtnEnabled"
        >提交
      </a-button>
    </a-layout-footer>
  </div>
</template>

<script setup>
import QuestionAddStepRoutes from "@/router/QuestionAddStepRoutes";
import { computed } from "vue";
import { useQuestionAddCurrentStepStore } from "@/stores/questionAddCurrentStep";
import { useQuestionAddConfigStore } from "../../stores/questionAddConfig";

const questionAddCurrentStore = useQuestionAddCurrentStepStore();

// 获取当前步骤对应的组件
const currentComponent = computed(() => {
  return QuestionAddStepRoutes[current.value - 1].component;
});

const current = computed(() => questionAddCurrentStore.current);

/**
 * 上一步按钮种类
 */
const previousStepBtnType = computed(() => {
  return current.value > 1 && current.value <= QuestionAddStepRoutes.length
    ? "primary"
    : "dashed";
});

/**
 * 上一步按钮是否可用
 */
const previousStepBtnEnabled = computed(() => {
  return !(current.value > 1 && current.value <= QuestionAddStepRoutes.length);
});

/**
 * 下一步按钮种类
 */
const nextStepBtnType = computed(() => {
  return current.value < QuestionAddStepRoutes.length ? "primary" : "dashed";
});

/**
 * 下一步按钮是否可用
 */
const nextStepBtnEnabled = computed(() => {
  return current.value < QuestionAddStepRoutes.length;
});

/**
 * 提交按钮是否可用
 */
const submitBtnEnabled = computed(() => {
  return current.value === QuestionAddStepRoutes.length;
});

/**
 * 提交按钮种类
 */
const submitBtnType = computed(() => {
  return current.value === QuestionAddStepRoutes.length ? "primary" : "dashed";
});

/**
 * 点击上一步按钮
 */
const handlePreviousStep = () => {
  if (current.value < 1 || current.value > QuestionAddStepRoutes.length) {
    return;
  }
  questionAddCurrentStore.setCurrentStep(current.value - 1);
};

/**
 * 点击下一步按钮
 */
const handleNextStep = () => {
  if (current.value < 1 || current.value > QuestionAddStepRoutes.length) {
    return;
  }
  questionAddCurrentStore.setCurrentStep(current.value + 1);
};
</script>

<style lang="scss" scoped>
#question-add-view {
  .question-add-view-footer {
    display: flex;
    justify-content: space-between; /* 主轴两端对齐 */
    align-items: center; /* 垂直居中 */

    /* 上一步按钮 */
    .previous-btn {
      margin-left: 40%; /* 偏向中间 */
    }

    /* 下一步按钮 */
    .next-btn {
      margin-right: 40%; /* 偏向中间 */
    }

    /* 提交按钮 */
    .submit-btn {
      margin-left: auto; /* 靠最右边 */
    }
  }
}
</style>
