import axios from 'axios';
import * as types from './types';
import { paths } from '../../config/api';

const registerSuccess = () => ({
  type: types.REGISTER_SUCCESS
});

const registerFail = () => ({
  type: types.REGISTER_FAIL
});

const registerStart = () => ({
  type: types.REGISTER_START
});

export const register = registerFormData => async dispatch => {
  try {
    await axios.post(paths.register.register(), registerFormData);
  } catch (err) {}
};
