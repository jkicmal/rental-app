import React from 'react';

import { Screen, ButtonLink, Divider } from '../../components/common';
import { EmployeeProductsContainer } from '../../components/employee/';

const ScreensEmployeeProducts = () => (
  <Screen>
    <ButtonLink variant="contained" color="primary" to="/employee/products/add">
      Add
    </ButtonLink>
    <Divider />
    <EmployeeProductsContainer />
  </Screen>
);

export default ScreensEmployeeProducts;
