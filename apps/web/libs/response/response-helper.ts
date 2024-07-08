export const responseError = <T = null>(message: string, errors?: T) => {
  return { success: false, errors, message };
};

export const responseSuccess = <T = null>(message: string, data?: T) => {
  return { success: true, data, message };
};
