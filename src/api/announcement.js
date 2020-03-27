import {axiosds, axiosG, axiosK, axiosP} from "@/api/request";

/**
 * @description 公告
 * */

// 新增公告
const addAnnouncementUrl = 'hwz/addL_announcement';

export function addAnnouncementApi(data) {
  return axiosK(addAnnouncementUrl, data)
}

// 删除公告
const deleteAnnouncementUrl = 'hwz/deleteL_announcement?longs=';

export function deleteAnnouncementApi(data) {
  return axiosds(deleteAnnouncementUrl, data)
}

// 编辑公告
const updateAnnouncementUrl = 'hwz/updateL_announcement';

export function updateAnnouncementApi(data) {
  return axiosP(updateAnnouncementUrl, data)
}

// 获得公告
const getAnnouncementUrl = 'hwz/searchL_announcement?';

export function getAnnouncementApi(data) {
  return axiosG(getAnnouncementUrl + data)
}
