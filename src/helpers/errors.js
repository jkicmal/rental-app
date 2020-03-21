export const serverNotRespondingError = {
  status: 'CLIENT',
  error: {
    error: 'SERVER_NOT_RESPONDING',
    message: 'Sever not responding, please check your connection'
  }
};

export const apiToAppError = response => {
  if (!response) return serverNotRespondingError;
  return {
    status: response.status,
    error: {
      error: response.data.data.error,
      message: response.data.data.message
    }
  };
};
