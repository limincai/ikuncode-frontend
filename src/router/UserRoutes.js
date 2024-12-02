import UserLayout from "@/layouts/UserLayout.vue";
import UserLoginView from "@/views/user/UserLoginView.vue";
import UserHomeView from "@/views/user/UserHomeView.vue";

const UserRoutes = [
  {
    path: "/user",
    name: "用户",
    component: UserLayout,
    children: [
      {
        path: "/user/login",
        name: "用户注册",
        component: UserLoginView,
      },
      {
        path: "/user/login",
        name: "用户登陆",
        component: "",
      },
      {
        path: "/user/retrieve-password",
        name: "找回密码",
        component: "",
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
