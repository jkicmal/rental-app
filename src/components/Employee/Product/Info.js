import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { fetchProduct } from '../../../actions/product/actions';
import { Typography, Paper } from '@material-ui/core';
import classes from './Info.module.scss';

class EmployeeProductInfo extends Component {
  componentDidMount() {
    this.props.productActions.fetchProduct(this.props.productId, { relations: ['category'] });
  }

  render() {
    const { product } = this.props.productState;

    if (!product) return null;

    return (
      <div>
        <Typography variant="h4">
          {product.name} #{product.id}
        </Typography>
        <Paper className={classes.description}>
          <Typography variant="body1">{product.description}</Typography>
        </Paper>
        <div className={classes.infoElementsContainer}>
          <Paper className={classes.infoElement}>
            <Typography variant="body1">Price {product.price.toFixed(2)}PLN</Typography>
          </Paper>
          <Paper className={classes.infoElement}>
            <Typography variant="body1">Deposit {product.deposit.toFixed(2)}PLN</Typography>
          </Paper>
          <Paper className={classes.infoElement}>
            <Typography variant="body1">
              Displayed in store: {product.showInStore ? 'Yes' : 'No'}
            </Typography>
          </Paper>
          <Paper className={classes.infoElement}>
            <Typography variant="body1">
              Category: {product.category ? product.category.name : 'None'}
            </Typography>
          </Paper>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  productState: {
    product: state.productReducer.product
  }
});

const mapDispatchToProps = dispatch => ({
  productActions: {
    fetchProduct: (id, resourceQueryParams) => dispatch(fetchProduct(id, resourceQueryParams))
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeProductInfo);
