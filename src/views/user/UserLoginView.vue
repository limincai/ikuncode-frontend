<template>
  <div id="user-login">
    <!-- 登陆页面 logo -->
    <a-card class="login-card" :bordered="true" :hoverable="true">
      <div class="login-header">
        <img src="@/assets/logo.png" alt="kunkun" class="logo" />
        <h2 class="login-title">欢迎登陆</h2>
      </div>
      <!-- 用户登陆表单 -->
      <a-form :model="form" label-col="8" wrapper-col="16">
        <!-- 账号 -->
        <a-form-item
          field="userAccount"
          label="账号"
          :rules="[
            { required: true, message: '账号是必填项' },
            {
              minLength: 8,
              maxLength: 16,
              message: '账号为8-16位',
            },
          ]"
        >
          <a-input
            v-model="form.userAccount"
            placeholder="请输入账号"
            class="input-field"
          />
        </a-form-item>
        <!-- 密码 -->
        <a-form-item
          field="userPassword"
          label="密码"
          :rules="[
            { required: true, message: '密码是必填项' },
            {
              minLength: 8,
              maxLength: 16,
              message: '密码为8-16位',
            },
          ]"
        >
          <a-input
            v-model="form.userPassword"
            placeholder="请输入密码"
            type="password"
            class="input-field"
          />
        </a-form-item>
        <!-- 验证码 -->
        <a-form-item
          field="captcha"
          label="验证码"
          :rules="[
            {
              required: true,
              message: '验证码是必须的',
            },
          ]"
        >
          <a-verification-code
            size="large"
            :length="5"
            v-model="form.captcha"
            style="width: 300px"
          />
        </a-form-item>
        <!-- 登陆按钮 -->
        <a-form-item>
          <a-button
            type="primary"
            block
            html-type="submit"
            size="large"
            class="login-btn"
            :disabled="!loginBtnEnabled"
            @click="debouncedUserLogin()"
          >
            登录
          </a-button>
        </a-form-item>
        <!-- 图片验证码 -->
        <img
          :src="captchaUrl"
          alt="captcha"
          style="cursor: pointer"
          @click="refreshCaptcha()"
        />
      </a-form>
      <div class="footer-links">
        <a-link @click="toUserRegisterView()">没有账号？注册</a-link>
        <a-link @click="toUserRetrieveView()">忘记密码？</a-link>
      </div>
    </a-card>
  </div>
</template>

<script setup>
import { computed, onMounted, reactive, ref } from "vue";
import { useRouter } from "vue-router";
import {
  isLegalCaptcha,
  isLegalUserAccount,
  isLegalUserPassword,
} from "@/utils/RegUtil";
import { debounce } from "lodash-es";
import { useLoginUserStore } from "@/stores/user";
import { userLoginByPost } from "@/api/UserControllerApi";
import { getCaptchaByGet } from "@/api/CaptchaControllerApi";
import { Message } from "@arco-design/web-vue";

const router = useRouter();

const loginUserStore = useLoginUserStore();

// 验证码图片链接
const captchaUrl = ref("");

// 验证码图片 header key
const captchaKey = ref("");

// 获取验证码图片 url
const getCaptcha = async () => {
  const res = await getCaptchaByGet();
  captchaUrl.value = res.captchaUrl;
  captchaKey.value = res.captchaKey;
  form.captchaKey = captchaKey.value;
};

// 页面加载时先获取 url
onMounted(() => {
  // 如果用户存在，直接跳转到首页
  if (loginUserStore.loginUser.userId) {
    router.push("/");
  }
  getCaptcha();
});

// 刷新验证码图片 url
const refreshCaptcha = () => {
  getCaptcha();
};

// 登录表单模型
const form = reactive({
  userAccount: "",
  userPassword: "",
  captcha: "",
  captchaKey: "",
});

// 登陆按钮是否可用
const loginBtnEnabled = computed(() => {
  return (
    isLegalUserAccount(form.userAccount) &&
    isLegalUserPassword(form.userPassword) &&
    isLegalCaptcha(form.captcha)
  );
});

/**
 * 用户登陆
 */
const doUserLogin = async () => {
  const res = await userLoginByPost(form);
  // 存入 user 到 store 中
  loginUserStore.setLoginUser(res);
  Message.success("登陆成功");
  // 跳转到首页
  router.push("/");
};

/**
 * 登陆按钮防抖
 */
const debouncedUserLogin = debounce(() => {
  // 设置 1 秒的防抖时间
  doUserLogin();
}, 1000);

/**
 * 跳转到注册页面
 */
const toUserRetrieveView = () => {
  router.push("/user/retrieve-password");
};

/**
 * 跳转到找回密码页面
 */
const toUserRegisterView = () => {
  router.push("/user/register");
};
</script>

<style lang="scss" scoped>
#user-login {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 95vh;

  /* 登录框样式 */
  .login-card {
    width: 400px;
    padding: 20px;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
    border-radius: 12px;
  }

  .login-header {
    text-align: center;
    margin-bottom: 20px;
  }

  .logo {
    width: 80px;
    margin-bottom: 10px;
  }

  .login-title {
    color: #4a00e0; /* 深紫色 */
    font-size: 24px;
    font-weight: bold;
  }

  /* 输入框样式 */
  .input-field {
    border-radius: 10px;
  }

  .input-field:focus {
    border-color: #4a00e0; /* 聚焦时的边框色 */
  }

  /* 登录按钮样式 */
  .login-btn {
    border-radius: 10px;
    background-color: #4a00e0; /* 按钮背景色 */
    color: #fff;
  }

  .login-btn:hover {
    background-color: #8e2de2; /* 按钮悬停色 */
  }

  /* 底部链接 */
  .footer-links {
    display: flex;
    justify-content: space-between;
    padding-top: 10px;
  }

  .footer-links a {
    color: #4a00e0;
    font-size: 14px;
    cursor: pointer;
  }
}
</style>
