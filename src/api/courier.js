import {axiosds, axiosG, axiosK, axiosP} from './request'

// 获得快递员
const getCourierUrl = 'hwz/searchL_courier?';

export function getCourierApi(data) {
  return axiosG(getCourierUrl + data)
}

// 添加快递员
const addCourierUrl = 'hwz/addL_courier';

export function addCourierApi(data) {
  return axiosK(addCourierUrl, data)
}

// 修改快递员
const updateCourierUrl = 'hwz/updateL_courier';

export function updateCourierApi(data) {
  return axiosP(updateCourierUrl, data)
}

// 删除快递员
const deleteCourierUrl = 'hwz/deleteL_courier?longs=';

export function deleteCourierApi(data) {
  return axiosds(deleteCourierUrl, data)
}
