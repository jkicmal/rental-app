import moment from './moment';

export const formatDate = (date) => moment(date).format('DD-MM-YYYY');

export const formatTime = (date) => moment(date).format('HH:mm');
