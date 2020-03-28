import {axiosD, axiosG, axiosK} from './request'

const getQuestionUrl = 'mv/getQuestion?'; // 获得提问
const deleteQuestionUrl = 'mv/deleteQuestion?question_id='; // 删除提问
const addAnswerUrl = 'mv/addAnswer?'; // 添加回答
const deleteAnswerUrl = 'mv/deleteAnswer?answer_id='; // 删除回答


export const getQuestionApi = data => axiosG(getQuestionUrl + data);
export const deleteQuestionApi = data => axiosD(deleteQuestionUrl + data);
export const addAnswerApi = data => axiosK(addAnswerUrl, data);
export const deleteAnswerApi = data => axiosD(deleteAnswerUrl + data);


