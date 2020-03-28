const TOKEN_KEY = 'jwt';
const TOKEN_HEADER = 'Authorization';

export const getToken = () => {
  const token = localStorage.getItem(TOKEN_KEY);
  if (token) return token;
  else throw new Error('Token not found in local storage');
};

export const setToken = () => {
  localStorage.setItem(TOKEN_KEY);
};

export const createAuthHeader = token => ({
  [TOKEN_HEADER]: `Bearer ${token}`
});
