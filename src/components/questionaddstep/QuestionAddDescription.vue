<template>
  <div id="question-add-description">
    <MdEditor
      :value="questionAddRequest.questionDescription"
      :handleChange="handleChange"
      style="min-width: 80vh"
      placeholder="请输入题目描述（必填项），支持 markdown 语法"
      :upload-image="uploadImage"
    />
  </div>
</template>

<script lang="js" setup>
import { useQuestionAddRequestStore } from "@/stores/questionAddRequest";
import MdEditor from "@/components/common/MdEditor.vue";
import FileControllerApi from "@/api/FileControllerApi";

const questionAddRequest = useQuestionAddRequestStore().questionAddRequest;

/**
 * md 编辑器变化触发方法
 */
const handleChange = (v) => {
  questionAddRequest.questionDescription = v;
};

/**
 * md 编辑器上传图片
 */
const uploadImage = async (files) => {
  const formData = new FormData();
  formData.append("file", files[0]);
  const res = await FileControllerApi.uploadImg(formData);
  questionAddRequest.questionDescription += `<img src="${res}" width="150"/>`;
};
</script>

<style lang="scss" scoped></style>
