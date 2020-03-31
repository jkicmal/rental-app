import React, { Component } from 'react';
import { connect } from 'react-redux';
import { toastr } from 'react-redux-toastr';

import {
  fetchItems,
  createItem,
  updateItem,
  deleteItem,
  itemConsumeSuccess
} from '../../actions/item/actions';
import { apiAccessTypes } from '../../config';

import { MaterialTableBase } from '../common';

class EmployeeItemInteractiveTable extends Component {
  componentDidMount() {
    const { itemActions, loginState, productId } = this.props;
    itemActions.fetchItems({ where: { productId } }, apiAccessTypes.EMPLOYEE, loginState.token);
  }

  componentDidUpdate() {
    const { itemState, itemActions } = this.props;
    const { success } = itemState;
    if (success) {
      toastr.success(success.type, success.message);
      itemActions.itemConsumeSuccess();
    }
  }

  onRowAdd(itemFormData) {
    const { itemActions, loginState, productId } = this.props;
    itemFormData.productId = productId;
    return itemActions.createItem(itemFormData, apiAccessTypes.EMPLOYEE, loginState.token);
  }

  onRowUpdate(itemFormData) {
    const { itemActions, loginState } = this.props;
    return itemActions.updateItem(
      itemFormData.id,
      itemFormData,
      apiAccessTypes.EMPLOYEE,
      loginState.token
    );
  }

  onRowDelete({ id: itemId }) {
    const { itemActions, loginState } = this.props;
    return itemActions.deleteItem(itemId, apiAccessTypes.EMPLOYEE, loginState.token);
  }

  render() {
    const { itemState } = this.props;

    return (
      <MaterialTableBase
        options={{
          search: false,
          paging: true
        }}
        columns={[{ title: 'ID', field: 'id', editable: 'never' }]}
        data={itemState.items.map(item => Object.assign({}, item))}
        title="Items"
        editable={{
          onRowAdd: item => this.onRowAdd(item),
          onRowDelete: item => this.onRowDelete(item),
          onRowUpdate: item => this.onRowUpdate(item)
        }}
      />
    );
  }
}

const mapStateToProps = state => ({
  itemState: {
    items: state.itemReducer.items,
    success: state.itemReducer.success
  },
  loginState: {
    token: state.loginReducer.token
  }
});

const mapDispatchToProps = dispatch => ({
  itemActions: {
    fetchItems: (resourceQueryParams, apiAccessType, token) =>
      dispatch(fetchItems(resourceQueryParams, apiAccessType, token)),
    createItem: (itemFormData, apiAccessType, token) =>
      dispatch(createItem(itemFormData, apiAccessType, token)),
    updateItem: (itemId, itemFormData, apiAccessType, token) =>
      dispatch(updateItem(itemId, itemFormData, apiAccessType, token)),
    deleteItem: (itemId, apiAccessType, token) =>
      dispatch(deleteItem(itemId, apiAccessType, token)),
    itemConsumeSuccess: () => dispatch(itemConsumeSuccess())
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeItemInteractiveTable);
