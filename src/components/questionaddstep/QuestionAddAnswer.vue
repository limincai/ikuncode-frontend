<template>
  <div id="question-add-answer">
    <CodeEditor
      :value="questionAddRequest.questionAnswer"
      :handleChange="handleChange"
      :code-editor-height="50"
      :font-size="20"
    />
  </div>
</template>

<script lang="js" setup>
import { useQuestionAddRequestStore } from "@/stores/questionAddRequest";
import CodeEditor from "@/components/common/CodeEditor.vue";

const questionAddRequest = useQuestionAddRequestStore().questionAddRequest;

const handleChange = (v) => {
  questionAddRequest.questionAnswer = v;
};
</script>

<style lang="scss" scoped>
#question-add-answer {
  margin: 0 auto;
}
</style>
