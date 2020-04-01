import axios from 'axios';

import * as types from './types';
import { resourcePaths } from '../../config/api';
import { createAuthHeader } from '../../helpers/authorization';
import { serverNotRespondingError } from '../../helpers/errors';
import { successTypes } from '../../helpers/constants';

const createRentalStart = () => ({
  type: types.CREATE_RENTAL_START
});

const createRentalSuccess = rental => ({
  type: types.CREATE_RENTAL_SUCCESS,
  payload: {
    rental,
    success: { type: successTypes.CREATE_SUCCESS, message: 'Rental Created' }
  }
});

const createRentalFail = error => ({
  type: types.CREATE_RENTAL_FAIL,
  payload: { error }
});

export const createRental = (rentalFormData, apiAccessType, token) => async dispatch => {
  dispatch(createRentalStart());
  try {
    const response = await axios.post(resourcePaths[apiAccessType].rentals.many(), rentalFormData, {
      headers: createAuthHeader(token)
    });
    const rental = response.data.data;
    dispatch(createRentalSuccess(rental));
  } catch (error) {
    console.log(error);
    const err = error.response ? error.response.data.data : serverNotRespondingError;
    return dispatch(createRentalFail(err));
  }
};
