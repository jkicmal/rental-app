import axios from 'axios';
import { resourcePaths, apiAccessTypes } from '../../config/api';
import * as types from './types';
import { apiToAppError } from '../../helpers/errors';
import {
  saveLoginDataToLocalStorage,
  getLoginDataFromLocalStorage,
  removeLoginDataFromLocalStorage
} from '../../helpers/login-storage';

// TODO: Create components that will log out user based on expiresIn in state

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

export const logout = () => {
  removeLoginDataFromLocalStorage();
  return { type: types.LOGOUT };
};

export const loginErrorAlertClose = () => dispatch =>
  dispatch({ type: types.LOGIN_ERROR_ALERT_CLOSE });

export const login = loginFormData => async dispatch => {
  dispatch(loginStart());
  try {
    const response = await axios.post(
      resourcePaths[apiAccessTypes.SHARED].auth.login(),
      loginFormData
    );
    const responseData = response.data.data;

    const loginData = {
      tokenExpirationDate: new Date(Date.now() + responseData.expiresIn),
      token: responseData.token,
      accountType: responseData.accountType
    };
    saveLoginDataToLocalStorage(loginData);

    return dispatch(loginSuccess(loginData));
  } catch (error) {
    const appError = apiToAppError(error.response);
    return dispatch(loginFail(appError.response, appError.error));
  }
};

export const loginCheckState = () => dispatch => {
  const loginData = getLoginDataFromLocalStorage();
  if (!loginData) return dispatch(logout());
  else if (loginData.tokenExpirationDate > new Date()) return dispatch(loginSuccess(loginData));
  else dispatch(logout());
};
