import axios from 'axios';
import { resourcePaths } from '../../config/api';

import * as types from './types';
import { resourceQueryParamsToPathParams } from '../../helpers/resource-query-params';
import { createAuthHeader } from '../../helpers/authorization';
import { successTypes } from '../../helpers/constants';

/**
 * TODO: Implement _START and _FAIL
 * const fetchItemsStart = (status, error) => ({});
 * const createItemStart = (status, error) => ({});
 * const updateItemStart = (status, error) => ({});
 * const deleteItemStart = (status, error) => ({});
 * const fetchItemsFail = (status, error) => ({});
 * const createItemFail = (status, error) => ({});
 * const updateItemFail = (status, error) => ({});
 * const deleteItemFail = (status, error) => ({});
 */

/**
 * FETCH MANY
 */
const fetchItemsSuccess = fetchedItems => ({
  type: types.FETCH_ITEMS_SUCCESS,
  payload: { fetchedItems }
});

export const fetchItems = (resourceQueryParams, apiAccessType, token) => async dispatch => {
  try {
    const resourceQueryPathParams = resourceQueryParamsToPathParams(resourceQueryParams);
    const response = await axios.get(
      resourcePaths[apiAccessType].items.many(resourceQueryPathParams),
      { headers: createAuthHeader(token) }
    );
    const fetchedItems = response.data.data;
    dispatch(fetchItemsSuccess(fetchedItems));
  } catch (error) {
    console.log(error);
  }
};

/**
 * CREATE
 */
const createItemSuccess = createdItem => ({
  type: types.CREATE_ITEM_SUCCESS,
  payload: {
    createdItem,
    success: {
      type: successTypes.CREATE_SUCCESS,
      message: 'Item created'
    }
  }
});

export const createItem = (itemFormData, apiAccessType, token) => async dispatch => {
  try {
    const response = await axios.post(resourcePaths[apiAccessType].items.many(), itemFormData, {
      headers: createAuthHeader(token)
    });
    const createdItem = response.data.data;
    dispatch(createItemSuccess(createdItem));
  } catch (error) {
    console.log(error);
  }
};

/**
 * UPDATE
 */
const updateItemSuccess = updatedItem => ({
  type: types.UPDATE_ITEM_SUCCESS,
  payload: {
    updatedItem,
    success: {
      type: successTypes.UPDATE_SUCCESS,
      message: 'Item updated'
    }
  }
});

export const updateItem = (itemId, itemFormData, apiAccessType, token) => async dispatch => {
  try {
    const response = await axios.put(resourcePaths[apiAccessType].items.one(itemId), itemFormData, {
      headers: createAuthHeader(token)
    });
    const updatedItem = response.data.data;
    dispatch(updateItemSuccess(updatedItem));
  } catch (error) {
    console.log(error);
  }
};

/**
 * DELETE
 */
const deleteItemSuccess = deletedItem => ({
  type: types.DELETE_ITEM_SUCCESS,
  payload: {
    deletedItem,
    success: {
      type: successTypes.DELETE_SUCCESS,
      message: 'Item deleted'
    }
  }
});

export const deleteItem = (itemId, apiAccessType, token) => async dispatch => {
  try {
    const response = await axios.delete(resourcePaths[apiAccessType].items.one(itemId), {
      headers: createAuthHeader(token)
    });
    const deletedItem = response.data.data;
    dispatch(deleteItemSuccess(deletedItem));
  } catch (error) {
    console.log(error);
  }
};

/**
 * NOTIFICATIONS
 */
export const itemConsumeSuccess = () => ({
  type: types.ITEM_CONSUME_SUCCESS
});

export const itemConsumeError = () => ({
  type: types.ITEM_CONSUME_ERROR
});
