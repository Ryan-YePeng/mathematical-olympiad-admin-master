import md5 from 'js-md5'

export const encrypt = password => {
  return md5('LaosYundaExpress' + md5(password) + 'ManagementSystem')
};
