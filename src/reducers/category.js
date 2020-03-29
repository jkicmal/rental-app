import * as types from '../actions/category/types';

/**
 * TODO:
 * _START and _FAIL actions are missing...
 * they should be implemented in end product
 */

const initialState = {
  categories: [],
  error: null,
  success: null,
  loading: false
};

const fetchCategoriesSuccess = (state, payload) => ({
  categories: payload.fetchedCategories,
  error: null,
  success: null,
  loading: false
});

const createCategorySuccess = (state, payload) => ({
  categories: [payload.createdCategory, ...state.categories],
  error: null,
  success: payload.success,
  loading: false
});

const updateCategorySuccess = (state, payload) => ({
  categories: state.categories.map(category => {
    if (category.id !== payload.updatedCategory.id) return category;
    return {
      ...category,
      ...payload.updatedCategory
    };
  }),
  error: null,
  success: payload.success,
  loading: false
});

const deleteCategorySuccess = (state, payload) => ({
  categories: state.categories.filter(category => category.id !== payload.deletedCategory.id),
  error: null,
  success: payload.success,
  loading: false
});

const categoryConsumeSuccess = state => ({
  ...state,
  success: null
});

export const categoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_CATEGORIES_SUCCESS:
      return fetchCategoriesSuccess(state, action.payload);
    case types.CREATE_CATEGORY_SUCCESS:
      return createCategorySuccess(state, action.payload);
    case types.UPDATE_CATEGORY_SUCCESS:
      return updateCategorySuccess(state, action.payload);
    case types.DELETE_CATEGORY_SUCCESS:
      return deleteCategorySuccess(state, action.payload);
    case types.CATEGORY_CONSUME_SUCCESS:
      return categoryConsumeSuccess(state);
    default:
      return state;
  }
};
