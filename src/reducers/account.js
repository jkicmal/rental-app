import * as types from '../actions/account/types';

const initialState = {
  accounts: [],
  account: null,
  success: null,
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

// UPDATE
const updateAccountStart = (state) => ({
  ...state,
  account: null,
  success: null,
  error: null,
  loading: true,
});

const updateAccountSuccess = (state, payload) => ({
  ...state,
  success: payload.success,
  error: null,
  loading: false,
});

const updateAccountFail = (state, payload) => ({
  ...state,
  success: null,
  error: payload.error,
  loading: false,
});

// DELETE
const deleteAccountStart = (state) => ({
  ...state,
  account: null,
  success: null,
  error: null,
  loading: true,
});

const deleteAccountSuccess = (state, payload) => ({
  ...state,
  accounts: state.accounts.filter((account) => account.id !== payload.success.accountId),
  success: payload.success,
  error: null,
  loading: false,
});

const deleteAccountFail = (state, payload) => ({
  ...state,
  success: null,
  error: payload.error,
  loading: false,
});

// NOTIFICATIONS
const accountConsumeError = (state) => ({
  ...state,
  error: null,
});

const accountConsumeSuccess = (state) => ({
  ...state,
  success: null,
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
    // UPDATE
    case types.UPDATE_ACCOUNT_START:
      return updateAccountStart(state);
    case types.UPDATE_ACCOUNT_FAIL:
      return updateAccountFail(state, action.payload);
    case types.UPDATE_ACCOUNT_SUCCESS:
      return updateAccountSuccess(state, action.payload);
    // DELETE
    case types.DELETE_ACCOUNT_START:
      return deleteAccountStart(state);
    case types.DELETE_ACCOUNT_FAIL:
      return deleteAccountFail(state, action.payload);
    case types.DELETE_ACCOUNT_SUCCESS:
      return deleteAccountSuccess(state, action.payload);
    // NOTIFICATIONS
    case types.ACCOUNT_CONSUME_ERROR:
      return accountConsumeError(state);
    case types.ACCOUNT_CONSUME_SUCCESS:
      return accountConsumeSuccess(state);
    default:
      return state;
  }
};
