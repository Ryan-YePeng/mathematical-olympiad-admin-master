import { axiosD, axiosG } from "./request";

const getFeedbackUrl = "auth/getFeedback?"; // 获得反馈
const deleteFeedbackUrl = "auth/deleteFeedback?feedback_id="; // 删除反馈

export const getFeedbackApi = data => axiosG(getFeedbackUrl + data);
export const deleteFeedbackApi = data => axiosD(deleteFeedbackUrl + data);
