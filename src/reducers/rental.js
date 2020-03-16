import { FETCH_RENTAL } from '../actions/rental/types';

const initialState = {
  data: [
    {
      id: new Date().valueOf(),
      name: 'a category'
    }
  ]
};

export const rentalReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_RENTAL:
      return {
        ...state,
        data: [...state.data, { id: new Date().valueOf(), name: 'a category' }]
      };
    default:
      return state;
  }
};
