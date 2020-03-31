import React from 'react';

import classes from './button-link.module.scss';

import { Link } from 'react-router-dom';
import { Button } from '@material-ui/core';

/**
 * NOTE:
 * Material button connected with ReactRouter link
 */

const ButtonLink = ({
  className,
  disabled,
  color = 'primary',
  disableFocusRipple,
  disableRipple,
  fullWidth,
  size,
  variant = 'contained',
  disableElevation = true,
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
      disableElevation={disableElevation}
    >
      {children}
    </Button>
  </Link>
);

export default ButtonLink;
