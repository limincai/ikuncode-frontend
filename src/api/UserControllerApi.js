/* 用户接口 */
import AxiosClient from "@/api/AxiosClient";

export default {
  userLogoutByPost: () => {
    /**
     * 用户退出登陆
     */
    return AxiosClient.post("/user/logout");
  },

  /**
   * 用户登陆
   */
  userLoginByPost: (userLoginRequest) => {
    return AxiosClient.post("/user/login", userLoginRequest);
  },

  /**
   * 获取登陆用户状态
   */
  getLoginUserVOByGet: () => {
    return AxiosClient.get("/user/get");
  },

  /**
   * 用户注册
   */
  userRegisterByPost: (userRegisterRequest) => {
    return AxiosClient.post("/user/register", userRegisterRequest);
  },

  /**
   * 用户找回密码
   */
  userRetrievePassword: (userRetrievePasswordRequest) => {
    return AxiosClient.post(
      "/user/retrieve-password",
      userRetrievePasswordRequest
    );
  },
};
