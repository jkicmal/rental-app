import React, { Component } from 'react';
import { connect } from 'react-redux';
import { MaterialTableBase, ButtonLink } from '../common';
import { fetchRentals } from '../../actions/rental/actions';
import { apiAccessTypes } from '../../config';
import moment from '../../helpers/moment';

class CustomerRentalsContainer extends Component {
  componentDidMount() {
    const { fetchRentals } = this.props.rentalActions;
    const { token } = this.props.loginState;
    fetchRentals(null, apiAccessTypes.CUSTOMER, token);
  }

  prepareRentalsForDisplay = (rentals) => {
    return rentals.map((rental) => ({
      id: rental.id,
      startDate: moment(rental.startDate).format('DD-MM-YYYY'),
      endDate: moment(rental.endDate).format('DD-MM-YYYY'),
      pickupTime: moment(rental.pickupTime).format('DD-MM-YYYY HH:mm'),
      status: rental.status,
      depositTotal: Number(rental.depositTotal).toFixed(2),
      priceTotal: Number(rental.priceTotal).toFixed(2),
    }));
  };

  render() {
    const { rentals } = this.props.rentalState;
    return (
      <MaterialTableBase
        title="Rentals"
        columns={[
          { title: 'ID', field: 'id' },
          { title: 'Start Date', field: 'startDate' },
          { title: 'End Date', field: 'endDate' },
          { title: 'Pickup Time', field: 'pickupTime' },
          { title: 'Status', field: 'status' },
          {
            title: 'Total Deposit',
            field: 'depositTotal',
            render: (rowData) => `${rowData.depositTotal} PLN`,
          },
          {
            title: 'Total Price',
            field: 'priceTotal',
            render: (rowData) => `${rowData.priceTotal} PLN`,
          },
          {
            title: 'Actions',
            render: (rowData) => (
              <ButtonLink to={`/customer/rentals/${rowData.id}`}>View</ButtonLink>
            ),
          },
        ]}
        data={this.prepareRentalsForDisplay(rentals)}
      />
    );
  }
}

const mapStateToProps = (state) => ({
  rentalState: {
    rentals: state.rentalReducer.rentals,
    loading: state.rentalReducer.loading,
    error: state.rentalReducer.error,
  },
  loginState: {
    token: state.loginReducer.token,
  },
});

const mapDispatchToProps = (dispatch) => ({
  rentalActions: {
    fetchRentals: (resourceQueryParams, apiAccessType, token) =>
      dispatch(fetchRentals(resourceQueryParams, apiAccessType, token)),
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(CustomerRentalsContainer);
