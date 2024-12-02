import AxiosClient from "@/api/AxiosClient";

export const userLogoutByPost = () => {
  return AxiosClient.post("/user/logout");
};

export const userLoginByPost = (userDTO) => {
  return AxiosClient.post("/user/login", userDTO);
};

export const getLoginUserVOByGet = () => {
  return AxiosClient.get("/user/get");
};

export const userRegisterByPost = (userDTO) => {
  return AxiosClient.post("/user/register", userDTO);
};
