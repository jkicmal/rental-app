import React from 'react';

import { Screen } from '../../components/common';
import { EmployeeProductFormEdit } from '../../components/employee';

const ScreensEmployeProductEdit = props => {
  const productId = props.match.params.productId;
  return (
    <Screen horizontalCenter verticalCenter>
      <EmployeeProductFormEdit productId={productId} />
    </Screen>
  );
};
export default ScreensEmployeProductEdit;
