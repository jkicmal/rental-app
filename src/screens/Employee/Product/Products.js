import React from 'react';

import { Screen, RouterLink } from '../../../components/Common';
import { EmployeeProductInteractiveTable } from '../../../components/Employee/';
import { Button } from '@material-ui/core';

const ScreensEmployeeProducts = () => (
  <Screen>
    <RouterLink to="/employee/products/add">
      <Button variant="contained" color="primary">
        Add
      </Button>
    </RouterLink>
    <EmployeeProductInteractiveTable />
  </Screen>
);

export default ScreensEmployeeProducts;
