import {axiosd, axiosG, axiosK, axiosP} from './request'

// 获得电话
const getPhoneUrl = 'hwz/searchL_service?s=';

export function getPhoneApi(data) {
  return axiosG(getPhoneUrl + data)
}

// 添加电话
const addPhoneUrl = 'hwz/addL_service';

export function addPhoneApi(data) {
  return axiosK(addPhoneUrl, data)
}

// 修改电话
const updatePhoneUrl = 'hwz/updateL_service';

export function updatePhoneApi(data) {
  return axiosP(updatePhoneUrl, data)
}

// 删除电话
const deletePhoneUrl = 'hwz/deleteL_service?longs=';

export function deletePhoneApi(data) {
  return axiosd(deletePhoneUrl + data)
}
