import * as types from '../actions/shopping-cart/types';

const initialState = {
  products: []
};

const addProduct = (state, payload) => ({
  products: [...state.products, payload.product]
});

const removeProduct = (state, payload) => ({
  products: state.products.filter(product => product.id !== payload.product.id)
});

const reset = () => ({
  ...initialState
});

export const shoppingCartReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SHOPPING_CART_ADD_PRODUCT:
      return addProduct(state, action.payload);
    case types.SHOPPING_CART_REMOVE_PRODUCT:
      return removeProduct(state, action.payload);
    case types.SHOPPING_CART_RESET:
      return reset();
    default:
      return state;
  }
};
