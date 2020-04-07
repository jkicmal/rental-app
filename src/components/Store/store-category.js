import React from 'react';

import classes from './store-category.module.scss';

import { Typography } from '@material-ui/core';
import { StoreProductList } from '.';

const StoreCategory = ({ category }) => {
  const { name } = category;

  return (
    <div className={classes.container}>
      <Typography className={classes.title} variant="h4">
        {name.toUpperCase()}
      </Typography>
      <StoreProductList products={category.products} />
    </div>
  );
};

export default StoreCategory;
