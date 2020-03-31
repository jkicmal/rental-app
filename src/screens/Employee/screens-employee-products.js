import React from 'react';

import { Screen, ButtonLink, Divider } from '../../components/common';
import { EmployeeProductInteractiveTable } from '../../components/employee/';

const ScreensEmployeeProducts = () => (
  <Screen>
    <ButtonLink variant="contained" color="primary" to="/employee/products/add">
      Add
    </ButtonLink>
    <Divider size="xs" />
    <EmployeeProductInteractiveTable />
  </Screen>
);

export default ScreensEmployeeProducts;
