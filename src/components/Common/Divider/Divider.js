import React from 'react';
import classes from './Divider.module.scss';

const Divider = ({ size = 'xs', orientation = 'horizontal' }) => (
  <div className={classes[`${orientation}-${size}`]}></div>
);

export default Divider;
