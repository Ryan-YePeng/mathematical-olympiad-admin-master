import {axiosK} from './request'

// 登陆
const loginUrl = 'auth/login';

export function login(data) {
  return axiosK(loginUrl, data)
}
