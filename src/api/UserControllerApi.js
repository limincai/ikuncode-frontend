import AxiosClient from "@/api/AxiosClient";

/**
 * 用户退出登陆
 */
export const userLogoutByPost = () => {
  return AxiosClient.post("/user/logout");
};

/**
 * 用户登陆
 */
export const userLoginByPost = (userDTO) => {
  return AxiosClient.post("/user/login", userDTO);
};

/**
 * 获取登陆用户状态
 */
export const getLoginUserVOByGet = () => {
  return AxiosClient.get("/user/get");
};

/**
 * 用户注册
 */
export const userRegisterByPost = (userDTO) => {
  return AxiosClient.post("/user/register", userDTO);
};

export const userRetrievePassword = (userDTO) => {
  return AxiosClient.post("/user/retrieve-password", userDTO);
};
