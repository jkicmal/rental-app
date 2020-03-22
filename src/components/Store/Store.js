import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchCategories } from '../../actions/category/actions';

import StoreCategoryList from './Category/List/List';
import { Container } from '@material-ui/core';

import classes from './Store.module.scss';

class Store extends Component {
  componentDidMount() {
    this.props.categoryActions.fetchCategories({ relations: ['products'] });
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
    fetchCategories: resourceQueryParams => dispatch(fetchCategories(resourceQueryParams))
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Store);
