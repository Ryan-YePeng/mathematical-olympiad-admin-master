import {axiosD, axiosG, axiosK, axiosP} from './request'

const getVideoUrl = 'mv/getVideo?'; // 获得视频
const addVideoUrl = 'mv/addVideo'; // 修改视频
const updateVideoUrl = 'mv/updateVideo'; // 删除视频
const deleteVideoUrl = 'mv/deleteVideo?video_id='; // 删除视频

export const getVideoApi = data => axiosG(getVideoUrl + data);
export const addVideoApi = data => axiosK(addVideoUrl, data);
export const updateVideoApi = data => axiosP(updateVideoUrl, data);
export const deleteVideoApi = data => axiosD(deleteVideoUrl + data);
