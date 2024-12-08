/* 验证码接口 */
import AxiosClient from "@/api/AxiosClient";

export default {
  /**
   * 获取登陆图片验证码
   */
  getCaptchaByGet: () => {
    return AxiosClient.get("/captcha/get");
  },
};
