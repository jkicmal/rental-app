import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchRentals, fetchRental } from '../../actions/rental/actions';
import { apiAccessTypes } from '../../config';
import moment from '../../helpers/moment';

import { MaterialTableBase, ButtonLink } from '../common';
import { Typography } from '@material-ui/core';
import { EmployeeRentalProductList } from '.';

class EmployeeRentalContainer extends Component {
  componentDidMount() {
    const { fetchRental } = this.props.rentalActions;
    const { token } = this.props.loginState;
    const { rentalId } = this.props;
    fetchRental(
      rentalId,
      { relations: ['requestedBy', 'items', 'items.product'] },
      apiAccessTypes.EMPLOYEE,
      token
    );
  }

  mapRental = (rental) => ({
    ...rental,
    products: rental.items.map(({ product, ...itemRest }) => ({
      ...product,
      item: itemRest,
    })),
  });

  render() {
    if (!this.props.rentalState.rental) return null;
    return <EmployeeRentalProductList products={this.props.rentalState.items} />;
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

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeRentalContainer);
