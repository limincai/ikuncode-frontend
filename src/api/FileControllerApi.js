/* 邮件接口 */
import AxiosClient from "@/api/AxiosClient";

export default {
  /**
   * 上传用户头像
   */
  uploadUserAvatarByPost: (file) => {
    return AxiosClient.post("/file/upload-user-avatar", file, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
};
