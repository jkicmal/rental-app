import axios from 'axios';
import { paths } from '../../config/api';
import { FETCH_RENTAL } from './types';

export const fetchRental = () => async dispatch => {
  try {
    const response = await axios.get(paths.rental.single());
    const fetchedRental = response.data.data;
    dispatch({ type: FETCH_RENTAL, payload: fetchedRental });
  } catch (err) {
    console.log(err);
  }
};
