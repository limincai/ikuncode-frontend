<template>
  <a-row id="global-header" :wrap="false" align="center">
    <!--  左侧标题栏  -->
    <a-col flex="30%" @click="toHomeView()">
      <a-row :wrap="false" align="center" class="title-bar">
        <a-col class="logo" flex="10%">
          <img alt="logo" class="logo" src="@/assets/logo.png" />
        </a-col>
        <a-col flex="auto">
          <div class="title">IkunCode坤码网</div>
        </a-col>
      </a-row>
    </a-col>
    <!--  中间菜单栏  -->
    <a-col flex="auto">
      <a-menu
        :default-selected-keys="['/questions']"
        :selected-keys="selectedKey"
        mode="horizontal"
        @menu-item-click="doMenuClick"
      >
        <a-menu-item
          v-for="homeMenuRoute in filteredHomeMenuRoutes"
          :key="homeMenuRoute.path"
        >
          <component :is="homeMenuRoute?.meta?.icon" />
          {{ homeMenuRoute.name }}
        </a-menu-item>
      </a-menu>
    </a-col>
    <!-- 右侧用户头像 -->
    <a-col flex="10%" class="user-avatar">
      <!-- 用户未登陆显示登陆按钮 -->
      <a-avatar
        v-if="!userAvatarUrl && !loginUserStore.loginUser?.userAccount"
        class="user-avatar"
        @click="toLoginView()"
      >
        <div>未登陆</div>
      </a-avatar>
      <!-- 用户未登陆显示用户头像 -->
      <a-dropdown trigger="hover" v-else>
        <a-avatar @click="toUserHomeView()">
          <img :src="userAvatarUrl || defaultUserAvatar" alt="user-avatar" />
        </a-avatar>
        <template #content>
          <a-doption @click="toUserHomeView">
            <icon-user />
            个人首页
          </a-doption>
          <a-doption @click="doUserLogout()" style="color: red">
            <icon-export />
            退出登陆
          </a-doption>
        </template>
      </a-dropdown>
    </a-col>
  </a-row>
</template>

<script lang="js" setup>
import HomeMenuRoutes from "@/router/HomeMenuRoutes";
import { useRouter } from "vue-router";
import { computed, ref } from "vue";
import { useLoginUserStore } from "@/stores/user";
import { userLogoutByPost } from "@/api/UserControllerApi";
import { Message } from "@arco-design/web-vue";

const router = useRouter();

const loginUserStore = useLoginUserStore();

// 默认用户头像
const defaultUserAvatar = require("@/assets/default-user-avatar.png");

// 用户头像地址
const userAvatarUrl = ref(loginUserStore.loginUser?.userAvatarUrl);

// 默认选择的菜单为主页
const selectedKey = ref(["/"]);

/**
 * 点击标题栏返回主页
 */
const toHomeView = () => {
  router.push("/questions");
};

/**
 * 根据权限过滤主页菜单路由
 */
const filteredHomeMenuRoutes = computed(() =>
  HomeMenuRoutes[0].children.filter((homeMenuRoute) => {
    // 不需要显示的路由项
    if (homeMenuRoute?.meta?.disappear) {
      return false;
    }

    // 当前登录用户的权限
    const loginUserRole = loginUserStore.loginUser?.userRole;

    // 需要的权限
    const requiredRole = homeMenuRoute?.meta?.requiredRole;

    // 当前页面无需权限
    if (!requiredRole) {
      return true;
    }

    // 用户未登陆且需要权限
    if (loginUserRole !== 0 && !loginUserRole) {
      return false;
    }

    // 当前用户权限不足（数值越小权限越大）
    return loginUserRole <= requiredRole;
  })
);

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

/**
 * 点击登陆按钮跳转到登陆页面
 */
const toLoginView = () => {
  router.replace("/user/login");
};

/**
 * 点击用户头像或者个人首页跳转到用户首页
 *
 */
const toUserHomeView = () => {
  router.push(`/user/${loginUserStore.loginUser.userId}`);
};

/**
 * 用户注销
 */
const doUserLogout = async () => {
  await userLogoutByPost();
  Message.success("退出成功");
  router.push("/questions");
  // 清除用户信息
  loginUserStore.clearLoginUser();
};
</script>

<style lang="scss" scoped>
#global-header {
  .title-bar {
    cursor: pointer;
    padding-left: 25vh;

    .logo {
      height: 45px;
    }

    .title {
      color: #444;
      margin-left: 16px;
      font-family: "Exo 2", serif;
      font-size: 1.5em;
      font-weight: 600;
    }
  }

  a-avatar {
    cursor: pointer;
  }
}
</style>
