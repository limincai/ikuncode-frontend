<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script lang="js" setup>
import { useRouter } from "vue-router";
import { Message } from "@arco-design/web-vue";
import NProgress from "nprogress";
import { onMounted } from "vue";
import { useLoginUserStore } from "@/stores/loginUser";

const router = useRouter();

const loginUserStore = useLoginUserStore();

/**
 * 项目初始化的函数
 * 获取 session 中的用户保存在 userStore 中
 */
const doInit = () => {
  console.log("                       +*#++--                    \n" +
    "                     :#@@@@@@%#:                  \n" +
    "                     -@@@*=#@@@#                  \n" +
    "                      #**++*%@%                   \n" +
    "                      #=:-=-=+                    \n" +
    "                 +:-@@@@=--+@@                    \n" +
    "               %@@@.@@@@@@@@@@++@                 \n" +
    "              @@@@@+%@@@@@@@@@:@@@@@              \n" +
    "            @@@@@@@*%@@@@@@@@@.@@@@@@*            \n" +
    "          @@@@@@@@@+@@@@@@@@@@+@@@@@@@@@          \n" +
    "        @@@@@@@@@@@-@@@@@@@@@-@@*@@@@@@@@@@@@@@#: \n" +
    "     @@@@@@@ *@@@@@-@@@@@@@@%@@@      @@@#==-====:\n" +
    "   #@@@@%    @@@@@=%@@@@@@@@@@         :+==--=+=::\n" +
    "  #@@@@     @@@@@@-@@@@@@@@@           #*++=*+++-:\n" +
    " %@@@        @@@@@@@@@@@@@@%           *########*:\n" +
    ".=@@        .@%#%%%%@%%%%%%%            *%%%%%#+  \n" +
    "-.:          %##%@@@%%%%%###+              ++=    \n" +
    "-.           ++**#%%%%%######*                    \n" +
    "             +++++*#@@@@@%####*                   \n" +
    "             :++=++** *@@@%@%##*                  \n" +
    "              ++==++=   %@@%####*                 \n" +
    "              =+==+*+     #@%%###+                \n" +
    "              .+++*#*      %@@%%##=               \n" +
    "              *##%%%        %@@@%%#               \n" +
    "              =##%%%        =%@@@@                \n" +
    "              =#%%%*        #%@@@%                ");
  loginUserStore.fetchLoginUser();
};

onMounted(() => {
  doInit();
});

/**
 * 路由跳转前监听
 * 用户跳转路由前先对用户权限进行校验
 */
router.beforeEach((to, from, next) => {
  // 开启进度条
  NProgress.start();

  // 当前登陆用户权限
  const loginUserRole = loginUserStore.loginUser?.userRole;

  // 需要权限
  const requiredRole = to?.meta?.requiredRole;

  // 当前页面无需权限
  if (!requiredRole) {
    next();
    // 关闭进度条
    NProgress.done();
    return;
  }

  // 当前用户未登陆
  if (loginUserRole !== 0 && !loginUserRole) {
    Message.error("请先登陆");
    router.push("/user/login");
    // 关闭进度条
    NProgress.done();
    return;
  }

  // 当前用户权限不足（数值越小权限越大）
  if (loginUserRole > requiredRole) {
    Message.error("无权限");
    // 关闭进度条
    NProgress.done();
    router.replace(from.path);
  }

  // 鉴权完成，前进
  next();

  // 关闭进度条
  NProgress.done();
});
</script>

<style lang="scss">
.arco-link {
  background: none !important;
}

// 图标
.arco-icon {
  margin: 0 !important;
}

// 头像
.arco-avatar {
  cursor: pointer;
}

// 不可用的按钮
.disabled-btn {
  background-color: gray !important;
}
</style>
