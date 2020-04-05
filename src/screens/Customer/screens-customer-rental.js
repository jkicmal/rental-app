import React from 'react';

import { Screen } from '../../components/common';
import { CustomerRentalContainer } from '../../components/customer';
import { Typography } from '@material-ui/core';

const ScreensCustomerRental = (props) => {
  const { rentalId } = props.match.params;

  return (
    <Screen horizontalCenter>
      <Typography variant="h4">Rental #{rentalId}</Typography>
      <CustomerRentalContainer rentalId={rentalId} />
    </Screen>
  );
};

export default ScreensCustomerRental;
