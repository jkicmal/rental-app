import React from 'react';
import { Typography } from '@material-ui/core';
import StoreProductList from '../Product/List/List';

import classes from './Category.module.scss';

const StoreCategory = ({ category }) => {
  const { name } = category;
  return (
    <div className={classes.container}>
      <Typography className={classes.title} variant="h4">
        {name.toUpperCase()}
      </Typography>
      {category.products && category.products.length ? (
        <StoreProductList products={category.products} />
      ) : (
        <Typography>No products in this category</Typography>
      )}
    </div>
  );
};

export default StoreCategory;
