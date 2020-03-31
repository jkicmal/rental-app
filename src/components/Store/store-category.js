import React from 'react';

import classes from './store-category.module.scss';

import { Typography } from '@material-ui/core';
import { StoreProductList } from '.';

const StoreCategory = ({ category }) => {
  const { name } = category;

  const productsToDisplay = category.products
    ? category.products.filter(product => product.showInStore)
    : [];

  // NOTE: Do not render anything if there are no products to display
  if (productsToDisplay.length === 0) return null;

  return (
    <div className={classes.container}>
      <Typography className={classes.title} variant="h4">
        {name.toUpperCase()}
      </Typography>
      <StoreProductList products={productsToDisplay} />
    </div>
  );
};

export default StoreCategory;
