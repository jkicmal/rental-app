import React from 'react';

import classes from './List.module.scss';

import StoreProduct from '../Product';
import { Grid } from '@material-ui/core';

const StoreProductList = ({ products }) => {
  return (
    <Grid container spacing={4}>
      {products.map(product => (
        <Grid className={classes.cell} key={product.id} item xs={12} sm={6} md={4} lg={3}>
          <StoreProduct product={product} />
        </Grid>
      ))}
    </Grid>
  );
};

export default StoreProductList;
