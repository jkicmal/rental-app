import axios from 'axios';
import { paths } from '../../config/api';
import * as types from './types';
import { apiToAppError } from '../../helpers/errors';

const TOKEN_STORAGE_KEY = 'token';
const TOKEN_EXPIRATION_DATE_STORAGE_KEY = 'tokenExpirationDate';
const ACCOUNT_TYPE_STORAGE_KEY = 'accountType';

const loginStart = () => ({
  type: types.LOGIN_START
});

const loginSuccess = loginData => ({
  type: types.LOGIN_SUCCESS,
  payload: { loginData }
});

const loginFail = (status, error) => ({
  type: types.LOGIN_FAIL,
  payload: {
    error: {
      status,
      type: error.error,
      message: error.message
    }
  }
});

/**
 * Local storage related
 */
const getLoginDataFromLocalStorage = () => {
  const token = localStorage.getItem(TOKEN_STORAGE_KEY);
  const tokenExpirationDate = new Date(
    localStorage.getItem(TOKEN_EXPIRATION_DATE_STORAGE_KEY)
  );
  const accountType = localStorage.getItem(ACCOUNT_TYPE_STORAGE_KEY);

  if (!token || !tokenExpirationDate || !accountType) return null;

  return { token, tokenExpirationDate, accountType };
};

const saveLoginDataToLocalStorage = loginData => {
  const { token, tokenExpirationDate, accountType } = loginData;

  localStorage.setItem(TOKEN_STORAGE_KEY, token);
  localStorage.setItem(TOKEN_EXPIRATION_DATE_STORAGE_KEY, tokenExpirationDate);
  localStorage.setItem(ACCOUNT_TYPE_STORAGE_KEY, accountType);
};

const removeLoginDataFromLocalStorage = () => {
  localStorage.removeItem(TOKEN_STORAGE_KEY);
  localStorage.removeItem(TOKEN_EXPIRATION_DATE_STORAGE_KEY);
  localStorage.removeItem(ACCOUNT_TYPE_STORAGE_KEY);
};

export const logout = () => {
  removeLoginDataFromLocalStorage();
  return { type: types.LOGOUT };
};

/**
 * TODO:
 * Create components that will log out user basing
 * on expiresIn in state
 */

export const loginErrorAlertClose = () => dispatch =>
  dispatch({ type: types.LOGIN_ERROR_ALERT_CLOSE });

export const login = loginFormData => async dispatch => {
  dispatch(loginStart());
  try {
    const response = await axios.post(paths.login.login(), loginFormData);
    const responseData = response.data.data;

    const loginData = {
      tokenExpirationDate: new Date(Date.now() + responseData.expiresIn),
      token: responseData.token,
      accountType: responseData.accountType
    };
    saveLoginDataToLocalStorage(loginData);

    dispatch(loginSuccess(loginData));
  } catch (error) {
    const appError = apiToAppError(error.response);
    dispatch(loginFail(appError.response, appError.error));
  }
};

export const loginCheckState = () => dispatch => {
  const loginData = getLoginDataFromLocalStorage();
  if (!loginData) return dispatch(logout());
  else if (loginData.tokenExpirationDate > new Date())
    return dispatch(loginSuccess(loginData));
  else dispatch(logout());
};
