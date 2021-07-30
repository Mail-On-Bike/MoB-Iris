import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./assets/css/tailwind.css";
import VeeValidate from "vee-validate";
import vClickOutside from "v-click-outside";
import "vue-search-select/dist/VueSearchSelect.css";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {
  faPencilAlt,
  faSyncAlt,
  faTimes,
  faReceipt,
  faWindowMaximize,
  faEye,
  faBicycle,
  faSpinner,
  faTrashAlt,
  faRoute,
  faCheckCircle,
  faChartBar,
} from "@fortawesome/free-solid-svg-icons";
import VueDayjs from "vue-dayjs-plugin";
import VueClipboard from "vue-clipboard2";

Vue.use(VueClipboard);

library.add(
  faPencilAlt,
  faSyncAlt,
  faTimes,
  faReceipt,
  faWindowMaximize,
  faEye,
  faBicycle,
  faSpinner,
  faTrashAlt,
  faRoute,
  faCheckCircle,
  faChartBar
);

Vue.config.productionTip = false;

Vue.use(VeeValidate);
Vue.use(vClickOutside);
Vue.component("font-awesome-icon", FontAwesomeIcon);
Vue.use(VueDayjs);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
