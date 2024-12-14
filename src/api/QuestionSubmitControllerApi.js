/* 题目提交接口 */
import AxiosClient from "@/api/AxiosClient";

export default {
  /**
   * 提交代码
   */
  doSubmitQuestionByPost: (questionSubmitAddRequest) => {
    return AxiosClient.post("/question_submit/do", questionSubmitAddRequest);
  },

  /**
   * 题目提交列表（分页）
   */
  questionSubmitListByPost(questionSubmitListRequest) {
    return AxiosClient.post("/question_submit/list", questionSubmitListRequest);
  },

  /**
   * 通过用户 id 和 题目 id 获取题目提交列表（分页）
   */
  questionSubmitListByUserIdByQuestionIdByPost(questionSubmitListRequest) {
    return AxiosClient.post(
      "/question_submit/list/user",
      questionSubmitListRequest
    );
  },
};
