import Vue from "vue";

/**
 * @description 改变窗口标题
 **/
Vue.directive("title", {
  // 第一种方式  v-title="'首页'"
  bind(el, binding) {
    document.title = binding.value;
  },
  //第二种方式 v-title data-title="所需要的标题"
  inserted: function(el) {
    document.title = el.dataset.title;
  }
});

/**
 * @description 防止同一时间多次点击
 **/
let openDelay = false;
Vue.directive("intervalClick", function(el, binding) {
  el.onclick = function() {
    if (openDelay) return;
    openDelay = !openDelay;
    if (!binding.value) {
      alert("未传入Value数据！");
      return;
    }
    let func = binding.value["func"];
    let time = binding.value["time"];
    if (typeof time !== "number") {
      alert("传入等待时间错误");
      return;
    }
    let args = [];
    for (const key in binding.value) {
      if (binding.value.hasOwnProperty(key)) {
        if (key === "func" || key === "time") continue;
        args.push(binding.value[key]);
      }
    }
    setTimeout(() => {
      openDelay = !openDelay;
    }, time);
    func(...args);
  };
});
