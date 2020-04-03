import React from 'react';

import classes from './div.module.scss';

const getPaddingClassName = padding => {
  switch (padding) {
    case 'xs':
      return classes['padding-xs'];
    case 'sm':
      return classes['padding-sm'];
    case 'md':
      return classes['padding-md'];
    case 'lg':
      return classes['padding-lg'];
    case 'xl':
      return classes['padding-xl'];
    default:
      return classes['padding-none'];
  }
};

const Div = ({ horizontalCenter, verticalCenter, padding, children }) => {
  const classNames = [
    classes['div'],
    getPaddingClassName(padding),
    horizontalCenter ? classes['center-horizontal'] : null,
    verticalCenter ? classes['center-vertical'] : null
  ];

  return <div className={classNames.join(' ')}>{children}</div>;
};

export default Div;
