import { createRouter, createWebHistory } from "@ionic/vue-router";
import { RouteRecordRaw } from "vue-router";
import TabsPage from "../views/TabsPage.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/tabs/zxing",
  },
  {
    path: "/tabs",
    component: TabsPage,
    children: [
      {
        path: "zxing",
        component: () => import("../views/ZxingPage.vue"),
      },
      {
        path: "zbar-wasm",
        component: () => import("../views/ZbarWasmPage.vue"),
      },
      {
        path: "quagga2",
        component: () => import("../views/Quagga2Page.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
