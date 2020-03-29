import axios from 'axios';

import * as types from './types';
import { resourcePaths } from '../../config/api';
import { resourceQueryParamsToPathParams } from '../../helpers/resource-query-params';
import { serverNotRespondingError } from '../../helpers/errors';
import { createAuthHeader } from '../../helpers/authorization';
import { successTypes } from '../../helpers/constants';

/**
 * FETCH MANY
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
  payload: { error }
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
    console.log(error);
    const err = error.response ? error.response.data.data : serverNotRespondingError;
    return dispatch(fetchProductsFail(err));
  }
};

/**
 * FETCH ONE
 */
const fetchProductStart = () => ({
  type: types.FETCH_PRODUCT_START
});

const fetchProductSuccess = fetchedProduct => ({
  type: types.FETCH_PRODUCT_SUCCESS,
  payload: { fetchedProduct }
});

const fetchProductFail = error => ({
  type: types.FETCH_PRODUCT_FAIL,
  payload: { error }
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
    console.log(error);
    const err = error.response ? error.response.data.data : serverNotRespondingError;
    return dispatch(fetchProductFail(err));
  }
};

/**
 * DELETE
 */
const deleteProductStart = () => ({
  type: types.DELETE_PRODUCT_START
});

const deleteProductSuccess = deletedProduct => ({
  type: types.DELETE_PRODUCT_SUCCESS,
  payload: {
    deletedProduct,
    success: {
      type: successTypes.DELETE_SUCCESS,
      message: 'Product deleted'
    }
  }
});

const deleteProductFail = error => ({
  type: types.DELETE_PRODUCT_FAIL,
  payload: { error }
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
    console.log(error);
    const err = error.response ? error.response.data.data : serverNotRespondingError;
    return dispatch(deleteProductFail(err));
  }
};

/**
 * CREATE
 */
const createProductStart = () => ({
  type: types.CREATE_PRODUCT_START
});

const createProductSuccess = createdProduct => ({
  type: types.CREATE_PRODUCT_SUCCESS,
  payload: {
    createdProduct,
    success: {
      type: successTypes.CREATE_SUCCESS,
      message: 'Product created',
      productId: createdProduct.id
    }
  }
});

const createProductFail = error => ({
  type: types.CREATE_PRODUCT_FAIL,
  payload: { error }
});

export const createProduct = (productFormData, apiAccessType, token) => async dispatch => {
  dispatch(createProductStart());
  try {
    const response = await axios.post(
      resourcePaths[apiAccessType].products.many(),
      productFormData,
      { headers: createAuthHeader(token) }
    );
    const createdProduct = response.data.data;
    return dispatch(createProductSuccess(createdProduct));
  } catch (error) {
    console.log(error);
    const err = error.response ? error.response.data.data : serverNotRespondingError;
    return dispatch(createProductFail(err));
  }
};

/**
 * UPDATE
 */
const updateProductStart = () => ({
  type: types.UPDATE_PRODUCT_START
});

const updateProductSuccess = updatedProduct => ({
  type: types.UPDATE_PRODUCT_SUCCESS,
  payload: {
    updatedProduct,
    success: {
      type: successTypes.UPDATE_SUCCESS,
      message: 'Product updated',
      productId: updatedProduct.id
    }
  }
});

const updateProductFail = (status, error) => ({
  type: types.UPDATE_PRODUCT_FAIL,
  payload: { error }
});

export const updateProduct = (
  productId,
  productFormData,
  apiAccessType,
  token
) => async dispatch => {
  dispatch(updateProductStart());
  try {
    const response = await axios.put(
      resourcePaths[apiAccessType].products.one(productId),
      productFormData,
      { headers: createAuthHeader(token) }
    );
    const createdProduct = response.data.data;
    return dispatch(updateProductSuccess(createdProduct));
  } catch (error) {
    console.log(error);
    const err = error.response ? error.response.data.data : serverNotRespondingError;
    return dispatch(updateProductFail(err));
  }
};

/**
 * NOTIFICATIONS
 */
export const productConsumeSuccess = () => ({
  type: types.PRODUCT_CONSUME_SUCCESS
});

export const productConsumeError = () => ({
  type: types.PRODUCT_CONSUME_ERROR
});
