import React from 'react';
import classes from './Screen.module.scss';

const Screen = ({ horizontalCenter, verticalCenter, children }) => {
  const classNames = [classes.screen];
  if (horizontalCenter) classNames.push(classes.horizontalCenter);
  if (verticalCenter) classNames.push(classes.verticalCenter);
  return <div className={classNames.join(' ')}>{children}</div>;
};

export default Screen;
