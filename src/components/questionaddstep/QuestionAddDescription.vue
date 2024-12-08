<template>
  <div id="question-add-description">
    <MdEditor
      :value="value"
      :handleChange="handleChange"
      style="min-width: 80vh"
    />
  </div>
</template>

<script lang="js" setup>
import MdEditor from "@/components/common/MdEditor.vue";
import { ref } from "vue";

/**
 * md 编辑器内容
 */
const value = ref("");

/**
 * md 编辑器变化触发方法
 */
const handleChange = (v) => {
  value.value = v;
};
</script>

<style lang="scss" scoped></style>
