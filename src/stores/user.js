import { defineStore } from "pinia";

export const useLoginUserStore = defineStore("loginUser", {
  state: () => ({
    loginUser: {
      userId: 1,
      userRole: null,
      userAccount: "",
      userEmail: "",
      userNickname: "李民才",
      userAvatarUrl: "",
      createTime: null,
    },
  }),
  actions: {
    setLoginUser(userVO) {
      this.loginUser = userVO;
    },
    updateLoginUser(userVO) {
      this.loginUser = userVO;
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
  },
});
