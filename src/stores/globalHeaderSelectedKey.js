import { defineStore } from "pinia";
import { ref } from "vue";

export const useGlobalHeaderSelectedKey = defineStore(
  "globalHeaderSelectedKey",
  () => {
    // 当前选择的key，默认是 /
    const selectedKey = ref("/");

    // 设置步骤
    const setSelectedKey = (value) => {
      selectedKey.value = value;
    };

    // 获取当前步骤
    const getSelectedKey = () => {
      return selectedKey.value;
    };

    return {
      selectedKey,
      setSelectedKey,
      getSelectedKey,
    };
  },
  {
    persist: {
      enabled: true, // 开启持久化
      strategies: [
        {
          key: "global-header-selected-key",
          storage: localStorage,
        },
      ],
    },
  }
);
