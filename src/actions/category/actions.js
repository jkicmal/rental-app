import axios from 'axios';
import { paths, resourcePaths } from '../../config/api';

import * as types from './types';
import { resourceQueryParamsToPathParams } from '../../helpers/resource-query-params';
import { createAuthHeader } from '../../helpers/authorization';

/**
 * NOTE:
 * 'thunk' lets us make asynchronous operations using redux
 * each action should return a function that calls dispatch
 * when promise is resolved
 */

/**
 * TODO: Implement _START and _FAIL
 * const fetchCategoriesFail = (status, error) => ({});
 * const createCategoryFail = (status, error) => ({});
 * const updateCategoryFail = (status, error) => ({});
 * const deleteCategoryFail = (status, error) => ({});
 */

/**
 * Fetch many
 */
const fetchCategoriesSuccess = fetchedCategories => ({
  type: types.FETCH_CATEGORIES_SUCCESS,
  payload: { fetchedCategories }
});

export const fetchCategories = (resourceQueryParams, apiAccessType, token) => async dispatch => {
  try {
    const resourceQueryPathParams = resourceQueryParamsToPathParams(resourceQueryParams);
    const response = await axios.get(
      resourcePaths[apiAccessType].categories.many(resourceQueryPathParams),
      { headers: createAuthHeader(token) }
    );
    const fetchedCategories = response.data.data;
    dispatch(fetchCategoriesSuccess(fetchedCategories));
  } catch (error) {
    console.log(error);
  }
};

/**
 * Create
 */
const createCategorySuccess = createdCategory => ({
  type: types.CREATE_CATEGORY_SUCCESS,
  payload: { createdCategory }
});

export const createCategory = (category, apiAccessType, token) => async dispatch => {
  try {
    const response = await axios.post(resourcePaths[apiAccessType].categories.many(), category, {
      headers: createAuthHeader(token)
    });
    const createdCategory = response.data.data;
    dispatch(createCategorySuccess(createdCategory));
  } catch (error) {
    console.log(error);
  }
};

/**
 * Update
 */
const updateCategorySuccess = updatedCategory => ({
  type: types.UPDATE_CATEGORY_SUCCESS,
  payload: { updatedCategory }
});

export const updateCategory = (category, apiAccessType, token) => async dispatch => {
  try {
    const response = await axios.put(
      resourcePaths[apiAccessType].categories.one(category.id),
      category,
      { headers: createAuthHeader(token) }
    );
    const updatedCategory = response.data.data;
    dispatch(updateCategorySuccess(updatedCategory));
  } catch (error) {
    console.log(error);
  }
};

/**
 * Delete
 */
const deleteCategorySuccess = deletedCategory => ({
  type: types.DELETE_CATEGORY_SUCCESS,
  payload: { deletedCategory }
});

export const deleteCategory = (category, apiAccessType, token) => async dispatch => {
  try {
    const response = await axios.delete(resourcePaths[apiAccessType].categories.one(category.id), {
      headers: createAuthHeader(token)
    });
    const deletedCategory = response.data.data;
    dispatch(deleteCategorySuccess(deletedCategory));
  } catch (error) {
    console.log(error);
  }
};
