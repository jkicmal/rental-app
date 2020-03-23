import React from 'react';
import Screen from '../../../components/Screen/Screen';
import EmployeeProductInfo from '../../../components/Employee/Product/Info';

const ScreensEmployeeProductViewOne = props => {
  const productId = props.match.params.productId;
  return (
    <Screen>
      <EmployeeProductInfo productId={productId} />
    </Screen>
  );
};

export default ScreensEmployeeProductViewOne;
