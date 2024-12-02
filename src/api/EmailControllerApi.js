import AxiosClient from "@/api/AxiosClient";

export const sendRegisterCaptchaByPost = (userEmail) => {
  return AxiosClient.post("/email/send-register-captcha", {
    userEmail: userEmail,
  });
};
