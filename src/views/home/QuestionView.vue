<template>
  <div class="question-view">
    <a-split default-size="0.4">
      <template #resize-trigger>
        <div class="trigger-vertical">
          <div class="trigger-vertical-line" />
        </div>
      </template>
      <!-- 左侧区域 -->
      <template #first>
        <a-tabs type="rounded">
          <!-- 题目描述 -->
          <a-tab-pane key="question">
            <template #title>
              <icon-code-block />
              题目描述
            </template>
            <a-scrollbar type="track" style="height: 78vh; overflow: auto">
              <MdViewer :value="question.questionDescription" />
            </a-scrollbar>
          </a-tab-pane>
          <!-- 评论区 -->
          <a-tab-pane key="comment">
            <template #title>
              <icon-user />
              评论区
            </template>
            <QuestionComment />
          </a-tab-pane>
          <!-- 提交记录 -->
          <a-tab-pane key="submitRecords">
            <template #title>
              <icon-calendar />
              提交记录
            </template>
            <QuestionSubmitRecords />
          </a-tab-pane>
        </a-tabs>
      </template>
      <!-- 右侧区域 -->
      <template #second>
        <div class="editor-container">
          <!-- 悬浮按钮区域 -->
          <div class="editor-actions">
            <a-button
              type="text"
              icon="settings"
              class="settings-button"
              @click="showSettings = true"
            >
              <IconSettings />
            </a-button>
            <!-- 提交代码按钮 -->
            <a-button
              type="primary"
              class="submit-button"
              @click="doQuestionSubmit()"
            >
              提交代码
            </a-button>
          </div>
          <a-split class="h-screen" direction="vertical">
            <template #resize-trigger>
              <div class="trigger-horizontal">
                <div class="trigger-horizontal-line" />
              </div>
            </template>
            <!-- 代码编辑器 -->
            <template #first>
              <CodeEditor
                :value="codeEditorProps.value"
                :language="codeEditorProps.language"
                :handleChange="codeEditorProps.handleChange"
                :theme="codeEditorProps.theme"
                :font-size="codeEditorProps.fontSize"
                :enableMinimap="codeEditorProps.enableMinimap"
                :code-editor-height="50"
                :code-editor-weight="100"
              />
            </template>
            <!-- 判题状态 -->
            <template #second>
              <div v-if="flag" class="judge-status-container">
                <a-card title="判题状态" :bordered="false" class="judge-card">
                  <div v-if="isLoading">
                    <a-spin />
                    <p>判题中</p>
                  </div>
                  <div class="judge-status-content" v-if="!isLoading">
                    <div class="judge-row">
                      <div class="judge-label">执行消息：</div>
                      <div class="judge-value">
                        {{ judgeInfo.message || "无" }}
                      </div>
                    </div>
                    <div class="judge-row">
                      <div class="judge-label">消耗内存：</div>
                      <div class="judge-value">
                        {{ judgeInfo.memory ? judgeInfo.memory + " mb" : "无" }}
                      </div>
                    </div>
                    <div class="judge-row">
                      <div class="judge-label">消耗时间：</div>
                      <div class="judge-value">
                        {{ judgeInfo.time ? judgeInfo.time + " ms" : "无" }}
                      </div>
                    </div>
                  </div>
                </a-card>
              </div>
            </template>
          </a-split>
        </div>
      </template>
    </a-split>

    <!-- 设置弹框 -->
    <a-drawer
      v-model:visible="showSettings"
      title="代码编辑器设置"
      width="300px"
      placement="right"
    >
      <a-form layout="vertical">
        <!-- 选择主题 -->
        <a-form-item label="主题">
          <a-select v-model="codeEditorProps.theme" :options="themeOptions" />
        </a-form-item>
        <!-- 字体大小 -->
        <a-form-item label="字体大小">
          <a-slider v-model="codeEditorProps.fontSize" :min="10" :max="20" />
        </a-form-item>
        <!-- 选择语言 -->
        <a-form-item label="语言">
          <a-select
            v-model="codeEditorProps.language"
            :options="languageOptions"
          />
        </a-form-item>
        <!-- 是否启用小地图 -->
        <a-form-item label="代码小地图">
          <a-switch v-model="codeEditorProps.enableMinimap" />
        </a-form-item>
      </a-form>
    </a-drawer>
  </div>
</template>

<script setup>
import { onMounted, reactive, ref } from "vue";
import { useRoute } from "vue-router";
import QuestionControllerApi from "@/api/QuestionControllerApi";
import CodeLanguage from "@/constant/CodeLanguage";
import CodeEditorTheme from "@/constant/CodeEditorTheme";
import MdViewer from "@/components/common/MdViewer.vue";
import CodeEditor from "@/components/common/CodeEditor.vue";
import QuestionComment from "@/components/question/QuestionComment.vue";
import QuestionSubmitRecords from "@/components/question/UserQuestionSubmitRecords.vue";
import QuestionSubmitControllerApi from "@/api/QuestionSubmitControllerApi";
import { useLoginUserStore } from "@/stores/loginUser";
import { Message } from "@arco-design/web-vue";

const route = useRoute();

/**
 * 题目初始化
 */
const question = reactive({
  questionId: 0,
  questionTitle: "",
  questionDescription: "",
});

/**
 * 判题状态显示标识
 */
const flag = ref(false);
const isLoading = ref(true); // 判题是否正在进行中
const judgeInfo = reactive({
  message: "WAITING",
  time: null,
  memory: null,
});

/**
 * 是否显示设置弹框
 */
const showSettings = ref(false);

/**
 * 代码编辑器属性
 */
const codeEditorProps = reactive({
  value:
    "public class Main {\n" +
    "\n" +
    "   public static void main(String[] args) {\n" +
    "   // please code your code\n" +
    "   }\n" +
    "}\n",
  language: CodeLanguage.JAVA,
  theme: CodeEditorTheme.VS,
  fontSize: 14,
  enableMinimap: false,
  handleChange: (v) => {
    codeEditorProps.value = v;
  },
});

/**
 * 提交代码方法
 */
const doQuestionSubmit = async () => {
  flag.value = true;
  isLoading.value = true;
  const res = await QuestionSubmitControllerApi.doSubmitQuestionByPost({
    userId: useLoginUserStore().loginUser.userId,
    questionId: question.questionId,
    code: codeEditorProps.value,
    language: codeEditorProps.language,
  });
  if (!res) {
    Message.error("提交错误");
    return;
  }
  isLoading.value = false;
  Message.success("判题成功");
  judgeInfo.message = res.message || "无";
  judgeInfo.time = res.time;
  judgeInfo.memory = res.memory;
};

/**
 * 编辑器选项
 */
const themeOptions = [
  { label: "VS", value: CodeEditorTheme.VS },
  { label: "VS Dark", value: CodeEditorTheme.VS_DARK },
  { label: "HC Black", value: CodeEditorTheme.HC_BLACK },
];

const languageOptions = [{ label: "Java", value: CodeLanguage.JAVA }];

/**
 * 页面加载时获取题目
 */
onMounted(async () => {
  const questionId = route.params.questionId;
  const res = await QuestionControllerApi.questionGetByIdByGet(questionId);
  Object.assign(question, res);
});
</script>

<style lang="scss" scoped>
.question-view {
  height: 80vh;
  padding: 0 20px 20px 20px;
}

.editor-container {
  position: relative;
}

.editor-actions {
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 10;
  display: flex;
  gap: 10px;
}

.settings-button {
  background-color: var(--color-bg-1);
  border-radius: 50%;
  padding: 5px;

  &:hover {
    background-color: var(--color-bg-2);
  }
}

.submit-button {
  background-color: var(--arcoblue-6);
  color: #fff;
  border-radius: 4px;
}

.trigger-vertical {
  display: flex;
  position: relative;
  width: 3px;
  height: 100vh;
  flex-direction: column;
}

.trigger-vertical:hover {
  background-color: rgb(47, 108, 248);
}

.trigger-horizontal {
  display: flex;
  position: relative;
  width: 100%;
  height: 3px;

  &-line:hover {
    background-color: rgb(47, 108, 248);
  }
}

.trigger-horizontal:hover {
  background-color: rgb(47, 108, 248);
}

.judge-status-container {
  .judge-card {
    border-radius: 8px;
    padding: 10px;

    .judge-status-content {
      display: flex;
      flex-direction: column;
      gap: 10px;

      .judge-row {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 5px 0;

        .judge-label {
          font-weight: bold;
          color: #333;
        }

        .judge-value {
          color: #666;
        }
      }
    }
  }
}
</style>
