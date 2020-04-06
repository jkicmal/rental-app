import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchRental } from '../../actions/rental/actions';
import { apiAccessTypes } from '../../config';
import { formatPrice } from '../../helpers/formatters';

import { Divider, MaterialTableBase, LoadingContainer } from '../common';
import { RentalInfo } from '../shared';

class CustomerRentalContainer extends Component {
  componentDidMount() {
    this.handleFetchRental();
  }

  handleFetchRental = () => {
    const { fetchRental } = this.props.rentalActions;
    const { token } = this.props.loginState;
    const { rentalId } = this.props;
    fetchRental(
      rentalId,
      { relations: ['products', 'products.category'] },
      apiAccessTypes.CUSTOMER,
      token
    );
  };

  render() {
    const { rental, loading } = this.props.rentalState;
    return (
      <LoadingContainer
        loading={!rental || loading}
        render={() => (
          <>
            <RentalInfo rental={rental} />
            <Divider />
            <MaterialTableBase
              title="Rented Products"
              columns={[
                { title: 'Name', field: 'name' },
                { title: 'Price', render: (rowData) => formatPrice(rowData.price) },
                { title: 'Deposit', field: 'deposit' },
                { title: 'Category', render: (rowData) => rowData.category.name },
              ]}
              data={rental.products}
            />
          </>
        )}
      />
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
