import { defineStore } from "pinia";
import UserControllerApi from "@/api/UserControllerApi";
import { reactive } from "vue";

// 设置过期时间为 1 小时
const EXPIRY_TIME = 60 * 60 * 1000;

export const useLoginUserStore1 = defineStore("loginUser", {
  state: () => ({
    loginUser: {
      userId: null,
      userRole: null,
      userAccount: "",
      userProfile: "",
      userEmail: "",
      userNickname: "",
      userAvatarUrl: "",
      createTime: null,
    },
    // 最后一次获取用户信息的时间戳
    lastGetTime: null,
    // 记录是否已经查询过，防止一直查询
    getFlag: false,
  }),
  actions: {
    async getLoginUser() {
      const currentTime = Date.now();

      // 已经超时，更新查询记录
      if (currentTime - this.lastGetTime > EXPIRY_TIME) {
        this.getFlag = false;
      }

      // 已经查询过一次，不能再次查询
      if (this.getFlag) {
        return;
      }

      // 用户存在不去服务器获取
      if (this.loginUser.userId) {
        return;
      }

      // 未超时不去获取
      if (this.lastGetTime && currentTime - this.lastGetTime < EXPIRY_TIME) {
        return;
      }

      // 获取用户信息
      const res = await UserControllerApi.getLoginUserVOByGet();

      // 当前会话用户存在，直接存入 store 中
      if (res) {
        this.setLoginUser(res);
      }

      // 更新当前获取的时间
      this.lastGetTime = currentTime;

      // 更新是否已经查询标志
      this.getFlag = true;
    },
    setLoginUser(userVO) {
      this.loginUser = userVO;
    },
    updateLoginUser(userVO) {
      this.loginUser = userVO;
      this.getFlag = false;
    },
    clearLoginUser() {
      this.loginUser = {
        userId: null,
        userRole: null,
        userAccount: "",
        userEmail: "",
        userNickname: "",
        userAvatarUrl: "",
        createTime: null,
      };
      this.getFlag = false;
    },
  },
  persist: {
    enabled: true,
    strategies: [
      {
        key: "user-login-state",
        storage: localStorage,
      },
    ],
    paths: ["loginUser", "lastGetTime", "getFlag"],
  },
});

export const useLoginUserStore = defineStore(
  "loginUser",
  () => {
    /**
     * 当前登陆用户
     */
    const loginUser = reactive({
      userId: null,
      userRole: null,
      userAccount: "",
      userProfile: "",
      userEmail: "",
      userNickname: "",
      userAvatarUrl: "",
      createTime: null,
    });

    /**
     * 获取登陆用户
     */
    const fetchLoginUser = async () => {
      const res = await UserControllerApi.getLoginUserVOByGet();
      // 更新用户信息
      Object.assign(loginUser, res);
    };

    /**
     * 清除当前用户登陆态,重新赋值
     */
    const clearLoginUser = () => {
      loginUser.userId = null;
      loginUser.userRole = null;
      loginUser.userAccount = "";
      loginUser.userProfile = "";
      loginUser.userEmail = "";
      loginUser.userNickname = "";
      loginUser.userAvatarUrl = "";
      loginUser.createTime = null;
    };

    return {
      loginUser,
      fetchLoginUser,
      clearLoginUser,
    };
  },
  {
    persist: {
      enabled: true, // 开启持久化
      strategies: [
        {
          key: "user-login-state",
          storage: localStorage,
        },
      ],
    },
  }
);
