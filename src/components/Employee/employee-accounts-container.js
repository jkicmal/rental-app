import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchAccounts } from '../../actions/account/actions';
import { apiAccessTypes } from '../../config';
import { LoadingContainer, MaterialTableBase, ButtonLink } from '../common';

class EmployeeAccountsContainer extends Component {
  componentDidMount() {
    const { token } = this.props.loginState;
    this.props.accountActions.fetchAccounts(token);
  }

  render() {
    const { accounts, loading } = this.props.accountState;
    return (
      <LoadingContainer
        loading={!accounts || loading}
        render={() => (
          <MaterialTableBase
            title="Rentals"
            columns={[
              { title: 'ID', field: 'id' },
              { title: 'Name', render: (rowData) => `${rowData.firstName} ${rowData.lastName}` },
              { title: 'Email', field: 'email' },
              { title: 'Account Type', field: 'type' },
              { title: 'Phone', field: 'phoneNumber' },
              {
                title: 'Actions',
                render: (rowData) => (
                  <ButtonLink to={`/employee/accounts/${rowData.id}`}>View</ButtonLink>
                ),
              },
            ]}
            data={accounts}
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
    accounts: state.accountReducer.accounts,
    loading: state.accountReducer.loading,
  },
});

const mapDispatchToProps = (dispatch) => ({
  accountActions: {
    fetchAccounts: (token) => dispatch(fetchAccounts(null, apiAccessTypes.EMPLOYEE, token)),
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeAccountsContainer);
