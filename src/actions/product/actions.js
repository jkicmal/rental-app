import axios from 'axios';

import * as types from './types';
import { resourcePaths } from '../../config/api';
import { resourceQueryParamsToPathParams } from '../../helpers/resource-query-params';
import { apiToAppError } from '../../helpers/errors';
import { createAuthHeader } from '../../helpers/authorization';

/**
 * Fetch many
 */
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

export const fetchProducts = (resourceQueryParams, apiAccessType, token) => async dispatch => {
  dispatch(fetchProductsStart());
  try {
    const resourceQueryPathParams = resourceQueryParamsToPathParams(resourceQueryParams);
    const response = await axios.get(
      resourcePaths[apiAccessType].products.many(resourceQueryPathParams),
      { headers: createAuthHeader(token) }
    );
    const fetchedProducts = response.data.data;
    return dispatch(fetchProductsSuccess(fetchedProducts));
  } catch (error) {
    const appError = apiToAppError(error.response);
    return dispatch(fetchProductsFail(appError.response, appError.error));
  }
};

/**
 * Fetch one
 */
const fetchProductStart = () => ({
  type: types.FETCH_PRODUCT_START
});

const fetchProductSuccess = fetchedProduct => ({
  type: types.FETCH_PRODUCT_SUCCESS,
  payload: { fetchedProduct }
});

const fetchProductFail = (status, error) => ({
  type: types.FETCH_PRODUCT_FAIL,
  payload: {
    error: {
      status,
      type: error.error,
      message: error.message
    }
  }
});

export const fetchProduct = (id, resourceQueryParams, apiAccessType, token) => async dispatch => {
  dispatch(fetchProductStart());
  try {
    const resourceQueryPathParams = resourceQueryParamsToPathParams(resourceQueryParams);
    const response = await axios.get(
      resourcePaths[apiAccessType].products.one(id, resourceQueryPathParams),
      { headers: createAuthHeader(token) }
    );
    const fetchedProduct = response.data.data;
    return dispatch(fetchProductSuccess(fetchedProduct));
  } catch (error) {
    const appError = apiToAppError(error.response);
    return dispatch(fetchProductFail(appError.response, appError.error));
  }
};

/**
 * Delete
 */
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

export const deleteProduct = (product, apiAccessType, token) => async dispatch => {
  dispatch(deleteProductStart());
  try {
    const response = await axios.delete(resourcePaths[apiAccessType].products.one(product.id), {
      headers: createAuthHeader(token)
    });
    const deletedProduct = response.data.data;
    return dispatch(deleteProductSuccess(deletedProduct));
  } catch (error) {
    const appError = apiToAppError(error.response);
    return dispatch(deleteProductFail(appError.response, appError.error));
  }
};

/**
 * Update
 */

/**
 * Create
 */
