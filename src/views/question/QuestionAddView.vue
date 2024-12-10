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
        @click="handleSubmit()"
        >提交
      </a-button>
    </a-layout-footer>
  </div>
</template>

<script setup>
import QuestionAddStepRoutes from "@/router/QuestionAddStepRoutes";
import { computed } from "vue";
import { useQuestionAddCurrentStepStore } from "@/stores/questionAddCurrentStep";
import { useQuestionAddRequestStore } from "@/stores/questionAddRequest";
import QuestionControllerApi from "@/api/QuestionControllerApi";
import { useRouter } from "vue-router";
import { Message } from "@arco-design/web-vue";

const questionAddCurrentStore = useQuestionAddCurrentStepStore();

const questionAddRequest = useQuestionAddRequestStore().questionAddRequest;

const router = useRouter();

// 获取当前步骤对应的组件
const currentComponent = computed(() => {
  return QuestionAddStepRoutes[current.value - 1].component;
});

/**
 * 当前题目添加步骤
 */
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
  const questionTitle = questionAddRequest.questionTitle;
  // 题目标题不能为空
  if (questionTitle === "") {
    return false;
  }
  // 题目描述不能为空
  const questionDescription = questionAddRequest.questionDescription;
  if (questionDescription === "") {
    return false;
  }
  return current.value === QuestionAddStepRoutes.length;
});

/**
 * 提交按钮种类
 */
const submitBtnType = computed(() => {
  return submitBtnEnabled.value ? "primary" : "dashed";
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

/**
 * 点击提交按钮
 */
const handleSubmit = async () => {
  // 过滤出不合法的判题用例
  // 处理逻辑
  questionAddRequest.questionJudgeCase =
    questionAddRequest.questionJudgeCase.reduce((result, item) => {
      // 如果 input 和 output 的状态不匹配，统一设置为空字符串
      if (
        (item.input === "" && item.output !== "") ||
        (item.input !== "" && item.output === "")
      ) {
        item.input = "";
        item.output = "";
      }

      // 判断是否是空的用例
      const isEmptyCase = item.input === "" && item.output === "";

      // 保留第一个空的用例，其他空的用例过滤掉
      if (isEmptyCase) {
        if (
          result.some(
            (caseItem) => caseItem.input === "" && caseItem.output === ""
          )
        ) {
          return result;
        }
      }
      // 添加符合条件的用例到结果数组
      result.push(item);
      return result;
    }, []);

  const res = await QuestionControllerApi.questionAddByPost(questionAddRequest);
  if (res === undefined) {
    return;
  }
  Message.success("题目添加成功");
  // 清空题目添加请求对象
  useQuestionAddRequestStore().clearQuestionAddRequest();
  // 当前题目添加步骤设置为 1
  useQuestionAddCurrentStepStore().current = 1;
  // 跳转回添加题目页面
  await router.replace("/question/add");
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
