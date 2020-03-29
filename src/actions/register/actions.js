import axios from 'axios';

import * as types from './types';
import { resourcePaths, apiAccessTypes } from '../../config/api';
import { serverNotRespondingError } from '../../helpers/errors';

const registerSuccess = () => ({
  type: types.REGISTER_SUCCESS,
  payload: {
    success: {
      type: 'REGISTRATION_SUCCESS',
      message: 'Registration completed, you can login'
    }
  }
});

const registerFail = error => ({
  type: types.REGISTER_FAIL,
  payload: { error }
});

const registerStart = () => ({
  type: types.REGISTER_START
});

export const registerConsumeSuccess = () => ({
  type: types.REGISTER_CONSUME_SUCCESS
});

export const registerConsumeError = () => ({
  type: types.REGISTER_CONSUME_ERROR
});

export const register = registerFormData => async dispatch => {
  dispatch(registerStart());
  try {
    await axios.post(resourcePaths[apiAccessTypes.SHARED].auth.register(), registerFormData);
    return dispatch(registerSuccess());
  } catch (error) {
    console.log(error);
    const err = error.response ? error.response.data.data : serverNotRespondingError;
    return dispatch(registerFail(err));
  }
};
