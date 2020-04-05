import React from 'react';

import { FlexContainer } from '../common';
import { EmployeeRentalProduct } from '.';

const EmployeeRentalProductList = ({ products }) => {
  return (
    <FlexContainer>
      <EmployeeRentalProduct />
    </FlexContainer>
  );
};

export default EmployeeRentalProductList;
