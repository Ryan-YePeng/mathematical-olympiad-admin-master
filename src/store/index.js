import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import * as Cookies from "js-cookie";

Vue.use(Vuex);

// 自动获取modules下的*.js
const modulesFiles = require.context("./modules", true, /\.js$/);
const modules = modulesFiles.keys().reduce((modules, modulePath) => {
  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, "$1");
  const value = modulesFiles(modulePath);
  modules[moduleName] = value.default;
  return modules;
}, {});

const plugins = [
  createPersistedState({
    key: 'logisticsAdminMasterLayout',
    storage: window.sessionStorage,
    reducer(val) {
      return {
        // 只储存state中的...
        layout: val.layout
      };
    }
  }),
  createPersistedState({
    key: 'logisticsAdminMasterToken',
    storage: {
      getItem: key => Cookies.get(key),
      setItem: (key, value) =>
          Cookies.set(key, value, {expires: 7, secure: false}),
      removeItem: key => Cookies.remove(key)
    },
    reducer(val) {
      return {
        token: val.token,
        userId: val.userId
      };
    }
  })
];

export default new Vuex.Store({
  modules,
  plugins
})
