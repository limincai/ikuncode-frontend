<template>
  <div id="user-layout">
    <div class="content">
      <router-view />
    </div>
    <div class="footer">
      <global-footer />
    </div>
  </div>
</template>

<script setup>
import GlobalFooter from "@/components/GlobalFooter.vue";
</script>

<style lang="scss">
#user-layout {
  display: flex;
  flex-direction: column;
  background: #f0f2f5; /* 简洁的浅灰色背景 */

  .content {
    min-height: 80vh;
  }

  .footer {
    text-align: center;
  }
}
</style>
