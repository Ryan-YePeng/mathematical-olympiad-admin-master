import { axiosD, axiosG, axiosK, axiosP } from "./request";

/**
 * @module 提问
 * */
const getQuestionUrl = "mv/getQuestion?"; // 获得提问
const deleteQuestionUrl = "mv/deleteQuestion?question_id="; // 删除提问
const addAnswerUrl = "mv/addAnswer?"; // 添加回答
const deleteAnswerUrl = "mv/deleteAnswer?answer_id="; // 删除回答

export const getQuestionApi = data => axiosG(getQuestionUrl + data);
export const deleteQuestionApi = data => axiosD(deleteQuestionUrl + data);
export const addAnswerApi = data => axiosK(addAnswerUrl, data);
export const deleteAnswerApi = data => axiosD(deleteAnswerUrl + data);

/**
 * @module 选择题
 * */
const getChoiceUrl = "title/getChoice?"; // 获取选择题
const addChoiceUrl = "title/addChoice"; // 添加选择题
const updateChoiceUrl = "title/updateChoice"; // 修改选择题
const deleteChoiceUrl = "title/deleteChoice?choice_id="; // 删除选择题

export const getChoiceApi = data => axiosG(getChoiceUrl + data);
export const addChoiceApi = data => axiosK(addChoiceUrl, data);
export const updateChoiceApi = data => axiosP(updateChoiceUrl, data);
export const deleteChoiceApi = data => axiosD(deleteChoiceUrl + data);

/**
 * @module 填空题
 * */
const getSubjectiveUrl = "title/getSubjective?"; // 获取填空题
const addSubjectiveUrl = "title/addSubjective"; // 添加填空题
const updateSubjectiveUrl = "title/updateSubjective"; // 修改填空题
const deleteSubjectiveUrl = "title/deleteSubjective?subjective_id="; // 删除填空题

export const getSubjectiveApi = data => axiosG(getSubjectiveUrl + data);
export const addSubjectiveApi = data => axiosK(addSubjectiveUrl, data);
export const updateSubjectiveApi = data => axiosP(updateSubjectiveUrl, data);
export const deleteSubjectiveApi = data => axiosD(deleteSubjectiveUrl + data);
