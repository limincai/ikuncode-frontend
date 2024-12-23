import { defineStore } from "pinia";
import { ref } from "vue";

export const useQuestionAddCurrentStepStore = defineStore(
  "questionAddCurrentStep",
  () => {
    // 当前步骤，默认是1
    const current = ref(1);

    // 设置步骤
    const setCurrentStep = (step) => {
      current.value = step;
    };

    // 获取当前步骤
    const getCurrentStep = () => {
      return current.value;
    };

    return {
      current,
      setCurrentStep,
      getCurrentStep,
    };
  },
  {
    persist: {
      enabled: true, // 开启持久化
      strategies: [
        {
          key: "home-add-current-step",
          storage: localStorage,
        },
      ],
    },
  }
);
