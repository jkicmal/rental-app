import React from 'react';

import classes from './info-element.module.scss';

import { Paper, Typography } from '@material-ui/core';

const InfoElement = ({ extend, children }) => {
  const classNames = [classes['info-element'], extend ? classes['extend'] : null];
  return (
    <Paper className={classNames.join(' ')}>
      <Typography variant="body1">{children}</Typography>
    </Paper>
  );
};

export default InfoElement;
