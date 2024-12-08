/* 邮件接口 */
import AxiosClient from "@/api/AxiosClient";

export default {
  /**
   * 获取注册验证码
   */
  getRegisterCaptchaByPost: (userEmail) => {
    return AxiosClient.post("/email/get-register-captcha", {
      userEmail: userEmail,
    });
  },

  /**
   * 获取找回密码验证码
   */
  getRetrievePasswordCaptchaByPost: (userEmail) => {
    return AxiosClient.post("/email/get-retrieve-password-captcha", {
      userEmail: userEmail,
    });
  },
};
