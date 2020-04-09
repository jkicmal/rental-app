import axios from 'axios';

import * as types from './types';
import { serverNotRespondingError } from '../../helpers/errors';
import { resourceQueryParamsToPathParams } from '../../helpers/resource-query-params';
import { resourcePaths } from '../../config';
import { createAuthHeader } from '../../helpers/authorization';

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
    return dispatch(fetchAccountSuccess(account));
  } catch (error) {
    console.log(error);
    const err = error.response ? error.response.data.data : serverNotRespondingError;
    return dispatch(fetchAccountFail(err));
  }
};
