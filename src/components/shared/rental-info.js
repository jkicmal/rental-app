import React from 'react';
import { FlexContainer, InfoElement } from '../common';
import { formatDate, formatTime } from '../../helpers/moment-utils';
import { formatPrice } from '../../helpers/formatters';

const RentalInfo = ({ rental }) => (
  <FlexContainer wrap>
    <InfoElement label="Status" value={rental.status} />
    <InfoElement label="Rental Start" value={formatDate(rental.startDate)} />
    <InfoElement label="Rental End" value={formatDate(rental.endDate)} />
    <InfoElement label="Pickup Time" value={formatTime(rental.pickupTime)} />
    <InfoElement label="Total Price" value={formatPrice(rental.priceTotal)} />
    <InfoElement label="Total Deposit" value={formatPrice(rental.depositTotal)} />
  </FlexContainer>
);

export default RentalInfo;
