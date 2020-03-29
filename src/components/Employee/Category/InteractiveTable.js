import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  fetchCategories,
  createCategory,
  updateCategory,
  deleteCategory,
  categoryConsumeSuccess
} from '../../../actions/category/actions';

import MaterialTableBase from '../../Common/MaterialTable/Base';
import { apiAccessTypes } from '../../../config';
import { toastr } from 'react-redux-toastr';

class CategoryInteractiveTable extends Component {
  componentDidMount() {
    const { categoryActions, loginState } = this.props;
    categoryActions.fetchCategories(null, apiAccessTypes.EMPLOYEE, loginState.token);
  }

  componentDidUpdate() {
    const { categoryState, categoryActions } = this.props;
    const { success } = categoryState;
    if (success) {
      toastr.success(success.type, success.message);
      categoryActions.categoryConsumeSuccess();
    }
  }

  onRowAdd(categoryFormData) {
    const { categoryActions, loginState } = this.props;
    return categoryActions.createCategory(
      categoryFormData,
      apiAccessTypes.EMPLOYEE,
      loginState.token
    );
  }

  onRowUpdate(categoryFormData) {
    const { categoryActions, loginState } = this.props;
    return categoryActions.updateCategory(
      categoryFormData.id,
      categoryFormData,
      apiAccessTypes.EMPLOYEE,
      loginState.token
    );
  }

  onRowDelete({ id: categoryId }) {
    const { categoryActions, loginState } = this.props;
    return categoryActions.deleteCategory(categoryId, apiAccessTypes.EMPLOYEE, loginState.token);
  }

  render() {
    const { categoryState } = this.props;

    return (
      <MaterialTableBase
        options={{
          search: false,
          paging: true
        }}
        columns={[
          { title: 'ID', field: 'id', editable: 'never' },
          { title: 'Name', field: 'name' }
        ]}
        data={categoryState.categories.map(category => Object.assign({}, category))}
        title="Categories"
        editable={{
          onRowAdd: category => this.onRowAdd(category),
          onRowDelete: category => this.onRowDelete(category),
          onRowUpdate: category => this.onRowUpdate(category)
        }}
      />
    );
  }
}

const mapStateToProps = state => ({
  categoryState: {
    categories: state.categoryReducer.categories,
    success: state.categoryReducer.success
  },
  loginState: {
    token: state.loginReducer.token
  }
});

const mapDispatchToProps = dispatch => ({
  categoryActions: {
    fetchCategories: (resourceQueryParams, apiAccessType, token) =>
      dispatch(fetchCategories(resourceQueryParams, apiAccessType, token)),
    createCategory: (category, apiAccessType, token) =>
      dispatch(createCategory(category, apiAccessType, token)),
    updateCategory: (category, categoryFormData, apiAccessType, token) =>
      dispatch(updateCategory(category, categoryFormData, apiAccessType, token)),
    deleteCategory: (category, apiAccessType, token) =>
      dispatch(deleteCategory(category, apiAccessType, token)),
    categoryConsumeSuccess: () => dispatch(categoryConsumeSuccess())
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(CategoryInteractiveTable);
