import React from 'react';
import { Link } from 'react-router-dom';
import classes from './RouterLink.module.scss';

const RouterLink = ({ children, ...rest }) => {
  return (
    <Link className={classes.link} {...rest}>
      {children}
    </Link>
  );
};

export default RouterLink;
