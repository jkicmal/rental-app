import {
  LOGIN_START,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGIN_ALERT_CLOSE,
  LOGOUT
} from '../actions/auth/types';

const initialState = {
  token: null,
  error: null,
  loading: false,
  showAlert: false,
  expirationTime: null
};

const loginStart = state => ({
  ...state,
  error: null,
  loading: true,
  showAlert: false,
  expirationTime: null
});

const loginSuccess = (state, payload) => ({
  ...state,
  token: payload.token,
  accountType: payload.accountType,
  error: null,
  loading: false,
  expirationTime: payload.expirationTime
});

const loginFail = (state, payload) => ({
  ...state,
  token: null,
  accountType: null,
  error: payload.error,
  loading: false,
  showAlert: true,
  expirationTime: null
});

const loginAlertClose = state => ({
  ...state,
  showAlert: false
});

const logout = state => ({
  ...state,
  token: null,
  accountType: null,
  loading: false,
  error: null,
  showAlert: false,
  expirationTime: null
});

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_START:
      return loginStart(state);
    case LOGIN_SUCCESS:
      return loginSuccess(state, action.payload);
    case LOGIN_FAIL:
      return loginFail(state, action.payload);
    case LOGIN_ALERT_CLOSE:
      return loginAlertClose(state);
    case LOGOUT:
      return logout(state);
    default:
      return state;
  }
};
