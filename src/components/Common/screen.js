import React from 'react';

import classes from './screen.module.scss';
import { Container } from '@material-ui/core';

const Screen = ({ horizontalCenter, verticalCenter, children }) => {
  const classNames = [classes.screen];
  if (horizontalCenter) classNames.push(classes.horizontalCenter);
  if (verticalCenter) classNames.push(classes.verticalCenter);
  return (
    <div className={classNames.join(' ')}>
      <Container>{children}</Container>
    </div>
  );
};

export default Screen;
