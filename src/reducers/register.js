import * as types from '../actions/register/types';

const initialState = {
  error: null,
  success: null,
  loading: false,
};

const registerSuccess = () => ({
  error: null,
  success: {
    message: 'You have been sucessfully registered, you can now login using your email.',
  },
  loading: false,
});

const registerFail = (payload) => ({
  error: payload.error,
  success: null,
  loading: false,
});

const registerStart = () => ({
  error: null,
  success: null,
  loading: true,
});

const registerErrorAlertClose = (state) => ({
  ...state,
  error: null,
});

const registerSuccessAlertClose = (state) => ({
  ...state,
  success: null,
});

export const registerReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.REGISTER_START:
      return registerStart(state);
    case types.REGISTER_SUCCESS:
      return registerSuccess(state);
    case types.REGISTER_FAIL:
      return registerFail(action.payload);
    case types.REGISTER_ERROR_ALERT_CLOSE:
      return registerErrorAlertClose(state);
    case types.REGISTER_SUCCESS_ALERT_CLOSE:
      return registerSuccessAlertClose(state);
    default:
      return state;
  }
};
