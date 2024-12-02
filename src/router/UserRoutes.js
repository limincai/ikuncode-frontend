import UserLayout from "@/layouts/UserLayout.vue";
import UserHomeView from "@/views/user/UserHomeView.vue";
import UserRegisterView from "@/views/user/UserRegisterView.vue";
import UserLoginView from "@/views/user/UserLoginView.vue";
import UserRetrievePasswordView from "@/views/user/UserRetrievePasswordView.vue";

const UserRoutes = [
  {
    path: "/user",
    name: "用户",
    component: UserLayout,
    children: [
      {
        path: "/user/register",
        name: "用户注册",
        component: UserRegisterView,
      },
      {
        path: "/user/login",
        name: "用户登陆",
        component: UserLoginView,
      },
      {
        path: "/user/retrieve-password",
        name: "找回密码",
        component: UserRetrievePasswordView,
      },
      {
        path: "/user/:userId",
        name: "用户首页",
        component: UserHomeView,
      },
    ],
  },
];

export default UserRoutes;
