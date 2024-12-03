<template>
  <div id="user-retrieve-password">
    <!-- 找回密码页面 logo -->
    <a-card class="retrieve-password-card" :bordered="true" :hoverable="true">
      <div class="retrieve-password-header">
        <img :src="LOGO_URL" alt="kunkun" class="logo" @click="toHomeView()" />
        <h2 class="retrieve-password-title">找回密码</h2>
      </div>
      <!-- 用户找回密码表单 -->
      <a-form :model="form" label-col="8" wrapper-col="16">
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
        <!-- 修改密码按钮和发送验证码按钮-->
        <a-form-item>
          <a-button
            type="primary"
            block
            html-type="submit"
            size="large"
            class="retrieve-password-btn"
            :disabled="!retrievePasswordBtnEnabled"
            @click="throttledDoUserRetrievePassword()"
          >
            修改密码
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
  isLegalUserEmail,
  isLegalUserPassword,
} from "@/utils/RegUtil";
import { Message } from "@arco-design/web-vue";
import { LOGO_URL } from "@/constant/GlobalConstant";
import { getRetrievePasswordCaptchaByPost } from "@/api/EmailControllerApi";
import { userRetrievePassword } from "@/api/UserControllerApi";
import { throttle } from "lodash-es";

const router = useRouter();

// 找回密码表单模型
const form = reactive({
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
const retrievePasswordBtnEnabled = computed(() => {
  return (
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
  await getRetrievePasswordCaptchaByPost(form.userEmail);
  Message.success("发送验证码成功");
};

/**
 * 用户找回密码
 */
const doUserRetrievePassword = async () => {
  await userRetrievePassword(form);
  Message.success("修改密码成功");
  // 成功找回密码返回登陆页
  router.push("/user/login");
};

/**
 * 修改密码按钮防抖
 * 500ms 的节流时间
 */
const throttledDoUserRetrievePassword = throttle(() => {
  doUserRetrievePassword();
}, 500);
</script>

<style lang="scss" scoped>
#user-retrieve-password {
  display: flex;
  justify-content: center;
  align-items: center;

  /* 找回密码框样式 */
  .retrieve-password-card {
    width: 440px;
    padding: 20px;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
    border-radius: 12px;
  }

  .retrieve-password-header {
    text-align: center;
    margin-bottom: 20px;
  }

  .logo {
    width: 80px;
    margin-bottom: 10px;
    cursor: pointer;
  }

  .retrieve-password-title {
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
  .retrieve-password-btn {
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

  .retrieve-password-btn:hover {
    background-color: #8e2de2; /* 按钮悬停色 */
  }
}
</style>
