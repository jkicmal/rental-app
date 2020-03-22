import axios from 'axios';

import * as types from './types';
import { paths } from '../../config/api';
import { resourceQueryParamsToPathParams } from '../../helpers/resource-query-params';
import { apiToAppError } from '../../helpers/errors';

// FETCHING
const fetchProductsStart = () => ({
  type: types.FETCH_PRODUCTS_START
});

const fetchProductsSuccess = fetchedProducts => ({
  type: types.FETCH_PRODUCTS_SUCCESS,
  payload: { fetchedProducts }
});

const fetchProductsFail = (status, error) => ({
  type: types.FETCH_PRODUCTS_FAIL,
  payload: {
    error: {
      status,
      type: error.error,
      message: error.message
    }
  }
});

export const fetchProducts = resourceQueryParams => async dispatch => {
  dispatch(fetchProductsStart());
  try {
    console.log(resourceQueryParams);
    const resourceQueryPathParams = resourceQueryParamsToPathParams(resourceQueryParams);
    const response = await axios.get(paths.product.multiple(resourceQueryPathParams));
    const fetchedProducts = response.data.data;
    return dispatch(fetchProductsSuccess(fetchedProducts));
  } catch (error) {
    const appError = apiToAppError(error.response);
    return dispatch(fetchProductsFail(appError.response, appError.error));
  }
};

// DELETING
const deleteProductStart = () => ({
  type: types.DELETE_PRODUCT_START
});

const deleteProductSuccess = deletedProduct => ({
  type: types.DELETE_PRODUCT_SUCCESS,
  payload: { deletedProduct }
});

const deleteProductFail = (status, error) => ({
  type: types.DELETE_PRODUCT_FAIL,
  payload: {
    error: {
      status,
      type: error.error,
      message: error.message
    }
  }
});

export const deleteProduct = (token, product) => async dispatch => {
  dispatch(deleteProductStart());
  try {
    // TODO: Use token to authorize
    const response = await axios.delete(paths.product.single(product.id));
    const deletedProduct = response.data.data;
    return dispatch(deleteProductSuccess(deletedProduct));
  } catch (error) {
    const appError = apiToAppError(error.response);
    return dispatch(deleteProductFail(appError.response, appError.error));
  }
};
