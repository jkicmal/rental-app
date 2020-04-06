import React from 'react';

import classes from './info-element.module.scss';

import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

const InfoElement = ({ label, value, extend }) => {
  const classNames = [classes['info-element'], extend ? classes['extend'] : null];

  return (
    <Paper className={classNames.join(' ')}>
      <Typography variant="caption">
        <b>{label}</b>
      </Typography>
      <Typography variant="body1">{value}</Typography>
    </Paper>
  );
};

export default InfoElement;
