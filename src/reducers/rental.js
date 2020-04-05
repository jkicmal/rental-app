import * as types from '../actions/rental/types';

const initialState = {
  rentals: [],
  rental: null,
  success: null,
  error: null,
  loading: false,
};

// CREATE
const createRentalStart = (state) => ({
  ...state,
  loading: true,
});

const createRentalFail = (state, payload) => ({
  ...state,
  error: payload.error,
  loading: false,
});

const createRentalSuccess = (state, payload) => ({
  ...state,
  success: payload.success,
  rental: payload.rental,
  error: null,
  loading: false,
});

// FETCH MANY
const fetchRentalsStart = (state) => ({
  ...state,
  loading: true,
});

const fetchRentalsFail = (state, payload) => ({
  ...state,
  error: payload.error,
  loading: false,
});

const fetchRentalsSuccess = (state, payload) => ({
  ...state,
  rentals: payload.rentals,
  error: null,
  loading: false,
});

// FETCH ONE
const fetchRentalStart = (state) => ({
  ...state,
  loading: true,
});

const fetchRentalFail = (state, payload) => ({
  ...state,
  error: payload.error,
  loading: false,
});

const fetchRentalSuccess = (state, payload) => ({
  ...state,
  rental: payload.rental,
  error: null,
  loading: false,
});

// NOTIFICATIONS
const rentalConsumeSuccess = (state) => ({
  ...state,
  success: null,
});

const rentalConsumeError = (state) => ({
  ...state,
  error: null,
});

export const rentalReducer = (state = initialState, action) => {
  switch (action.type) {
    // CREATE
    case types.CREATE_RENTAL_START:
      return createRentalStart(state);
    case types.CREATE_RENTAL_FAIL:
      return createRentalFail(state, action.payload);
    case types.CREATE_RENTAL_SUCCESS:
      return createRentalSuccess(state, action.payload);
    // FETCH MANY
    case types.FETCH_RENTALS_START:
      return fetchRentalsStart(state);
    case types.FETCH_RENTALS_FAIL:
      return fetchRentalsFail(state, action.payload);
    case types.FETCH_RENTALS_SUCCESS:
      return fetchRentalsSuccess(state, action.payload);
    // FETCH ONE
    case types.FETCH_RENTAL_START:
      return fetchRentalStart(state);
    case types.FETCH_RENTAL_FAIL:
      return fetchRentalFail(state, action.payload);
    case types.FETCH_RENTAL_SUCCESS:
      return fetchRentalSuccess(state, action.payload);
    // NOTIFICATIONS
    case types.RENTAL_CONSUME_ERROR:
      return rentalConsumeError(state);
    case types.RENTAL_CONSUME_SUCCESS:
      return rentalConsumeSuccess(state);
    default:
      return state;
  }
};
