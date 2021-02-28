import Vue from "vue";
import VueRouter from "vue-router";
import MainLayout from "@/layout/MainLayout.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: MainLayout,
    redirect: "/wap",
    children: [
      {
        path: "/wap",
        name: "Wap",
        component: () => import("../views/Wap/Wap.vue"),
      },
      {
        path: "/web",
        name: "Web",
        component: () => import("../views/Web.vue"),
      },
    ],
  },
];

const router = new VueRouter({
  routes,
});

export default router;
