/**
 * @param value
 * @return {Boolean}
 * @description 判断是否为空
 * */
export const isEmpty = value => {
  return (
    value === undefined ||
    value === null ||
    (typeof value === "object" && Object.keys(value).length === 0) ||
    (typeof value === "string" && value.trim().length === 0)
  );
};
/**
 * @param {String} value
 * @return {String}
 * @description 格式化时间
 * */
export const formatDate = value => {
  let date = new Date(value);
  let year = date.getFullYear();
  let month = (date.getMonth() + 1).toString().padStart(2, "0");
  let day = date
    .getDate()
    .toString()
    .padStart(2, "0");
  return `${year}-${month}-${day}`;
};

/**
 * @param {Object} data
 * @param {Object} value
 * @description value从data中取值
 * */
export const objectEvaluate = (data, value) => {
  for (let key in value) {
    if (data.hasOwnProperty(key)) value[key] = data[key];
  }
};
