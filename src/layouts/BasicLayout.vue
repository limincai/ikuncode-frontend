<template>
  <div id="basic-layout">
    <!-- 头部导航栏 -->
    <a-layout-header class="header">
      <GlobalHeader />
    </a-layout-header>
    <!-- 内容 -->
    <a-layout-content class="content">
      <router-view />
    </a-layout-content>
    <!-- 页脚 -->
    <a-layout-footer class="footer">
      <GlobalFooter />
    </a-layout-footer>
  </div>
</template>

<script lang="js" setup>
import GlobalHeader from "@/components/GlobalHeader.vue";
import GlobalFooter from "@/components/GlobalFooter.vue";
</script>

<style lang="scss">
#basic-layout {
  display: flex;
  flex-direction: column;
  margin: 0;

  .header {
    box-shadow: #eee 3px 3px 3px;
    margin-bottom: 18px;
  }

  .content {
    min-height: 80vh;
  }

  .footer {
    text-align: center;
  }
}
</style>
