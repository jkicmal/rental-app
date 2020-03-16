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
  showAlert: false
};

const loginStart = state => ({
  ...state,
  error: null,
  loading: true,
  showAlert: false
});

const loginSuccess = (state, payload) => ({
  ...state,
  token: payload.token,
  error: null,
  loading: false
});

const loginFail = (state, payload) => ({
  ...state,
  token: null,
  error: payload.error,
  loading: false,
  showAlert: true
});

const loginAlertClose = state => ({
  ...state,
  showAlert: false
});

const logout = state => ({
  ...state,
  token: null,
  loading: false,
  error: null,
  showAlert: false
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
