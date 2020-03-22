import * as types from '../actions/product/types';

/**
 * TODO:
 * _START and _FAIL actions are missing...
 * they should be implemented in end product
 */

const initialState = {
  products: [],
  product: null,
  error: null,
  success: null,
  loading: false
};

const fetchProductsSuccess = (state, payload) => ({
  ...state,
  products: payload.fetchedProducts,
  error: null,
  success: null,
  loading: false
});

const deleteProductSuccess = (state, payload) => ({
  ...state,
  products: state.products.filter(product => product.id !== payload.deletedProduct.id),
  error: null,
  success: null,
  loading: false
});

export const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_PRODUCTS_SUCCESS:
      return fetchProductsSuccess(state, action.payload);
    case types.DELETE_PRODUCT_SUCCESS:
      return deleteProductSuccess(state, action.payload);
    default:
      return state;
  }
};
