import React from 'react';

import { Screen, Divider, ButtonLink } from '../../components/common';
import { EmployeeProductContainer, EmployeeProductItemsContainer } from '../../components/employee';

const ScreensEmployeeProduct = (props) => {
  const productId = props.match.params.productId;
  return (
    <Screen>
      <ButtonLink to={`/employee/products/${productId}/edit`}>Edit</ButtonLink>
      <Divider />
      <EmployeeProductContainer productId={productId} />
      <Divider />
      <EmployeeProductItemsContainer productId={productId} />
    </Screen>
  );
};

export default ScreensEmployeeProduct;
