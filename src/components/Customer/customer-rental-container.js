import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Typography } from '@material-ui/core';
import { fetchRental } from '../../actions/rental/actions';
import { apiAccessTypes } from '../../config';
import { FlexContainer, InfoElement, Divider, MaterialTableBase } from '../common';
import { formatDate, formatTime } from '../../helpers/moment-utils';

class CustomerRentalContainer extends Component {
  componentDidMount() {
    const { fetchRental } = this.props.rentalActions;
    const { token } = this.props.loginState;
    const { rentalId } = this.props;
    fetchRental(
      rentalId,
      { relations: ['products', 'products.category'] },
      apiAccessTypes.CUSTOMER,
      token
    );
  }

  render() {
    const { rental } = this.props.rentalState;

    if (!rental || rental.loading) return null;

    return (
      <>
        <FlexContainer>
          <InfoElement>Status: {rental.status}</InfoElement>
          <InfoElement>Rental Start: {formatDate(rental.startDate)}</InfoElement>
          <InfoElement>Rental End: {formatDate(rental.endDate)}</InfoElement>
          <InfoElement>Pickup Time: {formatTime(rental.pickupTime)}</InfoElement>
          <InfoElement>Total Price: {rental.priceTotal} PLN</InfoElement>
          <InfoElement>Total Deposit: {rental.priceTotal} PLN</InfoElement>
        </FlexContainer>
        <Divider />
        <MaterialTableBase
          title="Rented Products"
          columns={[
            { title: 'Name', field: 'name' },
            { title: 'Price (PLN)', field: 'price' },
            { title: 'Deposit (PLN)', field: 'deposit' },
            { title: 'Category', render: (rowData) => rowData.category.name },
          ]}
          data={rental.products}
        />
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  rentalState: {
    rental: state.rentalReducer.rental,
    loading: state.rentalReducer.loading,
  },
  loginState: {
    token: state.loginReducer.token,
  },
});

const mapDispatchToProps = (dispatch) => ({
  rentalActions: {
    fetchRental: (rentalId, resourceQueryParams, apiAccessType, token) =>
      dispatch(fetchRental(rentalId, resourceQueryParams, apiAccessType, token)),
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(CustomerRentalContainer);
