/* 题目接口 */

import AxiosClient from "@/api/AxiosClient";

export default {
  /**
   * 添加题目（管理员）
   */
  questionAddByPost: (questionAddRequest) => {
    return AxiosClient.post("/question/add", questionAddRequest);
  },
  /**
   * 删除题目（管理员）
   */
  questionDeleteByPost: (questionId) => {
    return AxiosClient.post("/question/delete", { questionId: questionId });
  },
  /**
   * 题目列表（分页）管理员
   */
  questionListByAdminByPost: (questionListRequest) => {
    return AxiosClient.post("/question/list/admin", questionListRequest);
  },
  /**
   * 题目列表（分页）普通用户
   */
  questionListByUserByPost: (questionListRequest) => {
    return AxiosClient.post("/question/list/user", questionListRequest);
  },
  /**
   * 根据 id 获取题目 VO
   */
  questionGetByIdByGet: (questionId) => {
    const url = `/question/${questionId}`;
    return AxiosClient.get(url);
  },
};
