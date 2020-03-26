import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  fetchCategories,
  createCategory,
  updateCategory,
  deleteCategory
} from '../../../actions/category/actions';

import MaterialTableBase from '../../Common/MaterialTable/Base';

class CategoryInteractiveTable extends Component {
  componentDidMount() {
    const { categoryActions } = this.props;
    categoryActions.fetchCategories();
  }

  onRowAdd(category) {
    const { categoryActions, loginState } = this.props;
    return categoryActions.createCategory(loginState, category);
  }

  onRowUpdate(category) {
    const { categoryActions, loginState } = this.props;
    return categoryActions.updateCategory(loginState, category);
  }

  onRowDelete(category) {
    const { categoryActions, loginState } = this.props;
    return categoryActions.deleteCategory(loginState, category);
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
    fetchCategories: (token, category) => dispatch(fetchCategories(token, category)),
    createCategory: (token, category) => dispatch(createCategory(token, category)),
    updateCategory: (token, category) => dispatch(updateCategory(token, category)),
    deleteCategory: (token, category) => dispatch(deleteCategory(token, category))
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(CategoryInteractiveTable);
