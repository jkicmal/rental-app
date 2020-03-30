import * as types from '../actions/item/types';

/**
 * TODO:
 * _START and _FAIL actions are missing...
 * they should be implemented in end product
 */

const initialState = {
  items: [],
  error: null,
  success: null,
  loading: false
};

const fetchItemsSuccess = (state, payload) => ({
  items: payload.fetchedItems,
  error: null,
  success: null,
  loading: false
});

const createItemSuccess = (state, payload) => ({
  items: [payload.createdItem, ...state.items],
  error: null,
  success: payload.success,
  loading: false
});

const updateItemSuccess = (state, payload) => ({
  items: state.items.map(item => {
    if (item.id !== payload.updatedItem.id) return item;
    return payload.updatedItem;
  }),
  error: null,
  success: payload.success,
  loading: false
});

const deleteItemSuccess = (state, payload) => ({
  items: state.items.filter(item => item.id !== payload.deletedItem.id),
  error: null,
  success: payload.success,
  loading: false
});

const itemConsumeSuccess = state => ({
  ...state,
  success: null
});

export const itemReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_ITEMS_SUCCESS:
      return fetchItemsSuccess(state, action.payload);
    case types.CREATE_ITEM_SUCCESS:
      return createItemSuccess(state, action.payload);
    case types.UPDATE_ITEM_SUCCESS:
      return updateItemSuccess(state, action.payload);
    case types.DELETE_ITEM_SUCCESS:
      return deleteItemSuccess(state, action.payload);
    case types.ITEM_CONSUME_SUCCESS:
      return itemConsumeSuccess(state);
    default:
      return state;
  }
};
