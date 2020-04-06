import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchRental, rentalConsumeSuccess } from '../../actions/rental/actions';
import { apiAccessTypes } from '../../config';
import { formatPrice } from '../../helpers/formatters';

import { Divider, LoadingContainer, MaterialTableBase, FlexContainer } from '../common';
import { RentalInfo, CustomerInfo } from '../shared';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { toastr } from 'react-redux-toastr';

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

  handleRentalAccept = () => {
    console.log('Accept Rental');
  };

  handleRentalReject = () => {
    console.log('Reject Rental');
  };

  handleRentalFinalize = () => {
    console.log('Finalize Rental');
  };

  componentDidUpdate(nextProps) {
    const { success } = nextProps.rentalState;
    const { rentalConsumeSuccess } = nextProps.rentalState;
    if (success) {
      toastr.success(success.type, success.message);
      this.handleRentalFetch();
      rentalConsumeSuccess();
    }
  }

  render() {
    const { rental, loading } = this.props.rentalState;
    return (
      <LoadingContainer
        loading={!rental || loading}
        render={() => (
          <>
            <FlexContainer horizontalCenter>
              <Button variant="contained" color="primary" onClick={this.handleRentalAccept}>
                Accept
              </Button>
              <Divider orientation="vertical" />
              <Button variant="contained" color="secondary" onClick={this.handleRentalReject}>
                Reject
              </Button>
              <Divider orientation="vertical" />
              <Button variant="contained" onClick={this.handleRentalFinalize}>
                Finalize
              </Button>
            </FlexContainer>
            <Divider />
            <Typography variant="h5">Customer Info</Typography>
            <CustomerInfo customer={rental.requestedBy} />
            <Divider />
            <Typography variant="h5">Rental Info</Typography>
            <RentalInfo rental={rental} />
            <Divider />
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
    rentalConsumeSuccess: () => dispatch(rentalConsumeSuccess()),
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeRentalContainer);
