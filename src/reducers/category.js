import * as types from '../actions/category/types';

const initialState = {
  categories: [],
  error: {},
  loading: false,
};

// TODO: ADD fail and start
const fetchCategoriesSuccess = (state, payload) => ({
  categories: payload.fetchedCategories,
  error: {},
  loading: false,
});

// TODO: ADD fail and start
const createCategorySuccess = (state, payload) => ({
  categories: [payload.createdCategory, ...state.categories],
  error: {},
  loading: false,
});

// TODO: ADD fail and start
const updateCategorySuccess = (state, payload) => ({
  categories: state.categories.map((category) => {
    const { updatedCategory } = payload;
    if (category.id !== updatedCategory.id) return category;
    return {
      ...category,
      ...updatedCategory,
    };
  }),
  error: {},
  loading: false,
});

// TODO: ADD fail and start
const deleteCategorySuccess = (state, payload) => ({
  categories: state.categories.filter((category) => category.id !== payload.deletedCategory.id),
  error: {},
  loading: false,
});

export const categoryReducer = (state = initialState, action) => {
  switch (action.type) {
    // TODO: Add _FAIL and _START
    case types.FETCH_CATEGORIES_SUCCESS:
      return fetchCategoriesSuccess(state, action.payload);
    // TODO: Add _FAIL and _START
    case types.CREATE_CATEGORY_SUCCESS:
      return createCategorySuccess(state, action.payload);
    // TODO: Add _FAIL and _START
    case types.UPDATE_CATEGORY_SUCCESS:
      return updateCategorySuccess(state, action.payload);
    // TODO: Add _FAIL and _START
    case types.DELETE_CATEGORY_SUCCESS:
      return deleteCategorySuccess(state, action.payload);
    default:
      return state;
  }
};
