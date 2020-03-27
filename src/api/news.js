import {axiosd, axiosds, axiosG, axiosK, axiosP} from './request'

/**
 * @description 分类
 * */

// 新增分类
const addClassificationUrl = 'hwz/addL_newclassification';

export function addClassificationApi(data) {
  return axiosK(addClassificationUrl, data)
}

// 删除分类
const deleteClassificationUrl = 'hwz/deleteL_newclassification?longs=';

export function deleteClassificationApi(data) {
  return axiosd(deleteClassificationUrl + data)
}

// 编辑分类
const updateClassificationUrl = 'hwz/updateL_newclassification';

export function updateClassificationApi(data) {
  return axiosP(updateClassificationUrl, data)
}

// 获得分类
const getClassificationUrl = 'hwz/getallL_newclassification?';

export function getClassificationApi(data) {
  return axiosG(getClassificationUrl + data)
}


/**
 * @description 新闻
 * */

// 新增新闻
const addNewsUrl = 'hwz/addL_news';

export function addNewsApi(data) {
  return axiosK(addNewsUrl, data)
}

// 删除新闻
const deleteNewsUrl = 'hwz/deleteL_news?longs=';

export function deleteNewsApi(data) {
  return axiosd(deleteNewsUrl + data)
}

// 编辑新闻
const updateNewsUrl = 'hwz/updateL_news';

export function updateNewsApi(data) {
  return axiosP(updateNewsUrl, data)
}

// 获得新闻
const getNewsUrl = 'hwz/searchL_news?';

export function getNewsApi(data) {
  return axiosG(getNewsUrl + data)
}
