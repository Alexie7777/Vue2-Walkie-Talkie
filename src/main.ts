import Vue from "vue";
import App from "./App.vue";
import { firestorePlugin } from "vuefire";
import VueRouter from "vue-router";
import router from "@/router";
import Vuesax from "vuesax";

import "vuesax/dist/vuesax.css";

Vue.config.productionTip = false;

Vue.use(firestorePlugin);
Vue.use(VueRouter);
Vue.use(Vuesax);

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
