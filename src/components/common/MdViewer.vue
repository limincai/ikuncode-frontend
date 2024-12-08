<template>
  <div id="md-viewer">
    <MdViewer :value="props.value" />
  </div>
  <Viewer />
</template>

<script setup>
import { Viewer } from "@bytemd/vue-next";

/**
 * 定义组件属性类型
 */
const props = defineProps({
  value: {
    type: String,
    default: "",
  },
});
</script>

<style lang="scss"></style>
