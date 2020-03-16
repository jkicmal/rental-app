import axios from 'axios';
import { paths } from '../../config/api';
import {
  LOGIN_START,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGIN_ALERT_CLOSE,
  LOGOUT
} from './types';

const loginStart = () => ({
  type: LOGIN_START
});

const loginSuccess = loginData => ({
  type: LOGIN_SUCCESS,
  payload: {
    token: loginData.token
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

export const logout = () => ({ type: LOGOUT });

// TODO: Clear timeout if user logsout or logins again
const checkoutAuthTimeout = expirationTime => dispatch => {
  setTimeout(() => {
    dispatch(logout());
  }, expirationTime);
};

export const loginAlertClose = () => dispatch =>
  dispatch({ type: LOGIN_ALERT_CLOSE });

export const login = (email, password) => async dispatch => {
  dispatch(loginStart());
  try {
    const response = await axios.post(paths.auth.login(), { email, password });
    const loginData = response.data.data;
    dispatch(loginSuccess(loginData));
    dispatch(checkoutAuthTimeout(loginData.expiresIn));
  } catch (error) {
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
