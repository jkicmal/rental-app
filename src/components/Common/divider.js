import React from 'react';

import classes from './divider.module.scss';

const Divider = ({ size = 'xs', orientation = 'horizontal' }) => (
  <div className={classes[`${orientation}-${size}`]}></div>
);

export default Divider;
