export const responseError = <T = null, B = null>(
  message: string,
  errors?: T,
  data?: B
) => {
  return { success: false, errors, message, data };
};

export const responseSuccess = <T = null>(message: string, data?: T) => {
  return { success: true, data, message };
};
