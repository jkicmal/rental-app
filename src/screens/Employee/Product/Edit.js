import React from 'react';

import { Screen } from '../../../components/Common';
import { EmployeeProductFormEdit } from '../../../components/Employee';

const ScreensEmployeProductEdit = props => {
  const productId = props.match.params.productId;
  return (
    <Screen horizontalCenter verticalCenter>
      <EmployeeProductFormEdit productId={productId} />
    </Screen>
  );
};
export default ScreensEmployeProductEdit;
