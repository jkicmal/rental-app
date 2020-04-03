import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchCategories } from '../../actions/category/actions';
import { apiAccessTypes } from '../../config/api';

import { StoreCategoryList } from '.';

class Store extends Component {
  componentDidMount() {
    this.props.categoryActions.fetchCategories(
      { relations: ['products', 'products.category'] },
      apiAccessTypes.SHARED
    );
  }

  render() {
    const { categories } = this.props.categoryState;

    return <StoreCategoryList categories={categories} />;
  }
}

const mapStateToProps = state => ({
  categoryState: {
    categories: state.categoryReducer.categories
  }
});

const mapDispatchToProps = dispatch => ({
  categoryActions: {
    fetchCategories: (resourceQueryParams, apiAccessType) =>
      dispatch(fetchCategories(resourceQueryParams, apiAccessType))
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Store);
