import axios from "axios";
import { Message } from "@arco-design/web-vue";
// 进度条
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import GlobalConstant from "@/constant/GlobalConstant";
import router from "@/router";

// 配置 nprogress
NProgress.configure({ showSpinner: false }); // 隐藏加载图标

// 网路错误处理
const doNetConnectError = () => {
  // 进入网络错误页面
  Message.error("网络连接错误");
  router.push("/net-error");
};

// 创建 axios 实例
const AxiosClient = axios.create({
  baseURL: GlobalConstant.AXIOS_BASE_URL,
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
    // 处理网络错误
    doNetConnectError();
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
    // 处理网络错误
    doNetConnectError();
    return Promise.reject(error);
  }
);

export default AxiosClient;
