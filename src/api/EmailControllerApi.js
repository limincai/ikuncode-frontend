import AxiosClient from "@/api/AxiosClient";

export const getRegisterCaptchaByPost = (userEmail) => {
  return AxiosClient.post("/email/get-register-captcha", {
    userEmail: userEmail,
  });
};

export const getRetrievePasswordCaptchaByPost = (userEmail) => {
  return AxiosClient.post("/email/get-retrieve-password-captcha", {
    userEmail: userEmail,
  });
};
