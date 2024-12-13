<template>
  <a-row id="global-header" :wrap="false" align="center">
    <!--  左侧标题栏  -->
    <a-col flex="30%" @click="toHomeView()">
      <a-row :wrap="false" align="center" class="title-bar">
        <a-col class="logo" flex="10%">
          <img alt="logo" class="logo" :src="GlobalConstant.LOGO_URL" />
        </a-col>
        <a-col flex="auto">
          <div class="title">IkunCode坤码网</div>
        </a-col>
      </a-row>
    </a-col>
    <!--  中间菜单栏  -->
    <a-col flex="auto">
      <a-menu
        :default-selected-keys="[selectedKey]"
        :selected-keys="[selectedKey]"
        :open-keys="[selectedKey]"
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
          <img
            :src="userAvatarUrl || GlobalConstant.DEFAULT_USER_AVATAR_URL"
            alt="user-avatar"
          />
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
import { useRoute, useRouter } from "vue-router";
import { computed, ref, watch } from "vue";
import { useLoginUserStore } from "@/stores/loginUser";
import UserControllerApi from "@/api/UserControllerApi";
import { Message } from "@arco-design/web-vue";
import GlobalConstant from "@/constant/GlobalConstant";
import { useGlobalHeaderSelectedKey } from "@/stores/globalHeaderSelectedKey";

const router = useRouter();

const route = useRoute();

const loginUserStore = useLoginUserStore();

// 用户头像地址
const userAvatarUrl = ref(loginUserStore.loginUser?.userAvatarUrl);

const globalHeaderSelectedKey = useGlobalHeaderSelectedKey();

// 默认选择保存的 key
const selectedKey = computed(() => {
  return globalHeaderSelectedKey.getSelectedKey();
});

// 监听路由变化，动态更新菜单的 selectedKey
watch(
  () => route.path,
  (newPath) => {
    // 题目更新页面不改变
    if (newPath === ("/question/update")) {
      return;
    }
    // 做题页面不改变
    const regex = /^\/question\/(\d+)$/;
    if (newPath.match(regex)) {
      return;
    }
    globalHeaderSelectedKey.setSelectedKey(newPath);
  },
  { immediate: true } // 在组件挂载时立即触发一次
);

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
    // 当前登录用户的权限
    const loginUserRole = loginUserStore.loginUser?.userRole;

    // 需要的权限
    const requiredRole = homeMenuRoute?.meta?.requiredRole;

    // 不需要在页面上展示
    if (homeMenuRoute?.meta?.hidden) {
      return false;
    }

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
  router.push("/user/login");
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
  await UserControllerApi.userLogoutByPost();
  Message.success("退出成功");
  await router.push("/questions");
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
