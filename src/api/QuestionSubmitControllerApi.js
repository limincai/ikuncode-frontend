/* 题目提交接口 */
import AxiosClient from "@/api/AxiosClient";

export default {
  /**
   * 提交代码
   */
  doSubmitQuestionByPost: (questionSubmitAddRequest) => {
    return AxiosClient.post("/question_submit/do", questionSubmitAddRequest);
  },
};
