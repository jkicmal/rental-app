import * as types from '../actions/store/types';

const initialState = {
  store: [],
  error: null,
  loading: false,
};

const fetchStoreStart = (state) => ({
  ...state,
  loading: true,
  error: null,
});

const fetchStoreSuccess = (state, payload) => ({
  ...state,
  store: payload.store,
  loading: false,
  error: null,
});

const fetchStoreFail = (state, payload) => ({
  ...state,
  loading: false,
  error: payload.error,
});

export const storeReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_STORE_START:
      return fetchStoreStart(state);
    case types.FETCH_STORE_SUCCESS:
      return fetchStoreSuccess(state, action.payload);
    case types.FETCH_STORE_FAIL:
      return fetchStoreFail(state, action.payload);
    default:
      return state;
  }
};
