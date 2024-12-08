<template>
  <div id="basic-layout">
    <!-- 头部导航栏 -->
    <a-layout-header class="header">
      <GlobalHeader />
    </a-layout-header>
    <!-- 内容 -->
    <a-layout-content class="content-wrapper">
      <div class="content-container">
        <router-view />
      </div>
    </a-layout-content>
    <!-- 页脚 -->
    <a-layout-footer class="footer">
      <GlobalFooter />
    </a-layout-footer>
  </div>
</template>

<script lang="js" setup>
import GlobalHeader from "@/components/common/GlobalHeader.vue";
import GlobalFooter from "@/components/common/GlobalFooter.vue";
</script>

<style lang="scss">
#basic-layout {
  display: flex;
  flex-direction: column;
  margin: 0;
  min-height: 100vh;

  .header {
    box-shadow: rgba(0, 0, 0, 0.1) 0 3px 6px;
    background-color: white;
  }

  .content-wrapper {
    flex: 1;
    background-color: rgb(238, 240, 243); /* 灰色背景 */
    padding: 24px; /* 背景与内容的间距 */
    display: flex;
    justify-content: center; /* 水平居中 */
    align-items: center; /* 垂直居中 */
  }

  .content-container {
    background-color: white; /* 白色内容区域 */
    border-radius: 16px; /* 内容区圆角 */
    padding: 24px; /* 内容区内间距 */
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); /* 阴影效果 */
    width: 100%; /* 自适应宽度 */
    max-width: 1200px; /* 限制最大宽度 */
    min-height: 70vh; /* 内容区域的最小高度 */
  }

  .footer {
    text-align: center;
    padding: 16px 0;
    background-color: rgb(238, 240, 243); /* 灰色背景 */
  }
}
</style>
