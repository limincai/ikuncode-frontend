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
import GlobalFooter from "@/components/common/GlobalFooter.vue";
</script>

<style lang="scss">
#user-layout {
  display: flex;
  flex-direction: column;
  background: #f0f2f5;

  .content {
    flex: 1;
    min-height: 80vh;
    margin-bottom: 10px;
  }

  .footer {
    text-align: center;
  }
}
</style>
