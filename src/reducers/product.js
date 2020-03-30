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

/**
 * FETCH MANY
 */
const fetchProductsSuccess = (state, payload) => ({
  ...state,
  products: payload.fetchedProducts,
  success: null,
  error: null,
  loading: false
});

const fetchProductsStart = state => ({
  ...state,
  products: [],
  success: null,
  error: null,
  loading: true
});

/**
 * FETCH ONE
 */
const fetchProductSuccess = (state, payload) => ({
  ...state,
  product: payload.fetchedProduct,
  success: null,
  error: null,
  loading: false
});

const fetchProductStart = state => ({
  ...state,
  product: null,
  success: null,
  error: null,
  loading: true
});

/**
 * CREATE
 */
const createProductSuccess = (state, payload) => ({
  ...state,
  products: [...state.products, payload.createdProduct],
  success: payload.success,
  error: null,
  loading: false
});

const createProductStart = state => ({
  ...state,
  product: null,
  success: null,
  error: null,
  loading: true
});

/**
 * UPDATE
 */
const updateProductSuccess = (state, payload) => ({
  ...state,
  products: state.products.map(product => {
    if (product.id !== payload.updatedProduct.id) return product;
    return payload.updatedProduct;
  }),
  success: payload.success,
  error: null,
  loading: false
});

const updateProductStart = state => ({
  ...state,
  product: null,
  success: null,
  error: null,
  loading: true
});

/**
 * DELETE
 */
const deleteProductSuccess = (state, payload) => ({
  ...state,
  products: state.products.filter(product => product.id !== payload.deletedProduct.id),
  success: payload.success,
  error: null,
  loading: false
});

const deleteProductStart = state => ({
  ...state,
  product: null,
  success: null,
  error: null,
  loading: true
});

/**
 * NOTIFICATIONS
 */
const productConsumeError = state => ({
  ...state,
  error: null
});

const productConsumeSuccess = state => ({
  ...state,
  success: null
});

export const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_PRODUCTS_START:
      return fetchProductsStart(state);
    case types.FETCH_PRODUCTS_SUCCESS:
      return fetchProductsSuccess(state, action.payload);
    case types.FETCH_PRODUCT_START:
      return fetchProductStart(state);
    case types.FETCH_PRODUCT_SUCCESS:
      return fetchProductSuccess(state, action.payload);
    case types.DELETE_PRODUCT_START:
      return deleteProductStart(state);
    case types.DELETE_PRODUCT_SUCCESS:
      return deleteProductSuccess(state, action.payload);
    case types.CREATE_PRODUCT_START:
      return createProductStart(state);
    case types.CREATE_PRODUCT_SUCCESS:
      return createProductSuccess(state, action.payload);
    case types.UPDATE_PRODUCT_START:
      return updateProductStart(state);
    case types.UPDATE_PRODUCT_SUCCESS:
      return updateProductSuccess(state, action.payload);
    case types.PRODUCT_CONSUME_ERROR:
      return productConsumeError(state);
    case types.PRODUCT_CONSUME_SUCCESS:
      return productConsumeSuccess(state);
    default:
      return state;
  }
};
