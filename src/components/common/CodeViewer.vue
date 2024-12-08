<template>
  <div id="code-editor" ref="codeEditorRef" style="min-height: 400px"></div>
  <!--  <a-button @click="fillValue"></a-button>-->
</template>
<script setup>
import * as monaco from "monaco-editor";
import { onMounted, ref } from "vue";
import CodeEditorTheme from "@/constant/CodeEditorTheme";

const codeEditorRef = ref();
const codeEditor = ref();
onMounted(() => {
  if (!codeEditorRef.value) {
    return;
  }
  // Hover on each property to see its docs!
  codeEditor.value = monaco.editor.create(codeEditorRef.value, {
    value:
      "public class Soultion {\n" +
      "    public void main(String[] args) {\n" +
      "        System.out.println(123);\n" +
      "    }\n" +
      "}",
    language: "java",
    automaticLayout: true,
    minimap: {
      enabled: true,
      size: "proportional",
      showSlider: "always",
      scale: 2,
    },
    cursorBlinking: "Solid", // 光标动画样式
    roundedSelection: true,
    scrollBeyondLastLine: true,
    readOnly: true,
    theme: CodeEditorTheme.VS_DARK,
    folding: true, // 是否启用代码折叠
    links: true, // 是否点击链接
    renderLineHighlight: "gutter", // 当前行突出显示方式
    acceptSuggestionOnCommitCharacter: true, // 接受关于提交字符的建议
    acceptSuggestionOnEnter: "on", // 接受输入建议 "on" | "off" | "smart"
    snippetSuggestions: "top",
    autoSurround: "quotes", // 是否应自动环绕选择
    fontSize: 14, // 设置代码大小
  });
});
</script>

<style scoped></style>
