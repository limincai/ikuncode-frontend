import { defineStore } from "pinia";
import { reactive } from "vue";

export const useQuestionAddConfigStore = defineStore(
  "questionAddConfig",
  () => {
    // 初始化添加题目配置
    const questionAddConfig = reactive({
      questionTitle: "",
      questionContent: "",
      questionTags: [],
      questionAnswer: "",
      questionJudgeCase: [
        {
          input: "",
          output: "",
        },
      ],
      questionJudgeConfig: [
        {
          timeLimit: 0,
          memoryLimit: 0,
        },
      ],
    });

    // 删除 store 中的题目配置
    const clearQuestionAddConfig = () => {
      this.questionAddConfig = reactive({
        questionTitle: "",
        questionContent: "",
        questionTags: [],
        questionAnswer: "",
        questionJudgeCase: [
          {
            input: "",
            output: "",
          },
        ],
        questionJudgeConfig: [
          {
            timeLimit: 0,
            memoryLimit: 0,
          },
        ],
      });
    };
    return {
      questionAddConfig,
      clearQuestionAddConfig,
    };
  },
  {
    persist: {
      enabled: true, // 开启持久化
      strategies: [
        {
          key: "question-add-config",
          storage: localStorage,
        },
      ],
    },
  }
);
