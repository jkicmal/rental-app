import React from 'react';

import { Screen, Divider, ButtonLink } from '../../components/common';
import { EmployeeProduct, EmployeeItemInteractiveTable } from '../../components/employee';

const ScreensEmployeeProduct = props => {
  const productId = props.match.params.productId;
  return (
    <Screen>
      <ButtonLink to={`/employee/products/${productId}/edit`}>Edit</ButtonLink>
      <Divider />
      <EmployeeProduct productId={productId} />
      <Divider />
      <EmployeeItemInteractiveTable productId={productId} />
    </Screen>
  );
};

export default ScreensEmployeeProduct;
