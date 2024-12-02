import axios from "axios";
import { Message } from "@arco-design/web-vue";
// 进度条
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import { BASE_URL } from "@/constant/GlobalConstant";

// 配置 nprogress
NProgress.configure({ showSpinner: false }); // 隐藏加载图标

// 创建 axios 实例
const AxiosClient = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// 请求拦截器
AxiosClient.interceptors.request.use(
  (config) => {
    // 开启进度条
    NProgress.start();
    return config;
  },
  (error) => {
    // 请求错误时关闭进度条
    NProgress.done();
    return Promise.reject(error);
  }
);

// 响应拦截器
AxiosClient.interceptors.response.use(
  (response) => {
    if (response.data.code !== 0) {
      Message.error(response.data.message);
      // 关闭进度条
      NProgress.done();
    } else {
      // 关闭进度条
      NProgress.done();
      // 响应成功直接返回数据
      return response.data.data;
    }
  },
  (error) => {
    // 响应错误时关闭进度条
    NProgress.done();
    return Promise.reject(error);
  }
);

export default AxiosClient;
