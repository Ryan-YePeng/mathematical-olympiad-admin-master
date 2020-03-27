import Vue from 'vue'

const EventList = {};  //一个事件名称上面可能绑定多个函数，因此是一对多的模式，即观察者模式，数据类型采用对象

/**
 * @param {String} eventName
 * @param {function} callback
 * */
const on = function (eventName, callback) {
  if (!EventList[eventName]) {
    EventList[eventName] = [];
  }
  EventList[eventName].push(callback);
};

/**
 * @param {String} eventName
 * @param {String} params
 * */
const emit = function (eventName, params) {
  if (!EventList[eventName]) return;
  EventList[eventName].map(cb => {
    cb(params)
  })
};

/**
 * @param {String} eventName
 * @param {function} callback
 * */
const off = function (eventName, callback) {
  if (!EventList[eventName]) return;
  if (callback) {
    let index = EventList[eventName].indexOf(callback);
    EventList[eventName].splice(index, 1);
  } else {
    EventList[eventName] = [];
  }
};

// 组件传值
Vue.prototype.$vueEventEmit = emit;
Vue.prototype.$vueEventOn = on;
Vue.prototype.$vueEventOff = off;

/*export default {
  $on: on,
  $emit: emit,
  $off: off
}*/



