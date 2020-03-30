import axios from 'axios';
import { resourcePaths, apiAccessTypes } from '../../config/api';
import * as types from './types';
import { serverNotRespondingError } from '../../helpers/errors';
import {
  saveLoginDataToLocalStorage,
  getLoginDataFromLocalStorage,
  removeLoginDataFromLocalStorage
} from '../../helpers/login-storage';

/**
 * TODO:
 * Create components that will log out user based on expiresIn in state
 */

const loginStart = () => ({
  type: types.LOGIN_START
});

const loginSuccess = loginData => ({
  type: types.LOGIN_SUCCESS,
  payload: {
    loginData,
    success: {
      type: 'LOGIN_SUCCESS',
      message: 'Successfuly logged in'
    }
  }
});

const loginFail = error => ({
  type: types.LOGIN_FAIL,
  payload: { error }
});

export const logout = () => {
  removeLoginDataFromLocalStorage();
  return { type: types.LOGOUT };
};

export const loginConsumeError = () => dispatch => dispatch({ type: types.LOGIN_CONSUME_ERROR });

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
    console.log(error);
    const err = error.response ? error.response.data.data : serverNotRespondingError;
    return dispatch(loginFail(err));
  }
};

export const loginCheckState = () => dispatch => {
  const loginData = getLoginDataFromLocalStorage();
  if (!loginData) return dispatch(logout());
  else if (loginData.tokenExpirationDate > new Date()) return dispatch(loginSuccess(loginData));
  else dispatch(logout());
};
