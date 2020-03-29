import React from 'react';
import classes from './Divider.module.scss';

const Divider = ({ size = 'xs' }) => <div className={classes[size]}></div>;

export default Divider;
