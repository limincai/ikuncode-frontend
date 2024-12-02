import AxiosClient from "@/api/AxiosClient";

export const getCaptchaByGet = () => {
  return AxiosClient.get("/captcha/get");
};
