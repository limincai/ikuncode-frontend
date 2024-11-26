<template>
  <div id="app">
    <BasicLayout />
  </div>
</template>

<script lang="js" setup>
import BasicLayout from "@/layouts/BasicLayout.vue";
import { useRouter } from "vue-router";
import routes from "@/router/routes";
import { useLoginUserStore } from "@/stores/user";
import { Message } from "@arco-design/web-vue";


const router = useRouter();

const loginUser = useLoginUserStore().loginUser;

/**
 * 路由跳转前监听
 * 用户跳转路由前先对用户权限进行校验
 */
router.beforeEach((to, from, next) => {
  // 当前登陆用户权限
  const loginUserRole = loginUser.userRole;

  // 需要权限
  const requiredRole = to.meta.requiredRole;

  // 当前页面无需权限
  if (!requiredRole) {
    next();
    return;
  }

  // 当前用户未登陆
  if (!loginUserRole) {
    Message.error("请先登陆");
    router.replace("/user/login");
    return;
  }

  // 当前用户权限不足（数值越小权限越大）
  if (loginUserRole > requiredRole) {
    Message.error("无权限");
    router.replace(from.path);
  }
});
</script>
