import Vue from "vue";
import App from "./App.vue";
import { firestorePlugin } from "vuefire";
import VueRouter from "vue-router";
import router from "@/router";
import Vuesax from "vuesax";

import "vuesax/dist/vuesax.css";
import "@/style/index.less";

import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {
  faArrowRightToBracket,
  faCircleStop,
  faLeftLong,
  faMask,
  faMicrophone,
  faPaperPlane,
} from "@fortawesome/free-solid-svg-icons";
library.add(
  faArrowRightToBracket,
  faLeftLong,
  faMicrophone,
  faMask,
  faPaperPlane,
  faCircleStop,
);
Vue.component("font-awesome-icon", FontAwesomeIcon);

Vue.config.productionTip = false;

Vue.use(firestorePlugin);
Vue.use(VueRouter);
Vue.use(Vuesax);

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
