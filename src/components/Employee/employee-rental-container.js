import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  fetchRental,
  rentalConsumeSuccess,
  rentalConsumeError,
  changeRentalStatus,
} from '../../actions/rental/actions';
import { apiAccessTypes } from '../../config';
import { formatPrice } from '../../helpers/formatters';

import { Divider, LoadingContainer, MaterialTableBase } from '../common';
import { RentalInfo, CustomerInfo } from '../shared';
import Typography from '@material-ui/core/Typography';
import { toastr } from 'react-redux-toastr';
import { EmployeeRentalActionButtons } from '.';

class EmployeeRentalContainer extends Component {
  componentDidMount() {
    this.handleRentalFetch();
  }

  handleRentalFetch = () => {
    const { fetchRental } = this.props.rentalActions;
    const { token } = this.props.loginState;
    const { rentalId } = this.props;
    fetchRental(
      rentalId,
      { relations: ['requestedBy', 'items', 'items.product', 'items.product.category'] },
      apiAccessTypes.EMPLOYEE,
      token
    );
  };

  handleRentalStatusChange = (status) => {
    const { changeRentalStatus } = this.props.rentalActions;
    const { token } = this.props.loginState;
    const { rentalId } = this.props;
    changeRentalStatus(rentalId, status, apiAccessTypes.EMPLOYEE, token);
  };

  componentDidUpdate() {
    const { success, error } = this.props.rentalState;
    const { rentalConsumeSuccess, rentalConsumeError } = this.props.rentalActions;

    if (success) {
      toastr.success(success.type, success.message);
      this.handleRentalFetch();
      rentalConsumeSuccess();
    }

    if (error) {
      toastr.error(error.type, error.message);
      this.handleRentalFetch();
      rentalConsumeError();
    }
  }

  render() {
    const { rental, loading } = this.props.rentalState;
    return (
      <LoadingContainer
        loading={!rental || loading}
        render={() => (
          <>
            <Divider />
            <EmployeeRentalActionButtons
              rental={rental}
              onRentalAccept={() => this.handleRentalStatusChange('accept')}
              onRentalReject={() => this.handleRentalStatusChange('reject')}
              onRentalFinalize={() => this.handleRentalStatusChange('finalize')}
              onRentalCancel={() => this.handleRentalStatusChange('cancel')}
            />
            <Divider />
            <Typography variant="h5">Customer Info</Typography>
            <CustomerInfo customer={rental.requestedBy} />
            <Divider />
            <Typography variant="h5">Rental Info</Typography>
            <RentalInfo rental={rental} />
            <Divider />
            <LoadingContainer
              loading={!rental.items}
              render={() => (
                <MaterialTableBase
                  title="Rented Products"
                  columns={[
                    { title: 'Name', field: 'name' },
                    { title: 'Price', render: (rowData) => formatPrice(rowData.price) },
                    { title: 'Deposit', render: (rowData) => formatPrice(rowData.deposit) },
                    { title: 'Item ID', render: (rowData) => rowData.item.id },
                    { title: 'Category', render: (rowData) => rowData.category.name },
                  ]}
                  data={rental.items.map(({ product, ...itemRest }) => ({
                    ...product,
                    item: itemRest,
                  }))}
                />
              )}
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
    success: state.rentalReducer.success,
    error: state.rentalReducer.error,
  },
  loginState: {
    token: state.loginReducer.token,
  },
});

const mapDispatchToProps = (dispatch) => ({
  rentalActions: {
    fetchRental: (rentalId, resourceQueryParams, apiAccessType, token) =>
      dispatch(fetchRental(rentalId, resourceQueryParams, apiAccessType, token)),
    changeRentalStatus: (rentalId, status, apiAccessType, token) =>
      dispatch(changeRentalStatus(rentalId, status, apiAccessType, token)),
    rentalConsumeSuccess: () => dispatch(rentalConsumeSuccess()),
    rentalConsumeError: () => dispatch(rentalConsumeError()),
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeRentalContainer);
