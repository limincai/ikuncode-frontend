<template>
  <div id="communication">
    <a-result status="404" subtitle="敬请期待">
      <template #extra>
        <a-space>
          <a-button type="primary" @click="router.back()">返回</a-button>
        </a-space>
      </template>
    </a-result>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";

const router = useRouter();
</script>

<style lang="scss"></style>
