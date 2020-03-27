import {axiosds, axiosG, axiosK, axiosL, axiosP} from './request'

// 录入更改订单
const editOrderUrl = 'hdd/addL_order';

export function editOrderApi(data) {
  return axiosK(editOrderUrl, data)
}

// 删除订单
const deleteOrderUrl = 'hdd/deleteL_order?longs=';

export function deleteOrderApi(data) {
  return axiosds(deleteOrderUrl, data)
}

// 搜索全部订单
const searchOrderUrl = 'hdd/searchL_order?';

export function searchOrderApi(data) {
  return axiosG(searchOrderUrl + data)
}

// 导出订单
const exportOrderUrl = 'hdd/export?';

export function exportOrderApi(data) {
  return axiosL(exportOrderUrl + data)
}

// 通过单号获取id (未编辑过的)
const getIdByOrderUrl = 'hdd/getO_id?';

export function getIdByOrderApi(data) {
  return axiosG(getIdByOrderUrl + data)
}

/**
 * @module 批量编辑订单
 * */

// 通过单号获取id (已经编辑过的)
const getIdByOrderHadEditedUrl = 'hdd/getIDwhoBEUse?s=';

export function getIdByOrderHadEditedApi(data) {
  return axiosG(getIdByOrderHadEditedUrl + data)
}

//  批量修改订单
const editMoreOrderUrl = 'hdd/moreWULIU';

export function editMoreOrderApi(data) {
  return axiosK(editMoreOrderUrl, data)
}
