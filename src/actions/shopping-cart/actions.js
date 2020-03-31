import * as types from './types';

export const addProductToShoppingCart = product => ({
  type: types.SHOPPING_CART_ADD_PRODUCT,
  payload: { product }
});

export const removeProductFromShoppingCart = product => ({
  type: types.SHOPPING_CART_REMOVE_PRODUCT,
  payload: { product }
});

export const resetShoppingCart = () => ({
  type: types.SHOPPING_CART_RESET
});
