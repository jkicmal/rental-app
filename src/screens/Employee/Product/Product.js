import React from 'react';

import { Screen } from '../../../components/Common';
import { EmployeeProduct } from '../../../components/Employee';

const ScreensEmployeeProduct = props => {
  const productId = props.match.params.productId;
  return (
    <Screen>
      <EmployeeProduct productId={productId} />
    </Screen>
  );
};

export default ScreensEmployeeProduct;
