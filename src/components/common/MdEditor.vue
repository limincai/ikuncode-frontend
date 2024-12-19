<template>
  <div id="md-editor">
    <Editor
      :value="props.value"
      :plugins="plugins"
      :locale="zhHans"
      @change="props.handleChange"
      :placeholder="props.placeholder"
      :uploadImages="props.uploadImage"
    />
  </div>
</template>

<script setup>
// 插件
import gfm from "@bytemd/plugin-gfm";
import breaks from "@bytemd/plugin-breaks";
import mediumZoom from "@bytemd/plugin-medium-zoom";
import highlight from "@bytemd/plugin-highlight";
import mathssr from "@bytemd/plugin-math-ssr";
import math from "@bytemd/plugin-math";
import highlightssr from "@bytemd/plugin-highlight-ssr";
import gemoji from "@bytemd/plugin-gemoji";
import frontmatter from "@bytemd/plugin-frontmatter";
import mermaid from "@bytemd/plugin-mermaid";
// 代码高亮 css样式
import "highlight.js/styles/default.css";
import "katex/dist/katex.css";
import { Editor } from "@bytemd/vue-next";
// 中文汉化
import zhHans from "bytemd/locales/zh_Hans.json";

/**
 * markdown 编辑器插件
 */
const plugins = [
  // 支持 GFM（自动链接文字、删除线、表格、任务列表）
  gfm(),
  // 支持缩放图片
  mediumZoom(),
  // 支持 Gemoji 短代码
  gemoji(),
  // 支持代码高亮
  highlight(),
  highlightssr(),
  // 支持数学公式
  math(),
  mathssr(),
  breaks(),
  frontmatter(),
  mermaid(),
];

/**
 * 定义组件属性类型
 */
const props = defineProps({
  value: {
    type: String,
    default: "",
  },
  handleChange: {
    type: Function,
  },
  placeholder: {
    type: String,
  },
  uploadImage: {
    type: Function,
  },
});
</script>

<style lang="scss">
/*隐藏 github 图标*/
.bytemd-toolbar-icon.bytemd-tippy.bytemd-tippy-right:last-child {
  display: none;
}
</style>
