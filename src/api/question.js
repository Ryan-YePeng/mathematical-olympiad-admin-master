import {axiosD, axiosG} from './request'

const getQuestionUrl = 'mv/getQuestion?'; // 获得提问
const deleteQuestionUrl = 'mv/deleteQuestion?question_id='; // 删除提问

export const getQuestionApi = data => axiosG(getQuestionUrl + data);
export const deleteQuestionApi = data => axiosD(deleteQuestionUrl + data);
