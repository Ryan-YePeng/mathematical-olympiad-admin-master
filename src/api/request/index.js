import axios from "axios";
import qs from "qs";
import {MessageBox} from "element-ui";
import {errorMessage, successMsg, errorMsg} from "@/utils/EUI";
import {isEmpty} from "@/utils/common";
import router from "@/router";
import store from "@/store";

let errorStatus = null;

const service = axios.create({
  timeout: 120000,
  baseURL: process.env.VUE_APP_BASE_API,
  withCredentials: true
});

// 请求拦截
service.interceptors.request.use(
  config => {
    let token = store.getters.token;
    let url = config.url;
    if (isAddToken(url)) {
      config.headers.Authorization = token;
    }
    return config;
  },
  error => {
    errorMessage("请求错误！");
    return Promise.reject(error);
  }
);

// 响应拦截
service.interceptors.response.use(
  response => {
    const {message, status} = response.data;
    if (!isEmpty(message) && status === 200 && typeof message == "string") {
      successMsg(message);
    }
    if (!isEmpty(message) && status !== 200 && typeof message == "string") {
      errorMsg(message);
    }
    return response;
  },
  error => {
    /* 请求超时 */
    if (error.toString().includes("timeout")) {
      errorMessage("请求超时！");
      return Promise.reject(error);
    }
    /* 请求中断 */
    if (
      error.hasOwnProperty("message") &&
      error.message === "Request Interruption"
    ) {
      return Promise.reject(error);
    }
    /* 网络错误 */
    if (
      error.response.hasOwnProperty("statusText") &&
      error.response.statusText === "Internal Server Error"
    ) {
      errorMessage("无法连接到服务器！");
      return Promise.reject(error);
    }
    const {message} = error.response.data;
    const {status} = error.response;
    /* 401 */
    if (status === 401) {
      if (errorStatus === status) return;
      errorStatus = status;
      MessageBox.confirm(
        "登录状态已过期，您可以继续留在该页面，或者重新登录",
        "系统提示",
        {
          confirmButtonText: "重新登录",
          cancelButtonText: "取消",
          type: "warning"
        }
      )
        .then(() => router.push({name: "login"}))
        .catch(() => (errorStatus = null));
    } else if (status === 403) {
      /* 403 */
      router.push({name: "error403"});
    } else {
      /* elseStatus */
      if (!isEmpty(message)) errorMsg(message);
    }
    return Promise.reject(error);
  }
);

/**
 * @description 白名单，不添加token的接口
 * */
const ignoreTokenArray = ["auth/login"];
const isAddToken = url => {
  return ignoreTokenArray.some(item => {
    return url !== item;
  });
};

/**
 * @param {String} url 请求地址
 * @description get
 * */
export const axiosG = url => {
  return new Promise((resolve, reject) => {
    service({
      method: "get",
      url: url
    })
      .then(result => {
        resolve(result);
      })
      .catch(error => {
        reject(error);
      });
  });
};
/**
 * @param {String} url 请求地址
 * @description delete，删除单条数据。
 * */
export const axiosD = url => {
  return new Promise((resolve, reject) => {
    service({
      method: "delete",
      url: url
    })
      .then(result => {
        resolve(result);
      })
      .catch(error => {
        reject(error);
      });
  });
};
/**
 * @param {String} url 请求地址
 * @param {Array} param [1, 2, 3]
 * @description delete，删除多条数据。
 * */
export const axiosDs = (url, param) => {
  return new Promise((resolve, reject) => {
    service({
      method: "delete",
      url: `${url}${param.join(",")}`
    })
      .then(result => {
        resolve(result);
      })
      .catch(error => {
        reject(error);
      });
  });
};
/**
 * @param {String} url 请求地址
 * @param {Object} param {name: LiHua, age: 18}
 * @description post，键值对格式。
 * */
export const axiosK = (url, param) => {
  return new Promise((resolve, reject) => {
    service({
      method: "post",
      url: url,
      data: param,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      transformRequest: [
        data => {
          return qs.stringify(data);
        }
      ]
    })
      .then(result => {
        resolve(result);
      })
      .catch(error => {
        reject(error);
      });
  });
};
/**
 * @param {String} url 请求地址
 * @param {Object} param {name: LiHua, age: 18}
 * @description put，键值对格式。
 * */
export const axiosP = (url, param) => {
  return new Promise((resolve, reject) => {
    service({
      method: "put",
      url: url,
      data: param,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      transformRequest: [
        data => {
          return qs.stringify(data);
        }
      ]
    })
      .then(result => {
        resolve(result);
      })
      .catch(error => {
        reject(error);
      });
  });
};
/**
 * @param {String} url 请求地址
 * @param {Object} param {name: LiHua, age: 18}
 * @description post，JSON格式。
 * */
export const axiosJ = (url, param) => {
  return new Promise((resolve, reject) => {
    service({
      method: "post",
      url: url,
      data: param,
      headers: {
        "Content-Type": "application/json"
      },
      transformRequest: [
        data => {
          return JSON.stringify(data);
        }
      ]
    })
      .then(result => {
        resolve(result);
      })
      .catch(error => {
        reject(error);
      });
  });
};
/**
 * @param {String} url 请求地址
 * @param {FormData} param new FormData()
 * @description post，文件格式。
 * */
export const axiosF = (url, param) => {
  // 文件 formData
  return new Promise((resolve, reject) => {
    service({
      method: "post",
      url: url,
      data: param,
      headers: {
        "Content-Type": "multipart/form-data"
      }
    })
      .then(result => {
        resolve(result);
      })
      .catch(error => {
        reject(error);
      });
  });
};
/**
 * @param {String} url 请求地址
 * @param {Object} param {id: 1, file: [1.png, 2.png]}
 * @param {Function=} callback 回调函数
 * @param {Object=} source 中断请求
 * @description post，文件格式。
 * */
export const axiosFs = (url, param, callback, source) => {
  let cancelToken;
  if (!isEmpty(source)) cancelToken = source.token;
  return new Promise((resolve, reject) => {
    service({
      method: "post",
      url: url,
      data: param,
      timeout: 600000,
      headers: {
        "Content-Type": "multipart/form-data"
      },
      transformRequest: [
        data => {
          const formData = new FormData();
          for (let key in data) {
            if (data[key] instanceof Array)
              for (let i = 0; i < data[key].length; i++)
                formData.append(key, data[key][i]);
            else formData.append(key, data[key]);
          }
          return formData;
        }
      ],
      cancelToken: cancelToken,
      onUploadProgress: progress => {
        if (!isEmpty(callback))
          callback(Math.round((progress.loaded / progress.total) * 100));
      }
    })
      .then(result => {
        resolve(result);
      })
      .catch(error => {
        reject(error);
      });
  });
};
/**
 * @param {String} url 请求地址
 * @description 下载文件。
 * */
export const axiosL = url => {
  return new Promise((resolve, reject) => {
    service({
      method: "get",
      url: url,
      responseType: "blob"
    })
      .then(result => {
        resolve(result);
      })
      .catch(error => {
        reject(error);
      });
  });
};
