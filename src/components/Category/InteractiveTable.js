import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  fetchCategories,
  createCategory,
  updateCategory,
  deleteCategory
} from '../../actions/category/actions';

import MaterialTableBase from '../MaterialTable/Base';

class CategoryInteractiveTable extends Component {
  componentDidMount() {
    this.props.fetchCategories();
  }

  onRowAdd(category) {
    return this.props.createCategory('', category);
  }

  onRowUpdate(category) {
    return this.props.updateCategory('', category);
  }

  onRowDelete(category) {
    return this.props.deleteCategory('', category);
  }

  render() {
    const { categories } = this.props;

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
        data={categories.map(category => Object.assign({}, category))}
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
  categories: state.categoryReducer.categories
});

const mapDispatchToProps = dispatch => ({
  fetchCategories: (token, category) =>
    dispatch(fetchCategories(token, category)),
  createCategory: (token, category) =>
    dispatch(createCategory(token, category)),
  updateCategory: (token, category) =>
    dispatch(updateCategory(token, category)),
  deleteCategory: (token, category) => dispatch(deleteCategory(token, category))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CategoryInteractiveTable);
