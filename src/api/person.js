import {axiosG, axiosP} from './request'

// 获得个人信息
const getUserUrl = 'auth/getUser?u_id=';

export function getUserApi(data) {
  return axiosG(getUserUrl + data)
}

// 修改密码
const updatePasswordUrl = 'auth/updateMima';

export function updatePasswordApi(data) {
  return axiosP(updatePasswordUrl, data)
}
