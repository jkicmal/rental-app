import * as types from '../actions/login/types';

const initialState = {
  token: null,
  error: null,
  loading: false,
  expirationTime: null,
};

const loginStart = (state) => ({
  ...state,
  error: null,
  loading: true,
  expirationTime: null,
});

const loginSuccess = (state, payload) => ({
  ...state,
  token: payload.loginData.token,
  accountType: payload.loginData.accountType,
  error: null,
  loading: false,
  expirationTime: payload.loginData.expirationTime,
});

const loginFail = (state, payload) => ({
  ...state,
  token: null,
  accountType: null,
  error: payload.error,
  loading: false,
  expirationTime: null,
});

const loginErrorAlertClose = (state) => ({
  ...state,
  error: null,
});

const logout = (state) => ({
  ...state,
  token: null,
  accountType: null,
  loading: false,
  error: null,
  expirationTime: null,
});

export const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.LOGIN_START:
      return loginStart(state);
    case types.LOGIN_SUCCESS:
      return loginSuccess(state, action.payload);
    case types.LOGIN_FAIL:
      return loginFail(state, action.payload);
    case types.LOGIN_ERROR_ALERT_CLOSE:
      return loginErrorAlertClose(state);
    case types.LOGOUT:
      return logout(state);
    default:
      return state;
  }
};
