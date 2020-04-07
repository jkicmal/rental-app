import axios from 'axios';

import * as types from './types';
import { serverNotRespondingError } from '../../helpers/errors';
import { apiAccessTypes, resourcePaths } from '../../config/api';

const fetchStoreStart = () => ({
  type: types.FETCH_STORE_START,
});

const fetchStoreSuccess = (store) => ({
  type: types.FETCH_STORE_SUCCESS,
  payload: { store },
});

const fetchStoreFail = (error) => ({
  type: types.FETCH_STORE_FAIL,
  payload: { error },
});

export const fetchStore = () => async (dispatch) => {
  dispatch(fetchStoreStart());
  try {
    const response = await axios.get(resourcePaths[apiAccessTypes.SHARED].store());
    const store = response.data.data;
    return dispatch(fetchStoreSuccess(store));
  } catch (error) {
    console.log(error);
    const err = error.response ? error.response.data.data : serverNotRespondingError;
    return dispatch(fetchStoreFail(err));
  }
};
