import React from 'react';
import { Typography } from '@material-ui/core';
import StoreProductList from '../Product/List/List';

import classes from './Category.module.scss';

const StoreCategory = ({ category }) => {
  const { name } = category;

  const productsToDisplay = category.products
    ? category.products.filter(product => product.showInStore)
    : [];

  return (
    <div className={classes.container}>
      <Typography className={classes.title} variant="h4">
        {name.toUpperCase()}
      </Typography>
      {productsToDisplay.length ? (
        <StoreProductList products={productsToDisplay} />
      ) : (
        <Typography>No products in this category</Typography>
      )}
    </div>
  );
};

export default StoreCategory;
