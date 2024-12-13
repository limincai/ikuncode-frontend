<template>
  <div id="user-home">
    <!-- 用户首页 -->
    <a-card class="user-home-card" :bordered="true" :hoverable="true">
      <div class="user-home-header">
        <a-avatar class="user-avatar" @click="showUploadModal">
          <img
            :src="
              loginUser.userAvatarUrl || GlobalConstant.DEFAULT_USER_AVATAR_URL
            "
            alt="user-avatar"
          />
        </a-avatar>
        <h2 class="user-home-title">用户首页</h2>
      </div>
      <!-- 用户首页信息表单 -->
      <a-form :model="form" label-col="8" wrapper-col="16">
        <!-- 账号 -->
        <a-form-item field="userAccount" label="账号">
          <a-input v-model="form.userAccount" class="readonly-field" readonly />
        </a-form-item>
        <!-- 邮箱 -->
        <a-form-item field="userEmail" label="注册邮箱">
          <a-input v-model="form.userEmail" class="readonly-field" readonly />
        </a-form-item>
        <!-- 昵称 -->
        <a-form-item field="userNickName" label="用户昵称">
          <a-input
            v-model="form.userNickname"
            :class="computedClass"
            :readonly="route.params.userId !== loginUser.userId"
          />
        </a-form-item>
        <!-- 简介 -->
        <a-form-item field="userProfile" label="用户简介">
          <a-input
            v-model="form.userProfile"
            class="input-field"
            :class="computedClass"
            :readonly="route.params.userId !== loginUser.userId"
          />
        </a-form-item>
        <!-- 创建时间 -->
        <a-form-item field="createTime" label="创建时间">
          <a-input v-model="form.createTime" class="readonly-field" readonly />
        </a-form-item>
        <!-- 用户鸡脚数量 -->
        <a-form-item
          field="createTime"
          label="鸡脚数量"
          tooltip="鸡脚数可通过做题和帖子被点赞获取哦！加油吧，小黑子"
        >
          <a-input v-model="form.userJijiao" class="readonly-field" readonly />
        </a-form-item>
        <!-- 确认修改按钮和返回按钮-->
        <a-form-item>
          <!-- 确认修改按钮-->
          <a-button
            v-if="route.params.userId === loginUser.userId"
            type="primary"
            block
            html-type="submit"
            size="large"
            class="update-button"
            :disabled="!changeBtnEnabled"
            @click="doUserUpdate()"
          >
            确认修改
          </a-button>
          <!-- 返回按钮-->
          <a-button
            type="primary"
            size="large"
            class="back-btn"
            @click="router.back()"
          >
            返回
          </a-button>
        </a-form-item>
      </a-form>
    </a-card>
    <!-- 上传头像模态框 -->
    <div v-if="route.params.userId === loginUser.userId" class="modal-content">
      <a-modal
        v-if="route.params.userId === loginUser.userId"
        v-model:visible="isModalVisible"
        title="上传头像"
        @cancel="handleCancel"
      >
        <a-upload
          @before-upload="handleBeforeUpload"
          :custom-request="updateUserAvatar"
          :max-size="5 * 1024 * 1024"
          accept="image/*"
          :show-file-list="false"
        >
          <a-button icon="upload" type="primary" size="large"
            >点击上传头像
          </a-button>
        </a-upload>
        <p class="upload-hint">支持 JPG/PNG 格式，大小不超过 5MB。</p>
      </a-modal>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, reactive, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import GlobalConstant from "@/constant/GlobalConstant";
import { useLoginUserStore } from "@/stores/loginUser";
import { Message } from "@arco-design/web-vue";
import UserControllerApi from "@/api/UserControllerApi";

const route = useRoute();
const router = useRouter();
const loginUser = useLoginUserStore().loginUser;

// 用户首页表单模型
const form = reactive({
  userAccount: "",
  userNickname: "",
  userEmail: "",
  createTime: "",
  userProfile: "",
  userJijiao: 0,
});

// 头像上传模态框的显示控制
const isModalVisible = ref(false);

// 计算类，当只有是自己时才能修改
const computedClass = computed(() => {
  return {
    "input-field": route.params.userId === loginUser.userId,
    "readonly-field": route.params.userId !== loginUser.userId,
  };
});

onMounted(() => {
  Object.assign(form, loginUser);
});

/**
 * 确认修改按钮是否可用
 */
const changeBtnEnabled = computed(() => {
  return form.userNickname !== "";
});

/**
 * 更新用户头像模态框
 */
const showUploadModal = () => {
  if (route.params.userId !== loginUser.userId) {
    return false;
  }
  isModalVisible.value = true;
};

/**
 * 更新用户头像模态框取消
 */
const handleCancel = () => {
  isModalVisible.value = false;
};

/**
 * 更新用户
 */
const doUserUpdate = () => {
  const res = UserControllerApi.userUpdateByPost(form);
  if (!res) {
    Message.error("用户更新失败");
  }
  Object.assign(loginUser, res);
  Object.assign(form, res);
  Message.success("用户更新成功");
};

/**
 * 头像上传前处理
 */
const handleBeforeUpload = (file) => {
  if (file.size >= 5 * 1024 * 1024) {
    Message.error("文件过大，请重新上传");
    return false;
  }
  return true;
};

/**
 * 上传头像
 */
const updateUserAvatar = (options) => {
  // todo 上传头像
  const { file, onSuccess, onError } = options;
  Message.success("头像上传成功");
};
</script>

<style lang="scss" scoped>
#user-home {
  display: flex;
  justify-content: center;
  align-items: center;

  /* 用户首页卡片样式 */
  .user-home-card {
    width: 450px;
    padding: 20px;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
    border-radius: 12px;
  }

  .user-home-header {
    text-align: center;
    margin-bottom: 20px;
  }

  .user-avatar {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    cursor: pointer;
  }

  .user-home-title {
    color: #4a00e0;
    font-size: 24px;
    font-weight: bold;
  }

  /* 输入框样式 */
  .input-field {
    border-radius: 10px;
  }

  /* 只读字段样式 */
  .readonly-field {
    background-color: #f5f5f5 !important;
    color: #000;
    cursor: not-allowed;
    border-radius: 10px;
  }

  /* 按钮样式 */
  .update-button {
    border-radius: 10px;
    background-color: #4a00e0;
    color: #fff;
  }

  .back-btn {
    border-radius: 10px;
    background-color: #4a00e0;
    color: #fff;
    margin-left: 20vh;
  }

  .update-button:hover {
    background-color: #8e2de2;
  }
}
</style>
