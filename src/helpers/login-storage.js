const TOKEN_STORAGE_KEY = 'token';
const TOKEN_EXPIRATION_DATE_STORAGE_KEY = 'tokenExpirationDate';
const ACCOUNT_TYPE_STORAGE_KEY = 'accountType';

export const getLoginDataFromLocalStorage = () => {
  const token = localStorage.getItem(TOKEN_STORAGE_KEY);
  const tokenExpirationDate = new Date(
    localStorage.getItem(TOKEN_EXPIRATION_DATE_STORAGE_KEY)
  );
  const accountType = localStorage.getItem(ACCOUNT_TYPE_STORAGE_KEY);

  if (!token || !tokenExpirationDate || !accountType) return null;

  return { token, tokenExpirationDate, accountType };
};

export const saveLoginDataToLocalStorage = loginData => {
  const { token, tokenExpirationDate, accountType } = loginData;

  localStorage.setItem(TOKEN_STORAGE_KEY, token);
  localStorage.setItem(TOKEN_EXPIRATION_DATE_STORAGE_KEY, tokenExpirationDate);
  localStorage.setItem(ACCOUNT_TYPE_STORAGE_KEY, accountType);
};

export const removeLoginDataFromLocalStorage = () => {
  localStorage.removeItem(TOKEN_STORAGE_KEY);
  localStorage.removeItem(TOKEN_EXPIRATION_DATE_STORAGE_KEY);
  localStorage.removeItem(ACCOUNT_TYPE_STORAGE_KEY);
};
