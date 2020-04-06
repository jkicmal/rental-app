import React from 'react';

import { rentalStatuses } from '../../helpers/constants';

import { FlexContainer, Divider } from '../common';
import Button from '@material-ui/core/Button';

const EmployeeRentalActionButtons = ({
  rental,
  onRentalAccept,
  onRentalReject,
  onRentalFinalize,
}) => {
  let render = null;

  if (rental.status === rentalStatuses.NEW)
    render = (
      <FlexContainer horizontalCenter>
        <Button variant="contained" color="primary" onClick={onRentalAccept}>
          Accept
        </Button>
        <Divider orientation="vertical" />
        <Button variant="contained" color="secondary" onClick={onRentalReject}>
          Reject
        </Button>
      </FlexContainer>
    );
  else if (rental.status !== rentalStatuses.FINALIZED)
    render = (
      <FlexContainer horizontalCenter>
        <Button variant="contained" onClick={onRentalFinalize}>
          Finalize
        </Button>
      </FlexContainer>
    );

  return render;
};

export default EmployeeRentalActionButtons;
