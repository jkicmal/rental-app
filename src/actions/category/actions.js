import axios from 'axios';
import { paths } from '../../config/api';

// TODO: Implement _START and _FAIL
import * as types from './types';

/**
 * NOTE:
 * 'thunk' lets us make asynchronous operations using redux
 * each action should return a function that calls dispatch
 * when promise is resolved
 */

const fetchCategoriesSuccess = fetchedCategories => ({
  type: types.FETCH_CATEGORIES_SUCCESS,
  payload: { fetchedCategories }
});

// TODO: Implement
// const fetchCategoriesFail = (status, error) => ({});

export const fetchCategories = (token, category) => async dispatch => {
  try {
    // TODO: Use token to authorize
    const response = await axios.get(paths.category.multiple());
    const fetchedCategories = response.data.data;
    dispatch(fetchCategoriesSuccess(fetchedCategories));
  } catch (err) {
    // TODO: Catch
    console.log(err);
  }
};

const createCategorySuccess = createdCategory => ({
  type: types.CREATE_CATEGORY_SUCCESS,
  payload: { createdCategory }
});

// TODO: Implement
// const createCategoryFail = (status, error) => ({});

export const createCategory = (token, category) => async dispatch => {
  try {
    // TODO: Use token to authorize
    const response = await axios.post(paths.category.multiple(), category);
    const createdCategory = response.data.data;
    dispatch(createCategorySuccess(createdCategory));
  } catch (err) {
    // TODO: Catch
    console.log(err);
  }
};

const updateCategorySuccess = updatedCategory => ({
  type: types.UPDATE_CATEGORY_SUCCESS,
  payload: { updatedCategory }
});

// TODO: Implement
// const updateCategoryFail = (status, error) => ({});

export const updateCategory = (token, category) => async dispatch => {
  try {
    // TODO: Use token to authorize
    const response = await axios.put(
      paths.category.single(category.id),
      category
    );
    const updatedCategory = response.data.data;
    dispatch(updateCategorySuccess(updatedCategory));
  } catch (err) {
    // TODO: Catch
    console.log(err);
  }
};

const deleteCategorySuccess = deletedCategory => ({
  type: types.DELETE_CATEGORY_SUCCESS,
  payload: { deletedCategory }
});

// TODO: Implement
// const deleteCategoryFail = (status, error) => ({});

export const deleteCategory = (token, category) => async dispatch => {
  try {
    // TODO: Use token to authorize
    const response = await axios.delete(paths.category.single(category.id));
    const deletedCategory = response.data.data;
    dispatch(deleteCategorySuccess(deletedCategory));
  } catch (err) {
    // TODO: Catch
    console.log(err);
  }
};
