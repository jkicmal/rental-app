import * as types from '../actions/register/types';

const initialState = {
  error: null,
  success: null,
  loading: false
};

const registerSuccess = payload => ({
  error: null,
  success: payload.success,
  loading: false
});

const registerFail = payload => ({
  error: payload.error,
  success: null,
  loading: false
});

const registerStart = () => ({
  error: null,
  success: null,
  loading: true
});

const registerConsumeError = state => ({
  ...state,
  error: null
});

const registerConsumeSuccess = state => ({
  ...state,
  success: null
});

export const registerReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.REGISTER_START:
      return registerStart(state);
    case types.REGISTER_SUCCESS:
      return registerSuccess(action.payload);
    case types.REGISTER_FAIL:
      return registerFail(action.payload);
    case types.REGISTER_CONSUME_ERROR:
      return registerConsumeError(state);
    case types.REGISTER_CONSUME_SUCCESS:
      return registerConsumeSuccess(state);
    default:
      return state;
  }
};
