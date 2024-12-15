<template>
  <div
    id="code-editor"
    ref="codeEditorRef"
    :style="{
      minHeight: props.codeEditorHeight + 'vh',
      minWidth: props.codeEditorWeight + 'vh',
    }"
  ></div>
</template>

<script setup>
import * as monaco from "monaco-editor";
import { onMounted, ref, toRaw, watch } from "vue";
import CodeEditorTheme from "@/constant/CodeEditorTheme";
import CodeLanguage from "@/constant/CodeLanguage";

/**
 * 定义组件属性类型
 */
const props = defineProps({
  value: {
    type: String,
    default:
      "public class Solution {\n" +
      "    public void main(String[] args) {\n" +
      "        // please code your code\n" +
      "    }\n" +
      "}",
  },
  language: {
    type: String,
    default: CodeLanguage.JAVA,
  },
  enableMinimap: {
    type: Boolean,
    default: false,
  },
  fontSize: {
    type: Number,
    default: 12,
  },
  theme: {
    type: String,
    default: CodeEditorTheme.VS,
  },
  handleChange: {
    type: Function,
  },
  codeEditorHeight: {
    type: Number,
    default: 100,
  },
  codeEditorWeight: {
    type: Number,
    default: 100,
  },
});

/**
 * 代码编辑器 ref
 */
const codeEditorRef = ref();

/**
 * 代码编辑器实例
 */
const codeEditor = ref();

/**
 * 初始化代码编辑器
 */
const initializeEditor = () => {
  if (!codeEditorRef.value) return;

  // 创建 Monaco Editor 实例
  codeEditor.value = monaco.editor.create(codeEditorRef.value, {
    value: props.value, // 初始化内容
    language: props.language, // 编程语言
    fontSize: props.fontSize, // 字体大小
    theme: props.theme, // 主题
    minimap: {
      enabled: props.enableMinimap, // 是否启用小地图
      scale: 100,
    },
    automaticLayout: true, // 自动布局
    autoSurround: "languageDefined", // 是否应自动环绕选择
    acceptSuggestionOnCommitCharacter: true, // 接受关于提交字符的建议
    acceptSuggestionOnEnter: "on", // 接受输入建议 "on" | "off" | "smart"
    accessibilityPageSize: 10, // 辅助功能页面大小 Number 说明：控制编辑器中可由屏幕阅读器读出的行数。警告：这对大于默认值的数字具有性能含义。
    accessibilitySupport: "on", // 辅助功能支持 控制编辑器是否应在为屏幕阅读器优化的模式下运行。
    autoClosingBrackets: "always", // 是否自动添加结束括号(包括中括号) "always" | "languageDefined" | "beforeWhitespace" | "never"
    autoClosingDelete: "always", // 是否自动删除结束括号(包括中括号) "always" | "never" | "auto"
    autoClosingOvertype: "always", // 是否关闭改写 即使用insert模式时是覆盖后面的文字还是不覆盖后面的文字 "always" | "never" | "auto"
    autoClosingQuotes: "always", // 是否自动添加结束的单引号 双引号 "always" | "languageDefined" | "beforeWhitespace" | "never"
    autoIndent: "None", // 控制编辑器在用户键入、粘贴、移动或缩进行时是否应自动调整缩进
    codeLens: true, // 是否显示codeLens 通过 CodeLens，你可以在专注于工作的同时了解代码所发生的情况 – 而无需离开编辑器。 可以查找代码引用、代码更改、关联的 Bug、工作项、代码评审和单元测试。
    colorDecorators: true, // 呈现内联色彩装饰器和颜色选择器
    comments: {
      ignoreEmptyLines: true, // 插入行注释时忽略空行。默认为真。
      insertSpace: true, // 在行注释标记之后和块注释标记内插入一个空格。默认为真。
    }, // 注释配置
    contextmenu: true, // 启用上下文菜单
    columnSelection: false, // 启用列编辑 按下shift键位然后按↑↓键位可以实现列选择 然后实现列编辑
    cursorBlinking: "solid", // 光标动画样式
    cursorStyle: "UnderlineThin", // "Block"|"BlockOutline"|"Line"|"LineThin"|"Underline"|"UnderlineThin" 光标样式
    cursorSurroundingLines: 0, // 光标环绕行数 当文字输入超过屏幕时 可以看见右侧滚动条中光标所处位置是在滚动条中间还是顶部还是底部 即光标环绕行数 环绕行数越大 光标在滚动条中位置越居中
    cursorSurroundingLinesStyle: "all", // "default" | "all" 光标环绕样式
    cursorWidth: 2, // <=25 光标宽度
    folding: true, // 是否启用代码折叠
    links: true, // 是否点击链接
    overviewRulerBorder: false, // 是否应围绕概览标尺绘制边框
    renderLineHighlight: "gutter", // 当前行突出显示方式
    readOnly: false, // 是否只读
    roundedSelection: true,
    snippetSuggestions: "top",
  });

  // 监听内容变化
  codeEditor.value.onDidChangeModelContent(() => {
    props.handleChange?.(toRaw(codeEditor.value).getValue());
  });
};

/**
 * 更新编辑器配置
 */
const updateEditorOptions = (key, value) => {
  if (codeEditor.value) {
    const options = {};
    options[key] = value;
    codeEditor.value.updateOptions(options);
  }
};

/**
 * 生命周期：挂载时初始化编辑器
 */
onMounted(() => {
  initializeEditor();
});

/**
 * 监听 props 的变化并更新编辑器配置
 */
watch(
  () => props.fontSize,
  (newFontSize) => updateEditorOptions("fontSize", newFontSize)
);

watch(
  () => props.theme,
  (newTheme) => monaco.editor.setTheme(newTheme)
);

watch(
  () => props.enableMinimap,
  (newMinimap) =>
    updateEditorOptions("minimap", {
      enabled: newMinimap,
    })
);

watch(
  () => props.language,
  (newLanguage) => {
    const model = codeEditor.value.getModel();
    if (model) {
      monaco.editor.setModelLanguage(model, newLanguage);
    }
  }
);
</script>

<style scoped></style>
