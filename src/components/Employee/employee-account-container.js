import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchAccount } from '../../actions/account/actions';
import { apiAccessTypes } from '../../config';
import {
  LoadingContainer,
  MaterialTableBase,
  ButtonLink,
  FlexContainer,
  InfoElement,
  Divider,
} from '../common';
import { formatYesNo, formatPrice } from '../../helpers/formatters';
import { Typography } from '@material-ui/core';
import { formatDate, formatTime } from '../../helpers/moment-utils';

class EmployeeAccountContainer extends Component {
  componentDidMount() {
    const { token } = this.props.loginState;
    const { accountId } = this.props;
    this.props.accountActions.fetchAccount(accountId, { relations: ['requestedRentals'] }, token);
  }

  render() {
    const { account, loading } = this.props.accountState;
    return (
      <LoadingContainer
        loading={!account || loading}
        render={() => (
          <>
            <FlexContainer wrap>
              <InfoElement label="First Name" value={account.firstName} />
              <InfoElement label="Last Name" value={account.lastName} />
              <InfoElement label="Email" value={account.email} />
              <InfoElement label="Account Type" value={account.type} />
              <InfoElement label="Receives Emails" value={formatYesNo(account.receivesEmails)} />
            </FlexContainer>
            <Divider />
            <Typography variant="h5">Contact Info</Typography>
            <FlexContainer wrap>
              <InfoElement label="Country" value={account.country} />
              <InfoElement label="State" value={account.state} />
              <InfoElement label="City" value={account.city} />
              <InfoElement label="Address Line 1" value={account.addressLine1} />
              <InfoElement label="Address Line 2" value={account.addressLine2} />
              <InfoElement label="Postal Code" value={account.postalCode} />
              <InfoElement label="Phone" value={account.phoneNumber} />
            </FlexContainer>
            <Divider />
            <LoadingContainer
              loading={!account.requestedRentals}
              render={() => {
                const { requestedRentals: rentals } = account;
                return (
                  <MaterialTableBase
                    title="Rentals"
                    columns={[
                      { title: 'ID', field: 'id' },
                      { title: 'Status', field: 'status' },
                      { title: 'Start Date', render: (rowData) => formatDate(rowData.startDate) },
                      { title: 'Pickup Time', render: (rowData) => formatTime(rowData.pickupTime) },
                      { title: 'End Date', render: (rowData) => formatDate(rowData.endDate) },
                      {
                        title: 'Deposit Total',
                        render: (rowData) => formatPrice(rowData.depositTotal),
                      },
                      {
                        title: 'Price Total',
                        render: (rowData) => formatPrice(rowData.priceTotal),
                      },
                      {
                        title: 'Actions',
                        render: (rowData) => (
                          <ButtonLink to={`/employee/rentals/${rowData.id}`}>View</ButtonLink>
                        ),
                      },
                    ]}
                    data={rentals}
                  />
                );
              }}
            />
          </>
        )}
      />
    );
  }
}

const mapStateToProps = (state) => ({
  loginState: {
    token: state.loginReducer.token,
  },
  accountState: {
    account: state.accountReducer.account,
    loading: state.accountReducer.loading,
  },
});

const mapDispatchToProps = (dispatch) => ({
  accountActions: {
    fetchAccount: (accountId, resourceQueryParams, token) =>
      dispatch(fetchAccount(accountId, resourceQueryParams, apiAccessTypes.EMPLOYEE, token)),
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeAccountContainer);
