import * as types from '../actions/account/types';

const initialState = {
  accounts: [],
  account: null,
  error: null,
  loading: false,
};

// FETCH MANY
const fetchAccountsStart = (state) => ({
  ...state,
  accounts: [],
  error: null,
  loading: true,
});

const fetchAccountsSuccess = (state, payload) => ({
  ...state,
  accounts: payload.accounts,
  error: null,
  loading: false,
});

const fetchAccountsFail = (state, payload) => ({
  ...state,
  accounts: [],
  error: payload.error,
  loading: false,
});

// FETCH ONE
const fetchAccountStart = (state) => ({
  ...state,
  account: null,
  error: null,
  loading: true,
});

const fetchAccountSuccess = (state, payload) => ({
  ...state,
  account: payload.account,
  error: null,
  loading: false,
});

const fetchAccountFail = (state, payload) => ({
  ...state,
  accounts: null,
  error: payload.error,
  loading: false,
});

export const accountReducer = (state = initialState, action) => {
  switch (action.type) {
    // FETCH MANY
    case types.FETCH_ACCOUNTS_START:
      return fetchAccountsStart(state);
    case types.FETCH_ACCOUNTS_FAIL:
      return fetchAccountsFail(state, action.payload);
    case types.FETCH_ACCOUNTS_SUCCESS:
      return fetchAccountsSuccess(state, action.payload);
    // FETCH ONE
    case types.FETCH_ACCOUNT_START:
      return fetchAccountStart(state);
    case types.FETCH_ACCOUNT_FAIL:
      return fetchAccountFail(state, action.payload);
    case types.FETCH_ACCOUNT_SUCCESS:
      return fetchAccountSuccess(state, action.payload);
    default:
      return state;
  }
};
