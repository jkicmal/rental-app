import React from 'react';

import classes from './flex-container.module.scss';

const getPaddingClassName = (padding) => {
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

const FlexContainer = ({ horizontalCenter, verticalCenter, padding, flexColumn, children }) => {
  const horizontalCenterClass = flexColumn
    ? horizontalCenter
      ? classes['center-vertical']
      : null
    : verticalCenter
    ? classes['center-horizontal']
    : null;

  const verticalCenterClass = flexColumn
    ? horizontalCenter
      ? classes['center-horizontal']
      : null
    : verticalCenter
    ? classes['center-vertical']
    : null;

  const classNames = [
    classes['div'],
    getPaddingClassName(padding),
    flexColumn ? classes['flex-column'] : null,
    horizontalCenterClass,
    verticalCenterClass,
  ];

  return <div className={classNames.join(' ')}>{children}</div>;
};

export default FlexContainer;
