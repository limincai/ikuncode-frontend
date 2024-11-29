/**
 * 判断是否为合法的用户名
 * 账号为 8 - 16 位不允许带特殊字符
 */
const isLegalUserAccount = (userAccount) => {
  const regex = /^[a-zA-Z0-9]{8,16}$/;
  return regex.test(userAccount);
};

/**
 * 判断是否为合法的用户密码
 * 密码为 8 - 16 位不允许带特殊字符
 */
const isLegalUserPassword = (userPassword) => {
  const regex = /^[a-zA-Z0-9]{8,16}$/;
  return regex.test(userPassword);
};

/**
 * 判断是否为合法的邮箱格式
 */
const isLegalUserEmail = (userEmail) => {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return regex.test(userEmail);
};

/**
 * 判断是否为合法的验证码
 */
const isLegalCaptcha = (captcha) => {
  const regex = /^[A-Za-z0-9]{5}$/;
  return regex.test(captcha);
};

export {
  isLegalUserAccount,
  isLegalUserPassword,
  isLegalUserEmail,
  isLegalCaptcha,
};
