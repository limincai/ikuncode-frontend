<template>
  <a-row id="global-header" :wrap="false" align="center">
    <!--  左侧标题栏  -->
    <a-col flex="30%">
      <a-row :wrap="false" align="center" class="title-bar">
        <a-col class="logo" flex="50%">
          <img alt="logo" class="logo" src="@/assets/logo.jpg" />
        </a-col>
        <a-col flex="auto">
          <div class="title">COJ</div>
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
    <a-col flex="10%">
      <a-avatar
        v-if="!loginUser.userAvatarUrl"
        class="user-avatar"
        @click="toLoginView()"
      >
        <div>登陆</div>
      </a-avatar>
      <a-avatar v-else>
        <img
          :src="loginUser.userAvatarUrl || defaultUserAvatar"
          alt="user-avatar"
        />
      </a-avatar>
    </a-col>
  </a-row>
</template>

<script lang="js" setup>
import HomeMenuRoutes from "@/router/HomeMenuRoutes";
import { useRouter } from "vue-router";
import { computed, ref } from "vue";
import { useLoginUserStore } from "@/stores/user";

const router = useRouter();

const loginUser = useLoginUserStore().loginUser;

const defaultUserAvatar = require("@/assets/default-user-avatar.png");

// 默认选择的菜单为主页
const selectedKey = ref(["/"]);

/**
 * 根据权限过滤主页菜单路由
 */
const filteredHomeMenuRoutes = computed(() =>
  HomeMenuRoutes.filter((homeMenuRoute) => {
    // 不需要显示的路由项
    if (homeMenuRoute?.meta?.disappear) {
      return false;
    }

    // 当前登陆用户权限
    const loginUserRole = loginUser.userRole;

    // 需要权限
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
</script>

<style lang="scss" scoped>
.arco-icon {
  margin: 0 !important;
}

.title-bar {
  .logo {
    padding-left: 80px;
  }

  .logo {
    height: 64px;
  }

  .title {
    color: #444;
    margin-left: 16px;
  }
}
</style>
