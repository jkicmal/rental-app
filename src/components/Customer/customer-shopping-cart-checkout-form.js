import React, { useState } from 'react';

import moment from '../../helpers/moment';

import classes from './customer-shopping-cart-checkout-form.module.scss';

import { DatePicker, TimePicker } from '@material-ui/pickers';
import { Button } from '@material-ui/core';
import { Divider } from '../common';

const CustomerShoppingCartCheckoutForm = ({ onSubmit }) => {
  const [formState, setFormState] = useState({
    startDate: moment().add(1, 'days').toISOString(),
    endDate: moment().add(2, 'days').toISOString(),
    pickupTime: moment().add(2, 'days').hours(12).minutes(0).toISOString(),
  });

  const onInputChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  return (
    <div className={classes.container}>
      <DatePicker
        label="Rental From Date"
        minDate={moment().add(1, 'days')}
        maxDate={moment().add(7, 'days')}
        value={formState.startDate}
        onChange={(e) => onInputChange({ target: { name: 'startDate', value: e.toISOString() } })}
      />
      <Divider />
      <DatePicker
        label="Rental To Date"
        value={formState.endDate}
        minDate={moment(formState.startDate).add(1, 'days')}
        maxDate={moment(formState.startDate).add(7, 'days')}
        onChange={(e) => onInputChange({ target: { name: 'endDate', value: e.toISOString() } })}
      />
      <Divider />
      <TimePicker
        label="Pickup Time"
        value={formState.pickupTime}
        views={['hours']}
        ampm={false}
        onChange={(e) => {
          // NOTE: Allow only hours from 8 to 16
          if (e.hours() < 8) e.hours(8);
          if (e.hours() > 16) e.hours(16);
          onInputChange({
            target: {
              name: 'pickupTime',
              value: moment(formState.endDate).hours(e.hours()).minutes(e.minutes()).toISOString(),
            },
          });
        }}
      />
      <Divider />
      <Button onClick={() => onSubmit(formState)} variant="contained" color="primary">
        Rent Out!
      </Button>
    </div>
  );
};

export default CustomerShoppingCartCheckoutForm;
