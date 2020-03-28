import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  fetchCategories,
  createCategory,
  updateCategory,
  deleteCategory
} from '../../../actions/category/actions';

import MaterialTableBase from '../../Common/MaterialTable/Base';
import { apiAccessTypes } from '../../../config';

class CategoryInteractiveTable extends Component {
  componentDidMount() {
    const { categoryActions, loginState } = this.props;
    categoryActions.fetchCategories(null, apiAccessTypes.EMPLOYEE, loginState.token);
  }

  onRowAdd(category) {
    const { categoryActions, loginState } = this.props;
    return categoryActions.createCategory(category, apiAccessTypes.EMPLOYEE, loginState.token);
  }

  onRowUpdate(category) {
    const { categoryActions, loginState } = this.props;
    return categoryActions.updateCategory(category, apiAccessTypes.EMPLOYEE, loginState.token);
  }

  onRowDelete(category) {
    const { categoryActions, loginState } = this.props;
    return categoryActions.deleteCategory(category, apiAccessTypes.EMPLOYEE, loginState.token);
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
    categories: state.categoryReducer.categories
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
    updateCategory: (category, apiAccessType, token) =>
      dispatch(updateCategory(category, apiAccessType, token)),
    deleteCategory: (category, apiAccessType, token) =>
      dispatch(deleteCategory(category, apiAccessType, token))
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(CategoryInteractiveTable);
