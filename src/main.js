import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import axios from 'axios'
import vueCookies from 'vue-cookies'
import './style/reset.scss'
import './router/beforeEach'

Vue.config.productionTip = false;
Vue.prototype.$axios = axios;
Vue.use(ElementUI);
Vue.use(vueCookies);
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");



