<template>
  <div id="basic-layout">
    <a-layout-header class="header">
      <GlobalHeader />
    </a-layout-header>
    <a-layout-content class="content">
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

<style lang="scss">
#basic-layout {
  display: flex;
  min-height: 100vh;
  flex-direction: column;
  margin: 0;

  .header {
    flex: 1;
    box-shadow: #eee 3px 3px 3px;
  }

  .content {
    flex: 1;
    min-height: 100vh;
    padding: 0 100px;
  }

  .footer {
    text-align: center;
  }
}
</style>
