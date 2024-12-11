<template>
  <div id="question-update-view" class="question-update-view">
    <!-- 题目更新表单 -->
    <a-card title="题目更新" class="form-container">
      <a-form
        :model="question"
        label-col="6"
        wrapper-col="14"
        class="center-form"
      >
        <!-- 题目标题 -->
        <a-form-item
          field="questionTitle"
          label="题目标题"
          :rules="[{ required: true, message: '题目标题是必填项' }]"
        >
          <a-input
            v-model="question.questionTitle"
            placeholder="请输入题目标题"
            class="input-field"
            allow-clear
          />
        </a-form-item>
        <!-- 题目标签 -->
        <a-form-item class="tags-input" field="questionTags" label="题目标签">
          <a-input-tag
            v-model="question.questionTags"
            class="input-field"
            placeholder="输入后按回车添加一个标签"
            allow-clear
          />
        </a-form-item>
        <!-- 题目描述 -->
        <a-form-item label="题目描述" required>
          <MdEditor
            :value="question.questionDescription"
            :handleChange="handleQuestionDescriptionChange"
            style="min-width: 115vh; margin-bottom: 16px"
            placeholder="请输入题目描述（必填项），支持 markdown 语法"
          />
        </a-form-item>
        <!-- 题目答案 -->
        <a-form-item label="题目答案">
          <MdEditor
            :value="question.questionAnswer"
            :handleChange="handleQuestionAnswerChange"
            style="min-width: 115vh; margin-bottom: 16px"
            placeholder="请输入题目答案（非必填项），支持 markdown 语法"
          />
        </a-form-item>
        <!-- 判题用例 -->
        <a-divider>判题用例</a-divider>
        <a-form :model="question.questionJudgeCase" class="case-form">
          <div
            v-for="(caseItem, index) in question.questionJudgeCase"
            :key="index"
            class="case-item"
          >
            <a-row :gutter="[16, 16]" class="case-row">
              <a-col :span="11">
                <a-form-item :label="'输入用例 ' + (index + 1)">
                  <a-input
                    v-model="caseItem.input"
                    placeholder="请输入输入值"
                    allow-clear
                  />
                </a-form-item>
              </a-col>
              <a-col :span="11">
                <a-form-item :label="'输出用例 ' + (index + 1)">
                  <a-input
                    v-model="caseItem.output"
                    placeholder="请输入输出值"
                    allow-clear
                  />
                </a-form-item>
              </a-col>
              <a-col :span="2">
                <a-button
                  status="danger"
                  @click="removeCase(index)"
                  icon="icon-delete"
                  type="text"
                  v-if="judgeCaseLength > 1"
                  >删除
                </a-button>
              </a-col>
            </a-row>
          </div>
        </a-form>
        <a-button type="dashed" block @click="addCase" icon="icon-plus">
          添加新用例
        </a-button>
        <!-- 时间限制和内存限制 -->
        <div style="margin-top: 50px; width: 580px">
          <!-- 时间限制 -->
          <a-form-item
            field="timeLimit"
            label="时间限制 (ms)"
            tooltip="请输入时间限制（非必填项），单位为 ms"
          >
            <a-input-number
              v-model="question.questionJudgeConfig.timeLimit"
              placeholder="时间限制"
              class="input-field"
              :min="0"
              style="width: 100%"
            />
          </a-form-item>
          <!-- 内存限制 -->
          <a-form-item
            field="memoryLimit"
            label="内存限制 (KB)"
            tooltip="请输入内存限制（非必填项），单位为 KB"
          >
            <a-input-number
              v-model="question.questionJudgeConfig.memoryLimit"
              placeholder="内存限制"
              class="input-field"
              :min="0"
              style="width: 100%"
            />
          </a-form-item>
        </div>
        <!-- 提交按钮和取消按钮 -->
        <div>
          <!-- 提交按钮 -->
          <a-form-item>
            <div class="button-group">
              <a-button
                :type="submitBtnType"
                class="submit-btn"
                :disabled="!submitBtnEnabled"
                @click="handleSubmit"
              >
                提交
              </a-button>
              <a-divider direction="vertical" />
              <!-- 取消按钮 -->
              <a-button type="outline" @click="router.back()">取消</a-button>
            </div>
          </a-form-item>
        </div>
      </a-form>
    </a-card>
  </div>
</template>

<script setup>
import { computed, onMounted, reactive } from "vue";
import { useRoute, useRouter } from "vue-router";
import QuestionControllerApi from "@/api/QuestionControllerApi";
import { Message } from "@arco-design/web-vue";
import MdEditor from "@/components/common/MdEditor.vue";
import { toNumber } from "lodash-es";

const route = useRoute();
const router = useRouter();

/**
 * 初始化题目
 */
const question = reactive({
  questionJudgeConfig: {
    timeLimit: 0,
    memoryLimit: 0,
  },
  questionJudgeCase: [
    {
      input: "",
      output: "",
    },
  ],
});

/**
 * 页面加载时获取题目信息
 */
onMounted(async () => {
  const res = await QuestionControllerApi.questionGetByAdminByIdByGet(
    route.query.questionId
  );
  Object.assign(question, res);
  question.questionJudgeConfig.memoryLimit = toNumber(
    question.questionJudgeConfig.memoryLimit
  );
  question.questionJudgeConfig.timeLimit = toNumber(
    question.questionJudgeConfig.timeLimit
  );
});

/**
 * 提交按钮是否可用
 */
const submitBtnEnabled = computed(() => {
  const questionTitle = question.questionTitle;
  // 题目标题不能为空
  if (questionTitle === "") {
    return false;
  }
  // 题目描述不能为空
  const questionDescription = question.questionDescription;
  return questionDescription !== "";
});

/**
 * 提交按钮种类
 */
const submitBtnType = computed(() => {
  return submitBtnEnabled.value ? "primary" : "dashed";
});

/**
 * 题目描述 md 编辑器变化触发方法
 */
const handleQuestionDescriptionChange = (v) => {
  question.questionDescription = v;
};

/**
 * 题目答案 md 编辑器变化触发方法
 */
const handleQuestionAnswerChange = (v) => {
  question.questionAnswer = v;
};

/**
 * 判题用例数组长度
 */
const judgeCaseLength = computed(() => {
  return question.questionJudgeCase.length;
});

/**
 * 添加用例
 */
const addCase = () => {
  console.log(question.questionJudgeCase);
  question.questionJudgeCase.push({ input: "", output: "" });
};

/**
 * 删除用例
 */
const removeCase = (index) => {
  if (question.questionJudgeCase.length === 1) {
    return;
  }
  question.questionJudgeCase.splice(index, 1);
};

/**
 * 题目更新
 */
const handleSubmit = async () => {
  // 过滤出不合法的判题用例
  // 处理逻辑
  question.questionJudgeCase = question.questionJudgeCase.reduce(
    (result, item) => {
      // 如果 input 和 output 的状态不匹配，统一设置为空字符串
      if (
        (item.input === "" && item.output !== "") ||
        (item.input !== "" && item.output === "")
      ) {
        item.input = "";
        item.output = "";
      }

      // 判断是否是空的用例
      const isEmptyCase = item.input === "" && item.output === "";

      // 保留第一个空的用例，其他空的用例过滤掉
      if (isEmptyCase) {
        if (
          result.some(
            (caseItem) => caseItem.input === "" && caseItem.output === ""
          )
        ) {
          return result;
        }
      }
      // 添加符合条件的用例到结果数组
      result.push(item);
      return result;
    },
    []
  );

  const res = await QuestionControllerApi.questionUpdateByPost(question);
  if (res === undefined) {
    return;
  }
  Message.success("题目更新成功");
  // 跳转回题目管理页面
  await router.replace("/questions/manage");
};
</script>

<style lang="scss" scoped>
#question-update-view {
  padding: 16px;

  .form-container {
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    min-width: 800px;
    margin: 0 auto;
    padding: 24px;
  }

  .center-form {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .input-field {
    width: 100%;
  }

  .tags-input {
    margin-bottom: 16px;
  }

  .case-form {
    margin-bottom: 16px;

    .case-item {
      padding: 8px 0;
      border-bottom: 1px solid #f0f0f0;
    }
  }

  .button-group {
    display: flex;
    justify-content: space-between;
  }

  .submit-btn {
    background-color: #4caf50;
    border: none;

    &:hover {
      background-color: #45a049;
    }
  }
}
</style>
