import React from 'react';

import classes from './ButtonLink.module.scss';

import { Link } from 'react-router-dom';
import { Button } from '@material-ui/core';

/**
 * NOTE:
 * Material button connected with ReactRouter link
 */

const ButtonLink = ({
  className,
  disabled,
  color = 'inherit',
  disableFocusRipple,
  disableRipple,
  fullWidth,
  size,
  variant,
  children,
  to
}) => (
  <Link className={classes.link} to={to}>
    <Button
      className={className}
      disabled={disabled}
      color={color}
      disableFocusRipple={disableFocusRipple}
      disableRipple={disableRipple}
      fullWidth={fullWidth}
      size={size}
      variant={variant}
    >
      {children}
    </Button>
  </Link>
);

export default ButtonLink;
