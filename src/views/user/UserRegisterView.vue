<template>
  <div id="user-register">
    <!-- 注册页面 logo -->
    <a-card class="register-card" :bordered="true" :hoverable="true">
      <div class="register-header">
        <img :src="LOGO_URL" alt="kunkun" class="logo" @click="toHomeView()" />
        <h2 class="register-title">欢迎注册</h2>
      </div>
      <!-- 用户注册表单 -->
      <a-form :model="form" label-col="8" wrapper-col="16">
        <!-- 账号 -->
        <a-form-item
          field="userAccount"
          label="账号"
          tooltip="账号为8-16位，不支持特殊符号"
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
          tooltip="密码为8-16位，不支持特殊符号"
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
        <!-- 确认密码 -->
        <a-form-item
          field="userConfirmedPassword"
          label="确认密码"
          :rules="[
            { required: true, message: '确认密码是必填项' },
            {
              validator: (value, cb) => {
                if (value !== form.userPassword) {
                  cb('确认密码与密码不一致');
                } else {
                  cb();
                }
              },
            },
          ]"
        >
          <a-input
            v-model="form.userConfirmedPassword"
            placeholder="请输入确认密码"
            type="password"
            class="input-field"
          />
        </a-form-item>
        <!-- 邮箱 -->
        <a-form-item
          field="userEmail"
          label="邮箱"
          :rules="[
            { required: true, message: '邮箱是必填项' },
            {
              validator: (value, cb) => {
                if (!isLegalUserEmail(value)) {
                  cb('邮箱格式不正确');
                } else {
                  cb();
                }
              },
            },
          ]"
        >
          <a-input
            v-model="form.userEmail"
            placeholder="请输入邮箱"
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
        <!-- 登陆按钮和发送验证码按钮-->
        <a-form-item>
          <a-button
            type="primary"
            block
            html-type="submit"
            size="large"
            class="register-btn"
            :disabled="!registerBtnEnabled"
            @click="throttledDoUserRegister()"
          >
            注册
          </a-button>
          <a-button
            type="primary"
            block
            size="large"
            class="send-captcha-btn"
            :disabled="!sendCaptchaBtnEnabled"
            @click="doEmailCaptchaSend()"
          >
            {{ sendCaptchaBtnContent }}
          </a-button>
        </a-form-item>
      </a-form>
    </a-card>
  </div>
</template>

<script setup>
import { computed, reactive, ref } from "vue";
import { useRouter } from "vue-router";
import {
  isLegalCaptcha,
  isLegalUserAccount,
  isLegalUserEmail,
  isLegalUserPassword,
} from "@/utils/RegUtil";
import { Message } from "@arco-design/web-vue";
import { LOGO_URL } from "@/constant/GlobalConstant";
import { sendRegisterCaptchaByPost } from "@/api/EmailControllerApi";
import { userRegisterByPost } from "@/api/UserControllerApi";
import { throttle } from "lodash-es";

const router = useRouter();

// 登录表单模型
const form = reactive({
  userAccount: "",
  userPassword: "",
  userConfirmedPassword: "",
  userEmail: "",
  captcha: "",
});

// 发送验证码按钮内容
const sendCaptchaBtnContent = ref("发送验证码");

// 发送验证码按钮是否可用
const sendCaptchaBtnEnabled = ref(true);

// 发送验证码按钮记时
const countDown = ref(60);

/**
 * 开启倒计时
 */
const startCountDown = () => {
  // 发送验证码按钮不可用
  sendCaptchaBtnEnabled.value = false;

  // 更改验证码按钮内容
  sendCaptchaBtnContent.value = `${countDown.value}秒后重试`;

  // 开启计时器
  const interval = setInterval(() => {
    countDown.value -= 1;
    if (countDown.value > 0) {
      // 更改验证码按钮内容
      sendCaptchaBtnContent.value = `${countDown.value}秒后重试`;
    } else {
      // 清除计时器
      clearInterval(interval);
      sendCaptchaBtnContent.value = `发送验证码`;
      // 设置发送验证码按钮可用
      sendCaptchaBtnEnabled.value = true;
    }
  }, 1000);
};

// 登陆按钮是否可用
const registerBtnEnabled = computed(() => {
  return (
    isLegalUserAccount(form.userAccount) &&
    isLegalUserPassword(form.userPassword) &&
    isLegalCaptcha(form.captcha) &&
    isLegalUserPassword(form.userConfirmedPassword) &&
    isLegalUserEmail(form.userEmail) &&
    form.userPassword === form.userConfirmedPassword
  );
});

/**
 * 点击 logo 返回首页
 */
const toHomeView = () => {
  router.push("/");
};

/**
 * 发送验证码到邮箱
 */
const doEmailCaptchaSend = async () => {
  // 邮箱格式不正确，返回
  if (!isLegalUserEmail(form.userEmail)) {
    Message.error("验证码格式不正确");
    return;
  }
  // 开启倒计时
  startCountDown();
  Message.success("发送验证码成功。");
  await sendRegisterCaptchaByPost(form.userEmail);
};

/**
 * 用户注册
 */
const doUserRegister = async () => {
  const res = await userRegisterByPost(form);
  if (!res) {
    return;
  }
  Message.success("恭喜成为新黑子");
  // 成功注册返回登陆页
  router.push("/user/login");
};

/**
 * 注册按钮防抖
 * 500ms 的节流时间
 */
const throttledDoUserRegister = throttle(() => {
  doUserRegister();
}, 500);
</script>

<style lang="scss" scoped>
#user-register {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 95vh;

  /* 登录框样式 */
  .register-card {
    width: 440px;
    padding: 20px;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
    border-radius: 12px;
  }

  .register-header {
    text-align: center;
    margin-bottom: 20px;
  }

  .logo {
    width: 80px;
    margin-bottom: 10px;
    cursor: pointer;
  }

  .register-title {
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
  .register-btn {
    border-radius: 10px;
    background-color: #4a00e0; /* 按钮背景色 */
    color: #fff;
  }

  /* 发送验证码按钮样式 */
  .send-captcha-btn {
    border-radius: 10px;
    background-color: #4a00e0; /* 按钮背景色 */
    color: #fff;
    margin-left: 20vh;
  }

  .register-btn:hover {
    background-color: #8e2de2; /* 按钮悬停色 */
  }
}
</style>
