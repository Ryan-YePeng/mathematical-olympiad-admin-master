import {axiosFs} from "./request";

// 上传文件
export const uploadFileUrl = "upload/upload";

export function uploadFileApi(data, callback) {
  return axiosFs(uploadFileUrl, data, callback);
}
