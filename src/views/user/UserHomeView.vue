<template>
  <div id="user-home">
    <!-- 用户首页 -->
    <a-card class="user-home-card" :bordered="true" :hoverable="true">
      <div class="user-home-header">
        <a-avatar class="user-avatar" @click="showUploadModal">
          <img
            :src="
              loginUser.userId !== route.params.userId
                ? GlobalConstant.DEFAULT_USER_AVATAR_URL
                : loginUser.userAvatarUrl ||
                  GlobalConstant.DEFAULT_USER_AVATAR_URL
            "
            alt="user-avatar"
          />
        </a-avatar>
      </div>
      <!-- 用户首页信息表单 -->
      <a-form :model="form" label-col="8" wrapper-col="16">
        <!-- 账号 -->
        <a-form-item field="userAccount" label="账号">
          <a-input v-model="form.userAccount" class="readonly-field" disabled />
        </a-form-item>
        <!-- 邮箱 -->
        <a-form-item
          field="userEmail"
          label="注册邮箱"
          v-if="loginUser.userId === route.params.userId"
        >
          <a-input v-model="form.userEmail" class="readonly-field" disabled />
        </a-form-item>
        <!-- 昵称 -->
        <a-form-item field="userNickName" label="用户昵称">
          <a-input
            v-model="form.userNickname"
            class="input-field"
            :disabled="route.params.userId !== loginUser.userId"
          />
        </a-form-item>
        <!-- 简介 -->
        <a-form-item field="userProfile" label="用户简介">
          <a-textarea
            v-model="form.userProfile"
            class="input-field"
            :disabled="route.params.userId !== loginUser.userId"
            placeholder="这个人什么也没留下"
            :max-length="50"
            show-word-limit
            allow-clear
            :auto-size="{ minRows: 2 }"
          />
        </a-form-item>
        <!-- 创建时间 -->
        <a-form-item field="createTime" label="创建时间">
          <a-input v-model="form.createTime" class="readonly-field" disabled />
        </a-form-item>
        <!-- 用户鸡脚数量 -->
        <a-form-item
          field="createTime"
          label="鸡脚数量"
          tooltip="鸡脚数可通过做题和帖子被点赞获取哦！加油吧，小黑子"
        >
          <a-input v-model="form.userJijiao" class="readonly-field" disabled />
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
    <a-modal
      v-if="route.params.userId === loginUser.userId"
      v-model:visible="isModalVisible"
      title="上传头像"
      ok-text="取消"
      :hide-cancel="true"
      :simple="true"
      modal-class="modal-content"
    >
      <a-upload
        :multiple="false"
        :custom-request="handleUpload"
        :show-file-list="false"
        accept="image/*"
      >
        <a-button type="primary" icon="upload">选择头像</a-button>
      </a-upload>
      <p class="upload-hint">支持 JPG/PNG 格式，大小不超过 5MB。</p>
    </a-modal>
  </div>
</template>

<script setup>
import { computed, onMounted, reactive, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import GlobalConstant from "@/constant/GlobalConstant";
import { useLoginUserStore } from "@/stores/loginUser";
import { Message } from "@arco-design/web-vue";
import UserControllerApi from "@/api/UserControllerApi";
import FileControllerApi from "@/api/FileControllerApi";

const route = useRoute();
const router = useRouter();
const loginUser = useLoginUserStore().loginUser;

const file = ref();

// 用户首页表单模型
const form = reactive({
  userAccount: "",
  userNickname: "",
  userEmail: "",
  createTime: "",
  userProfile: "",
  userJijiao: 0,
});

/**
 * 头像上传模态框的显示控制
 */
const isModalVisible = ref(false);

onMounted(async () => {
  const res = await UserControllerApi.userGetByGet(route.params.userId);
  if (!res) {
    Message.error("当前用户不存在");
    router.back();
  }
  Object.assign(form, res);
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
 * 更新用户
 */
const doUserUpdate = async () => {
  const res = await UserControllerApi.userUpdateByPost(form);
  if (!res) {
    Message.error("用户更新失败");
  }
  Object.assign(loginUser, res);
  Object.assign(form, res);
  Message.success("用户更新成功");
};

/**
 * 用户上传头像
 */
const handleUpload = async ({ fileItem }) => {
  const formData = new FormData();
  formData.append("file", fileItem.file);

  const res = await FileControllerApi.uploadUserAvatarByPost(formData);
  if (!res) {
    Message.error("文件上传失败");
    return;
  }
  // 更新用户头像 URL
  loginUser.userAvatarUrl = res;
  isModalVisible.value = false;
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

  /* 输入框样式 */
  .input-field {
    border-radius: 10px;
  }

  /* 只读字段样式 */
  .readonly-field {
    background-color: #f5f5f5 !important;
    color: #000 !important;
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

  .modal-content {
    display: flex;
    align-items: center;
    justify-items: center;
  }
}
</style>
