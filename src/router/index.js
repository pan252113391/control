import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/control",
    hidden: true,
    meta:{name:'重定向'}
  },
  {
    path: "/login",
    name: "login",
    component: () =>
      import("../views/login.vue"),
    hidden: true,
    meta:{name:'登录'}

  },
  {
    path: "/control",
    name: "control",
    component: () =>
      import("../views/control.vue"),
    meta: { name: "控制台" },
    children: [
      {
        path: "/controlHome",
        name: "controlHome",
        component: () =>
          import("../views/info/controlHome.vue"),
        meta: { name: "首页" }
      },
    ]
  },
  {
    path: "/info",
    name: "info",
    component: () =>
      import("../views/control.vue"),
    meta: { name: "信息管理" },
    children: [
      {
        path: "/infoList",
        name: "infoList",
        component: () =>
          import("../views/info/infoList.vue"),
        meta: { name: "信息列表" }
      },
      {
        path: "/infoClassify",
        name: "infoClassify",
        component: () =>
          import("../views/info/infoClassify.vue"),
        meta: { name: "信息分类" }
      },
    ]
  },
  {
    path: "/user",
    name: "user",
    component: () =>
      import("../views/control.vue"),
    meta: { name: "用户管理" },
    children: [
      {
        path: "/userInfo",
        name: "userInfo",
        component: () =>
          import("../views/info/userInfo.vue"),
        meta: { name: "用户信息" }
      },
    ]
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
