import axios from 'axios';

import * as types from './types';
import { serverNotRespondingError } from '../../helpers/errors';
import { resourceQueryParamsToPathParams } from '../../helpers/resource-query-params';
import { resourcePaths } from '../../config';
import { createAuthHeader } from '../../helpers/authorization';
import { successTypes } from '../../helpers/constants';

// FETCH MANY
const fetchAccountsStart = () => ({
  type: types.FETCH_ACCOUNTS_START,
});

const fetchAccountsSuccess = (accounts) => ({
  type: types.FETCH_ACCOUNTS_SUCCESS,
  payload: { accounts },
});

const fetchAccountsFail = (error) => ({
  type: types.FETCH_ACCOUNTS_FAIL,
  payload: { error },
});

export const fetchAccounts = (resourceQueryParams, apiAccessType, token) => async (dispatch) => {
  dispatch(fetchAccountsStart());
  try {
    const resourceQueryPathParams = resourceQueryParamsToPathParams(resourceQueryParams);
    const response = await axios.get(
      resourcePaths[apiAccessType].accounts.many(resourceQueryPathParams),
      { headers: createAuthHeader(token) }
    );
    const accounts = response.data.data;
    return dispatch(fetchAccountsSuccess(accounts));
  } catch (error) {
    console.log(error);
    const err = error.response ? error.response.data.data : serverNotRespondingError;
    return dispatch(fetchAccountsFail(err));
  }
};

// FETCH ONE
const fetchAccountStart = () => ({
  type: types.FETCH_ACCOUNT_START,
});

const fetchAccountSuccess = (account) => ({
  type: types.FETCH_ACCOUNT_SUCCESS,
  payload: { account },
});

const fetchAccountFail = (error) => ({
  type: types.FETCH_ACCOUNT_FAIL,
  payload: { error },
});

export const fetchAccount = (accountId, resourceQueryParams, apiAccessType, token) => async (
  dispatch
) => {
  dispatch(fetchAccountStart());
  try {
    const resourceQueryPathParams = resourceQueryParamsToPathParams(resourceQueryParams);
    const response = await axios.get(
      resourcePaths[apiAccessType].accounts.one(accountId, resourceQueryPathParams),
      { headers: createAuthHeader(token) }
    );
    const account = response.data.data;
    console.log('fetchAccount');
    return dispatch(fetchAccountSuccess(account));
  } catch (error) {
    console.log(error);
    const err = error.response ? error.response.data.data : serverNotRespondingError;
    return dispatch(fetchAccountFail(err));
  }
};

// UPDATE
const updateAccountStart = () => ({
  type: types.UPDATE_ACCOUNT_START,
});

const updateAccountSuccess = (account) => ({
  type: types.UPDATE_ACCOUNT_SUCCESS,
  payload: {
    success: {
      type: successTypes.UPDATE_SUCCESS,
      message: 'Account updated',
      accountId: account.id,
    },
  },
});

const updateAccountFail = (error) => ({
  type: types.UPDATE_ACCOUNT_FAIL,
  payload: { error },
});

export const updateAccount = (accountId, accountFormData, apiAccessType, token) => async (
  dispatch
) => {
  dispatch(updateAccountStart());
  try {
    const response = await axios.put(
      resourcePaths[apiAccessType].accounts.one(accountId),
      accountFormData,
      { headers: createAuthHeader(token) }
    );
    const account = response.data.data;
    return dispatch(updateAccountSuccess(account));
  } catch (error) {
    console.log(error);
    const err = error.response ? error.response.data.data : serverNotRespondingError;
    return dispatch(updateAccountFail(err));
  }
};

// DELETE
const deleteAccountStart = () => ({
  type: types.DELETE_ACCOUNT_START,
});

const deleteAccountSuccess = (account) => ({
  type: types.DELETE_ACCOUNT_SUCCESS,
  payload: {
    success: {
      type: successTypes.DELETE_SUCCESS,
      message: 'Account deleted',
      accountId: account.id,
    },
  },
});

const deleteAccountFail = (error) => ({
  type: types.DELETE_ACCOUNT_FAIL,
  payload: { error },
});

export const deleteAccount = (accountId, apiAccessType, token) => async (dispatch) => {
  dispatch(deleteAccountStart());
  try {
    const response = await axios.delete(resourcePaths[apiAccessType].accounts.one(accountId), {
      headers: createAuthHeader(token),
    });
    const account = response.data.data;
    return dispatch(deleteAccountSuccess(account));
  } catch (error) {
    console.log(error);
    const err = error.response ? error.response.data.data : serverNotRespondingError;
    return dispatch(deleteAccountFail(err));
  }
};

// NOTIFICATIONS
export const accountConsumeSuccess = () => ({
  type: types.ACCOUNT_CONSUME_SUCCESS,
});

export const accountConsumeError = () => ({
  type: types.ACCOUNT_CONSUME_ERROR,
});
