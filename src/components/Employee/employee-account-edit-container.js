import React, { Component } from 'react';

import { connect } from 'react-redux';
import {
  fetchAccount,
  updateAccount,
  accountConsumeError,
  accountConsumeSuccess,
} from '../../actions/account/actions';
import { apiAccessTypes } from '../../config';
import { EmployeeAccountForm } from '.';
import { LoadingContainer } from '../common';
import { Redirect } from 'react-router-dom';
import { toastr } from 'react-redux-toastr';

class EmployeeAccountEditContainer extends Component {
  componentDidMount() {
    this.fetchAccount();
  }

  fetchAccount() {
    const { token } = this.props.loginState;
    const { accountId } = this.props;
    this.props.accountActions.fetchAccount(accountId, token);
  }

  updateAccount(accountFormData) {
    const { token } = this.props.loginState;
    const { accountId } = this.props;
    this.props.accountActions.updateAccount(accountId, accountFormData, token);
  }

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

  onSubmit = (accountFormData) => {
    this.updateAccount(accountFormData);
  };

  render() {
    const { accountId } = this.props;
    const { account, loading, success } = this.props.accountState;

    if (success) return <Redirect to={`/employee/accounts/${success.accountId}`} />;

    return (
      <LoadingContainer
        loading={!account || loading}
        render={() => (
          <EmployeeAccountForm
            title={`Edit Account #${accountId}`}
            account={account}
            onSubmit={this.onSubmit}
          />
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
    success: state.accountReducer.success,
    error: state.accountReducer.error,
  },
});

const mapDispatchToProps = (dispatch) => ({
  accountActions: {
    fetchAccount: (accountId, token) =>
      dispatch(fetchAccount(accountId, null, apiAccessTypes.EMPLOYEE, token)),
    updateAccount: (accountId, accountFormData, token) =>
      dispatch(updateAccount(accountId, accountFormData, apiAccessTypes.EMPLOYEE, token)),
    accountConsumeError: () => dispatch(accountConsumeError()),
    accountConsumeSuccess: () => dispatch(accountConsumeSuccess()),
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeAccountEditContainer);
