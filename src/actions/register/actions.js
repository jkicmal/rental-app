import axios from 'axios';
import * as types from './types';
import { paths } from '../../config/api';
import { serverNotRespondingError } from '../../helpers/errors';

const registerSuccess = () => ({
  type: types.REGISTER_SUCCESS
});

const registerFail = (status, error) => ({
  type: types.REGISTER_FAIL,
  payload: {
    error: {
      status,
      type: error.error,
      message: error.message
    }
  }
});

const registerStart = () => ({
  type: types.REGISTER_START
});

export const registerSuccessAlertClose = () => ({
  type: types.REGISTER_SUCCESS_ALERT_CLOSE
});

export const registerErrorAlertClose = () => ({
  type: types.REGISTER_ERROR_ALERT_CLOSE
});

export const register = registerFormData => async dispatch => {
  dispatch(registerStart());
  try {
    await axios.post(paths.register.register(), registerFormData);
    dispatch(registerSuccess());
  } catch (error) {
    console.log(error);
    const { response } = error;
    if (response) {
      dispatch(registerFail(response.status, response.data.data));
    } else {
      dispatch(
        registerFail(
          serverNotRespondingError.status,
          serverNotRespondingError.error
        )
      );
    }
  }
};
