<template>
  <a-result status="404" subtitle="当前页面不存在">
    <template #extra>
      <a-space>
        <a-button type="primary" @click="doPageBack()">返回</a-button>
      </a-space>
    </template>
  </a-result>
</template>

<script setup>
import { useRouter } from "vue-router";

const router = useRouter();
/**
 * 返回上一级页面
 */
const doPageBack = () => {
  router.back();
};
</script>

<style></style>
