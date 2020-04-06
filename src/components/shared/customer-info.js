import React from 'react';
import { FlexContainer, InfoElement } from '../common';

const CustomerInfo = ({ customer }) => (
  <FlexContainer wrap>
    <InfoElement label="Name" value={`${customer.firstName} ${customer.lastName}`} />
    <InfoElement label="Email" value={customer.email} />
  </FlexContainer>
);

export default CustomerInfo;
