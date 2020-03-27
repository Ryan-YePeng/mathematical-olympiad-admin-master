import {axiosP} from './request'

const updatePasswordUrl = 'auth/updatePassword'; // 修改密码

export function updatePasswordApi(data) {
  return axiosP(updatePasswordUrl, data)
}
