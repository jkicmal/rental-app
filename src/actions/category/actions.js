import axios from 'axios';
import { resourcePaths } from '../../config/api';

import * as types from './types';
import { resourceQueryParamsToPathParams } from '../../helpers/resource-query-params';
import { createAuthHeader } from '../../helpers/authorization';
import { successTypes } from '../../helpers/constants';

/**
 * TODO: Implement _START and _FAIL
 * const fetchCategoriesStart = (status, error) => ({});
 * const createCategoryStart = (status, error) => ({});
 * const updateCategoryStart = (status, error) => ({});
 * const deleteCategoryStart = (status, error) => ({});
 * const fetchCategoriesFail = (status, error) => ({});
 * const createCategoryFail = (status, error) => ({});
 * const updateCategoryFail = (status, error) => ({});
 * const deleteCategoryFail = (status, error) => ({});
 */

/**
 * FETCH MANY
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
 * CREATE
 */
const createCategorySuccess = createdCategory => ({
  type: types.CREATE_CATEGORY_SUCCESS,
  payload: {
    createdCategory,
    success: {
      type: successTypes.CREATE_SUCCESS,
      message: 'Category created'
    }
  }
});

export const createCategory = (categoryFormData, apiAccessType, token) => async dispatch => {
  try {
    const response = await axios.post(
      resourcePaths[apiAccessType].categories.many(),
      categoryFormData,
      { headers: createAuthHeader(token) }
    );
    const createdCategory = response.data.data;
    dispatch(createCategorySuccess(createdCategory));
  } catch (error) {
    console.log(error);
  }
};

/**
 * UPDATE
 */
const updateCategorySuccess = updatedCategory => ({
  type: types.UPDATE_CATEGORY_SUCCESS,
  payload: {
    updatedCategory,
    success: {
      type: successTypes.UPDATE_SUCCESS,
      message: 'Category updated'
    }
  }
});

export const updateCategory = (
  categoryId,
  categoryFormData,
  apiAccessType,
  token
) => async dispatch => {
  try {
    const response = await axios.put(
      resourcePaths[apiAccessType].categories.one(categoryId),
      categoryFormData,
      { headers: createAuthHeader(token) }
    );
    const updatedCategory = response.data.data;
    dispatch(updateCategorySuccess(updatedCategory));
  } catch (error) {
    console.log(error);
  }
};

/**
 * DELETE
 */
const deleteCategorySuccess = deletedCategory => ({
  type: types.DELETE_CATEGORY_SUCCESS,
  payload: {
    deletedCategory,
    success: {
      type: successTypes.DELETE_SUCCESS,
      message: 'Category deleted'
    }
  }
});

export const deleteCategory = (categoryId, apiAccessType, token) => async dispatch => {
  try {
    const response = await axios.delete(resourcePaths[apiAccessType].categories.one(categoryId), {
      headers: createAuthHeader(token)
    });
    const deletedCategory = response.data.data;
    dispatch(deleteCategorySuccess(deletedCategory));
  } catch (error) {
    console.log(error);
  }
};

/**
 * NOTIFICATIONS
 */
export const categoryConsumeSuccess = () => ({
  type: types.CATEGORY_CONSUME_SUCCESS
});

export const categoryConsumeError = () => ({
  type: types.CATEGORY_CONSUME_ERROR
});
