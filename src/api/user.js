import {axiosD, axiosG, axiosP} from './request'

const getUserUrl = 'auth/getUser?'; // 获得用户
const updateUserUrl = 'auth/updateUser'; // 修改用户
const deleteUserUrl = 'auth/deleteUser?user_id='; // 删除用户

export const getUserApi = data => axiosG(getUserUrl + data);
export const updateUserApi = data => axiosP(updateUserUrl, data);
export const deleteUserApi = data => axiosD(deleteUserUrl + data);
