import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "HomeView",
    component: () => import("@/views/HomeView.vue"),
  },
];

const router = new VueRouter(
  {
    mode: "history",
    routes,
  },
);

export default router;
