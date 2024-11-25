<template>
  <a-row id="global-header" align="center">
    <a-col flex="auto">
      <div class="title-bar">
        <img alt="logo" class="logo" src="@/assets/logo.jpg" />
        <div class="title">COJ</div>
      </div>
    </a-col>
    <a-col flex="auto">
      <a-menu
        :default-selected-keys="['/questions']"
        :selected-keys="selectedKey"
        mode="horizontal"
        @menu-item-click="doMenuClick"
      >
        <a-menu-item v-for="route in routes" :key="route.path">
          {{ route.name }}
        </a-menu-item>
      </a-menu>
    </a-col>
    <a-col flex="100px">
      <a-avatar>
        <img :src="loginUser.userAvatarUrl || defaultUserAvatar" alt="avatar" />
      </a-avatar>
    </a-col>
  </a-row>
</template>

<script lang="js" setup>
import routes from "@/router/routes";
import { useRouter } from "vue-router";
import { ref } from "vue";
import { useLoginUserStore } from "@/stores/user";

const router = useRouter();

const loginUser = useLoginUserStore().loginUser;

const defaultUserAvatar = require("@/assets/default-user-avatar.png");

// 默认选择的菜单为主页
const selectedKey = ref(["/"]);

/**
 * 路由跳转前，更新选中的菜单项
 */
router.afterEach(to => {
  selectedKey.value = [to.path];
});


/**
 * 菜单点击跳转到相应页面
 */
const doMenuClick = (key) => {
  router.push({
    path: key
  });
};
</script>

<style lang="scss" scoped>
#global-header {
  margin-bottom: 16px;
}

.title-bar {
  display: flex;
  align-items: center;

  .logo {
    height: 64px;
  }

  .title {
    color: #444;
    margin-left: 16px;
  }
}
</style>
