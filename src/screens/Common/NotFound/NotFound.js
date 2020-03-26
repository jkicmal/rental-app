import React from 'react';

import { Typography } from '@material-ui/core';
import { Screen } from '../../../components/Common';

const ScreensNotFound = () => {
  return (
    <Screen verticalCenter horizontalCenter>
      <Typography variant="h4">404 NOT FOUND</Typography>
    </Screen>
  );
};

export default ScreensNotFound;
