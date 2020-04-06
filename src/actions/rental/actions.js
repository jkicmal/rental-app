import axios from 'axios';

import * as types from './types';
import { resourcePaths } from '../../config/api';
import { createAuthHeader } from '../../helpers/authorization';
import { serverNotRespondingError } from '../../helpers/errors';
import { successTypes } from '../../helpers/constants';
import { resourceQueryParamsToPathParams } from '../../helpers/resource-query-params';

/**
 * CREATE
 */
const createRentalStart = () => ({
  type: types.CREATE_RENTAL_START,
});

const createRentalSuccess = (rental) => ({
  type: types.CREATE_RENTAL_SUCCESS,
  payload: {
    success: { type: successTypes.CREATE_SUCCESS, message: 'Rental Created', rentalId: rental.id },
  },
});

const createRentalFail = (error) => ({
  type: types.CREATE_RENTAL_FAIL,
  payload: { error },
});

export const createRental = (rentalFormData, apiAccessType, token) => async (dispatch) => {
  dispatch(createRentalStart());
  try {
    const response = await axios.post(resourcePaths[apiAccessType].rentals.many(), rentalFormData, {
      headers: createAuthHeader(token),
    });
    const rental = response.data.data;
    dispatch(createRentalSuccess(rental));
  } catch (error) {
    console.log(error);
    const err = error.response ? error.response.data.data : serverNotRespondingError;
    return dispatch(createRentalFail(err));
  }
};

/**
 * FETCH MANY
 */
const fetchRentalsStart = () => ({
  type: types.FETCH_RENTALS_START,
});

const fetchRentalsSuccess = (rentals) => ({
  type: types.FETCH_RENTALS_SUCCESS,
  payload: { rentals },
});

const fetchRentalsFail = (error) => ({
  type: types.FETCH_RENTALS_FAIL,
  payload: { error },
});

export const fetchRentals = (resourceQueryParams, apiAccessType, token) => async (dispatch) => {
  dispatch(fetchRentalsStart());
  try {
    const response = await axios.get(
      resourcePaths[apiAccessType].rentals.many(
        resourceQueryParamsToPathParams(resourceQueryParams)
      ),
      { headers: createAuthHeader(token) }
    );
    const rentals = response.data.data;
    dispatch(fetchRentalsSuccess(rentals));
  } catch (error) {
    console.log(error);
    const err = error.response ? error.response.data.data : serverNotRespondingError;
    return dispatch(fetchRentalsFail(err));
  }
};

/**
 * FETCH ONE
 */
const fetchRentalStart = () => ({
  type: types.FETCH_RENTAL_START,
});

const fetchRentalSuccess = (rental) => ({
  type: types.FETCH_RENTAL_SUCCESS,
  payload: { rental },
});

const fetchRentalFail = (error) => ({
  type: types.FETCH_RENTAL_FAIL,
  payload: { error },
});

export const fetchRental = (rentalId, resourceQueryParams, apiAccessType, token) => async (
  dispatch
) => {
  dispatch(fetchRentalStart());
  try {
    const response = await axios.get(
      resourcePaths[apiAccessType].rentals.one(
        rentalId,
        resourceQueryParamsToPathParams(resourceQueryParams)
      ),
      { headers: createAuthHeader(token) }
    );
    const rentals = response.data.data;
    dispatch(fetchRentalSuccess(rentals));
  } catch (error) {
    console.log(error);
    const err = error.response ? error.response.data.data : serverNotRespondingError;
    return dispatch(fetchRentalFail(err));
  }
};

/**
 * STATUS CHANGE
 */
export const rentalStatusChangeStart = () => ({
  type: types.RENTAL_STATUS_CHANGE_START,
});

export const rentalStatusChangeSuccess = () => ({
  type: types.RENTAL_STATUS_CHANGE_SUCCESS,
  payload: {
    success: {
      type: successTypes.UPDATE_SUCCESS,
      message: 'Rental status changed',
    },
  },
});

export const rentalStatusChangeFail = (error) => ({
  type: types.RENTAL_STATUS_CHANGE_FAIL,
  payload: { error },
});

export const changeRentalStatus = (rentalId, status, apiAccessType, token) => async (dispatch) => {
  dispatch(rentalStatusChangeStart());
  try {
    await axios.post(resourcePaths[apiAccessType].rentals[status](rentalId), {
      headers: createAuthHeader(token),
    });
    dispatch(rentalStatusChangeSuccess());
  } catch (error) {
    console.log(error);
    const err = error.response ? error.response.data.data : serverNotRespondingError;
    return dispatch(rentalStatusChangeFail(err));
  }
};

/**
 * NOTIFICATIONS
 */
export const rentalConsumeSuccess = () => ({
  type: types.RENTAL_CONSUME_SUCCESS,
});

export const rentalConsumeError = () => ({
  type: types.RENTAL_CONSUME_ERROR,
});
