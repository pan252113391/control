import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

import storeOne from './modules/storeOne.js'   //引入vuex模块
import storeTwo from './modules/storeTwo.js'   //引入vuex模块

export default new Vuex.Store({
  modules: {
    storeOne,  //模块1
    storeTwo   //模块2
  }
});