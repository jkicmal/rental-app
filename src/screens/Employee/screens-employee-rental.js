import React from 'react';

import { EmployeeRentalContainer } from '../../components/employee';
import { Screen } from '../../components/common';
import { Typography } from '@material-ui/core';

const ScreensEmployeeRental = (props) => {
  const { rentalId } = props.match.params;

  return (
    <Screen>
      <Typography variant="h4">Rental #{rentalId}</Typography>
      <EmployeeRentalContainer rentalId={rentalId} />
    </Screen>
  );
};

export default ScreensEmployeeRental;
