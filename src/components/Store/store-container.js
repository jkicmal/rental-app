import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchStore } from '../../actions/store/actions';

import { StoreCategoryList } from '.';

class StoreContainer extends Component {
  componentDidMount() {
    this.props.storeActions.fetchStore();
  }

  render() {
    const { store } = this.props.storeState;
    return <StoreCategoryList categories={store} />;
  }
}

const mapStateToProps = (state) => ({
  storeState: {
    store: state.storeReducer.store,
  },
});

const mapDispatchToProps = (dispatch) => ({
  storeActions: {
    fetchStore: () => dispatch(fetchStore()),
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(StoreContainer);
