import * as types from '../actions/rental/types';

const initialState = {
  rentals: [],
  rental: null,
  success: null,
  error: null,
  loading: false
};

const createRentalStart = state => ({
  ...state,
  loading: true
});

const createRentalFail = (state, payload) => ({
  ...state,
  error: payload.error
});

const createRentalSuccess = (state, payload) => ({
  ...state,
  success: payload.success,
  rental: payload.rental,
  error: null,
  loading: false
});

export const rentalReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.CREATE_RENTAL_START:
      return createRentalStart(state);
    case types.CREATE_RENTAL_FAIL:
      return createRentalFail(state, action.payload);
    case types.CREATE_RENTAL_SUCCESS:
      return createRentalSuccess(state, action.payload);
    default:
      return state;
  }
};
