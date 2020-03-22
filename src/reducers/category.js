import * as types from '../actions/category/types';

/**
 * TODO:
 * _START and _FAIL actions are missing...
 * they should be implemented in end product
 */

const initialState = {
  categories: [],
  error: null,
  loading: false
};

const fetchCategoriesSuccess = (state, payload) => ({
  categories: payload.fetchedCategories,
  error: null,
  loading: false
});

const createCategorySuccess = (state, payload) => ({
  categories: [payload.createdCategory, ...state.categories],
  error: null,
  loading: false
});

const updateCategorySuccess = (state, payload) => ({
  categories: state.categories.map(category => {
    const { updatedCategory } = payload;
    if (category.id !== updatedCategory.id) return category;
    return {
      ...category,
      ...updatedCategory
    };
  }),
  error: null,
  loading: false
});

const deleteCategorySuccess = (state, payload) => ({
  categories: state.categories.filter(category => category.id !== payload.deletedCategory.id),
  error: null,
  loading: false
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
    default:
      return state;
  }
};
