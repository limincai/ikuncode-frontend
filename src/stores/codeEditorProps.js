import { defineStore } from "pinia";
import { reactive } from "vue";
import CodeLanguage from "@/constant/CodeLanguage";
import CodeEditorTheme from "@/constant/CodeEditorTheme";

export const useCodeEditorPropsStore = defineStore("codeEditorProps", () => {
  // 代码编辑器的配置属性
  const codeEditorProps = reactive({
    value:
      "public class Solution {\n" +
      "    public void main(String[] args) {\n" +
      "        // please code your code\n" +
      "    }\n" +
      "}",
    language: CodeLanguage.JAVA,
    theme: CodeEditorTheme.VS,
    fontSize: 14,
    enableMinimap: false,
    handleChange: (v) => {
      codeEditorProps.value = v;
      console.log(codeEditorProps.value);
    },
  });

  return {
    codeEditorProps,
  };
});
