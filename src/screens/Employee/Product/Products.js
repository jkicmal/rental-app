import React from 'react';

import { Screen, ButtonLink, Divider } from '../../../components/Common';
import { EmployeeProductInteractiveTable } from '../../../components/Employee/';

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
