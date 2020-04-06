import React from 'react';
import { FlexContainer, InfoElement, LoadingContainer } from '../common';

const CustomerInfo = ({ customer }) => (
  <LoadingContainer
    loading={!customer}
    render={() => (
      <FlexContainer wrap>
        <InfoElement label="Name" value={`${customer.firstName} ${customer.lastName}`} />
        <InfoElement label="Email" value={customer.email} />
      </FlexContainer>
    )}
  />
);

export default CustomerInfo;
