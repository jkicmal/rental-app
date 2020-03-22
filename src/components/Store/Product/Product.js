import React from 'react';

import cameraStockImage from '../../../assets/images/stock-camera.jpg';
import classes from './Product.module.scss';
import { Paper, Typography, Button } from '@material-ui/core';

const StoreProduct = ({ product }) => {
  const onButtonClick = () => {
    // TODO: Add product to the shopping cart
  };

  return (
    <Paper className={classes.container}>
      <Typography variant="h6" align="center">
        {product.name}
      </Typography>
      <img className={classes.image} src={cameraStockImage} alt={product.name} />
      <Typography className={classes.description}>{product.description}</Typography>
      <Typography>Price: {product.price.toFixed(2)}PLN</Typography>
      <Typography>Deposit: {product.deposit.toFixed(2)}PLN</Typography>
      <Button className={classes.button} onClick={onButtonClick}>
        ADD TO SHOPPING CART
      </Button>
    </Paper>
  );
};

export default StoreProduct;
