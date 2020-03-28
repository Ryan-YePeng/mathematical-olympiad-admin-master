import Vue from "vue";
import { Message, MessageBox, Notification } from "element-ui";

/**
 * @param {String} msg 提示信息
 */
export const successMsg = msg => {
  Message.success(msg);
};

const warnMsg = msg => {
  Message.warning(msg);
};

export const errorMsg = msg => {
  Message.error(msg);
};

const infoMsg = msg => {
  Message.info(msg);
};

const successNotify = msg => {
  Notification.success({
    title: "成功",
    message: msg
  });
};

const warnNotify = msg => {
  Notification.warning({
    title: "警告",
    message: msg
  });
};

const infoNotify = msg => {
  Notification.info({
    title: "消息",
    message: msg
  });
};

const errorNotify = msg => {
  Notification.error({
    title: "错误",
    message: msg
  });
};

/**
 * @param {String} text 提示信息
 * @param {String} type 消息框类型(success, info, error, warning)
 */
const msgBox = (text = "确定执行此操作吗？", type = "warning") => {
  return MessageBox.confirm(text, "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: type
  });
};

/**
 * @param {String} msg
 * @param {String} time
 * @description 报错信息不重复
 */
let errorText = "";
let isForbid = false;
export const errorMessage = (msg, time = 3000) => {
  if (isForbid && msg === errorText) return;
  isForbid = true;
  errorMsg(msg);
  errorText = msg;
  setTimeout(() => {
    isForbid = false;
  }, time);
};

// 全局注册
Vue.prototype.$successMsg = successMsg;
Vue.prototype.$errorMsg = errorMsg;
Vue.prototype.$infoMsg = infoMsg;
Vue.prototype.$warnMsg = warnMsg;
Vue.prototype.$successNotify = successNotify;
Vue.prototype.$errorNotify = errorNotify;
Vue.prototype.$infoNotify = infoNotify;
Vue.prototype.$warnNotify = warnNotify;
Vue.prototype.$msgBox = msgBox;
Vue.prototype.$prompt = MessageBox.prompt;

export default {
  successMsg,
  errorMsg
};
