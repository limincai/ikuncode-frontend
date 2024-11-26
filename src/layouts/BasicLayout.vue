<template>
  <div id="basic-layout">
    <a-layout-header class="header">
      <GlobalHeader />
    </a-layout-header>
    <a-layout-content class="content">
      111 111 111
      <router-view />
    </a-layout-content>
    <a-layout-footer class="footer">
      <GlobalFooter />
    </a-layout-footer>
    {{ loginUser.userNickname }}
  </div>
</template>

<script lang="js" setup>
import GlobalHeader from "@/components/GlobalHeader.vue";
import GlobalFooter from "@/components/GlobalFooter.vue";
import { useLoginUserStore } from "@/stores/user";

const loginUser = useLoginUserStore().loginUser;
</script>

<style lang="scss" scoped>
#basic-layout {
  .header {
    margin-bottom: 16px;
    box-shadow: #eee 3px 3px 3px;
  }

  .content {
    margin-bottom: 16px;
    background: linear-gradient(to right, #932132, #252525);
  }

  .footer {
    padding: 16px;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    text-align: center;
  }
}
</style>
