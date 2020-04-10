import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  fetchAccount,
  accountConsumeError,
  accountConsumeSuccess,
  deleteAccount,
} from '../../actions/account/actions';
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
import { Typography, Button } from '@material-ui/core';
import { formatDate, formatTime } from '../../helpers/moment-utils';
import { toastr } from 'react-redux-toastr';
import { successTypes } from '../../helpers/constants';
import { Redirect } from 'react-router-dom';

class EmployeeAccountContainer extends Component {
  componentDidMount() {
    this.fetchAccount();
  }

  fetchAccount = () => {
    const { token } = this.props.loginState;
    const { accountId } = this.props;
    this.props.accountActions.fetchAccount(accountId, { relations: ['requestedRentals'] }, token);
  };

  deleteAccount = () => {
    const { token } = this.props.loginState;
    const { accountId } = this.props;
    this.props.accountActions.deleteAccount(accountId, token);
  };

  componentDidUpdate() {
    const { error, success } = this.props.accountState;
    const { accountConsumeError, accountConsumeSuccess } = this.props.accountActions;

    if (error) {
      toastr.error(error.type, error.message);
      accountConsumeError();
    }

    if (success) {
      toastr.success(success.type, success.message);
      accountConsumeSuccess();
    }
  }

  render() {
    const { account, loading, success } = this.props.accountState;
    const { accountId } = this.props;

    if (success && success.type === successTypes.DELETE_SUCCESS)
      return <Redirect to="/employee/accounts" />;

    return (
      <>
        <FlexContainer>
          <ButtonLink to={`/employee/accounts/${accountId}/edit`}>Edit</ButtonLink>
          <Divider orientation="vertical" />
          <Button color="secondary" variant="contained" onClick={this.deleteAccount}>
            Delete
          </Button>
        </FlexContainer>
        <Divider />
        <Typography variant="h4">Account #{accountId}</Typography>
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
                        {
                          title: 'Pickup Time',
                          render: (rowData) => formatTime(rowData.pickupTime),
                        },
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
      </>
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
    error: state.accountReducer.error,
    success: state.accountReducer.success,
  },
});

const mapDispatchToProps = (dispatch) => ({
  accountActions: {
    fetchAccount: (accountId, resourceQueryParams, token) =>
      dispatch(fetchAccount(accountId, resourceQueryParams, apiAccessTypes.EMPLOYEE, token)),
    deleteAccount: (accountId, token) =>
      dispatch(deleteAccount(accountId, apiAccessTypes.EMPLOYEE, token)),
    accountConsumeError: () => dispatch(accountConsumeError()),
    accountConsumeSuccess: () => dispatch(accountConsumeSuccess()),
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeAccountContainer);
