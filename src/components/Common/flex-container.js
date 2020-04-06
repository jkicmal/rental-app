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

const getHorizontalCenterClassName = (flexColumn) =>
  flexColumn ? classes['center-horizontal'] : classes['center-vertical'];

const getVerticalCenterClassName = (flexColumn) =>
  flexColumn ? classes['center-vertical'] : classes['center-horizontal'];

const FlexContainer = ({
  wrap,
  horizontalCenter,
  verticalCenter,
  padding,
  flexColumn,
  children,
}) => {
  const horizontalCenterClass = horizontalCenter ? getHorizontalCenterClassName(flexColumn) : null;
  const verticalCenterClass = verticalCenter ? getVerticalCenterClassName(flexColumn) : null;
  const wrapClass = wrap ? classes['wrap'] : null;

  const classNames = [
    classes['div'],
    getPaddingClassName(padding),
    flexColumn ? classes['flex-column'] : null,
    horizontalCenterClass,
    verticalCenterClass,
    wrapClass,
  ];

  return <div className={classNames.join(' ')}>{children}</div>;
};

export default FlexContainer;
