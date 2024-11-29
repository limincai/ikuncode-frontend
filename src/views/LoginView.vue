<template>
  <a-form :model="form" :style="{ width: '600px' }" @submit="handleSubmit">
    <a-form-item field="username" label="账号">
      <a-input v-model="form.name" placeholder="请输入账号" />
    </a-form-item>
    <a-form-item field="userPassword" label="密码">
      <a-input v-model="form.post" placeholder="请输入密码" />
    </a-form-item>
    <a-form-item>
      <a-button html-type="submit">登陆</a-button>
    </a-form-item>
  </a-form>
</template>

<script setup>
import { reactive } from "vue";

const form = reactive({
  username: "",
  userPassword: "",
  isRead: false,
});
const handleSubmit = (data) => {
  console.log(data);
};
</script>
<style lang="scss" scoped></style>
