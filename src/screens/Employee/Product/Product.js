import React from 'react';

import { Screen, Divider, ButtonLink } from '../../../components/Common';
import { EmployeeProduct, EmployeeItemInteractiveTable } from '../../../components/Employee';

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
