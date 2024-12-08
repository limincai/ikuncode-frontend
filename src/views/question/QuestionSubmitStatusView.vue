<template>
  <div id="question-submit-status">
    <CodeEditor
      :value="codeEditorProps.value"
      :language="codeEditorProps.language"
      :handleChange="codeEditorProps.handleChange"
      :theme="codeEditorProps.theme"
      :font-size="codeEditorProps.fontSize"
      :enableMinimap="codeEditorProps.enableMinimap"
    />
  </div>
</template>
<script setup>
import { reactive } from "vue";
import CodeEditor from "@/components/common/CodeEditor.vue";
import CodeLanguage from "@/constant/CodeLanguage";
import CodeEditorTheme from "@/constant/CodeEditorTheme";

/**
 * 代码编辑器属性
 */
const codeEditorProps = reactive({
  // 代码编辑器值
  value:
    "public class Solution {\n" +
    "    public void main(String[] args) {\n" +
    "        // please code your code\n" +
    "    }\n" +
    "}",
  // 代码语言
  language: CodeLanguage.JAVA,
  // 代码主题
  theme: CodeEditorTheme.VS,
  // 字体大小
  fontSize: 12,
  // 是否启用小地图
  enableMinimap: false,
  // 编辑器改变值
  handleChange: (v) => {
    codeEditorProps.value = v;
    console.log(codeEditorProps.value);
  },
});
</script>

<style scoped lang="scss"></style>
