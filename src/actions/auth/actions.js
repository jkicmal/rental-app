import axios from 'axios';
import { paths } from '../../config/api';
import {
  LOGIN_START,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGIN_ERROR_ALERT_CLOSE,
  LOGOUT
} from './types';

const TOKEN_STORAGE_KEY = 'token';
const TOKEN_EXPIRATION_DATE_STORAGE_KEY = 'tokenExpirationDate';
const ACCOUNT_TYPE_STORAGE_KEY = 'accountType';

const loginStart = () => ({
  type: LOGIN_START
});

const loginSuccess = (responseData, tokenExpirationDate) => ({
  type: LOGIN_SUCCESS,
  payload: {
    token: responseData.token,
    tokenExpirationDate,
    accountType: responseData.accountType
  }
});

const loginFail = (status, error) => ({
  type: LOGIN_FAIL,
  payload: {
    error: {
      status,
      type: error.error,
      message: error.message
    }
  }
});

export const logout = () => {
  localStorage.removeItem(TOKEN_STORAGE_KEY);
  localStorage.removeItem(TOKEN_EXPIRATION_DATE_STORAGE_KEY);
  localStorage.removeItem(ACCOUNT_TYPE_STORAGE_KEY);
  return { type: LOGOUT };
};

/**
 * TODO:
 * Create components that will log out user basing
 * on expiresIn in state
 */

export const loginErrorAlertClose = () => dispatch =>
  dispatch({ type: LOGIN_ERROR_ALERT_CLOSE });

export const login = loginFormData => async dispatch => {
  dispatch(loginStart());
  try {
    const response = await axios.post(paths.auth.login(), loginFormData);
    const responseData = response.data.data;

    const tokenExpirationDate = new Date(Date.now() + responseData.expiresIn);
    localStorage.setItem(TOKEN_STORAGE_KEY, responseData.token);
    localStorage.setItem(
      TOKEN_EXPIRATION_DATE_STORAGE_KEY,
      tokenExpirationDate
    );
    localStorage.setItem(ACCOUNT_TYPE_STORAGE_KEY, responseData.accountType);

    dispatch(loginSuccess(responseData, tokenExpirationDate));
  } catch (error) {
    console.log(error);
    const { response } = error;
    if (response) {
      dispatch(loginFail(response.status, response.data.data));
    } else {
      dispatch(
        loginFail('CLIENT', {
          error: 'SERVER_NOT_RESPONDING',
          message: 'Sever not responding, please check your connection'
        })
      );
    }
  }
};

/**
 *
 */
export const loginCheckState = () => {
  return dispatch => {
    const token = localStorage.getItem(TOKEN_STORAGE_KEY);
    const tokenExpirationDateString = localStorage.getItem(
      TOKEN_EXPIRATION_DATE_STORAGE_KEY
    );
    const accountType = localStorage.getItem(ACCOUNT_TYPE_STORAGE_KEY);

    if (!token || !tokenExpirationDateString || !accountType)
      dispatch(logout());
    else {
      const tokenExpirationDate = new Date(tokenExpirationDateString);
      if (tokenExpirationDate > new Date()) {
        dispatch(loginSuccess({ token, tokenExpirationDate, accountType }));
      } else {
        dispatch(logout());
      }
    }
  };
};
